import errorsJSON from '../resources/errors.json';

class Rule {
	private _messages: ValidationMessagesType;

	private _attributes: ValidationAttributeType;

	constructor(attributes: ValidationAttributeType = {}, messages: ValidationMessagesType = {}) {
		this._messages = messages;
		this._attributes = attributes;
	}

	required(value: unknown, attribute: string) {
		try {
			if (typeof value !== 'undefined') return true;

			throw new Error(this._getMessage(attribute, "required"));
		} catch (e) {
			throw new Error((e as Error).message.replace(':attribute', this._getAttributeName(attribute)));
		}
	}

	email(value: unknown, attribute: string, type: "default" | "rfc" | "strict" | "filter" | "filter_unicode") {
		try {
			const patterns: Record<typeof type, string> = {
				default: "^[^\s@]+@[^\s@]+\.[^\s@]+$",
				rfc: "^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
				strict: "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$",
				filter: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
				filter_unicode: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
			};

			if (new RegExp(patterns[type], type === 'filter_unicode' ? 'u' : undefined).test(String(value))) return true;

			throw new Error(this._getMessage(attribute, "email"));
		} catch (e) {
			throw new Error((e as Error).message.replace(':attribute', this._getAttributeName(attribute)));
		}

	}

	unique(value: unknown, attribute: string, ...list: unknown[]) {
		try {
			if (list.includes(value)) throw new Error(this._getMessage(attribute, "unique"));
			return true;
		} catch (e) {
			throw new Error((e as Error).message.replace(':attribute', this._getAttributeName(attribute)));
		}
	}

	numeric(value: unknown, attribute: string) {
		try {
			if ((typeof value === 'number') || !isNaN(Number(value))) return true;
			throw new Error(this._getMessage(attribute, "numeric"));
		} catch (e) {
			throw new Error((e as Error).message.replace(':attribute', this._getAttributeName(attribute)));
		}
	}

	integer(value: unknown, attribute: string) {
		try {
			if (Number.isSafeInteger(value)) return true;
			throw new Error(this._getMessage(attribute, "integer"));
		} catch (e) {
			throw new Error((e as Error).message.replace(':attribute', this._getAttributeName(attribute)));
		}
	}

	boolean(value: unknown, attribute: string) {
		try {
			const typeofValue = typeof value;

			if (typeofValue === 'boolean') return true;

			else if (typeofValue === 'number' && (value === 0 || value === 1)) return true;

			throw new Error(this._getMessage(attribute, "boolean"));
		} catch (e) {
			throw new Error((e as Error).message.replace(':attribute', this._getAttributeName(attribute)));
		}
	}

	date(value: unknown, attribute: string) {
		try {
			const d = new Date(String(value));
			if (!d.valueOf()) {
				throw new Error(this._getMessage(attribute, "date"));
			} else {
				return true;
			}
		} catch (e) {
			throw new Error((e as Error).message.replace(':attribute', this._getAttributeName(attribute)));
		}
	}

	before(value: unknown, attribute: string, beforeDate: unknown) {
		try {
			const parsedDate = Date.parse(String(value));
			const parsedBeforeDate = Date.parse(String(beforeDate));
			if (!isNaN(parsedDate) && !isNaN(parsedBeforeDate) && parsedDate < parsedBeforeDate) return true;

			throw new Error(this._getMessage(attribute, "before"));
		} catch (e) {
			throw new Error((e as Error).message.replace(':attribute', this._getAttributeName(attribute)));
		}
	}

	before_or_equal(value: unknown, attribute: string, beforeDate: unknown) {
		try {
			const parsedDate = Date.parse(String(value));
			const parsedBeforeDate = Date.parse(String(beforeDate));
			if (!isNaN(parsedDate) && !isNaN(parsedBeforeDate) && parsedDate <= parsedBeforeDate) return true;

			throw new Error(this._getMessage(attribute, "before_or_equal"));
		} catch (e) {
			throw new Error(
				(e as Error).message
					.replace(':attribute', this._getAttributeName(attribute))
					.replace(':date', String(beforeDate))
			);
		}
	}

	after(value: unknown, attribute: string, afterDate: unknown) {
		try {
			const parsedDate = Date.parse(String(value));
			const parsedAfterDate = Date.parse(String(afterDate));
			if (!isNaN(parsedDate) && !isNaN(parsedAfterDate) && parsedDate > parsedAfterDate) return true;

			throw new Error(this._getMessage(attribute, "after"));
		} catch (e) {
			throw new Error((e as Error).message.replace(':attribute', this._getAttributeName(attribute)));
		}
	}

	after_or_equal(value: unknown, attribute: string, afterDate: unknown) {
		try {
			const parsedDate = Date.parse(String(value));
			const parsedAfterDate = Date.parse(String(afterDate));
			if (!isNaN(parsedDate) && !isNaN(parsedAfterDate) && parsedDate >= parsedAfterDate) return true;

			throw new Error(this._getMessage(attribute, "after_or_equal"));
		} catch (e) {
			throw new Error(
				(e as Error).message
					.replace(':attribute', this._getAttributeName(attribute))
					.replace(':date', String(afterDate))
			);
		}
	}

	string(value: unknown, attribute: string) {
		try {
			if (typeof value === 'string') return true;
			throw new Error(this._getMessage(attribute, "string"));
		} catch (e) {
			throw new Error((e as Error).message.replace(':attribute', this._getAttributeName(attribute)));
		}
	}

	array(value: unknown, attribute: string) {
		try {
			if (Array.isArray(value)) return true;
			throw new Error(this._getMessage(attribute, "array"));
		} catch (e) {
			throw new Error((e as Error).message.replace(':attribute', this._getAttributeName(attribute)));
		}
	}

	object(value: unknown, attribute: string) {
		try {
			if (value !== null && typeof value === 'object') return true;

			// @ts-ignore
			throw new Error(this._getMessage(attribute, "object"));
		} catch (e) {
			throw new Error((e as Error).message.replace(':attribute', this._getAttributeName(attribute)));
		}
	}

	regex(value: unknown, attribute: string) {
		try {
			new RegExp(String(value));
			return true;
		} catch (e) {
			throw new Error(this._getMessage(attribute, "regex").replace(':attribute', this._getAttributeName(attribute)));
		}
	}

	max(value: unknown, attribute: string, max: string) {
		try {
			const maxAsNumber = Number(max);

			if (typeof value === 'number' && maxAsNumber >= value) return true;

			if ((typeof value === 'string' || Array.isArray(value)) && maxAsNumber >= value.length) return true;

			if ((typeof value === 'object' && value && 'size' in value)) return maxAsNumber >= (value.size as number) / 1024;

			const typeofRule: "numeric" | "file" | "string" | "array" =
				typeof value === 'number'
					? 'numeric'
					: typeof value === 'string'
						? 'string'
						: Array.isArray(value)
							? 'array'
							: 'file';
			throw new Error(this._getMessage(attribute, "max", typeofRule));
		} catch (e) {
			throw new Error(
				(e as Error).message
					.replace(':attribute', this._getAttributeName(attribute))
					.replace(':max', String(max))
			);
		}
	}

	min(value: unknown, attribute: string, min: string) {
		try {
			const minAsNumber = Number(min);

			if (typeof value === 'number' && minAsNumber <= value) return true;

			if ((typeof value === 'string' || Array.isArray(value)) && minAsNumber <= value.length) return true;

			if ((typeof value === 'object' && value && 'size' in value) && minAsNumber <= (value.size as number) / 1024) return true;

			const typeofRule: "numeric" | "file" | "string" | "array" =
				typeof value === 'number'
					? 'numeric'
					: typeof value === 'string'
						? 'string'
						: Array.isArray(value)
							? 'array'
							: 'file'
				;
			throw new Error(this._getMessage(attribute, "min", typeofRule));
		} catch (e) {
			throw new Error(
				(e as Error).message
					.replace(':attribute', this._getAttributeName(attribute))
					.replace(':min', String(min))
			);
		}
	}

	between(value: unknown, attribute: string, min: string, max: string) {
		try {
			const maxAsNumber = Number(max);
			const minAsNumber = Number(min);

			if (typeof value === 'number' && value >= minAsNumber && value <= maxAsNumber) return true;

			if (typeof value === 'string' || (Array.isArray(value) && value.length >= minAsNumber && value.length <= maxAsNumber)) return true;

			if ((typeof value === 'object' && value && 'size' in value)) {
				const fileSizeAsKilobyte = (value.size as number) / 1024;
				if (fileSizeAsKilobyte >= minAsNumber && fileSizeAsKilobyte <= maxAsNumber) return true;
			}

			const typeofRule: "numeric" | "file" | "string" | "array" =
				typeof value === 'number'
					? 'numeric'
					: typeof value === 'string'
						? 'string'
						: Array.isArray(value)
							? 'array'
							: 'file'
				;

			throw new Error(this._getMessage(attribute, "between", typeofRule));
		} catch (e) {
			throw new Error(
				(e as Error).message
					.replace(':attribute', this._getAttributeName(attribute))
					.replace(':min', String(min))
					.replace(':max', String(max))
			);
		}
	}

	in(value: unknown, attribute: string, ...list: unknown[]) {
		try {
			if (list.includes(value)) return true;
			throw new Error(this._getMessage(attribute, "in"));
		} catch (e) {
			throw new Error((e as Error).message.replace(':attribute', this._getAttributeName(attribute)));
		}
	}

	not_in(value: unknown, attribute: string, ...list: unknown[]) {
		try {
			if (this.unique(value, attribute, list)) return true;
			throw new Error(this._getMessage(attribute, "not_in"));
		} catch (e) {
			throw new Error((e as Error).message.replace(':attribute', this._getAttributeName(attribute)));
		}
	}

	filled(value: unknown, attribute: string) {
		try {
			if (!(value === null || value === '' || Array.isArray(value) && value.length === 0)) return true;
			throw new Error(this._getMessage(attribute, "filled"));
		} catch (e) {
			throw new Error((e as Error).message.replace(':attribute', this._getAttributeName(attribute)));
		}
	}

	/* PRIVATE METHODS */
	private _getAttributeName(attr: string): string {
		return (this._attributes && (attr in this._attributes)) ? this._attributes[attr] : attr;
	}

	private _getMessage(attr: string, role: string, type?: string): string {
		const messageField = `${attr}.${role}`;
		const value = (this._messages && (messageField in this._messages)) ? this._messages[messageField] : errorsJSON[role as keyof typeof errorsJSON];

		if (typeof value === 'object') return value[type as 'numeric' | 'file' | 'string' | 'array'];

		return value;
	}
}

export default Rule;