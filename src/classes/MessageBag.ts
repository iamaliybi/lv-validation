class MessageBag {
	private _bag: { key: string; message: string }[] = [];

	/**
	 * Add a message to the message bag.
	 */
	add(key: string, message: string) {
		this._bag.push({ key, message });
	}

	/**
	 * Add a message to the message bag if the given conditional is "true".
	 */
	addIf(condition: boolean, key: string, message: string) {
		if (condition) this.add(key, message);
	}

	/**
	 * Determine if messages exist for all of the given keys.
	 */
	has(key: string) {
		try {
			for (let i = 0; i < this._bag.length; i++) {
				const item = this._bag[i];
				if (item.key === key) return true;
			}
		} catch (e) {
			return false;
		}
	}

	/**
	 * Get the first message from the message bag for a given key.
	 */
	first(key: string | null = null): { key: string; message: string } | null {
		try {
			if (key) {
				for (let i = 0; i < this._bag.length; i++) {
					const item = this._bag[i];
					if (item.key === key) item.message;
				}

				return null;
			}

			const firstMessage = this._bag[0];
			if (firstMessage) return firstMessage;

			return null;
		} catch (e) {
			return null;
		}
	}

	/**
	 * Get all of the messages from the message bag for a given key.
	 */
	get(key: string) {
		const result: { key: string; message: string[] } = {
			key,
			message: []
		};

		try {
			for (let i = 0; i < this._bag.length; i++) {
				const item = this._bag[i];
				if (item.key === key) result.message.push(item.message);
			}

			return result;
		} catch (e) {
			return result;
		}
	}

	/**
	 * Get all of the messages for every key in the message bag.
	 */
	all() {
		return this._bag;
	}

	/**
	 * Get the number of messages in the message bag.
	 */
	count() {
		return this._bag.length;
	}

	/**
	 * Determine if the message bag has any messages.
	 */
	isEmpty() {
		return this.count() === 0;
	}

	/**
	 * Determine if the message bag has any messages.
	 */
	isNotEmpty() {
		return this.count() > 0;
	}
}

export default MessageBag;