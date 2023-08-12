module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'airbnb-typescript/base',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    plugins: ['filenames'],
    parserOptions: {
        project: './tsconfig.json',
        createDefaultProgram: true,
    },
    rules: {
        'import/no-default-export': 'error',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        'class-methods-use-this': 'off',
        'intend': 'off',
        '@typescript-eslint/indent': 'off',
        'import/extensions': 'off',
        'no-param-reassign': 'off',
        'no-plusplus': 'off',
        'filenames/match-regex': [2, '^[0-9a-z-.]+$', true],
        "prettier/prettier": [
            "error",
            {
              "endOfLine": "auto"
            }
        ],
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
