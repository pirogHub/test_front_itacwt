const OFF = 'off';
const WARN = 'warn';
const ERROR = 'error';
/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
	ignorePatterns: [
		'node_modules',
		'!.prettierrc.js',
		'!.lintstagedrc.js',
		'!postcss.config.js',
		'!tailwind.config.js',
	],
	root: true,
	env: {
		node: true,
		es2021: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: './tsconfig.json',
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
	},
	plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-refresh', 'check-file', 'prettier'],
	extends: [
		'airbnb',
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'prettier',
	],

	rules: {
		'prettier/prettier': WARN,
		'no-console': [WARN, {allow: ['warn', 'error']}],
		'arrow-body-style': OFF,
		'no-plusplus': OFF,
		'no-underscore-dangle': OFF,
		'no-nested-ternary': OFF,
		'no-extra-boolean-cast': OFF,
		// TYPESCRIPT
		'@typescript-eslint/no-unused-vars': [
			WARN,
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
			},
		],
		'react/function-component-definition': [
			ERROR,
			{
				namedComponents: 'arrow-function',
				unnamedComponents: 'arrow-function',
			},
		],
		'react/jsx-props-no-spreading': OFF,
		'react/require-default-props': OFF,
		'react/jsx-filename-extension': [
			ERROR,
			{
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		],

		// FILE NAMINGS
		'check-file/folder-naming-convention': [
			ERROR,
			{
				'src/**/!(__tests__)/**/': 'KEBAB_CASE',
			},
		],
		'check-file/filename-naming-convention': [
			ERROR,
			{
				'**/*.{js,ts,jsx,tsx}': 'KEBAB_CASE',
			},
			{
				ignoreMiddleExtensions: true, // вс\кие .min. .test. .d. в file.min/d/test.ts будут игнориться и названия таких файлов тоже будут проверяться
			},
		],
		'import/no-extraneous-dependencies': [ERROR, {devDependencies: true}],
		'import/extensions': [
			// Поддержка файлов с расширениями .ts и .tsx
			ERROR,
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		],
		'import/prefer-default-export': OFF,
		'import/no-default-export': ERROR,
	},

	overrides: [
		{
			files: ['src/server/**/*.{js,ts,jsx,tsx}', 'webpack/**/*.{js,ts}'], // for console.log in server.tsx
			rules: {
				'no-console': OFF,
				'import/no-import-module-exports': OFF,
				'@typescript-eslint/no-require-imports': OFF,
			},
		},
		{
			files: ['./**/*.d.{js,ts,jsx,tsx}'],
			rules: {
				'import/no-default-export': OFF,
			},
		},
	],
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'], // Разрешение для импорта с этими расширениями
			},
			typescript: {},
		},
	},
};
