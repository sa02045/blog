---
title: 'TypeScript 5.5 기능 Type Predicate Inference 미리보기'
date: '2024-03-17'
description: '이제 Type Predicates가 필요없을 수도'
---

타입스크립트로 작성된 오픈소스 코드를 보다보면 다음과 같은 코드를 종종 볼 수 있습니다.

다음은 [react-hook-form](https://github.com/react-hook-form/react-hook-form/blob/00ce24a0a3fc25c98606f673d79ae90c6d3de81a/src/utils/isObject.ts#L4) 프로젝트 코드 중 일부입니다.

```ts
export const isObjectType = (value: unknown): value is object => typeof value === 'object';
```

이 코드에서

```ts
value is object
```

는 무엇일까요? 이것을 `타입 서술어`(Type Predicate)라고 부릅니다.

**그런데 타입스크립트 5.5버전 부터는 아마 이러한 타입 서술어가 필요없을 수도 있습니다.**

타입스크립트 [#57465](https://github.com/microsoft/TypeScript/pull/57465) PR에서 함수의 타입 서술어를 자동으로 유추하는 기능이 추가되었기 때문입니다.

개인적으로 예전부터 불편하다고 생각했던 부분 중 하나였는데 이 기능이 추가되면 코드를 작성할 때 더 편해질 것 같습니다.

타입스크립트 5.0 버전이 나온지가 얼마 되지 않은 것 같은데 시간이 정말 빠르게 흘러가는 것 같습니다. 5.4 버전이 이미 릴리즈 되었고 곧 나올 5.5 버전을 앞두고 있는데요.

이번 글에서는 `타입 좁히기`, `타입 술어`, 그리고 추가될 `타입 술어 추론` 기능에 대해 알아보겠습니다.

## 1. 타입 좁히기(Type narrowing)

먼저 타입 좁히기에 대해 알아보겠습니다.

타입스크립트에서 타입 좁히기란 **어떤 변수에 대해 정확한 타입으로 결정하는 것을 타입 좁히기라고 합니다.**

코드를 작성하다보면 어떤 변수의 타입을 정확하게 알 수 없는 경우가 있습니다.

변수가 숫자 타입이거나 문자열 타입이거나 하는 경우처럼요. 이럴 때 타입스크립트는 타입 좁히기로 타입을 단 하나로 결정할 수 있습니다.

```ts
function foo(bar: number | string) {
  bar; // 여기서 number | string 타입

  if (typeof bar === 'number') {
    return bar.toFixed(2); // bar의 타입이 number로 좁혀졌으므로 toFixed 메서드를 사용할 수 있음
  } else {
    return bar.toUpperCase(); // bar의 타입이 string으로 좁혀졌으므로 toUpperCase 메서드를 사용할 수 있음
  }
}
```

아래와 같이 `타입 가드`라고 부르는 검사를 통해 여러 타입을 가지는 `bar`의 타입을 하나로 결정할 수 있습니다.

```ts
// 타입 가드
if (typeof bar === 'number')
```

변수가 외부에서 오는 경우거나 사용자의 입력에 따라 동적으로 변하는 경우에 필요한 기능으로 타입 가드를 사용하여 **타입을 구체화하고 결정하는 과정을 타입 좁히기라고 부릅니다.**

## 2. 타입 좁히기를 함수로 작성하기

그런데 동일한 타입 좁히기를 매번 반복해서 작성하는 것은 번거롭습니다. 지금은 단순하게 `number` 타입인지 `string` 타입인지만 확인하고 있지만 프로젝트에 따라 복잡한 타입을 확인해야 할 때도 있기 때문입니다.

그래서 반복을 피하기 위해 타입 좁히기를 다음과 같이 함수로 작성할 수 있습니다.

```ts
function isNumber(bar: unknown) {
  return typeof bar === 'number';
}
```

그렇다면 이제 타입 좁히기 코드를 함수로 작성했으니 아까 작성했던 `foo` 함수에 `isNumber` 함수를 적용해볼까요? 과연 잘 작동할까요?

```ts
function foo(bar: number | string) {
  if (isNumber(bar)) {
    return bar.toFixed(2); // error) 'string | number' 형식에 'toFixed' 속성이 없습니다.
  } else {
    return bar.toUpperCase();
  }
}
```

안타깝게도 타입스크립트는 `isNumber` 함수를 통해 타입을 좁히지 못합니다 😢.

isNumber()로 검사를 이미 했음에도 bar의 타입을 `string | number`으로 알고있네요.

함수로 작성했기 때문에 타입스크립트가 추론하지 못하는 상황입니다. 이런 경우를 해결하기 위해서는 `타입 서술어`를 사용해야 합니다.

## 3. 타입 서술어(Type Predicate)

타입 서술어는 직접적으로 타입을 제어하는 방법입니다. 타입 서술어는 `parameterName is Type` 형태로 작성하며 `parameterName`는 함수의 매개변수 이름이고 `Type`은 서술하고자 하는 타입입니다.

위에서 정의한 isNumber 함수를 타입 서술어를 추가하여 다시 작성하면 다음과 같습니다

```ts
function isNumber(bar: unknown): bar is number {
  return typeof bar === 'number';
}
```

잘 동작하는 것을 확인할 수 있습니다 🙌 이제 타입스크립트는 정확하게 타입을 좁힐 수 있습니다.

```ts
function foo(bar: number | string) {
  if (isNumber(bar)) {
    return bar.toFixed(2); // bar의 타입이 number로 좁혀졌으므로 toFixed 메서드를 사용할 수 있음
  } else {
    return bar.toUpperCase(); // bar의 타입이 string으로 좁혀졌으므로 toUpperCase 메서드를 사용할 수 있음
  }
}
```

## 4. 타입 서술어의 문제점

그런데 말이죠. 타입 서술어를 사용하면 단점이 2가지 정도 있습니다. 사소할 수 있지만 휴먼 에러가 충분히 발생할 수 있는 부분이죠.

첫 번째 단점은 번거롭다는 점입니다. 단지 함수로 작성했을 뿐인데 타입 서술어를 추가해야 하는 번거로움이 있습니다. 몇 자 추가하는 정도이기 때문에 큰 문제는 아니지만 여러 함수에 적용해야 한다면 번거로울 수 있습니다.

**두 번째 단점은 꽤 치명적일 수 있습니다.**

다음과 같이 개발자의 휴먼 에러로 타입 서술어를 잘못 작성했을 경우를 생각해보겠습니다.

```ts
// `bar is string`으로 잘못 작성했을 경우
function isNumber(bar: unknown): bar is string {
  return typeof bar === 'number';
}
```

위와 같이 타입 서술어 `bar is string` 와 실제 검사하는 코드 `typeof bar === 'number'` 가 일치하지 않아도 **타입스크립트는 타입 서술어에 따라 타입을 좁히게 됩니다.**

```ts
function foo(bar: number | string) {
  if (isNumber(bar)) {
    // bar의 타입은 타입 서술어가 서술한 타입 string으로 좁혀진다.
  } else {
  }
}
```

이는 꽤나 문제가 생길 수 있는데요. 문제가 생길 수 있는 극단적인 예시를 한 번 생각해보겠습니다.

다음과 같이 2D 좌표와 3D 좌표를 나타내는 타입이 있습니다. 그리고 어떤 좌표를 `isPoint3D` 함수로 타입을 좁히고 싶습니다.

```ts
type Point2D = { x: number; y: number };
type Point3D = { x: number; y: number; z: number };

function isPoint3D(point: Point2D | Point3D): point is Point2D {
  return 'x' in point && 'y' in point && 'z' in point;
}
```

그런데 타입 서술어를 `point is Point2D` 와 같이 잘못 작성했다면 어떻게 될까요?

```ts
function someAction(point: Point2D | Point3D) {
  if (isPoint3D(point)) {
    // point의 타입은 타입 서술어가 서술한 타입 Point2D로 좁혀진다.
  } else {
  }
}
```

타입스크립트는 타입 서술어가 서술한 타입으로 `Point2D` 타입으로 좁혀지기 때문에 `point.z`에 접근하는 코드가 없다면 컴파일 시점에 에러가 발생하지 않습니다. **이는 런타임 시점에 훨씬 심각한 에러가 발생할 수 있는 상황을 만들 수 있습니다.**

극단적인 예시로 과장한 측면이 없지않아 있지만 충분히 휴먼 에러가 발생할 수 있는 부분이라고 생각합니다.

## 5. 타입 서술어 추론(Type Predicate Inference)

타입 서술어 추론 기능인 이러한 기존의 타입 서술어의 단점을 해결해줍니다.

더이상 타입 서술어를 작성하지 않아도 함수의 타입 서술어를 자동으로 유추할 수 있게 됩니다! 이제 번거로운 작성과 휴먼 에러를 줄일 수 있게 되었습니다.

```ts
// bar is number라는 타입 서술어가 없어도 동작
function isNumber(bar: unknown) {
  return typeof bar === 'number';
}

function foo(bar: number | string) {
  if (isNumber(bar)) {
    // bar의 타입은 number로 좁혀진다.
  } else {
  }
}
```

[#57465](https://github.com/microsoft/TypeScript/pull/57465) PR에 따르면 다음과 같이 유용한 예시를 볼 수 있습니다. 특히 저는 filter 예시가 꽤나 유용할 것 같습니다.

```ts
const nums = [12, 'foo', 23, 'bar'].filter(x => typeof x === 'number');

// 도입전) nums는 (string | number)[] 타입을 가집니다.

// 도입후) 이제 nums는 number[] 타입을 가집니다.
```

### 마치며

이상 타입스크립트 5.5버전에 도입될 타입 서술어 추론 기능에 대해 알아보았습니다.

기능이 추가됨에 따라 추가적인 오버헤드로 성능적으로는 저하가 있다고는 하지만 (1.25% 정도 타입 검사시간 증가) 개인적으로는 꽤나 유용한 기능일 것 같습니다.
