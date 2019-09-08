---
title: '[JS] ES6-let const'
date: 2018-7-10 16:21:13
category: 'JS'
---

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZQDfcv4WVz-yyJJNhDs4cuyKju7OuSkA4gaj9D2BXYVPvhSIqBw)
{: .text-center }

# ECMAScript(ES) 란?

CMAScipt의 약자로 쉽게 말해 표준화된 스크립트 프로그래밍 언어이다.
자바스크립트는 ECMAScript를 따르며 확장 기능을 가진 스크립트라 할 수 있으며
EMCA-262 기술 규격에 의해 정의된 표준화 스크립트 프로그래밍 언어 이다.

## !!!!!!!!

자바스크립트(JavaScript)는 스크립트 언어(script language)이다
자바스크립트를 해석하고 실행하는 소프트웨어는 브라우저이다.

기존 자바스크립트의 변수는 기본적으로`Function Scope`입니다(var로 선언한 변수).
변수의 유효범위가 함수단위
. java는 ->Function Scope가 아닌 Block Scope 가진다.
(이미 불편함에 ES6부터는 const와 let이 등장했습니다.

그래서-> const와 let은 Block Scope를 가집니다.
{: .text-center }

<br>

<br><u></u>

## 변수 선언실행순서

    1.선언 단계(Declaration phase)
    변수 객체(Variable Object)에 변수를 등록한다.
    변수 객체는 스코프가 참조할 수 있는 대상이 된다.
    2.초기화 단계(Initialization phase)
    변수 객체(Variable Object)에 등록된 변수를 메모리에 할당한다. 이 단계에서 변수는 undefined로 초기화된다.
    3.할당 단계(Assignment phase)
    undefined로 초기화된 변수에 실제값을 할당한다.

### var 문제점

1.함수 레벨 스코프(Function-level scope)

- 전역 변수의 남발
- for loop 초기화식에서 사용한 변수를 for loop 외부 또는 전역에서 참조할 수 있다.

  2.var 키워드 생략 허용

  - 의도하지 않은 변수의 전역화

    3.중복 선언 허용

- 의도하지 않은 변수값 변경

  4.변수 호이스팅

- 변수를 선언하기 전에 참조가 가능하다.

```js
//ES5 code :: var>>
console.log(foo) //undefined
var foo
console.log(foo) //undefined
foo = 123
console.log(foo) //123
```

블록 레벨 스코프를 지원하지 않는 var 키워드의 특성상, 코드 블록 내의 변수 foo는 전역변수이다.
그런데 이미 전역변수 foo가 선언되어 있다.
var 키워드를 사용하여 선언한 변수는 중복 선언이 허용되므로 위의 코드는 문법적으로 아무런 문제가 없다.

ES6는 **블록 레벨 스코프**를 갖는 변수를 선언하기 위해 `let` 키워드를 제공한다.

### let vs const

#### 1.let

`블록 레벨 스코프(Block-level scope)`

- 코드 블록 내에서 선언된 변수는 코드 블록 내에서만 유효하며 코드 블록 외부에서는 참조할 수 없다.

`중복 선언 금지`

- let 변수는 이름이 같은 변수를 중복해서 선언하면 문법 에러(SyntaxError)가 발생한다.
- let으로 정의된 변수는 같은 블록에서 재할당될 수는 있지만 재정의는 될 수 없다.

`호이스팅(Hoisting)`
!!! 호이스팅이 안된다고 아는 사람이 많은데 `호이스팅가능`
자바스크립트는 ES6에서 도입된 let, const를 포함하여 모든 선언(var, let, const, function, function\*, class)을 호이스팅한다.
let은 유효범위의 시작에서부터 선언될 때까지 temporary dead zone(일시적 사각지대)에 있다.
이 dead zone에서 사용하게 되면 ReferenceError가 발생한다.

```js
function scope(){
  var a=5;

  if(true){
    let a=3;
    console.log(a); // a=3;
  }
  console.log(a);  // a= 5;
}
scope();


var foo =123; //var 중복가능
var foo =111;

let voo = 111;   중복선언 금지
let voo = 222; //Uncaught SyntaxError
```

#### 2.const

const 키워드는 상수라고 불리는 읽기 전용 변수를 생성하는 키워드이다.
한 번 할당되면, 상수는 새로운 값으로 할당될 수 없다.
명시적으로 변경을 시도해도 바뀌지 않는다.
const 로 정의된 변수는 초기에 정의할 때, 반드시 값을 할당해줘야 한다.
그렇지 않으면 Syntax Error가 발생하게 된다. c

-예제-

```js
const foo =123;
foo =111; // TypeError: Assignment to constant variable

const foo; // ->선언과 할당이 동시에 이루어져야 한다.
          // SyntaxError : Missing initializer in const

{
  const voo =10;
  console.log(voo); //10
}
console.log(voo); // ReferenceError : voo is not defined
//const도 let 처러 블록 레벨 스코프를 갖는다.
```

{: .box-error }
ES6이라면? <br>
ES6를 사용한다면 var 키워드는 사용하지 않는다.
재할당이 필요한 변수에는 let을 사용한다.
변경이 발생하지 않는(재할당이 필요 없는) 기본자료형 변수와 객체형 변수에는 const를 사용한다.
