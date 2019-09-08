---
title: '[SERVER]Apache 와 Nginx 그리고 Tomcat'
date: 2018-07-08 13:09:88
category: server
---

![img](https://t1.daumcdn.net/cfile/tistory/997A96405B0CD3290A)

## 웹 서버란?

    인터넷 상에서 웹 브라우저 클라이언트로부터 HTTP 요청을 받아들이고,
    HTML 문서와 같은 웹 페이지들을 보내주는 역할을 하는 프로그램
    간단히 말하면 HTTP 요청에 따라 서버에 저장되어 있는 적절한 웹페이지를 클라이언트에게 전달하는 것

대표적으로 `Apache` & `Nginx`

<br>

![img](https://t1.daumcdn.net/cfile/tistory/99D1243F5B0CD96C27)

`(2017년도 기반 가장많이사용하는 웹서버)`<br>
`nginx늘고 있는 추이`

<br>
<br>

## Apache란?

`Apache` 란 소프트웨어 단체 이름 <br>
아파치 서버는 오픈소스프로젝트 커뮤니티에서 만든 `http 웹서버`를 지칭하는 말<br>
`http 요청`을 처리할 수 있는 웹서버이고, <br>
`아파치 http 서버`는 http 요청을 처리하는 웹서버 <br>
클라이언트가 `GET POST DELETE` 등의 <br>
메소드를 이용 요청을 하면 결과를 돌려주는 기능 으로 아파치는 웹서버

<br><u></u>

## Nginx 란?

트래픽이 많은 웹사이트를 위해`확장성을 위해`<br>
설계한 `비동기 이벤트 기반구조`의 웹서버 소프트웨어일명,<br>
”더 적은 자원으로 더 빠르게 서비스”<br>
프로그램은 가벼움과 높은 성능을 목표로 만들어 졌으며,<br>
러시아의 프로그래머,이고르 시쇼브가 Apache의 C10K Problem(하나의 웹서버에 10,000개의<br>
클라이언트의 접속을 동시에 다룰 수 있는 기술적인 문제)를<br>
해결하기 위해 만든 `Event-driven`구조의 `HTTP`, `Reverser Proxy`,<br>
`IMAP/POP PROXY server`를 제공하는오픈소스 서버 프로그램

<br>
<br>

### 차이점

`Apache`

- 쓰레드 / 프로세스 기반 구조로 요청 하나당 쓰레드 하나가 처리하는 구조
- 사용자가 많으면 많은 쓰레드 생성, 메모리 및 CPU 낭비가 심함
- 하나의 쓰레드 : 하나의 클라이언트 라는 구조

`nginx`

- 비동기 Event-Driven 기반 구조.
- 다수의 연결을 효과적으로 처리가능.
- 대부분의 코어 모듈이 Apache보다 적은 리소스로 더 빠르게 동작가능

<br>
<br>

### [Nginx] 장점

#### 1. 보안

    앞 단의 nginx로 리버스 프록시로 사용하고  뒷단에는 WAS를 설치하여
    외부에 노출되는 인터페이스에 대해  Nginx WAS 부분만 노출 가능합니다.
    익명의 사용자가 직접적인 Web Server로의 접근을 한다라고 하면
    문제가 발생할 수 있기 때문에 직접적이지 않고
    한 단계를 더 거침으로써 보안적인 부분을 처리할 수 있다.

#### 2. Backend-service 장애 대응 처리

    Backend-service 에 대해 max fails, fail timeout시 백업 서버로 진입할 수 있도록 처리 가능

#### 3. 속도

    물론 더 빠르다.

### ..... 그리고

<br>
<br>

![](https://t1.daumcdn.net/cfile/tistory/99ECF5485B0CDB2E05)

<br>
<br>

## TOMCAT

Tomcat은 흔히 `WAS`라고 한다.

WAS : Web Application Service

      웹Server와 웹Container의 결합으로, 다양한 기능을 Container에 구현하여 다양한 역할을 수행할 수 있는 서버.
      웹컨테이너 : 클라이언트의 요청이 있을 때, 내부의 프로그램을 통해 결과를 만들어내고
      이것을 다시 클라이언트에게 전달.
      WAS 는 동적인 데이터를 처리하는 서버이기에 DB 와 연결되어 데이터를 주고 받는
      프로그램으로 데이터 조작이 필요한 경우는 WAS( tomcat) 이용

Why?
<br>
어떤 이유로 `Nginx(tomcat & nginx)` 사용하는가?

_code_

![](https://t1.daumcdn.net/cfile/tistory/99AD08475B0CDC4C06)

`위 그림은 Nginx 아키텍쳐 구조`
<br>
<br>
<br>

## [NGINX] 특징

- Module로 구성
- Event-driven 이면서 비동기 방식(Asynchronous)으로 동작
- Single-threaded(worker 프로세스)
- Non-blocking

<br>
## Focus
    중점적으로 봐야 할 부분은 새로운 요청이 들어오면 NGINX의 Worker
    프로세스 내부 listener가 요청을 받아 전달하고
    각 Worker 프로세스는 내부에서 효율적으로 처리한다.
    Worker 프로세스는 HTTP 요청과 응답을 처리하는 동안 계속해서
    listener를 통해 요청을 받고, 읽고, 쓰기를 반복한다.
    각 커넥션마다 프로세스와 쓰레드는 복제(fork)하지 않는다.
    따라서 부하가 증가하더라도 CPU/메모리 사용량이 크게 증가하지 않는다.

반면 아파치의 `Prefork MPM방식`은 기본적으로 요청 하나당 프로세스와 쓰레드 기반으로 동작한다.<br>
접속당 CPU와 메모리 사용이 증가하여`성능 저하`를 일으킬 수 있다.<br>
<br>
이를 극복하기 위해 2.4.X 버전부터 `event MPM 방식`이 기본 모듈로 추가되고 확장성과 성능향상을 위한 `proxy 모듈`이 추가되었지만,<br>
자원 사용 측면에서NGINX의 순수 `Event driven 서버`들과 비슷하다고 보기엔 어려움이 있다.<br>
