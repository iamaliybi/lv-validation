import MessageBag from "../classes/MessageBag";

class ValidationError extends Error {
	public errors: MessageBag;

	constructor(message: MessageBag) {
		super();

		const firstError = message.first();
		this.message = firstError ? firstError.message : "";

		this.errors = message;
	}
}

export default ValidationError;