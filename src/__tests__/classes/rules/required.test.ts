import Rule from "classes/Rule";

describe('"required"', () => {
	test('"required" rule with out [attributes] and [messages]', () => {
		const rule = new Rule();

		expect(rule.required('Ali', 'first_name')).toBe(true);
		
		try {
			rule.required(undefined, 'first_name');
		} catch (e) {
			expect((e as Error).message).toBe("The first_name field is required.");
		}
	});

	test('"required" rule with [attributes]', () => {
		const attributes = {
			'first_name': 'First Name'
		};

		try {
			const rule = new Rule(attributes);
			rule.required(undefined, 'first_name');
		} catch (e) {
			expect((e as Error).message).toBe("The First Name field is required.");
		}
	});

	test('"required" rule with [messages]', () => {
		const messages = {
			'first_name.required': "first_name can't be null."
		};

		
		try {
			const rule = new Rule({}, messages);
			rule.required(undefined, 'first_name');
		} catch (e) {
			expect((e as Error).message).toBe("first_name can't be null.");
		}
	});

	test('"required" rule with [attributes] and [messages]', () => {
		const attributes = {
			'first_name': 'First Name'
		};

		const messages = {
			'first_name.required': ":attribute can't be null."
		};

		try {
			const rule = new Rule(attributes, messages);
			rule.required(undefined, 'first_name');
		} catch (e) {
			expect((e as Error).message).toBe("First Name can't be null.");
		}
	});
});