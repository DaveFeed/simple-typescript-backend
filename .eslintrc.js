module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'airbnb-typescript/base',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:jest/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    plugins: ['filenames'],
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    rules: {
        'import/no-default-export': 'error',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        'class-methods-use-this': 'error',
        'filenames/match-regex': [2, '^[0-9a-z-.]+$', true],
        intend: 'off',
        'no-param-reassign': 0
    },
    env: {
        'jest/globals': true
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [['src/*', './src/']],
                extensions: ['.ts', '.js', '.json']
            }
        }
    }
};
//? For testing add this
// npx husky add .husky/pre-commit "npm test"
// git add .husky/pre-commit
