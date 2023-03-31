import Rule from "classes/Rule";

describe('"required"', () => {
	test('"required" rule with out [attributes] and [messages]', () => {
		const data = {
			first_name: 'ALi'
		};

		const rule = new Rule(data);

		expect(rule.required(data.first_name, 'first_name')).toBe(true);
		
		try {
			rule.required(undefined, 'first_name');
		} catch (e) {
			expect((e as Error).message).toBe("The first_name field is required.");
		}
	});

	test('"required" rule with [attributes]', () => {
		const data = {
			first_name: 'ALi'
		};

		const attributes = {
			'first_name': 'First Name'
		};

		try {
			const rule = new Rule(data, attributes);
			rule.required(undefined, 'first_name');
		} catch (e) {
			expect((e as Error).message).toBe("The First Name field is required.");
		}
	});

	test('"required" rule with [messages]', () => {
		const data = {
			first_name: 'ALi'
		};

		const messages = {
			'first_name.required': "first_name can't be null."
		};

		
		try {
			const rule = new Rule(data, {}, messages);
			rule.required(undefined, 'first_name');
		} catch (e) {
			expect((e as Error).message).toBe("first_name can't be null.");
		}
	});

	test('"required" rule with [attributes] and [messages]', () => {
		const data = {
			first_name: 'ALi'
		};

		const attributes = {
			'first_name': 'First Name'
		};

		const messages = {
			'first_name.required': ":attribute can't be null."
		};

		try {
			const rule = new Rule(data, attributes, messages);
			rule.required(undefined, 'first_name');
		} catch (e) {
			expect((e as Error).message).toBe("First Name can't be null.");
		}
	});
});