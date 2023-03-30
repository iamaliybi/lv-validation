import ValidationError from 'exceptions/ValidationError';
import Validation from "classes/Validation";
import errorsJSON from 'resources/errors.json';

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
			Validation.validate(data, rules);
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
			Validation.validate(data, rules);
		} catch (e) {
			expect(e instanceof ValidationError).toBeTruthy();
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

		const validator = Validation.make(data, rules);
		validator.validate();

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

		const validator = Validation.make(data, rules);
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

		const validator = Validation.make(data, rules).validate();
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

		const validator = Validation
			.make(data, rules)
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

		// const attributes = {
		// 	'experience.companyName': 'company name'
		// };

		// const messages = {
		// 	'experience.object': "It's not object",
		// 	'experience.companyName.string': "It's not string",
		// 	'experience.toDate.date': "It's not date"
		// };

		const validator = Validation
			.make(data, rules)
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

		const validator = Validation
			.make(data, rules, attributes, messages)
			.stopOnFirstFailure()
			.validate();

		expect(validator.errors().first()?.message).toBe("First Name isn't string");
	});
});