---
title: 'UX 디테일 챙기기 - 사용자에게 올바른 가상 키보드 보여주기'
date: '2024-04-26'
description: 'inputmode 속성 사용하기'
---

웹 프론트엔드 개발자가 가져야할 역량 중 하나는 사용자에게 좋은 사용자 경험을 제공하는 것입니다. 항상 스스로가 서비스 기능을 사용하는 최초의 사용자가 되어 사용자 경험을 높이는 방법을 고민해야 합니다.

| 이 글에서는 사소한 디테일로 사용자 경험을 향상시킬 수 있는 방법을 소개합니다.

## 터치 피로감을 줄이는 올바른 가상 키보드 보여주기

혹시 모바일 웹 사이트를 사용하면서 숫자를 입력하려고 할 때 한글 키보드가 나타나는 경험을 해본 적이 있으신가요?

예를 들어 아래와 같이 **금액을 입력해야하는데 한글 키보드**가 나타나는 경우입니다.

<img src="https://github.com/sa02045/blog/assets/50866506/9dcdd0bf-cd80-46cf-823f-5339b5989dfe" width="200" alt="inputmode example"/>

아마 한 번쯤은 경험해보셨을 겁니다. 그리고 다시 입력을 위해 키보드 전환을 해야하는 번거로움을 느끼셨을 것입니다.

사용자가 올바른 키보드로 전환을 하기위한 과정은 다음과 같습니다.

1. _잘못된 키보드임을 인지하고 올바른 키보드가 무엇인지 파악합니다._
2. _키보드 전환을 위한 버튼을 탐색합니다._
3. _전환 버튼을 터치하여 키보드를 전환합니다._
4. _이제서야 비로소 기능을 수행할 입력을 시작합니다._

이 과정에서 사용자는 알게 모르게 무의식적인 피로감을 느끼게 됩니다. 그리고 사용자가 원하는 기능을 수행하는 데에 있어서 **느린 속도로 진행된다는 인상**을 받게 됩니다.

만약 여러 입력을 연속적으로 해야하는 경우 **매 번 입력마다 키보드 전환**을 해야한다면 사용자는 더욱 불편함을 느낄 것입니다.

이런 불편함을 해결하기 위해서 inputmode 속성을 활용한 UX 디테일을 챙길 수 있어야 합니다.

## inputmode 속성

HTML **input 태그의 inputmode 속성**을 활용하면 모바일 환경에서 가상 키보드의 종류를 지정할 수 있습니다.

```html
// ex. 숫자 입력이 편한 키보드를 보여줍니다.

<input type="text" inputmode="numeric" />
```

inputmode 속성이 가질 수 있는 값은 총 8가지입니다. ([HTML Spec](https://html.spec.whatwg.org/multipage/interaction.html#attr-inputmode))

1. **none** : 키보드를 보여주지 않습니다. 주로 자체적으로 커스텀 키보드를 사용하는 경우에 사용합니다.
2. **text**(기본값) : 일반 텍스트를 입력할 수 있는 키보드를 보여줍니다.
3. **tel** : 전화번호를 입력할 수 있는 키보드를 보여줍니다.
4. **url** : URL을 입력할 수 있는 키보드를 보여줍니다.
5. **email** : 이메일을 입력할 수 있는 키보드를 보여줍니다.
6. **numeric** : 숫자를 입력할 수 있는 키보드를 보여줍니다.
7. **decimal** : 소수점을 입력할 수 있는 키보드를 보여줍니다.
8. **search** : 검색을 위한 키보드를 보여줍니다.

기본값인 `text`를 사용하게 되면 **유저가 설정한 시스템 언어 설정**을 기반으로 키보드를 보여줍니다. 시스템 설정 언어를 한국어로 설정한 경우 한글 키보드가 보여지고 영어로 설정한 경우 영어 키보드가 보여집니다.

## 예시와 함께 핵심 키보드 유형 확인하기

전체적인 키보드의 배치는 비슷하겠지만 OS마다 버튼의 유무와 배치와 같은 디테일은 조금씩 다를 수 있다는 것을 염두해두시면 좋습니다. (iOS 기준)

자주 사용되는 사례와 함께 어떤 키보드 유형이 있는지 알아보겠습니다.

### 1. 검색

```html
<input inputmode="search" />
```

<img src="https://github.com/sa02045/blog/assets/50866506/29079afe-68ed-4848-9727-4de4fbe08c90" width="200"/>

inputmode 속성을 "search"로 설정하면 검색을 위한 키보드를 보여줍니다. 기본 키보드와 차이점은 검색을 위한 버튼이 추가된 것입니다.

iOS에서는 기존 버튼이 사라지고 `이동` 버튼이 추가되면서 **검색버튼이 강조**됩니다. 버튼 색상도 파란색으로 변경되었음을 알 수 있습니다. _사용자가 검색을 하고 있다는 것을 더욱 명확하게 인지할 수 있습니다._

### 2. 이메일 입력

```html
<input inputmode="email" />
```

<img src="https://github.com/sa02045/blog/assets/50866506/fe25fa69-c86b-493e-86ba-46ab9afc9c43" width="200" alt="email"/>

회원가입등에서 자주 사용되는 이메일 입력입니다. inputmode 속성을 "email"로 설정하면 이메일을 입력할 수 있는 키보드를 보여줍니다. `@` 버튼이 추가되어 더욱 편리하게 입력할 수 있습니다.

### 3. 숫자입력

```html
<input inputmode="numeric" />
```

<img src="https://github.com/sa02045/blog/assets/50866506/8e7eec31-92c8-43ff-9664-6a7af4282743" width="200" alt="numeric"/>

"카드번호"나 "금액"과 같이 숫자를 입력해야하는 경우 inputmode 속성을 "numeric"으로 설정하면 숫자를 입력할 수 있는 키보드를 보여줍니다.

숫자 입력을 받는다고 하면 대부분 input 태그의 `type="number"`로 설정하는 경우가 많습니다. 하지만 특정 케이스를 제외하면 숫자 입력이라고 해도 `type="text"`로 설정하는 것이 좋습니다.

type="number"로 설정하게 되면 숫자뿐만 아니라 문자도 포함하는 가상키보드를 보여주게 됩니다. 또한 **type="number"는 위와 같이 카드번호 입력와 같은 예시에는 적합하지 않습니다.** type="number"를 사용하면 "위","아래" 버튼을 보여주는 인터페이스가 생깁니다. 이 인터페이스를 제거하기 위해서는 추가적인 작업이 필요한데요. 따라서 사용자가 "위", "아래" 버튼을 통해 숫자를 입력하는 경우가 아니라면 type="number"는 사용하지 않는 것이 좋습니다.

### 4. url 입력

```html
<input inputmode="url" />
```

<img src="https://github.com/sa02045/blog/assets/50866506/3482e78f-bede-4b34-b117-e7b9df17ab7b" width="200" alt="url"/>

url을 입력할 때 inputmode 속성을 "url"로 설정하면 url을 입력할 수 있는 키보드를 보여줍니다. url을 입력할 사용되는 `.com`, `/` , `.`과 같은 버튼이 추가되어 더욱 편리하게 입력할 수 있습니다.

이외에도 `tel`, `decimal` 등 다양한 inputmode 속성을 사용하여 사용자가 편리하게 입력할 수 있는 키보드를 보여줄 수 있습니다.

## 요약하면

- 불필요한 터치를 줄여 터치 피로감을 줄이는 것은 사용자 경험을 향상시키는 중요한 요소입니다.
- 따라서 좋은 사용자 경험을 위해 **상황에 맞는 가상 키보드**를 보여주는 것이 중요합니다.
- input 태그의 **inputmode** 속성을 사용하면 모바일 환경에서 가상 키보드의 종류를 지정할 수 있습니다.
- 숫자 입력의 경우에도 **type="number" 보다는 type="text"로 설정**하고 inputmode="numeric"을 사용하는 것이 좋습니다.