import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactPlugin from 'eslint-plugin-react';

// Define ignore patterns
const ignorePatterns = [
    'dist',
    'node_modules',
    '*.config.js',
    '.eslintrc.*',
    'vite.config.*',
    '**/.git',
    '**/.vscode',
    '**/coverage',
    '**/build',
    '**/public',
    '**/dist',
    '**/node_modules',
];

// Common patterns for React hooks and utilities
const reactHooksPattern = '^use[A-Z]';
const reactSetStatePattern = '^set[A-Z]';

// Common React utility patterns
const reactUtilsPattern =
    '^(React|motion|Link|use[A-Z]|set[A-Z]|dispatch|history|navigate|location|params|match|ref|props)';

export default [
    // Global ignores
    { ignores: ignorePatterns },

    // JavaScript/JSX configuration
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.es2021,
                process: 'readonly',
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                sourceType: 'module',
            },
        },
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            'no-constant-binary-expression': 'error',
            'react-refresh/only-export-components': [
                'warn',
                {
                    allowConstantExport: true,
                    allowExportNames: ['*'],
                },
            ],
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
            'react-hooks/exhaustive-deps': 'warn',
            'no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    args: 'after-used',
                    ignoreRestSiblings: true,
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: [
                        '^_',
                        reactUtilsPattern,
                        '^[A-Z]',
                        '.*[cC]ontext',
                        '.*[pP]rops',
                        '.*[rR]ef$',
                        '^[a-z]', // Ignore all lowercase variables
                    ].join('|'),
                    caughtErrors: 'none',
                },
            ],
        },
    },

    // Configuration for Node.js files (like config files)
    {
        files: ['*.js'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
            parserOptions: {
                sourceType: 'commonjs',
            },
        },
        rules: {
            'no-undef': 'off',
            'no-unused-vars': 'off',
            'no-console': 'off',
        },
    },
];
