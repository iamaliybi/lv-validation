/* eslint-disable prefer-spread */
import MessageBag from "./MessageBag";
import Rule from "./Rule";

class Validator {
	private _stopOnFirstFailure: boolean;

	private _validationErrors: MessageBag;

	private _validationRules: Rule;

	private _data: ValidationDataType;

	private _rules: ValidationRuleType;

	private _afterCallback: ((validator: Validator) => void) | undefined;

	constructor(
		data: ValidationDataType,
		rules: ValidationRuleType,
		attributes?: ValidationAttributeType,
		messages?: ValidationMessagesType
	) {
		this._stopOnFirstFailure = false;
		this._data = data;
		this._rules = rules;
		this._afterCallback = undefined;

		this._validationRules = new Rule(attributes ?? {}, messages ?? {});
		this._validationErrors = new MessageBag();
	}

	/**
	 * This method runs the validation rules against the input data.
	 */
	validate() {
		try {
			const dataFields = Object.keys(this._rules);

			for (let i = 0; i < dataFields.length; i++) {
				try {
					const field = dataFields[i];

					if (!this._isRunning()) return this;

					const splittedFields = field.split('.');

					if (splittedFields.length > 1) this._nonStringValidation(field, splittedFields);
					else this._stringValidation(field, this._data[field]);
				} catch (e) {
					console.error(e);
				}
			}
		} catch (e) {
			console.error(e);
		} finally {
			if (this._afterCallback) this._afterCallback(this);
		}

		return this;
	}

	/**
	 * This method returns a boolean value indicating whether the validation rules passed or failed.
	 */
	passes(): boolean {
		return this._validationErrors.isEmpty();
	}

	/**
	 * This method returns a boolean value indicating whether the validation rules failed.
	 */
	fails(): boolean {
		return this._validationErrors.isNotEmpty();
	}

	/**
	 * This method allows you to specify a callback that will be executed after validation has completed.
	 */
	after(callback: (validator: Validator) => void) {
		this._afterCallback = callback;
		return this;
	}

	/**
	 * The $errors variable that is automatically made available to all views is also an instance of the MessageBag class.
	 */
	errors() {
		return this._validationErrors;
	}

	/**
	 * Instruct the validator to stop validating after the first rule failure.
	 */
	stopOnFirstFailure() {
		this._stopOnFirstFailure = true;
		return this;
	}

	/* PRIVATE METHODS */
	private _ruleValidation(field: string, rule: string, value: unknown) {
		try {
			const { ruleName, values } = this._ruleParser(rule);

			// @ts-ignore
			if (!(ruleName in this._validationRules)) {
				console.error(`Couldn't found rule "${ruleName}".`);
				return;
			}

			try {
				const args = values ? [value, field, ...values] : [value, field];
				if (this._isRequired(field)) {
					// @ts-ignore
					this._validationRules[ruleName].apply(this._validationRules, args as [value: unknown]) as true | string;
				}
				else if (typeof value !== 'undefined') {
					// @ts-ignore
					this._validationRules[ruleName].apply(this._validationRules, args as [value: unknown]) as true | string;
				}
			} catch (e) {
				this._validationErrors.add(field, (e as Error).message);
			}
		} catch (e) {
			console.error(e);
		}
	}

	private _stringValidation(field: string, value: unknown) {
		const rules = this._rules[field];

		for (let i = 0; i < rules.length; i++) {
			if (this._isRunning()) this._ruleValidation(field, rules[i], value);
		}
	}

	private _nonStringValidation(field: string, fieldAsArray: string[]) {
		const value = this._objMapper(this._data, fieldAsArray);

		const rules = this._rules[field];
		for (let i = 0; i < rules.length; i++) {
			if (this._isRunning()) this._ruleValidation(field, rules[i], value);
		}
	}

	private _objMapper(obj: Record<string, unknown>, props: string[], index = 0): unknown {
		const value = obj[props[index]];

		if (props.length > index + 1) {
			if (value !== null && !Array.isArray(value) && typeof value === 'object') return this._objMapper(value as Record<string, unknown>, props, index + 1);
			return undefined;
		}
		else return value;
	}

	private _ruleParser(rule: string) {
		const response: { ruleName: string; values: undefined | string[] } = { ruleName: rule, values: undefined };

		try {
			const [ruleName, value] = rule.split(':');
			response.ruleName = ruleName;
			response.values = value ? value.split(',') : undefined;

			return response;
		} catch (e) {
			console.error(e);
			return response;
		}
	}

	private _isRequired(field: string): boolean {
		return this._rules[field].includes('required');
	}

	private _isRunning() {
		return this._validationErrors.isEmpty() || !this._stopOnFirstFailure;
	}
}

export default Validator;