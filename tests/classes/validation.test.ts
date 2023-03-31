import ValidationError from "../../src/exceptions/ValidationError";
import Validation from "../../src/classes/Validation";
import errorsJSON from "../../src/locale/en";

describe('Check response of "Validation" class', () => {
	test('should not throw an exception instance of "ValidationError"', () => {
		const data = {
			first_name: 'Ali',
			last_name: 'Yaghoubi'
		};

		const rules = {
			first_name: ['required', 'string', 'max:24', 'min:3'],
			last_name: ['required', 'string', 'max:72', 'min:3']
		};

		try {
			const validation = new Validation(rules);
			validation.validate(data);
		} catch (e) {
			expect(!(e instanceof ValidationError)).toBeFalsy();
		}
	});

	test('should throw an exception instance of "ValidationError"', () => {
		const data = {
			first_name: 'Ali',
			last_name: 'Yaghoubi',
			role: 20
		};

		const rules = {
			first_name: ['required', 'string', 'max:24', 'min:3'],
			last_name: ['required', 'string', 'max:72', 'min:3'],
			role: ['required', 'string', 'max:24', 'min:3'],
		};

		try {
			(new Validation(rules)).validate(data);
		} catch (e) {
			expect('errors' in (e as ValidationError)).toBeTruthy();
		}
	});

	test('should passes()', () => {
		const data = {
			first_name: 'Ali',
			last_name: 'Yaghoubi',
			birthday: '2002-09-12'
		};

		const rules = {
			first_name: ['required', 'string', 'max:24', 'min:3'],
			last_name: ['required', 'string', 'max:72', 'min:3'],
			birthday: ['required', 'date'],
		};

		const validator = (new Validation(rules))
			.make(data)
			.validate();

		expect(validator.passes()).toBe(true);
		expect(validator.fails()).toBe(false);
	});

	test('should fails()', () => {
		const data = {
			first_name: 'Ali',
			last_name: 'Yaghoubi',
			birthday: 'abcd'
		};

		const rules = {
			first_name: ['required', 'string', 'max:24', 'min:3'],
			last_name: ['required', 'numeric', 'max:72', 'min:3'],
			birthday: ['required', 'date'],
		};

		const validator = (new Validation(rules)).make(data);
		validator.validate();
		expect(validator.fails()).toBe(true);
	});

	test('Check count of errors', () => {
		const data = {
			first_name: 1,
			last_name: 2
		};

		const rules = {
			first_name: ['required', 'string', 'max:24', 'min:3'],
			last_name: ['required', 'numeric', 'max:72', 'min:3']
		};

		const validator = (new Validation(rules)).make(data).validate();
		expect(validator.errors().count()).toBe(3);
	});

	test('Check stopOnFirstFailure()', () => {
		const data = {
			first_name: 1,
			last_name: 2,
			birthday: 3
		};

		const rules = {
			first_name: ['required', 'string', 'max:24', 'min:3'],
			last_name: ['required', 'numeric', 'max:72', 'min:3'],
			birthday: ['required', 'date'],
		};

		const validator = (new Validation(rules))
			.make(data)
			.stopOnFirstFailure()
			.validate();

		expect(validator.errors().count()).toBe(1);
	});

	test('Check error message', () => {
		const data = {
			first_name: 1
		};

		const rules = {
			first_name: ['required', 'string', 'max:24', 'min:3']
		};

		const validator = (new Validation(rules))
			.make(data)
			.stopOnFirstFailure()
			.validate();

		expect(validator.errors().first()?.message).toBe(errorsJSON.string.replace(':attribute', 'first_name'));
	});

	test('Check error message [attributes & messages]', () => {
		const data = {
			first_name: 1
		};

		const rules = {
			first_name: ['required', 'string', 'max:24', 'min:3']
		};

		const attributes = {
			'first_name': 'First Name'
		};

		const messages = {
			'first_name.string': ":attribute isn't string"
		};

		const validator = (new Validation(rules))
			.make(data, attributes, messages)
			.stopOnFirstFailure()
			.validate();

		expect(validator.errors().first()?.message).toBe("First Name isn't string");
	});
});