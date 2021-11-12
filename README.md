# Weather Dashboard

## About the project

This project consists of building an application which allows the user to randomly generate a password given a set of user defined criteria. It combines the use of HTML and CSS to build the core elements of the webpage, and javascript to accept user input and convert into an output.

## Technologies Used

- HTML
- CSS
- JavaScript

## Link to GitHub Pages

[Click here!](https://conorjkelly96.github.io/random-password-generator/)

## Solution Overview - JavaScript

### Getting User Input

The most dynamic way to create a user password is to obtain this input. For this, there were two types of input: one for the user to pass in a value declaring their desired password length, and to confirm if they wanted to use a certain character type.

The code below is an example of obtaining user input, creating functions to handle each character type. These function expressions were hoisted as primary pieces of the code, which could be executed in other contexts:

```
// Get User Inputs - upper case
const getUppercaseInput = function () {
  const uppercaseInput = confirm("Do you require an Uppercase Character?");
  return uppercaseInput;
};
```

### Storing User Defined Input

Once the user defined their password properties, it's important to store this input locally which will be passed onto the generator function. I created an object to pass the values of the input after the user input functions were called:

```
// Function to take user criteria for password
const getCriteria = function () {
  const confirmPasswordLength = getPasswordLength();
  const confirmLowercase = getLowercaseInput();
  const confirmUppercase = getUppercaseInput();
  const confirmNumbers = getNumbersInput();
  const confirmSpecials = getSpecialsInput();
  const passwordCriteria = {
    passwordLength: confirmPasswordLength,
    lowercase: confirmLowercase,
    uppercase: confirmUppercase,
    numbers: confirmNumbers,
    specials: confirmSpecials,
  };
  if (
    passwordCriteria.numbers == false &&
    passwordCriteria.lowercase == false &&
    passwordCriteria.uppercase == false &&
    passwordCriteria.specials == false
  ) {
    alert("You have not selected a valid password criteria.");
  }
  return passwordCriteria;
};
```

Part of the validation process and edge case handling was "what happens if the user clicked no to all character type questions?". This would mean a password could not be generated, therefore a the final piece of the getCriteria() function is to check if the user answered 'false' to all questions, and if so return an alert.

## Final Website Structure

The layout of the password generator is below:

![Website](assets/images/site.png)
