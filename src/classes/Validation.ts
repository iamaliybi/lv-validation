import ValidationError from "../exceptions/ValidationError";
import Validator from "./Validator";

class Validation {
	private static _stopOnFirstFailure = false;

	/**
	 * This method creates a new validation instance with the given data and rules.
	 */
	static make(
		data: ValidationDataType,
		rules: ValidationRuleType,
		attributes?: ValidationAttributeType,
		messages?: ValidationMessagesType
	) {
		const validator = new Validator(data, rules, attributes, messages);
		if (this._stopOnFirstFailure) validator.stopOnFirstFailure();

		return validator;
	}

	/**
	 * This method creates a new validation instance with the given data and rules.
	 */
	static validate(
		data: ValidationDataType,
		rules: ValidationRuleType,
		attributes?: ValidationAttributeType,
		messages?: ValidationMessagesType
	): void {
		const validator = new Validator(data, rules, attributes, messages);
		if (this._stopOnFirstFailure) validator.stopOnFirstFailure();

		validator.validate();
		if (validator.fails()) throw new ValidationError(validator.errors());
	}

	/**
	 * Instruct the validator to stop validating after the first rule failure.
	 */
	static stopOnFirstFailure() {
		this._stopOnFirstFailure = true;
		return this;
	}
}

export default Validation;