---
title: "Chunk load error (1) 문제이해편"
date: "2023-12-10"
description: "SPA에서 발생하는 Chunk load error에 대한 이야기"
---

## SPA

`Ajax`의 등장으로 웹페이지의 전체를 다시 로드하지 않고도 부분적으로 화면을 그릴 수 있는 `CSR`(Client Side Rendering) 방식이 등장했습니다. CSR를 극대화한 방법으로 단 하나의 페이지만으로 어플리케이션을 구성하는 `SPA`(Single Page Application)가 있습니다.

SPA는 일반적으로 `하나의 페이지`(index.html)와 `하나의 JS`(index.js)로 구성됩니다. 브라우저는 아래와 같이 구성된 index.html을 파싱하고 index.js를 다운로드 받아서 실행합니다.

```html
<html>
  <body>
    <div id="app"></div>
    <script src="index.js"></script>
  </body>
</html>
```

하나의 JS를 구성하기 위해서 실제로는 개발을 할 때는 여러 파일로 나누어서 개발을 하고, 배포를 할 때는 하나의 파일로 합칩니다. **webpack**, **rollup**과 같은 빌드 도구는 쉽게 여러 개의 파일을 하나의 파일로 합치는 기능을 제공합니다.

"여러 파일을 합쳐 하나의 파일을 사용한다"라는 방법은 작은 규모의 어플리케이션에서는 어느정도 잘 동작합니다. 하지만 **어플리케이션의 규모가 커지면 커질수록 문제가 발생합니다.**

## Code splitting

어플리케이션의 규모가 점점 커지고 파일의 크기가 커지면 초기 화면을 렌더링하는데 시간이 걸리게 되고 사이트를 사용하는 사용자 경험에 악영향을 미칩니다.

브라우저에게 있어서 대부분의 비용은 자바스크립트를 파싱하고 실행하는데 들기 때문에 자바스크립트 번들 사이즈는 사이트 성능에 큰 영향을 미칩니다. 단순히 번들 사이즈가 크다고 해서 다운로드 시간이 느려지는 것 뿐만 아닙니다.

이러한 문제를 해결하기 위한 최적화 방법 중 하나는 `Code splitting`입니다. 하나의 커다란 JS 파일을 `여러 개의 작은 JS 파일로 나누어서 필요할 때 다운로드 받아서 실행하는 방법`입니다.

<img src="https://github.com/sa02045/omoji/assets/50866506/8589e655-71af-40e5-bfc2-c6d98ad7cc6b" width="500" alt="chunk"/>

이렇게 여러 파일로 잘게 나누면 초기 화면을 렌더링하는 index.js의 크기가 줄어들어서 화면을 로딩하는 시간을 줄일 수 있습니다.

chunk의 크기는 어느정도가 적당한 크기일까요? vite는 다음과 같이 **chunk 하나의 크기를 500kib(키비바이트)를** 권장하고 있습니다.

<img width="500" src="https://github.com/sa02045/omoji/assets/50866506/d5cf2868-c67d-4967-8fbc-c6c8875e9db0">

## Cache, Hash

이때까지 하나의 JS로 구성된 SPA, 그리고 SPA의 성능 문제를 해결하기 위한 Code splitting에 대해 알아보았습니다.

잠시 주제를 바꿔서 또다른 웹 성능 최적화 방법인 `HTTP Cache`에 대해 알아보겠습니다. 사이트를 사용하기 위해 동일한 내용의 파일을 매번 다운로드 받는 것은 비효율적입니다. 브라우저는 이를 해결하기 위해 HTTP Cache를 활용하여 이미 다운로드 받은 파일을 재사용합니다.

<img width="500" src="https://github.com/sa02045/omoji/assets/50866506/45006974-65d5-4450-b725-ffb30bfdf65e"/>

- 브라우저는 로컬에 이미 캐싱된 파일이 존재한다면 서버로 파일을 요청하지않고 캐싱한 파일을 사용합니다.

그런데 만약 서버의 index.js의 내용이 변경되었다면 어떻게 될까요? 서버에는 새로운 버전의 index.js가 배포되었지만, 브라우저는 이를 모르고 로컬에 캐싱된 index.js를 사용하게 되는 문제가 발생합니다.

이를 해결하기 위해 index.js의 내용이 변경될 때마다 파일명에 hash 문자열을 추가하여 파일의 내용이 변경되었음을 알려주는 방법을 사용합니다. 대부분의 빌드 도구에서 기본값으로 production 환경으로 빌드시 파일명에 hash 문자열을 포함시킵니다.

```js
index.zxck918jvh.js;
```

이렇게 해시를 이용해 파일의 내용이 변경되었음을 알려주면 브라우저는 캐싱된 파일을 사용하지 않고 서버에서 새로운 파일을 다운로드 받아서 사용합니다.

```html
<html>
  <body>
    <div id="app"></div>
    <script src="index-new.js"></script>
  </body>
</html>
```

정리하면 다음 프로세스를 거칩니다.

1. 브라우저는 매번 서버에 index.html을 요청합니다. (index.html은 캐싱하지 않습니다.)
2. index.html을 파싱하여 index-hash.js가 브라우저에 캐싱된 파일인지 확인합니다.
3. index-hash.js가 캐싱된 파일이라면 서버에 요청하지 않고 캐싱된 파일을 사용합니다.
4. index-hash.js가 캐싱된 파일이 아니라면 서버에 새롭게 파일을 요청하여 다운로드 받습니다.

<img src="https://github.com/sa02045/omoji/assets/50866506/5f8be949-ec5f-4440-afc5-6491d7ef3bb0" width="500" />

## Chunk load error

서론이 길었습니다. 이제 진짜 주제로 돌아와서 Chunk load error에 대해 알아보겠습니다.

앞에서 알아본 code splitting과 Http Cache와 Hash를 `함께 사용`하면 다음과 같은 `존재하지 않는 chunk 파일을 요청하는 문제`가 발생할 수 있습니다. 에러가 발생할 수 있는 시나리오를 살펴보겠습니다.

## Chunk load error 시나리오

다음과 같은 상황을 가정하겠습니다.

- 사용자가 처음으로 사이트에 방문한 상황입니다. (즉, 브라우저 캐시가 존재하지 않습니다.)
- 어플리케이션은 index-1.js와 하나의 chunk-A.js로 구성되어 있습니다.(가독성을 위해 hash 문자열은 간단히 표현하겠습니다.)

  <img height="200" src="https://github.com/sa02045/omoji/assets/50866506/cbd1afc0-e6f1-4ba4-90c9-cc60bf2207e0"/>

### 1. 사용자는 사이트에 접속하면 index-1.js를 요청합니다.

<img width="500" src="https://github.com/sa02045/omoji/assets/50866506/f8c800e9-bbaa-435a-950a-02e84ef5fd55"/>

- 아직 클라이언트는 chunk-A.js는 요청하지 않은 상태입니다.
- 필요할 때 chunk-A.js를 요청하기 위해서 index-1.js는 chunk-A.js의 위치를 알고 있습니다.
- 즉, 사용자가 가지고 있는 index-1.js는 `chunk-A.js를 바라보고 있습니다.`

<br/>

**그런데 사용자가 사이트를 열심히 사용하고 있는 이순간 개발자가 chunk-A.js에 심각한 버그를 발견하게 됩니다.**

곧바로 수정을 위해 chunk-A.js를 수정하고 새로운 버전의 chunk-B.js를 배포합니다. (이때 index hash 문자열도 변경됩니다.)

중요한 점은 사용자는 여전히 index-1.js를 사용하면서 사이트를 사용하는 중이라는 것입니다.

### 2. 새로운 버전의 chunk-B.js를 배포됩니다.

<img src="https://github.com/sa02045/omoji/assets/50866506/34276074-3dd2-4f1d-b33c-faaadadbe87c" width="500"/>

사용자가 새로고침이나 사이트를 다시 접속하지 않는 이상 index-1.js를 사용합니다. SPA로 동작하기 때문입니다.

`그런데 이때 chunk-A.js를 요청하면 어떻게 될까요?` 여전히 index-1.js는 chunk-A.js를 바라보고 있기 때문에 chunk-B.js 대신 chunk-A.js를 요청합니다.

### 3. 사용자가 chunk-A.js를 요청하지만 서버에 chunk-A.js는 존재하지 않습니다.

<img src="https://github.com/sa02045/omoji/assets/50866506/07e72bb2-5cc9-4680-864d-94d9ff8e18ff" width="500"/>

존재하지 않는 chunk-A.js를 요청했기 때문에 chunk를 load하는데 실패하고 에러가 발생합니다.

만약 chunk가 페이지라면 페이지를 렌더링하는데 실패하기 때문에 서비스 사용에 불편함을 느낄 것입니다.

## 해결 방법?

이렇게 SPA를 여러 파일로 나누기 위한 Code splitting과
캐싱을 위해 Hash를 함께 사용하면 발생할 수 있는 문제에 대해 알아보았습니다.

만약 배포 주기가 짧아 hash 문자열이 자주 변경되고, 사용자가 새로고침 없이 한번에 사이트 접속하는 시간이 길다면 이러한 문제가 발생할 확률이 높습니다.

그렇다면 이러한 문제는 어떻게 해결할 수 있을까요? 캐시를 포기하고 hash 문자열을 제거하면 될까요? 아니면 chunk로 나누는 것을 포기하면 될까요?

**해결편**에서 계속해서 알아보겠습니다.
