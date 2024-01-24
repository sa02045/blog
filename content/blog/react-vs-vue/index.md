---
title: 'Vue에서 React보다 만족했던 개발자 경험 3가지'
date: '2024-01-21'
description: '1. template 2. useCallback, useMemo, 3. SFC'
---

## 들어가며

React

## 1. JSX vs template

React는 JSX로 마크업을 작성하고 Vue는 template 문법으로 마크업을 작성합니다. JSX, template 문법 모두 HTML-like 마크업을 작성할 수 있기 때문에 HTML을 이미 학습한 개발자라면 추가적인 학습 없이도 사용할 수 있습니다.

두 문법 모두 HTML처럼 보이지만 실제로는 가상 DOM을 생성하는 JavaScript 코드로 트랜스파일링된다는 공통점이 있습니다. JSX는 Babel 같은 트랜스파일러에 의해 React.createElement()로 변환되고 Vue template는 렌더 함수로 변환됩니다.

비슷한 역할을 하는 두 문법이지만 template가 더 나은 개발자 경험을 제공하는 경우가 있습니다. JSX에 비해 template은 추가 기능이 많다고 할까요? `디렉티브` `필터`등의 기능을 제공합니다.

이러한 차이점은 `조건부 렌더링`을 해야하는 경우에 더욱 두드러집니다. React에서는 JSX 내부에서 삼항 연산자를 사용하거나 `===` 연산자 또는 `&&` 연산자를 사용하여 조건부 렌더링을 합니다. 명확히 어떤 방법을 사용해라라는 일관성도 떨어지고 가독성도 떨어집니다.반면 Vue에서는 `v-if` `v-else` `v-else-if` 빌트인 디렉티브를 사용하여 직관적인 조건부 렌더링을 수행할 수 있습니다.

간단한 조건부 렌더링이라면 차이점을 느끼기 어렵지만 `중첩 조건부`거나 복잡한 조건부 렌더링이라면 template이 더 나은 개발자 경험을 제공한다고 생각합니다. JSX 조건부 렌더링은 조금만 복잡해져도 가독성이 최악으로 떨어집니다.

하지만 template의 강력한 기능들도 양날의 검이 될 수 있습니다. 버전이 바뀌거나 개발 트렌드가 변화하여 template 문법의 변화가 생기는 경우 마이그레이션 비용이 발생합니다. 예를 들어 Vue 2에서는 template 문법에 `필터` 기능을 제공했지만 Vue 3에서는 더 이상 제공하지 않습니다. 반면에 JSX는 부가적인 기능이 없는만큼 변화가 적습니다. 특히 React와 독립적인 문법이기 때문에 React 버전이 바뀐다고 해서 JSX 문법이 바뀌는 경우는 드뭅니다.

## 2. useCallback? useMemo? 필요 없어요

## 3. SFC(Single File Component) 컴포넌트 관심사 분리
