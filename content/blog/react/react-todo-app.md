---
title: '[React] Todo-Application'
date: 2019-09-07 13:09:88
category: react
---

![todo cra image](./images/todoApp/react-redux.png)

> `👨🏻‍💻with react-hooks`

<style>
blockquote:before {
  content: "\201C";
  font-size: 3em;
  font-family: Georgia;
  color: #3eaf7c;
  float: left;
  margin: -10px 10px 0px -10px;

}
</style>

## `👨🏻‍💻Components 작성`

```s
$ create-react-app Todo --typescirpt
```

### 👇🏻만들어하는 컴포넌트

- Form.tsx
- TodoItem.tsx
- TodoList.tsx
- TodoTemplate.tsx

<b>Form</b><br>

- [할일을 작성하고 Submit Form 컴포넌트]

<b>TodoItem</b><br>

- [할일 리스트 렌더링 컴포넌트]<br>
- [`todo` 인지 `complete` 따른 toggle 기능]<br>
- [그리고 삭제 기능]

<b>TodoList</b><br>

- [Todos 정보가 들어있는 배열을 다수에 TodoItem로 렌더링]

<b>TodoTemplate</b><br>

- [Todo App 레이아웃을 설정 큰 틀 적용]

<h3>❗️1. Form.tsx❗️</h3>

```js
interface FormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (value: string) => void;
  value: string;
}

const Form: React.SFC<FormProps> = ({ onChange, onSubmit, value }) => {
  return (
    <FormBlock
      onSubmit={e => {
        e.preventDefault()
        onSubmit(value)
      }}
    >
      <input
        onChange={onChange}
        value={value}
        placeholder="오늘의 TODO LIST."
      />
      <button>Submit</button>
    </FormBlock>
  )
}
```

<h3>❗️2. TodoItem.tsx❗️</h3>

```js
import * as React from 'react'
import styled, { css } from 'styled-components'
import { MdDone, MdDelete } from 'react-icons/md'
interface TodoItemProps {
  onToggle: () => void;
  onRemove: () => void;
  title: string;
  status: string;
  visible: boolean;
}
const TodoItemBlock =
  styled.div <
  { visible: boolean } >
  `
    ...생략
  ${props =>
    props.visible &&
    css`
      display: none;
    `}
`

const Text =
  styled.div <
  { status: string } >
  `
 ...생략
  ${props =>
    props.status === 'complete' &&
    // complete 라면
    // {
    //     color: #ced4da;
    //   text-decoration: line-through;
    // }
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`

const CheckCircle =
  styled.div <
  { status: string } >
  `
    ...생략
  ${props =>
    props.status &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`
const Remove = styled.div`
  ...생략;
`
const TodoItem: React.SFC<TodoItemProps> = ({
  onToggle,
  status,
  title,
  onRemove,
  visible,
}) => {
  return (
    <TodoItemBlock visible={visible}>
      <CheckCircle status={status} onClick={onToggle}>
        {status === 'complete' ? <MdDone /> : ''}
      </CheckCircle>
      <Text status={status}>{title}</Text>
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  )
}

export default TodoItem
```

<h3>❗️3. TodoList.tsx❗️</h3>

```js
import * as React from 'react'
import styled from 'styled-components'
import TodoItem from './TodoItem'
import { Body } from '../modules/todo'

const TodoListBlock = styled.div`
  ... 생략;
`
interface TodoListProps {
  visible: boolean;
  todoItems: Body[];
  onVisible: () => void;
  onRemove(id: number): void;
  onToggle(id: number): void;
}
const TodoList: React.SFC<TodoListProps> = ({
  todoItems,
  onToggle,
  onRemove,
  visible,
  onVisible,
}) => {
  return (
    <TodoListBlock>
      <header>
        <h3>Todo App</h3>
        <button onClick={onVisible}>{visible ? '숨기기' : '보여줘'}</button>
      </header>
      {todoItems.map(todo => (
        <TodoItem
          visible={visible}
          key={todo.id}
          status={todo.status}
          onToggle={() => onToggle(todo.id)}
          onRemove={() => onRemove(todo.id)}
          title={todo.title}
        />
      ))}
    </TodoListBlock>
  )
}
export default TodoList
```

<h3>❗️4. TodoTemplate.tsx❗️</h3>

```js
import * as React from 'react'
import styled from 'styled-components'
import Form from './Form'

const TodoemplateBlock = styled.div`
  ...생략;
`
interface TodoTemplateProps {
  addTodoList: (todo: string) => void;
}
const { useState } = React
const MainTemplate: React.SFC<TodoTemplateProps> = ({
  addTodoList,
  children,
}) => {
  const [todo, setTodo] = useState('')
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
  }
  const onSubmit = (todo: string) => {
    addTodoList(todo)
    setTodo('')
  }
  return (
    <MainTemplateBlock>
      <div className="wrapper">
        <Form value={todo} onChange={onChange} onSubmit={onSubmit} />
      </div>
      <div className="contents">{children}</div>
    </MainTemplateBlock>
  )
}

export default TodoTemplate
```

## `👨🏻‍💻Redux Modules`

- 액션 타입
- 액션 생성함수
- 리듀서

```js
import { createStandardAction } from 'typesafe-actions';
import { createReducer } from '../lib/utils';

// actions 타입
/* 액션 타입 만들기 */
const BASIC = 'todo/BASIC';
const CREATE = 'todo/CREATE';
const REMOVE = 'todo/REMOVE';
const TOGGLE = 'todo/TOGGLE';


// action 함수 생성//
export const basic = createStandardAction(BASIC)<Body[]>();
export const create = createStandardAction(CREATE)<Body>();
export const remove = createStandardAction(REMOVE)<{ id: number }>();
export const toggle = createStandardAction(TOGGLE)<{ id: number }>();

type Basic = ReturnType<typeof basic>;
type Create = ReturnType<typeof create>;
type Remove = ReturnType<typeof remove>;
type Toggle = ReturnType<typeof toggle>;

// 상태  데이터 타입 정의
export interface TodoTypeParam {
  statusCode: number;
  body: Body[];
}

export interface Body {
  id: number;
  status: string;
  title: string;
}
export interface TodoState {
  todoItems: Body[];
  input: string;
  visible: boolean;
}

// 초기 상태 선언
const initialState: TodoState = {
  todoItems: [],
  input: '',
  visible: true,
};

// 리듀서 작성

const todo = createReducer<TodoState>(
  {
    [BASIC]: (state, action: Basic) => ({
      ...state,
      todoItems: action.payload,
    }),
    [CREATE]: (state, action: Create) => ({
      input: '',
      todoItems: [...state.todoItems, action.payload],
      visible: true,
    }),
    [REMOVE]: (state, action: Remove) => ({
      ...state,
      todoItems: state.todoItems.filter(todo => todo.id !== action.payload.id),
    }),
    [TOGGLE]: (state, action: Toggle) => ({
      ...state,
      todoItems: state.todoItems.map(todo => {
        if (todo.id === action.payload.id) {
          if (todo.status === 'complete') {
            todo.status = 'todo';
          } else {
            todo.status = 'complete';
          }
        }
        return todo;
      }),
    }),
  },
  initialState,
);

export default todo;

```

## `👨🏻‍💻Todo App`

![todo cra image](./images/todoApp/todo-App.png)
