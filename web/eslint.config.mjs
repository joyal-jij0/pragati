import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable the unused variables rule completely
      "@typescript-eslint/no-unused-vars": "off",
      
      // Alternatively, if you want to keep warnings but not errors:
      // "@typescript-eslint/no-unused-vars": "warn",
      
      // Or, if you want to ignore specific patterns:
      // "@typescript-eslint/no-unused-vars": ["error", { 
      //   "argsIgnorePattern": "^_",
      //   "varsIgnorePattern": "^_",
      //   "ignoreRestSiblings": true 
      // }],
      
      // Disable the no-explicit-any rule
      "@typescript-eslint/no-explicit-any": "off",
      
      // Or make it a warning instead of an error
      // "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];

export default eslintConfig;