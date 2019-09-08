---
title: '[React] Eslint & Prettier 적용하기'
date: 2019-8-20 16:21:13
category: 'react'
---

![eslint image](./images/eslintORprettier.png 'eslint prettier image')

## `Eslint & prettier' ?`

```
> eslint 는 EcmaScript 문법 검사를 해주는 도구 이면서 옵션을 선택적으로 적용 할수 있다.
> Prettier 는 코드를 규칙적으로 정리 및 자동화 해주는 도구
```

## `Eslint Setting`

> eslint 설치는 생략

[https://www.npmjs.com/package/eslint](https://www.npmjs.com/package/eslint)

👆🏻설치방법은 위 링크

### `.eslintrc file 생성`

```s
$ eslint --init
```

### 😅`eslint 문법을 어떤기준으로 적용할것인가?`

`basic` vs `popular`
<br>

> react eslint 가장 유명한 airbnb로 적용

```s
$ yarn add eslint-config-airbnb
```

`.eslintrc 파일`

```javascript
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb', // 대표 컨벤션 eslint airbnb
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/prefer-stateless-function': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-one-expression-per-line': 0,
    /*
      state, 메소드 없으면 class 형 컴포넌트 만들지 말고 stateless 컴포넌트로
      JSX 코드는 .jsx 확장자
      JSX 안에서 한 줄에 하나만 표현한다

      ❗️error off : 0 , warning 1,❗️
      */
  },
}
```

## `Eslint Ignore`

```js
ESLint 검사 무시하기
 serviceWorker.js
 같은 파일은 수정할 필요가 없기때문에
표현식 => /* eslint-disable */ 로 예외처리
```

## `Prettier Setting`

Prettier = 코드 포맷터
공통적으로 코드 정리를 하고자 할때

```s
$  yarn add eslint-config-prettier
```

`.prettirrc 파일`

```js
{
  "singleQuote": true,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80
}

👆🏻위 코드의 의미👆🏻

문자열을 사용 할 때에는 ' 를 사용
코드는 ; 로 끝나야합니다.
탭 대신에 스페이스를 사용
들여쓰기 크기는 2칸
객체나 배열을 작성 할 때, 원소 혹은 key-value 의 맨 뒤에있는 것에도 쉼표 붙인다
한 줄이 80칸이 까지

```

❗️추가적인 옵션은 [https://prettier.io/docs/en/options.html](https://prettier.io/docs/en/options.html)

## `package.json 적용`

> .eslintrc 에 말고 package.json 적용하기

```json
{
  "name": "react-basic",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "eslint-config-prettier": "^6.1.0",
    "react": "^16.9.0",
    "react-dom": "^16.9.0",
    "react-scripts": "3.1.1"
  },
  "scripts": {
      ...생략
  },
  "eslintConfig": {
    "extends": [
      "airbnb",
      "prettier"
    ],
    "rules": {
      "react/prefer-stateless-function": 0,
      "react/jsx-filename-extension": 0,
      "react/jsx-one-expression-per-line": 0
    }
  },
  },
  "browserslist": {
      ...생략
    "development": [
     ...생략
    ]
  },
  "devDependencies": {
      ... 생략
  }
}

```

## Refer

> - [https://github.com/prettier/prettier](https://github.com/prettier/prettier)
> - [https://eslint.org/](https://eslint.org/)
> - [velopert 블로그](https://velog.io/@velopert/eslint-and-prettier-in-react)
