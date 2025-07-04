# Changelog

## [4.0.2](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v4.0.1...json-viewer-v4.0.2) (2025-07-04)


### Bug Fixes

* Update built-in-types.mdx to reference correct type ([6f1d590](https://github.com/TexteaInc/json-viewer/commit/6f1d590a71e9f3248e33fef2e8f7485aaf882009))

## [4.0.1](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v4.0.0...json-viewer-v4.0.1) (2024-12-15)


### Bug Fixes

* update Object datatype for correct pluralization of Items ([#531](https://github.com/TexteaInc/json-viewer/issues/531)) ([004e5c0](https://github.com/TexteaInc/json-viewer/commit/004e5c09c20a7afe4434f210b1ac98f7116ba8a7))

## [4.0.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v3.5.0...json-viewer-v4.0.0) (2024-09-15)


### ⚠ BREAKING CHANGES

* remove deprecated `createDataType` and `displayObjectSize`
* migrate to MUI v6

### Features

* migrate to MUI v6 ([5ed7245](https://github.com/TexteaInc/json-viewer/commit/5ed7245fee96239e5a09dda22531795cc3121eb2))
* remove deprecated `createDataType` and `displayObjectSize` ([2923478](https://github.com/TexteaInc/json-viewer/commit/2923478feaa6685f4afccffe31ad54faab290a0c))

## [3.5.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v3.4.1...json-viewer-v3.5.0) (2024-08-26)


### Features

* add `data-key-toggle-*` class name for customization ([c1e605a](https://github.com/TexteaInc/json-viewer/commit/c1e605a5647be5821392bf74a396bb5ff95d7e4a))
* add utils `getPathValue` ([194ac43](https://github.com/TexteaInc/json-viewer/commit/194ac430170ce2e9ad21ebbc0b83008981054e26))
* hide colon when key is empty ([c1ce6ed](https://github.com/TexteaInc/json-viewer/commit/c1ce6ed7ea5b5ce9512a100cd6ad5ef1bf5ee4d1))
* passing `path` to `Editor` for better customizability ([f03ab10](https://github.com/TexteaInc/json-viewer/commit/f03ab1051fd1d0320ad6f5c482325f151b6065da))
* support `displayComma` for showing comma ([2c85bdb](https://github.com/TexteaInc/json-viewer/commit/2c85bdbccab0e2844d8a0f445f9d0a9f48434e68))

## [3.4.1](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v3.4.0...json-viewer-v3.4.1) (2024-04-06)


### Bug Fixes

* fix type register error on server ([a952c53](https://github.com/TexteaInc/json-viewer/commit/a952c53325a3e104b197da628c28653f445da12d))
* update theme logic ([7fbb50b](https://github.com/TexteaInc/json-viewer/commit/7fbb50b7e301043009ca30e1b063b77babd49577))

## [3.4.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v3.3.2...json-viewer-v3.4.0) (2024-02-15)


### Features

* expose dataTypes, themes and utils in browser build ([922065f](https://github.com/TexteaInc/json-viewer/commit/922065f67515ea503384f4d0f8596f72e0b8fe93))

## [3.3.2](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v3.3.1...json-viewer-v3.3.2) (2024-02-09)


### Bug Fixes

* missing key for self referential object ([95ee8ca](https://github.com/TexteaInc/json-viewer/commit/95ee8cadf35d24b0a7c7c985ec456c1fcf46816c))
* typo in doc ([925456a](https://github.com/TexteaInc/json-viewer/commit/925456aeaed49cc8178633d5d664a4724af7bc3f))

## [3.3.1](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v3.3.0...json-viewer-v3.3.1) (2024-01-24)


### Bug Fixes

* improve part of ui not covered by theme color ([867c791](https://github.com/TexteaInc/json-viewer/commit/867c7911316d553ad32ddeba49faf9887791da34))
* remove `browser` from package.json ([a173bd0](https://github.com/TexteaInc/json-viewer/commit/a173bd0d2646a95aa32113adf2e07f89913783e3))

## [3.3.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v3.2.3...json-viewer-v3.3.0) (2024-01-16)


### Features

* support add and delete feature ([#438](https://github.com/TexteaInc/json-viewer/issues/438)) ([1709001](https://github.com/TexteaInc/json-viewer/commit/1709001e778a73abd17aabf73f80947ff911573b))

## [3.2.3](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v3.2.2...json-viewer-v3.2.3) (2023-11-04)


### Bug Fixes

* should handle key and path of nested grouped array with nestedIndex ([6efeac6](https://github.com/TexteaInc/json-viewer/commit/6efeac6332ff1364c778694746e7545cad045774))

## [3.2.2](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v3.2.1...json-viewer-v3.2.2) (2023-10-09)


### Bug Fixes

* fix publishing script and add provenance statements ([f644caf](https://github.com/TexteaInc/json-viewer/commit/f644caf3ac4507f95cd8fe26c4046f5a36b4efbf))

## [3.2.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v3.1.1...json-viewer-v3.2.0) (2023-10-09)


### Features

* improve built-in editor with autoFocus and better keyboard control ([1a757e8](https://github.com/TexteaInc/json-viewer/commit/1a757e878e264315bf76387ac07f635ae4446ef7))


### Bug Fixes

* super long string can be partially selected without collapsing ([c2282dd](https://github.com/TexteaInc/json-viewer/commit/c2282ddfd9eaa585450710d4547810cf02ef3e2a))

## [3.1.1](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v3.1.0...json-viewer-v3.1.1) (2023-06-20)


### Bug Fixes

* trigger release ([35760ac](https://github.com/TexteaInc/json-viewer/commit/35760ac866b2eb665b27e9f0bd9bf27b65a96698))

## [3.1.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v3.0.0...json-viewer-v3.1.0) (2023-06-20)


### Features

* support default inspect state with `defaultInspectControl` ([7982300](https://github.com/TexteaInc/json-viewer/commit/7982300b18e4202fc71f7c7226ca377edff80334))

## [3.0.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.17.2...json-viewer-v3.0.0) (2023-04-25)

For the detail and migration guide, check out the [Migrating from v2 to v3](https://viewer.textea.io/migration/migration-v3)

### Main Changes

This major focus on providing the ability to customize and extend data types. We also moved MUI to peerdependency to reflect the correct dependency relationship.

#### Dependencies

Starting from v3, dependencies from `Material-UI` are no longer included in the package's dependencies.\
Run this to install all the necessary dependencies.

```
npm install @mui/material @emotion/react @emotion/styled
```

#### Browser compatibility

This package was set to support `ES5` by default, but it's no longer the case.\
Since V3, as this package is using `Material-UI`, we have adjusted the browser compatibility to match the [Material-UI's one](https://mui.com/getting-started/supported-platforms/).

#### Use `defineDataType` instead of `createDataType`

`serialize` and `deserialize` have been added to datatype to support editing feature on any data type.

As the result, `createDataType` has been renamed to `defineDataType` and the signature has been changed to accept an object instead of a long list of arguments. For more information, please refer to [Defining data types](/data-types.mdx).

```diff
- createDataType(
-   (value) => typeof value === 'string' && value.startsWith('https://i.imgur.com'),
-   (props) => <Image height={50} width={50} src={props.value} alt={props.value} />
- )
+ defineDataType({
+   is: (value) => typeof value === 'string' && value.startsWith('https://i.imgur.com'),
+   Component: (props) => <Image height={50} width={50} src={props.value} alt={props.value} />
+ })
```

#### Rename `displayObjectSize` to `displaySize`

`displayObjectSize` has been renamed to `displaySize` to describe the prop's purpose more accurately.

```diff
<JsonViewer
-  displayObjectSize={true}
+  displaySize={true}
   value={value}
/>
```

Now you can provide a function to customize this behavior by returning a boolean based on the value and path.

```jsx
<JsonViewer
  displaySize={(path, value) => {
    if (Array.isArray(value)) return false
    if (value instanceof Map) return true
    return true
  }}
  value={value}
/>
```

#### Expose built-in type for extending

For more information, check [Extend Built-in Data Types](https://viewer.textea.io/how-to/built-in-types).

### Features

- dropping `createDataType` and change the signature of EditorComponent to only accept string
- expose `defineEasyType` for easier customization ([d727adb](https://github.com/TexteaInc/json-viewer/commit/d727adb5e013001edca339b9a9a5e4f68b77e89f))
- expose built-in type ([ed64769](https://github.com/TexteaInc/json-viewer/commit/ed64769d23029af59def63a1e2121b59de94c17a))
- rename `displayObjectSize` to `displaySize` ([2e5739c](https://github.com/TexteaInc/json-viewer/commit/2e5739ce581b2e99b7babbacd9c059a67d9ba039))

### Bug Fixes

- fix editing on any datatype ([69a359f](https://github.com/TexteaInc/json-viewer/commit/69a359fe2d999a97fe6a32a02d30afc43aa3b492))
- improve deprecation message ([5e73886](https://github.com/TexteaInc/json-viewer/commit/5e73886861572e373cf34715669f651586ab8c70))
- move emotion to peer dependency ([5616257](https://github.com/TexteaInc/json-viewer/commit/5616257944f4caf2f1603d1757400e544188b335))
- move mui to peerDependencies ([9c45b90](https://github.com/TexteaInc/json-viewer/commit/9c45b905e7f50e18576919bd9427b74ac92b2b1f))
- remove `@emotion/*` from jsx importSource ([658fddb](https://github.com/TexteaInc/json-viewer/commit/658fddbe72fcd84423e9ebb0e463a06dc742a5a3))
- type matching should not early return when value is object ([0c9ef70](https://github.com/TexteaInc/json-viewer/commit/0c9ef704cb3a6e275d1ed7909fa0c195b5feb979))

### Miscellaneous Chores

- bump to 3.0.0 ([0eb2e02](https://github.com/TexteaInc/json-viewer/commit/0eb2e02b51f42dbd9e3412fbceccc54523b44bfe))

## [2.17.2](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.17.1...json-viewer-v2.17.2) (2023-04-20)

### Bug Fixes

- use swc in the right way ([4b437fb](https://github.com/TexteaInc/json-viewer/commit/4b437fb842462add8a16de649748d739b30307a9))

## [2.17.1](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.17.0...json-viewer-v2.17.1) (2023-04-20)

### Bug Fixes

- disable `externalHelpers` ([aaa31a5](https://github.com/TexteaInc/json-viewer/commit/aaa31a53b4debdf4728f388c70d413c791c2266c))

## [2.17.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.16.2...json-viewer-v2.17.0) (2023-04-19)

### Features

- expose copy function to `onCopy` callback ([5e4c7f3](https://github.com/TexteaInc/json-viewer/commit/5e4c7f37e73ceff86e781981e50a845dca693d5c))

## [2.16.2](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.16.1...json-viewer-v2.16.2) (2023-04-02)

### Bug Fixes

- `NaN` should not trigger highlightUpdates ([f09b769](https://github.com/TexteaInc/json-viewer/commit/f09b769ba01dc441d255c83d9f52c4fec7366fe2))

## [2.16.1](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.16.0...json-viewer-v2.16.1) (2023-03-28)

### Bug Fixes

- `applyValue` should shallow copy the input ([5c632a4](https://github.com/TexteaInc/json-viewer/commit/5c632a49342f553058f98dd7a0669a08dca224ce))
- editing value not correct ([8a8d1cb](https://github.com/TexteaInc/json-viewer/commit/8a8d1cbf5a9eb0ba7bfd86fd523f50bc823b9a49))

## [2.16.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.15.0...json-viewer-v2.16.0) (2023-03-27)

### Features

- highlight changed ([b9490fe](https://github.com/TexteaInc/json-viewer/commit/b9490fe8e6516d2369535b65b50ddde0a05de55b))

### Bug Fixes

- hucky hooks are not executable at unix ([1e5169a](https://github.com/TexteaInc/json-viewer/commit/1e5169a4c1cf1f1c1eb5da94f5648d944fa9c0a2))

## [2.15.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.14.1...json-viewer-v2.15.0) (2023-03-21)

### Features

- expose class `json-viewer-theme-*` for style customization ([3ea2805](https://github.com/TexteaInc/json-viewer/commit/3ea2805d2054dac2188a548a90d6528daa68223d))
- support passing `sx` props to customize the style ([e10fe1d](https://github.com/TexteaInc/json-viewer/commit/e10fe1dc9acf391c76c2aa770ed81781f120d8e7))

### Bug Fixes

- copying on circular JSON/Array throws error ([edfe2f3](https://github.com/TexteaInc/json-viewer/commit/edfe2f3146e05a61a48c54cd256687eb7a26038b))
- eliminate eslint warning ([e598660](https://github.com/TexteaInc/json-viewer/commit/e5986608a314e2ab5e4c9701abc25412da49b580))
- improve copy on BigInt / Map / Set ([7c46e07](https://github.com/TexteaInc/json-viewer/commit/7c46e0762b96594970fb4f8be107107a5752c38f))

## [2.14.1](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.14.0...json-viewer-v2.14.1) (2023-03-07)

### Bug Fixes

- migrate zustand away from `zustand/context' ([ed6c699](https://github.com/TexteaInc/json-viewer/commit/ed6c6993134cf01408c6092e88c47b45b6b8a314))
- migrate zustand to v4 ([5bbfcf9](https://github.com/TexteaInc/json-viewer/commit/5bbfcf9901a3224c5a5c8e57e06e8c902c57c0b2))

## [2.14.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.13.1...json-viewer-v2.14.0) (2023-02-23)

### Features

- support `onSelect` callback ([#238](https://github.com/TexteaInc/json-viewer/issues/238)) ([81ef6ed](https://github.com/TexteaInc/json-viewer/commit/81ef6edcfe6af0dba296af00898b33b4e315d539))

### Bug Fixes

- reduce MUI size by using `@swc/plugin-transform-imports` ([#169](https://github.com/TexteaInc/json-viewer/issues/169)) ([f5739d6](https://github.com/TexteaInc/json-viewer/commit/f5739d6346d3c7365c6f0c62713dcace54deb314))

## [2.13.1](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.13.0...json-viewer-v2.13.1) (2023-01-26)

### Bug Fixes

- correct types reference ([#219](https://github.com/TexteaInc/json-viewer/issues/219)) ([3da8caf](https://github.com/TexteaInc/json-viewer/commit/3da8caf146162767fc4e1c99f7d840b7d6739449))
- key and value text should be selectable ([#217](https://github.com/TexteaInc/json-viewer/issues/217)) ([94ad428](https://github.com/TexteaInc/json-viewer/commit/94ad4289ad0a2fd281be7932576960c1b788dcc2))

## [2.13.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.12.5...json-viewer-v2.13.0) (2023-01-14)

### Features

- **ui:** replace triple dots (...) with ellipsis (…) ([#165](https://github.com/TexteaInc/json-viewer/issues/165)) ([6e3f1cf](https://github.com/TexteaInc/json-viewer/commit/6e3f1cfc51e76896f19ea24297fd035618ef7cde))

### Bug Fixes

- add vite as dev dependency ([#148](https://github.com/TexteaInc/json-viewer/issues/148)) ([b85bbf9](https://github.com/TexteaInc/json-viewer/commit/b85bbf9c8ccd833ee4d81c6d4a6791d62e42d551))
- inline icons from `@mui/icons-material` ([#147](https://github.com/TexteaInc/json-viewer/issues/147)) ([84a5d06](https://github.com/TexteaInc/json-viewer/commit/84a5d0633551fc3c178c97bcda1205f010146056))
- **ui:** remove left margin in key-value separator ([#153](https://github.com/TexteaInc/json-viewer/issues/153)) ([4d6a858](https://github.com/TexteaInc/json-viewer/commit/4d6a858796afe53d7c08e2258d4346414fcb3224))

## [2.12.5](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.12.4...json-viewer-v2.12.5) (2023-01-11)

### Bug Fixes

- move eslint related deps to devDependencies ([#142](https://github.com/TexteaInc/json-viewer/issues/142)) ([7e2705d](https://github.com/TexteaInc/json-viewer/commit/7e2705d6639483aa5a0bf77b7d37f77e3e9de60b))
- remove `workspaces` in `package.json` before release ([#143](https://github.com/TexteaInc/json-viewer/issues/143)) ([e3723c1](https://github.com/TexteaInc/json-viewer/commit/e3723c1b4ff880c250b8a7b2aa85097cf5b4f7b8))

## [2.12.4](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.12.3...json-viewer-v2.12.4) (2023-01-01)

### Bug Fixes

- cannot resolve `@textea/dev-kit/utils` ([#134](https://github.com/TexteaInc/json-viewer/issues/134)) ([2b7abc8](https://github.com/TexteaInc/json-viewer/commit/2b7abc8660bb8bb9e588780c34301284879c0b2a))

## [2.12.3](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.12.2...json-viewer-v2.12.3) (2022-12-26)

### Bug Fixes

- remove export default ([9c8fda6](https://github.com/TexteaInc/json-viewer/commit/9c8fda627fc892f002e3baef85eb686fcf1fbb72))

## [2.12.2](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.12.1...json-viewer-v2.12.2) (2022-12-24)

### Bug Fixes

- set target as `ES5` ([d8384db](https://github.com/TexteaInc/json-viewer/commit/d8384db936d2eca972ca553ff3fe4767a15c6dff))

## [2.12.1](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.12.0...json-viewer-v2.12.1) (2022-12-24)

### Bug Fixes

- exports default ([da50b6f](https://github.com/TexteaInc/json-viewer/commit/da50b6f52431d3c49806202b222fc86aed62eab2))

## [2.12.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.11.2...json-viewer-v2.12.0) (2022-12-05)

### Features

- collapse all empty iterables and disable expanding them ([#123](https://github.com/TexteaInc/json-viewer/issues/123)) ([105b002](https://github.com/TexteaInc/json-viewer/commit/105b002e43e77d3f3d83d0297207896cb8dd6ceb))
- invert logic for showing dots ([#122](https://github.com/TexteaInc/json-viewer/issues/122)) ([0e7292d](https://github.com/TexteaInc/json-viewer/commit/0e7292da459c77dac583dcc20af302505c3c1cc4))

## [2.11.2](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.11.1...json-viewer-v2.11.2) (2022-11-28)

### Bug Fixes

- show three dots only on collapsed strings ([#118](https://github.com/TexteaInc/json-viewer/issues/118)) ([aca110e](https://github.com/TexteaInc/json-viewer/commit/aca110e8d9f62754086b379b00f12e2e01cb3e4d))

## [2.11.1](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.11.0...json-viewer-v2.11.1) (2022-11-09)

### Bug Fixes

- build issues ([001fd8c](https://github.com/TexteaInc/json-viewer/commit/001fd8c62d63312a27e3f8c791a9c7a2ba899e53))
- use ES2018 as target ([afd7c6c](https://github.com/TexteaInc/json-viewer/commit/afd7c6ccec98c8a53f3eec1c7cd5863748197d24))

## [2.11.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.10.0...json-viewer-v2.11.0) (2022-11-07)

### Features

- support `props.onCopy` ([#113](https://github.com/TexteaInc/json-viewer/issues/113)) ([a739ab0](https://github.com/TexteaInc/json-viewer/commit/a739ab0afdced7445e21883f98b92410c15bb63b))

## [2.10.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.9.1...json-viewer-v2.10.0) (2022-10-17)

### Features

- support path in dataType ([#107](https://github.com/TexteaInc/json-viewer/issues/107)) ([f0aca0f](https://github.com/TexteaInc/json-viewer/commit/f0aca0fc9bf7906b9391f4e03c1a27ed0e3ea02c))

## [2.9.1](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.9.0...json-viewer-v2.9.1) (2022-10-10)

### Bug Fixes

- remove scripts when publishing ([45d9cf9](https://github.com/TexteaInc/json-viewer/commit/45d9cf925d24f4a3508fa8ba36bfd6dfe7bd298e))

## [2.9.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.8.1...json-viewer-v2.9.0) (2022-10-06)

### Features

- support `displayObjectSize` ([#102](https://github.com/TexteaInc/json-viewer/issues/102)) ([164bd4c](https://github.com/TexteaInc/json-viewer/commit/164bd4c2324e585602f369dfcca6c23dbe2ee4b4)), closes [#101](https://github.com/TexteaInc/json-viewer/issues/101)

## [2.8.1](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.8.0...json-viewer-v2.8.1) (2022-10-04)

### Bug Fixes

- set `overflowWrap` to `anywhere` ([#99](https://github.com/TexteaInc/json-viewer/issues/99)) ([6d10db3](https://github.com/TexteaInc/json-viewer/commit/6d10db32d98751d7c12845bbcb8eecf70aab9143))

## [2.8.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.7.4...json-viewer-v2.8.0) (2022-10-02)

### Features

- support `props.collapseStringsAfterLength` with false ([#97](https://github.com/TexteaInc/json-viewer/issues/97)) ([5c611a2](https://github.com/TexteaInc/json-viewer/commit/5c611a20e0379b1f3560ccc1bd571496d7e8d7e6))

## [2.7.4](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.7.3...json-viewer-v2.7.4) (2022-10-02)

### Bug Fixes

- editable for basic value ([#95](https://github.com/TexteaInc/json-viewer/issues/95)) ([76e77b0](https://github.com/TexteaInc/json-viewer/commit/76e77b03558f03fb129b4d4b64d21fd690ec970d))

## [2.7.3](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.7.2...json-viewer-v2.7.3) (2022-09-24)

### Bug Fixes

- add compare function in baseCellType Editor ([53bb796](https://github.com/TexteaInc/json-viewer/commit/53bb796003eb16aa854adff28d4d6caf4d6f8175))

## [2.7.2](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.7.1...json-viewer-v2.7.2) (2022-09-24)

### Bug Fixes

- disable ssr in function inspect ([8a303f2](https://github.com/TexteaInc/json-viewer/commit/8a303f28da66a263cf391a89473b79a21692ce11))

## [2.7.1](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.7.0...json-viewer-v2.7.1) (2022-09-23)

### Bug Fixes

- browser field cause vite build fail ([#85](https://github.com/TexteaInc/json-viewer/issues/85)) ([3dd6842](https://github.com/TexteaInc/json-viewer/commit/3dd68425bde0963600f9e60c646f14443d94b65b))
- **example:** image url match ([19fd4eb](https://github.com/TexteaInc/json-viewer/commit/19fd4eb968d69aceef4d548406659c5706b825ff))
- throw error if change '**proto**' ([209788e](https://github.com/TexteaInc/json-viewer/commit/209788eb14aa39bf887b52f4fdcf7d913bd3d2fe))

## [2.7.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.6.0...json-viewer-v2.7.0) (2022-09-23)

### Features

- enhance function dataType ([#81](https://github.com/TexteaInc/json-viewer/issues/81)) ([d2e75d6](https://github.com/TexteaInc/json-viewer/commit/d2e75d6ce90d6bf7d8200d3407324ff31727622c))

## [2.6.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.5.3...json-viewer-v2.6.0) (2022-09-23)

### Features

- add hover effect ([#77](https://github.com/TexteaInc/json-viewer/issues/77)) ([6b50a01](https://github.com/TexteaInc/json-viewer/commit/6b50a016978a510a60c9e41c2a1e9c629cc961d2))
- object expand by click on dots ([#76](https://github.com/TexteaInc/json-viewer/issues/76)) ([b4bb9d5](https://github.com/TexteaInc/json-viewer/commit/b4bb9d5cc439dffadba1dbcf115cd36596243cb7))

### Bug Fixes

- some enhancements ([#78](https://github.com/TexteaInc/json-viewer/issues/78)) ([46e1c68](https://github.com/TexteaInc/json-viewer/commit/46e1c6892c71cd04adf5daa91af708ae53ee8a6d))

## [2.5.3](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.5.2...json-viewer-v2.5.3) (2022-09-22)

### Bug Fixes

- simplify if conditions ([#70](https://github.com/TexteaInc/json-viewer/issues/70)) ([b2ea339](https://github.com/TexteaInc/json-viewer/commit/b2ea3392bead324dce514964dcba1c82c0dc6433))

## [2.5.2](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.5.1...json-viewer-v2.5.2) (2022-09-22)

### Bug Fixes

- set editable to false by default ([#69](https://github.com/TexteaInc/json-viewer/issues/69)) ([66c8d68](https://github.com/TexteaInc/json-viewer/commit/66c8d68e08364a75d66fc4588edf963f1b62c4e4))

## [2.5.1](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.5.0...json-viewer-v2.5.1) (2022-09-22)

### Bug Fixes

- type registry runs multiple times ([#67](https://github.com/TexteaInc/json-viewer/issues/67)) ([03761ed](https://github.com/TexteaInc/json-viewer/commit/03761ed234c1a4e5d91a3169bc53caa3967df933))

## [2.5.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.4.1...json-viewer-v2.5.0) (2022-09-22)

### Features

- add helper function `createDataType` ([#60](https://github.com/TexteaInc/json-viewer/issues/60)) ([8c626cf](https://github.com/TexteaInc/json-viewer/commit/8c626cf5ee39b1f87dd6c9349a2c06b6e69e4412))
- backport support for `props.displayDataTypes` ([#63](https://github.com/TexteaInc/json-viewer/issues/63)) ([fa10c9e](https://github.com/TexteaInc/json-viewer/commit/fa10c9ea993b194cff8cc28e3a9a87db89207fab))

### Bug Fixes

- move type registry into component state ([#64](https://github.com/TexteaInc/json-viewer/issues/64)) ([3e0fdd6](https://github.com/TexteaInc/json-viewer/commit/3e0fdd6a82d0870b0e3c3fca11a80e4cf91d9085))

## [2.4.1](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.4.0...json-viewer-v2.4.1) (2022-09-22)

### Bug Fixes

- ignore rootName when its false ([#57](https://github.com/TexteaInc/json-viewer/issues/57)) ([7661de0](https://github.com/TexteaInc/json-viewer/commit/7661de0dc503c2a0f004bf08e30f9806a29321ee))

## [2.4.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.3.1...json-viewer-v2.4.0) (2022-09-22)

### Features

- support browser ([#53](https://github.com/TexteaInc/json-viewer/issues/53)) ([819fdf8](https://github.com/TexteaInc/json-viewer/commit/819fdf84145e94e72c78350eb2a6e0e97e86971e))

### Bug Fixes

- **example:** add netlify badge ([60d1cc7](https://github.com/TexteaInc/json-viewer/commit/60d1cc778723cf27476833df5daf883cc92690bc))

## [2.3.1](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.3.0...json-viewer-v2.3.1) (2022-09-22)

### Bug Fixes

- style add padding to `null` and `undefined` ([#50](https://github.com/TexteaInc/json-viewer/issues/50)) ([5f5884f](https://github.com/TexteaInc/json-viewer/commit/5f5884f359e74ba6d89cca76410d0e7619f71109))

## [2.3.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.2.4...json-viewer-v2.3.0) (2022-09-21)

### Features

- backport support for `props.quotesOnKeys` and `props.sortKeys` ([#48](https://github.com/TexteaInc/json-viewer/issues/48)) ([6b2eb14](https://github.com/TexteaInc/json-viewer/commit/6b2eb1475e117a421482fda592f7f51db9111b08))

## [2.2.4](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.2.3...json-viewer-v2.2.4) (2022-09-21)

### Bug Fixes

- ignore error when key of Map is an object ([4af9609](https://github.com/TexteaInc/json-viewer/commit/4af96095d36ff68ccaf90a6c5713780b612003a4))

## [2.2.3](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.2.2...json-viewer-v2.2.3) (2022-09-21)

### Bug Fixes

- basic example ([9dd10cd](https://github.com/TexteaInc/json-viewer/commit/9dd10cdcd03c6301eb27aa2362590361caccc520))

## [2.2.2](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.2.1...json-viewer-v2.2.2) (2022-09-21)

### Bug Fixes

- missing `props.defaultInspectDepth` ([#40](https://github.com/TexteaInc/json-viewer/issues/40)) ([0b04cd7](https://github.com/TexteaInc/json-viewer/commit/0b04cd7ce6fc341e0c346907c35a816967083b3a))

## [2.2.1](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.2.0...json-viewer-v2.2.1) (2022-09-21)

### Documentation

- fix install step ([9153091](https://github.com/TexteaInc/json-viewer/commit/91530915e3a045cbe2948a15d403a70e047bfcdd))

## [2.2.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.1.0...json-viewer-v2.2.0) (2022-09-20)

### Features

- support `bigint` type ([#35](https://github.com/TexteaInc/json-viewer/issues/35)) ([eaa2239](https://github.com/TexteaInc/json-viewer/commit/eaa2239aae740d8a5cdc8e835e2af1d2e41348e3))

### Bug Fixes

- add license in package.json ([3c35865](https://github.com/TexteaInc/json-viewer/commit/3c358655f01115bed23e861509c629ecb509f67e))

## [2.1.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.0.0...json-viewer-v2.1.0) (2022-09-20)

### Features

- support base16 on `props.theme` ([1c7e127](https://github.com/TexteaInc/json-viewer/commit/1c7e1276abdb52ab92260ac3f0bbfd71afc674df))

## [2.0.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v1.24.5...json-viewer-v2.0.0) (2022-09-20)

### ⚠ BREAKING CHANGES

- remove `react-lifecycles-compat`
- component ObjectKeyModal (#6)

### Features

- add example for `valueTypes` ([9daf70c](https://github.com/TexteaInc/json-viewer/commit/9daf70c3e651894bf6afbaca698ce36f953bd3b6))
- backport support for v1 ([ff729a6](https://github.com/TexteaInc/json-viewer/commit/ff729a61d3805f1464d879f594c056c16930b49b))
- check cycle reference ([#22](https://github.com/TexteaInc/json-viewer/issues/22)) ([b55a08b](https://github.com/TexteaInc/json-viewer/commit/b55a08b39086835bb3794e469f460a1ee80ca7a9)), closes [#20](https://github.com/TexteaInc/json-viewer/issues/20)
- finish basic view of next component ([c9f6d32](https://github.com/TexteaInc/json-viewer/commit/c9f6d325ecc512e7c0096ee259c92832f96d7ea9))
- init JsonViewerStore ([2673a2d](https://github.com/TexteaInc/json-viewer/commit/2673a2d48916ce4bccdad8112300b3cc71575332))
- init next JsonViewer component ([cdb20f2](https://github.com/TexteaInc/json-viewer/commit/cdb20f292744ae6d442bfae9ac9872f103c54dd5))
- next component ([#18](https://github.com/TexteaInc/json-viewer/issues/18)) ([d354967](https://github.com/TexteaInc/json-viewer/commit/d354967433ddbaa90b3728885fdc4a407aca0a0e))
- **next:** implement basic indent and json parse ([6335512](https://github.com/TexteaInc/json-viewer/commit/6335512528a82777bc22770463f9357393942485))
- **next:** use TreeView ([b9fd642](https://github.com/TexteaInc/json-viewer/commit/b9fd6428c1bf8878cf7b068865709ee919ec1922))
- show copy success ([#26](https://github.com/TexteaInc/json-viewer/issues/26)) ([a7d513a](https://github.com/TexteaInc/json-viewer/commit/a7d513aa81dcd5c8d2f4a7aba73fc9ca00fcab82))
- support `groupArraysAfterLength` ([#21](https://github.com/TexteaInc/json-viewer/issues/21)) ([6568d91](https://github.com/TexteaInc/json-viewer/commit/6568d91326d4cdd0120e959a26399c504c0944b0))
- support `props.editable` ([d3fb54e](https://github.com/TexteaInc/json-viewer/commit/d3fb54eea3281a383d1a2d2edbbd175d60fa5050))
- support `props.enableClipboard` ([e41102c](https://github.com/TexteaInc/json-viewer/commit/e41102ccd45f89031f9be759cbf801dff5a5aed4))
- support `props.maxDisplayLength` ([#30](https://github.com/TexteaInc/json-viewer/issues/30)) ([498efe2](https://github.com/TexteaInc/json-viewer/commit/498efe2a37d6db9e65721577d1da8a4202c9fa7d))
- support dark and light theme ([5fb3139](https://github.com/TexteaInc/json-viewer/commit/5fb313977b4d044c58dfc69173578546058d3b29))
- support inspect `Map` and `Set` ([#31](https://github.com/TexteaInc/json-viewer/issues/31)) ([06c886c](https://github.com/TexteaInc/json-viewer/commit/06c886c4a3f78ece664edcd074173da838e7c5ec))
- support inspect cache ([95f80c7](https://github.com/TexteaInc/json-viewer/commit/95f80c7ff3165b84fa957e1c1b707470e852feba))
- support plugin system ([fdf9962](https://github.com/TexteaInc/json-viewer/commit/fdf996241683cc1b642bbd232d4a94b8874b9918))
- update example for `onEdit` ([0dd8a93](https://github.com/TexteaInc/json-viewer/commit/0dd8a93e350f00f31f6ce0762b3bb395c92cf32b))
- update example for stackblitz ([688a934](https://github.com/TexteaInc/json-viewer/commit/688a9344495e8bb33504de3bb274fce7b504d3ca))
- use `copy-to-clipboard` ([61cf64e](https://github.com/TexteaInc/json-viewer/commit/61cf64e10ea3f6d215483ce246032f414a0cae5e))

### Bug Fixes

- border color and expand icon ([d11316a](https://github.com/TexteaInc/json-viewer/commit/d11316a717a76f231604397252706993ac9389f6))
- bugs ([c966281](https://github.com/TexteaInc/json-viewer/commit/c966281d1c6913948f8d60387f8a2acaefb8a6c7))
- disable ObjectKeyModal when inactive ([45b7132](https://github.com/TexteaInc/json-viewer/commit/45b7132bc476bc080d7748bf48c40944e395dddc))
- example ([117a166](https://github.com/TexteaInc/json-viewer/commit/117a16620c842bba64231c33c67f4e253fc2482b))
- ignore circular dependency ([bd275f5](https://github.com/TexteaInc/json-viewer/commit/bd275f5b24d605f0a6f11ff9747a14c377ad94da))
- **next:** indent width ([dfafd4b](https://github.com/TexteaInc/json-viewer/commit/dfafd4bc3fffd720dddb616c6e7886e2bd927a38))
- remove ``.stackblitzrc` ([d208e71](https://github.com/TexteaInc/json-viewer/commit/d208e71a92142924373acc18a3fa45617360752f))
- remove export default ([339640b](https://github.com/TexteaInc/json-viewer/commit/339640b9b7efe4def049789580cef59405e72cf6))
- replace `Object.hasOwn` ([7cdc134](https://github.com/TexteaInc/json-viewer/commit/7cdc134abf8091bc900a57e062f3c9b86f453edc))
- ssr on date value ([15037d1](https://github.com/TexteaInc/json-viewer/commit/15037d139061fbe027cd708fd0be6e8bdb5e0d42))
- state on nested array ([#28](https://github.com/TexteaInc/json-viewer/issues/28)) ([661151a](https://github.com/TexteaInc/json-viewer/commit/661151aee6dcd764945a681ccff2ed5016a153dc))
- string on parseInput ([f9da340](https://github.com/TexteaInc/json-viewer/commit/f9da34079b265ef9a857d6afe4261596159839ed))
- support indent width ([#32](https://github.com/TexteaInc/json-viewer/issues/32)) ([4f8b32f](https://github.com/TexteaInc/json-viewer/commit/4f8b32f6cd6c7ea392f934769cde7c3dc8dbc7df))
- type ([2c85ef3](https://github.com/TexteaInc/json-viewer/commit/2c85ef31c1e84a89534195190e797d55b7dde0f3))
- type requirement in example ([9e34a81](https://github.com/TexteaInc/json-viewer/commit/9e34a81d4a5191843f19d3cbaa2f085cd30812b2))

### Code Refactoring

- component ObjectKeyModal ([#6](https://github.com/TexteaInc/json-viewer/issues/6)) ([5c572d9](https://github.com/TexteaInc/json-viewer/commit/5c572d9296dac60445498e1c9350c5a73fd357a5))
- remove `react-lifecycles-compat` ([9ad888e](https://github.com/TexteaInc/json-viewer/commit/9ad888e3939bb7f1efd5ad3bde29afc47bcf17e4))

### Build System

- fix release-please ci ([dc5b28f](https://github.com/TexteaInc/json-viewer/commit/dc5b28fbf9d807c8004e44d9c25a0072a9e51a48))

## [1.24.4](https://github.com/TexteaInc/json-viewer/compare/v1.24.3...v1.24.4) (2022-08-23)

### Bug Fixes

- rename `class` into `className` ([2a2cfe3](https://github.com/TexteaInc/json-viewer/commit/2a2cfe3eb47600aab3591db97fa4715dd56ad92d))

## [1.24.3](https://github.com/TexteaInc/json-viewer/compare/v1.24.2...v1.24.3) (2022-08-23)

### Bug Fixes

- ignore postinstall when publish ([21c5148](https://github.com/TexteaInc/json-viewer/commit/21c5148efef5fd7d9b528839415ddcb897b4508b))
