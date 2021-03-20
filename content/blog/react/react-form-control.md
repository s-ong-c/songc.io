---
title: '[React] formik vs react hook form'
date: 2021-03-21 16:21:13
category: 'react'
---

![img](./images/form/form.jpg)

이 포스트에서는 form 상태관리를 하는 방법중에서 React-hook-form 과 Formik을 다루면서 두 라이브러리를 비교하는 글입니다.

> Form 상태를 다루기 위해서 어떤 것을 사용하고 선호하시나요?

<span class="dash" style="background-color: #f3bed366;color: #e83e8c; text-decoration: dashed"> Form 상태를 다루는 방법은 다양하게 있습니다.
</span>

- 기본적인 Controlled Components 사용하기
- React Context로 Form의 상태 관리하는 법
- formik
- react-hook-form
- redux-form

## 목차

- [React에서 기본 Form 다루기]
- [좋은 오픈소스 사용하기]
  - [Formik]
  - [React-hook-form]
- [Formik VS React-hook-form]

## React에서 기본 Form 다루기

Form 상태를 다루는 작업은 React로 개발할 때 많은 리소스가 들어가는 부분중 하나입니다.
React는 인터페이스의 동작을 제어하는 ​​데만 초점을 맞춘 미니멀 한 UI 라이브러리로, 사용자의 활동에 대한 응답으로 UI가 적절하게 변경되어야 합니다.

그래서 Controlled Components 를 사용하여 State 값을 상태로 저장하는 방법을 제공 합니다.

```tsx
<input
  type={type}
  name={name}
  autoComplete="off"
  onChange={onChange}
  value={value}
  placeholder={placeholder}
  onFocus={onFocus}
  onBlur={onBlur}
  disabled={disabled}
  {...rest}
/>
```

## 오픈소스 사용하기

Form 관련해서 직접 구현한다고 하면 구현해야 할 것이 단순히 상태관리 뿐만 아니라 `validation`,`form fields`, `error` 등 고려해야 하는 부분이 너무 많기 때문에 좋은 오픈소스를 이용해서 사용하겠습니다.

대표적으로 react-hook-form, formik 이 있습니다.

### formik

[formik.org](https://formik.org/docs/overview)

### react-hook-form

[formik.org](https://formik.org/docs/overview)
