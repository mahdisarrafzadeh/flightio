# Testio

A simple commerce app

## Technologies

- Core: `next`, `react-redux`, `@reduxjs/toolkit`, `app-router`, `Typescript`, `axios`
- Dev: `yarn`, `react-scripts`
- UI: `tailwind`

## Scripts

> Install **yarn** from [here](https://classic.yarnpkg.com/en/docs/install/#windows-stable). Its better than **npm** :))

### `yarn ... [packages]`

- **`install`** Install all dependencies
- **`dev`** run the development server
- **`add`** Add dependencies
- **`remove`** Remove dependencies
- **`upgrade`** Upgrade dependencies
- **`outdated`** Show a list of out-dated dependencies.

## Imports

> Try to use absolute paths, e.g. `'@/redux/actions'` instead of `'../../actions'`.

**Note**: Most paths should refrence to directories and not files. So all folders should have an `index.ts` file which re-exports everything needed from there.

Order of imports:

```js
// node_modules
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";

// hooks and redux
import { useAppSelector, useAppDispatch } from '@/hooks';
import { retrieveProducts } from "@/redux"

// other: components, utils, actions, ...
import {Button} from '@components/common';

// css
import  './styles.scss';
```

## CSS

we can use [Tailwind](https://tailwindcss.com/) for CSS in JS purpose.

```js
const App = () => {
   return (
      <>
         <div className='bg-red-500'></div>
      </>
   );
};
```

## Functional Components Structure

> Any variable that is not depend on component state or props should be outside of on it!

Following is the order of logics inside component:

1. Expressions and Computations
2. useRefs, useContexts and useAppDispatch
3. Local State: useState and useReducer
4. Global State: useAppSelector
5. Side Effects: useEffect
6. Functions and Handlers
7. return (`<Element />`)

#### `Component.tsx`

```ts
const obj = {
    title: 'foo'
}

interface Props {
   foo: string;
   arr: any[];
};

const Component:FC<Props> = ({foo, arr}) => {
    const x = ()=> { };
    const y = useMemo(() => /* computations */, [])

    const ref = useRef(null);
    const { value } = useContext(context);
    const dispatch = useAppDispatch();

    const [state, state] = useState(false);
    const [state2, dispatchLocal] = useReducer(reducer, initialState);

    const { ... } = useAppSelector(selector);

    useEffect(() => /* side effects */, []);

    const clickHandler = e => {}

    return (
        <div onClick={clickHandler} foo={foo}>
            Hello World!
        </div>
    )
}

export default Component;
```
