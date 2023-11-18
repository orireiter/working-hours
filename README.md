# Web Application Template
<details>
   <summary><b>Using</b></summary>
   
1. TypeScript
2. React
3. Vite
4. Mantine UI
</details>

---

<details>
   <summary>1. Vite Default Readme</summary>
   
## React + TypeScript + Vite

   This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

   Currently, two official plugins are available:

   - [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
   - [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

   ### Expanding the ESLint configuration

   If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

   - Configure the top-level `parserOptions` property like this:

   ```js
      parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: ['./tsconfig.json', './tsconfig.node.json'],
      tsconfigRootDir: __dirname,
      },
   ```

   - Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
   - Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
   - Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

</details>
<details>
   <summary>2. Placeholders To Switch</summary>
   
   1. !SITE_NAME!
   2. !TERMS_AND_CONDITIONS_URL!
</details>
<details>
   <summary>3. Add real file and remove from gitignore</summary>
   
   1. public/icon.png
</details>

# Features
1. make basic pages:
    1. login ✅
    2. signup ✅
    3. homepage ✅
    4. navbar
2. add nightmode support ✅
2. add mobile support ✅
2. implement routing ✅
2. decide how to add data to the navbar
3. try to add boundaries to 3rd party libraries
3. make it pluggable to other services easily
3. make it easy to add new pages
4. make a configuration file to specify what to use of the site:
    1. which pages to show and whether they require authentication.
    2. site name.
5. make a list of everything that needs to be made for this to work (list of functions/placeholders/etc...).
6. make it so any request to backend that determines you're logged out (401 for example), will update whatever is needed (the store).

