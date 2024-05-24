import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
export default [
    {
        ignores: ["**/node_modules/", ".dist/"],
        languageOptions: {
            globals: {
                ...globals.browser,
                process: "readonly", // so that it dont throuhs error as it does not know that process is a lobal variable
            },
        },
        rules: {
            "no-unused-vars": "error",
            "no-unused-expressions": "error",
            "prefer-const": "error",
            "no-console": "warn",
            "no-undef": "error",
        },
        // extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
];