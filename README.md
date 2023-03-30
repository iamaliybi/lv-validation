# Laravel Validation (lv-validation)

A powerful tool for developers to validate form inputs on both the front and back end. This library is designed to provide a simple and flexible way to ensure that user input is properly formatted and meets the necessary requirements.

Whether you're building a web application, a mobile app, or a desktop program, this validation library can help you reduce errors and improve the user experience. With easy integration and a simple API, you can quickly add validation to your project without adding unnecessary complexity.

<br />

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

<br />

## Installation

Explain how to install your project, including any dependencies that need to be installed first.

```
npm install
```

<br />

## Usage

If you're familiar with Laravel validation, you'll find our JavaScript library to be very similar. Our library provides a flexible and easy-to-use API for validating user input in your web applications. [Laravel documentation](https://laravel.com/docs/9.x/validation)

Here's a quick example of how to use our library:

```javascript
import Validation from 'lv-validation';

// Define the validation rules
const rules = {
  name: 'required|string|max:255',
  email: 'required|email|max:255',
  password: 'required|string|min:8',
};

// Validate the input
const input = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: 'password123'
};

const validator = Validation.validate(input, rules);

if (validator.passes()) {
  // Continue with your application logic
} else {
  // Display the validation errors to the user
  const errors = validator.errors();
  console.log(errors);
}
```

<br />

## Contributing

Please follow these guidelines if you want to contribute to the project.

1. Fork the project
2. Create a new branch (`git checkout -b feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Added a new feature'`)
5. Push to the branch (`git push origin feature`)
6. Create a Pull Request

<br />

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). You are free to use, modify, and distribute this software as you see fit. See the `LICENSE` file for more details.

<br />

## Connect with me

- [LinkedIn](https://www.linkedin.com/in/iamaliybi)
- [Github](https://github.com/iamaliybi)
- [Website](https://iamaliybi.dev)
- [Stackoverflow](https://stackoverflow.com/users/11662335/ali-yaghoubi)
- [E-Mail](mailto:iamaliybi.dev@gmail.com)
