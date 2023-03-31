import ValidationError from "../exceptions/ValidationError";
import Validator from "./Validator";

class Validation {
	private _stopOnFirstFailure = false;

	public rules: ValidationRuleType;

	constructor(rules: ValidationRuleType) {
		this.rules = rules;
	}

	/**
	 * This method creates a new validation instance with the given data and rules.
	 */
	make(
		data: ValidationDataType,
		attributes?: ValidationAttributeType,
		messages?: ValidationMessagesType
	) {
		const validator = new Validator(data, this.rules, attributes, messages);
		if (this._stopOnFirstFailure) validator.stopOnFirstFailure();

		return validator;
	}

	/**
	 * This method creates a new validation instance with the given data and rules.
	 */
	validate(
		data: ValidationDataType,
		attributes?: ValidationAttributeType,
		messages?: ValidationMessagesType
	): void {
		const validator = new Validator(data, this.rules, attributes, messages);
		if (this._stopOnFirstFailure) validator.stopOnFirstFailure();

		validator.validate();
		if (validator.fails()) throw new ValidationError(validator.errors());
	}

	/**
	 * Instruct the validator to stop validating after the first rule failure.
	 */
	stopOnFirstFailure() {
		this._stopOnFirstFailure = true;
		return this;
	}
}

export default Validation;