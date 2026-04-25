import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next'
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  ...nextVitals,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    }
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  prettierConfig,
])