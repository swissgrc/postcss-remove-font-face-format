module.exports = [
    {
        languageOptions: {
            ecmaVersion: 2017,
            globals: {
                "node": true,
                "es6": true,
            }
        },
        ...require('eslint-plugin-jest').configs['flat/recommended'],
        ...require("@eslint/js").configs.recommended,
        "rules": {
            "jest/expect-expect": "off"
        }
    },
    {
        ignores: ["*/"]
    }
];
