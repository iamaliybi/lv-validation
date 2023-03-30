type ValidationRulesType = "accepted" | "accepted_if" | "active_url" | "after" | "after_or_equal" | "alpha" | "alpha_dash" | "alpha_num" | "array" | "before" | "before_or_equal" | "between" | "boolean" | "confirmed" | "current_password" | "date" | "date_equals" | "date_format" | "declined" | "declined_if" | "different" | "digits" | "digits_between" | "dimensions" | "distinct" | "email" | "ends_with" | "enum" | "exists" | "file" | "filled" | "gt" | "gte" | "image" | "in" | "in_array" | "integer" | "ip" | "ipv4" | "ipv6" | "json" | "lt" | "lte" | "mac_address" | "max" | "mimes" | "mimetypes" | "min" | "multiple_of" | "not_in" | "not_regex" | "numeric" | "password" | "present" | "prohibited" | "prohibited_if" | "prohibited_unless" | "prohibits" | "regex" | "required" | "required_array_keys" | "required_if" | "required_unless" | "required_with" | "required_with_all" | "required_without" | "required_without_all" | "same" | "size" | "starts_with" | "string" | "timezone" | "unique" | "uploaded" | "url" | "uuid";

type ValidationMultiRulesType = "between" | "gt" | "gte" | "lt" | "lte" | "max" | "min" | "size";

type ValidationDataType = Record<string, unknown>;

type ValidationRuleType = Record<string, string[]>;

type ValidationMessagesType = Record<string, string>;

type ValidationAttributeType = Record<string, string>;