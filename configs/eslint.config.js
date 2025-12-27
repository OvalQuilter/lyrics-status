import eslint from "@eslint/js"
import stylisticPlugin from "@stylistic/eslint-plugin"
import { defineConfig } from "eslint/config"
import importPlugin from "eslint-plugin-import"
import importNewlinesPlugin from "eslint-plugin-import-newlines"
import globals from "globals"
import * as tseslint from "typescript-eslint"

const globalRules = {
    "eqeqeq": ["error", "always"],
    "prefer-const": "error",
    "curly": ["error", "all"],
    "no-undef": "error",
    "max-len": ["error", { "code": 120, "ignoreUrls": true }],

    "@stylistic/semi": ["error", "never"],
    "@stylistic/quotes": ["error", "double"],
    "@stylistic/object-curly-spacing": ["error", "always"],
    "@stylistic/comma-dangle": ["error", "always-multiline"],
    "@stylistic/eol-last": ["error", "always"],
    "@stylistic/no-trailing-spaces": "error",

    "import/order": [
        "error",
        {
            "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
            "alphabetize": { "order": "asc", "caseInsensitive": true },
        },
    ],
}
const globalPlugins = {
    "@typescript-eslint": tseslint.plugin,
    "@stylistic": stylisticPlugin,
    "import-newlines": importNewlinesPlugin,
}

const globalSettings = {
    "import/resolver": {
        typescript: {
            alwaysTryTypes: true,
            project: "./tsconfig.json",
        },
        node: true,
    },
}

const tsGlobalRules = {
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/explicit-function-return-type": "error",
}

// @eslint-disable-next-line
const tsconfigRootDir = import.meta.dirname

export default defineConfig([
    importPlugin.flatConfigs.recommended,
    {
        ignores: ["dist/", "node_modules/", "src/backup/", "static/"],
    },
    {
        languageOptions: {
            parserOptions: {
                projectService: {
                    allowDefaultProject: ["*.js"],
                },
                tsconfigRootDir,
            },
        },
        settings: globalSettings,
    },
    {
        files: ["src/**/*.ts"],
        ignores: ["src/backup/**/*.ts", "src/Panel/Frontend/**/*.ts"],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommendedTypeChecked,
            ...tseslint.configs.stylisticTypeChecked,
        ],
        languageOptions: {
            globals: {
                ...globals.node,
            },
            parser: tseslint.parser,
        },
        plugins: {
            ...globalPlugins,
        },
        rules: {
            ...globalRules,
            ...tsGlobalRules,
        },
    },
    {
        files: ["src/Panel/Frontend/**/*.ts"],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommendedTypeChecked,
            ...tseslint.configs.stylisticTypeChecked,
        ],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parser: tseslint.parser,
        },
        plugins: {
            ...globalPlugins,
        },
        rules: {
            ...globalRules,
            ...tsGlobalRules,
        },
    },
    {
        files: ["**/*.js"],
        extends: [
            eslint.configs.recommended,
        ],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.node,
            },
        },
        plugins: {
            "@stylistic": stylisticPlugin,
            "import-newlines": importNewlinesPlugin,
        },
        rules: {
            ...globalRules,
        },
    },
    ],
)
