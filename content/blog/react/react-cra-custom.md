---
title: '[React] Custom CRA with Github Actions'
date: 2020-06-06 13:09:88
category: react
---

<br>

![img](./images/cra/cra.png)

프로젝트 초기 환경을 잡을때 어떻게 하시나요?

Scaffolding 도구인 Create-React-App Tool을 사용하거나, 처음부터 Webpack 설정을 할수도 있습니다.
그래서 초기 본인 자주 사용하는 CRA 프로젝트 환경 구조를 NPM에 배포해서 사용하는 방법에 대해 살펴보도록 하겠습니다.

## What?

- CRA?
- Template Make
- Deploy
- Template Use

### CRA?

facebook에서 만든 웹 개발용 boilerplate 쉽게 Getting Started 하기 쉽게 도와주는 템플릿입니다.

모든 webpack plugin과 loader를 설정해주며 기본적인 lint rule도 잡아주고, 또 TypeScript까지 정식으로 지원하니 굳이 따로 boilerplate을 만들 필요가 없을수도 있습니다. <br/>

> 결론적으로 필요한 자주 쓰는 modules 와 그 외 설정들을 직접해줘야 합나다. 또 매번 하기가 귀찮다는 점을 해소 하기 위해서 Custom CRA 를 만들어 보겠습니다.

### Template Make

Environment

- [TypeScript 3.8.x version](https://github.com/microsoft/TypeScript)
- [redux-toolkit](https://github.com/reduxjs/redux-toolkit)
- [react-redux 7.2.x](https://github.com/reduxjs/react-redux)
- [react-router](https://github.com/ReactTraining/react-router)
- [styled-components](https://github.com/styled-components/styled-components)
- [craco](https://github.com/gsoft-inc/craco)

#### 🤷🏻‍♂️craco는 무엇인가요?

쉽게 말하자면 Create React App Configuration Override 을 해주는 도구라고 생각하시면 좋을거 같습니다.

기본 CRA에서 Create React App Configuration Override 설정을 하는 eject가 있습니다.<br/>
하지만 제공해주는 eject에서도 결국 설정을 수정해야 하는 경우가 생깁니다.
그래서 특정 Override Config를 해주는 특정도구는 Eject보다 `Craco`라는 도구를 선택하였습니다.

**ROLE**

- babel plugin
- Webpack plugin

**[babel plugin을 추가하거나 Webpack plugin 추가 예시]** <br/>
기본사용법은 아래와 같습니다.

이번 Template 프로젝트에서는 아래와 같이 설정은 하지 않았지만 아래와 같은 여러 [craco plugin](https://github.com/gsoft-inc/craco/tree/master/recipes)을 제공합니다

```js
module.exports = () => {
  return {
    babel: {
      plugins: ['date-fns'],
    },
    webpack: {
      alias: {
        '@': resolve('src'),
      },
      plugins: [
        ...whenDev(() => [new BundleAnalyzerPlugin()], []),
        ...whenProd(
          () => [
            new CompressionWebpackPlugin({
              test: [
                /\.js(\?.*)?$/i,
                /\.css(\?.*)?$/i,
                /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/i,
              ],
            }),
          ],
          []
        ),
      ],
    },
    devServer: devServerConfig => {
      return {
        ...devServerConfig,
        proxy: [프록시설정],
      }
    },
    jest: {
      configure: {
        moduleNameMapper: {
          '^@/(.*)$': '<rootDir>/src/$1',
        },
      },
    },
  }
}
```

### Template Project

**구조**

```
├── .github
├── template 실제로 사용할 CRA 구조
├── package.json  npm 배포시 repository, keyword 설정,
├── README.md
└── template.json template moudlues 설정
```

**template.json**

템플릿을 사용할 때 필요한 모듈을 설정해놓는 파일

```json
{
  "dependencies": {
    "@craco/craco": "^5.6.4",
    "@reduxjs/toolkit": "^1.3.6",
    "@testing-library/jest-dom": "^5.7.0",
    "@testing-library/react": "^10.0.4",
    "@testing-library/user-event": "^10.1.2",
    "@types/jest": "^25.2.1",
    "@types/node": "^13.13.5",
    "@types/react": "^16.9.34",
    "@types/react-dom": "^16.9.7",
    "@types/react-redux": "^7.1.8",
    "@types/react-router": "^5.1.7",
    "@types/react-router-dom": "^5.1.5",
    "@types/styled-components": "^5.1.0",
    "styled-components": "^5.1.1",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-redux": "^7.2.0",
    "react-router": "^5.1.2",
    "react-router-dom": "^5.1.2",
    "react-scripts": "3.4.1",
    "typescript": "~3.8.3"
  },
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "lint": "eslint ."
  },
  "eslintConfig": {
    "extends": "react-app"
  }
}
```

**Template 폴더**

기본 폴더 구조

![img](./images/cra/cra3.png)

### Deploy with Github Action

**🤷🏻‍♂️Github Action이란?**<br/>
Github Action은 Github 저장소를 기반으로 소프트웨어 개발 Workflow를 자동화 할 수 있는 도구입니다.. 간단하게 말하자면 Github에서 직접 제공하는 CI/CD 도구라고 할 수 있다.

배포는 git Actions을 사용해서 NPM에 배포를 하겠습니다.
한번만 하고 싶다면 npm 배포만 하면 되지만 workFlow 자동화를 하기 위해서 Github Action 사용하였습니다.

#### Require

- [Github] GITHUB_TOKEN 개인 설정(토큰발급)
- [NPM] NPM_TOKEN 개인 설정(토큰발급)

> 토큰발급은 생략...

```yml
name: Deploy
on: [push]

jobs:
  publish:
    runs-on: ubuntu-latest
    name: Publish
    steps:
      - name: Checkout
        uses: actions/checkout@v1

      # https://github.com/cycjimmy/semantic-release-action
      - name: Semantic Release
        uses: cycjimmy/semantic-release-action@v2
        id: semantic
        with:
          branch: master
          extra_plugins: |
            @semantic-release/git
            @semantic-release/changelog
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}

      - name: Push updates to branch for major version
        # if there is a new version published, let's say v1.2.3
        # then this step will update branch "v1" to this commit
        if: steps.semantic.outputs.new_release_published == 'true'
        run: 'git push https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git HEAD:refs/heads/v${{steps.semantic.outputs.new_release_major_version}}'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

이렇게 github actions 까지 설정이 끝났다면 github에 commit push를 하면

workflows build 작동을 하는것을 github Actions에서 확인을 할수가 있습니다.
`Completed가 되었다면`
배포가 성공적으로 되었는지 확인을 해보겠습니다.
해당계정에 확인을 해보면 생겼다는 것을 확인할 수 있습니다.

### Template Use

Npm에 배포한 Custom CRA 실행을 해 보겠습니다.

![img](./images/cra/cra.gif)

기존 명령어와 크게 다르지 않습니다.
create-react-app [나의 템플릿 이름]

이렇게 사용한다면 좀더 편리하게 기본 설정을 할수 있지 않을까 생각이 듭니다.
이미 이렇게 사용하고 계시거나 보통 많이 boilerplate을 만들어서 사용할거라고 생각합니다.

추가적으로 Styles 관련, lib 파일 같은 경우에도 추가해서 사용하면 편리 할 것입니다.

## References

> - [https://www.npmjs.com/package/cra-template-songc](https://www.npmjs.com/package/cra-template-songc)
> - [https://github.com/s-ong-c/cra-template-songc#readme](https://github.com/s-ong-c/cra-template-songc#readme)
> - [https://github.com/facebook/create-react-app](https://github.com/facebook/create-react-app)
> - [https://jbee.io/react/react-1-development-environment-setup/](https://jbee.io/react/react-1-development-environment-setup/)
> - [craco](https://github.com/gsoft-inc/craco)
> - [https://github.com/semantic-release/semantic-release])https://github.com/semantic-release/semantic-release
> - [https://github.com/features/actions](https://github.com/features/actions)

### 🙏🏻감사합니다.
