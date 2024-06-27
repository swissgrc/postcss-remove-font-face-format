const js = require("@eslint/js");
const jest = require('eslint-plugin-jest');

module.exports = [
    {
        languageOptions: {
            ecmaVersion: 2017,
            globals: {
                "node": true,
                "es6": true,
            }
        },
        ...jest.configs['flat/recommended'],
        ...js.configs.recommended,
        "rules": {
            "jest/expect-expect": "off"
        }
    },
    {
        ignores: ["*/"]
    }
];
