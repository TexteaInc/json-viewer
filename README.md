# @textea/json-viewer

> This is v2 branch with fancy features like 100% TypeScript, lightly code and plugin system support.
>
> If you are looking for v1 version based on [mac-s-g/react-json-view](https://github.com/mac-s-g/react-json-view),
> Please see [v1.x](https://github.com/TexteaInc/json-viewer/tree/v1.x).

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/textea-json-viewer-v2?file=pages%2Findex.js)

React component for JSON viewer, but not only a JSON viewer.

## Usage

```shell
# npm
npm install @textea/json-viewer@beta
# yarn
yarn add @textea/json-viewer@beta
# pnpm
pnpm add @textea/json-viewer@beta
```

### Basic Example

```tsx
import JsonViewer from '@textea/json-viewer'

const object = { /* my json object */ }
const Component = () => (<JsonViewer value={object}/>)
```

### Customizable data type

```tsx
import JsonViewer from '@textea/json-viewer'

const object = {
  // what if I want to inspect a image?
  image: 'https://i.imgur.com/1bX5QH6.jpg'
}
const Component = () => (
  <JsonViewer
    value={object}
    // just define it
    valueTypes={[
      {
        is: (value) =>
          typeof value === 'string' &&
          value.startsWith('https://i.imgur.com'),
        Component: (props) => {
          return <img height="50px" src={props.value} alt={props.value}/>;
        },
      },
    ]}
  />
)
```

You will see easily

![Avatar Preview](docs/public/avatar-preview.png)

## Features

- [X] 100% TypeScript
- [X] Customizable
  - [X] `keyRenderer` for customize key renderer
  - [X] `valueTypes` for customize any value types you want
  - [ ] `light | dark | base16` Theme support
- [X] Support `Next.js` SSR
- [X] `onChange` props allow users to edit value
- [X] Object, array, string and function values can be collapsed and expanded
- [X] Metadata display
- [X] `Copy to Clipboard` on Click
- [ ] Fully Test Coverage

## Acknowledge

This package is originally based on [mac-s-g/react-json-view](https://github.com/mac-s-g/react-json-view)

## LICENSE

This project is licensed under the terms of the [MIT license](LICENSE).
