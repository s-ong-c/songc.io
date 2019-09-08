---
title: '[React] Typescript React Hook 정복하기 '
date: 2019-8-29 16:21:13
category: 'react'
---

## 1. useState

useState 는 가장 기본적인 Hook 으로서, 함수형 컴포넌트에서도 가변적인 상태를 가질 수 있게 된다.<br> 함수형 컴포넌트에서 상태를 관리해야할때 이 `Hook(useState)` 을 사용

```js
import * as React from 'react'

const { useState } = React
interface CounterProps {}

const Counter: React.SFC<CounterProps> = props => {
  const [value, setValue] = useState(0)
  return (
    <div>
      <p>
        현재 카운터 값은 <b>{value}</b> 입니다.
      </p>
      <button onClick={() => setValue(value + 1)}>+1</button>
      <button onClick={() => setValue(value - 1)}>-1</button>
    </div>
  )
}

export default Counter
```

### 1-1 다중 useState 사용법

여러개면 여러개 선언해서 사용하면 된다.

```js
import * as React from 'react'

const { useState } = React
interface InfoProps {}
const Info: React.SFC<InfoProps> = props => {
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
  }
  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName} />
        <input value={nickname} onChange={onChangeNickname} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임: </b>
          {nickname}
        </div>
      </div>
    </div>
  )
}

export default Info
```

## 2. useEffect

useEffect 는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정 할 수 있는 Hook 입니다. 클래스형 컴포넌트의 componentDidMount 와 componentDidUpdate 를 합친것이라고 생각하면 될거 같다

> (vue에 mounted & computed 랑 비슷하다고 보면 될거 같아)

### 2-1 useEffect 적용하기

```js
import * as React from 'react';

const { useEffect, useState } = React;
interface InfoProps{}
const Info: React.SFC<InfoProps> = props => {
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    useEffect(() => {  // 마운트 하지 않아도 실행 하는 소스
        console.log('렌더링 완료 했다.');
        console.log({
            name, nickname
        })
    })
    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const onChangeNickname = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    }
  return ...

export default Info;
```

### 2-2 마운트 될때만 실행하고 싶다면

```js
useEffect(() => {
  // 마운트 하지 않아도 실행 하는 소스
  console.log('마운트 하고 싶을때만 실행한다..')
  console.log({
    name,
    nickname,
  })
}, [name])
```

### 2-3 특정 지정 값이 업데이트 될때 실행

아마도 componentDidUpdate

```js
 componentDidUpdate(prevProps, prevState) {
        if (prevProps.value !== this.props.value) {

        }
      }
```

hook 으로 작성시

```js
useEffect(() => {
  console.log({
    name,
    nickname,
  })
}, [name])
```

### 2-4 cleanup

> useEffect 렌더링 되고난 직후마다 실행된다, 두번째 파라미터 배열에 무엇을 넣느냐에 따라 실행되는 조건이 달라집니다.

사용자가 컴포넌트가 unmount 전이나, update 되기 전에 어떠한 작업을 수행하고 싶다면 useEffect 에서 뒷정리(cleanup) 함수를 반환해주어야 합니다.

```js
useEffect(() => {
  console.log()
  return (
    console.log('cleanup');
  )
})
```

## 3. useContext

```js
import * as React from 'react'

// 이 Hook 을 사용하면 함수형 컴포넌트에서 Context 를 보다 더 쉽게 사용 할 수 있다.
const { createContext, useContext } = React
const ThemeContext = createContext('black')
interface ContextSampleProps {}

const ContextSample: React.SFC<ContextSampleProps> = props => {
  const theme = useContext(ThemeContext)
  const style = {
    width: '24px',
    height: '24px',
    background: theme,
  }
  return <div style={style} />
}

export default ContextSample
```

## 4. useReducer

useReducer 는 useState 보다 컴포넌트에서 더 다양한 상황에 따라 다양한 상태를 다른 값으로 업데이트해주고 싶을 때 사용하는 Hook

Reducer는 현재 상태와 Update를 위해서 필요한 정보를 mutation에 담아서 actions 값에
변화된 상태를 반환하는 함수
새로운 상태를 만들때는 불변성 을 지켜서 사용

### Reducer Counter

```js
import * as React from 'react'

const { useReducer } = React
interface CounterProps {}
interface Action {
  type: String;
}
function reducer(state: any, action: Action) {
  // action.type 에 따라 다른 작업 수행
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 }
    case 'DECREMENT':
      return { value: state.value - 1 }
    default:
      return state
  }
}
const Counter: React.SFC<CounterProps> = props => {
  const [state, dispatch] = useReducer(reducer, { value: 0 })
  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b> 입니다.
      </p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
    </div>
  )
}

export default Counter
```

useReducer 을 사용했을 때의 가장 장점은 컴포넌트 업데이트 로직을 컴포넌트 외부로 꺼낼 수 있다

### 4-2 Input 관리

```js
import * as React from 'react'

const { useReducer } = React
interface InfoProps {}
interface Action {
  name: string;
  value: string;
}
function reducer(state: any, action: Action) {
  return {
    ...state,
    [action.name]: action.value,
  }
}
const Info: React.SFC<InfoProps> = props => {
  const [state, dispatch] = useReducer(reducer, {
    name: '',
    nickname: '',
  })
  const { name, nickname } = state
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target)
  }
  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChange} />
        <input name="nickname" value={nickname} onChange={onChange} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임: </b>
          {nickname}
        </div>
      </div>
    </div>
  )
}

export default Info
```
