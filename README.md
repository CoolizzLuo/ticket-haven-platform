# Ticket haven platform

## Start

1. Ensure `Node.js (16.8+)` and `Yarn` are installed.
2. Install dependencies: `yarn` install.
3. Copy the `.env.sample` file and name it `.env`, then fill in the corresponding environment variables.
4. Start the development server: yarn dev.

## NPM scripts

> Here are some available development scripts:

- yarn dev：啟動開發伺服器。
- yarn build：構建生產版本。
- yarn start：啟動生產伺服器。
- yarn lint：運行 ESLint 進行語法檢查。
- yarn prepare：安裝 Husky。

## Tech Stack

> This project uses the following technologies:

- Next.js：一個基於 React 的現代化框架，用於構建高性能的網頁應用程式。
- React：用於構建用戶界面的 JavaScript 庫。
- Chakra UI：一個簡單、模組化且可訪問的 React 組件庫。
- TypeScript：一個強類型的 JavaScript 擴展，使得開發過程更可靠和可維護。
- Zustand：一個輕量級的狀態管理庫。
- Axios：一個基於 Promise 的 HTTP 客戶端，用於瀏覽器和 Node.js。
- Framer Motion：一個用於創建動畫和交互效果的 React 庫。
- ESLint：用於維護程式碼質量的靜態分析工具。
- Husky：用於管理 Git hooks 的工具。

## Project structure

```javascript
├── .commitlintrc.json       // CommitLint 配置文件，用於檢查 Git 提交信息的格式
├── .env.sample              // .env 模板文件，存放環境變量的範例
├── .eslintignore            // ESLint 忽略配置，指定不需要進行語法檢查的文件
├── .eslintrc.json           // ESLint 配置文件，用於設置語法檢查規則
├── .git                     // Git 版本控制系統的資料夾
├── .gitignore               // Git 忽略配置，指定不需要版本控制的文件
├── .husky                   // Husky 配置文件夾，用於管理 Git hooks
├── .next                    // Next.js 編譯產生的資料夾，包含靜態文件和緩存
├── .prettierignore          // Prettier 忽略配置，指定不需要進行程式碼格式化的文件
├── .prettierrc              // Prettier 配置文件，用於設置程式碼格式化規則
├── .vscode                  // Visual Studio Code 設定文件夾
├── README.md                // 專案說明文件
├── next-env.d.ts            // Next.js 環境類型定義文件
├── next.config.js           // Next.js 配置文件
├── node_modules             // Node.js 模組資料夾，存放所有依賴
├── package.json             // 專案配置文件，包含專案信息、腳本和依賴
├── public                   // 靜態資源文件夾，例如圖片、字體等
├── src                      // 源碼文件夾
│   ├── api                  // 存放 API 請求相關程式碼
│   ├── app                  // 存放 Next route pages
│   ├── components           // 存放 React 元件
│   ├── hooks                // 存放自定義 React Hooks
│   ├── lib                  // 存放公共函式庫和工具
│   ├── stores               // 存放應用狀態管理程式碼，例如 Redux 或 MobX
│   └── types                // 存放 TypeScript 類型定義
├── tsconfig.json            // TypeScript 配置文件
└── yarn.lock                // Yarn 鎖定文件，確保依賴版本的一致性
```

## Specifications

### Git message

#### Rules

為了讓提交歷史保持整潔並易於理解，我們要求所有 Git 提交信息遵循以下格式：
`[type]: [title]`

- type

  - `build`：修改構建系統或外部依賴
  - `ci`：修改 CI 配置文件或腳本
  - `chore`：對非業務邏輯程式碼的更改，例如更新開發工具
  - `docs`：文件更新
  - `feat`：新增功能
  - `fix`：修復 bug
  - `perf`：改善程式的性能
  - `refactor`：重構程式碼，不添加新功能或修復 bug
  - `revert`：還原先前的 commit
  - `style`：改善程式碼風格，例如縮排、空格等
  - `test`：增加或修改測試程式

- title (sentence-case)
  - 簡短地描述提交的改變。主題應遵循句子格式，即首字母大寫，其餘字母小寫。 Ex:`This is an example of sentence case.`

#### Example

`build: Update eslint config for production`
`ci: Add GitHub Actions workflow for automated testing`
`chore: Update project dependencies to latest versions`
`docs: Add usage instructions to README`
`feat: Add new user registration feature`
`fix: Resolve login issue for locked accounts`
`docs: Update API documentation`
`perf: Optimize image loading for faster page rendering`
`refactor: Simplify error handling in API client`
`revert: Roll back to previous version of login form`
`style: Enforce consistent indentation with Prettier`
`test: Add unit tests for user registration endpoint`


### Coding style

Below are React code examples for some of the main ESLint rules

1. react/button-has-type:

```jsx
// Warning: Missing button type
<button>Click me</button>

// Correct: Specifying button type
<button type="button">Click me</button>

```

2. react/destructuring-assignment:

```jsx
// Warning: Destructuring assignment not used
const Greeting = (props) => <div>Hello, {props.name}!</div>;

// Correct: Using destructuring assignment
const Greeting = ({ name }) => <div>Hello, {name}!</div>;
```

3. react/function-component-definition:

```jsx
// Warning: Not using arrow function definition
function Greeting({ name }) {
  return <div>Hello, {name}!</div>;
}

// Correct: Using arrow function definition
const Greeting = ({ name }) => <div>Hello, {name}!</div>;

```

4. react/jsx-filename-extension:

```jsx
// Warning: Using JSX in .js file
// App.js
const App = () => <div>Hello, world!</div>;

// Correct: Using JSX in .tsx file
// App.tsx
const App = () => <div>Hello, world!</div>;
```

5. react/jsx-one-expression-per-line:

```jsx
// This rule is disabled, so the following code is allowed
const Text = ({ name, age }) => (
  <div>
    Hello, {name}! Your age is {age}.
  </div>
);
```

6. react/jsx-props-no-spreading:

```jsx
// This rule is disabled, so the following code is allowed
const InputComponent = ({ ...props }) => <input {...props} />;
```

7. quotes (used in JSX):

```jsx
// Warning: Using single quotes
const Container = () => <div className='container'>Hello, world!</div>;

// Correct: Using double quotes
const Container = () => <div className="container">Hello, world!</div>;
```

8.  no-console:
```jsx
// Warning: console.log is used
const FetchData = () => {
  const data = fetch('https://api.example.com/data');
  console.log(data);
  return <div>Data: {data}</div>;
};

```

9. no-unused-vars:
```jsx
// Warning: Unused variable 'unusedVar'
const ExampleComponent = () => {
  const usedVar = 'Hello, world!';
  const unusedVar = 'I am not used';

  return <div>{usedVar}</div>;
};

```

10. object-curly-spacing:

```jsx
// Warning: Missing space inside curly braces
const person = {name: 'John', age: 30};

// Correct: Space inside curly braces
const person = { name: 'John', age: 30 };

```

11. operator-linebreak:
```jsx
// Warning: Operator is placed before the line break
const result = 1 + 2 ?
  'True' :
  'False';

// Correct: Operator is placed after the line break
const result = 1 + 2
  ? 'True'
  : 'False';

```
