# Changelog

## [2.1.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v2.0.0...json-viewer-v2.1.0) (2022-09-20)


### Features

* support base16 on `props.theme` ([1c7e127](https://github.com/TexteaInc/json-viewer/commit/1c7e1276abdb52ab92260ac3f0bbfd71afc674df))

## [2.0.0](https://github.com/TexteaInc/json-viewer/compare/json-viewer-v1.24.5...json-viewer-v2.0.0) (2022-09-20)


### ⚠ BREAKING CHANGES

* remove `react-lifecycles-compat`
* component ObjectKeyModal (#6)

### Features

* add example for `valueTypes` ([9daf70c](https://github.com/TexteaInc/json-viewer/commit/9daf70c3e651894bf6afbaca698ce36f953bd3b6))
* backport support for v1 ([ff729a6](https://github.com/TexteaInc/json-viewer/commit/ff729a61d3805f1464d879f594c056c16930b49b))
* check cycle reference ([#22](https://github.com/TexteaInc/json-viewer/issues/22)) ([b55a08b](https://github.com/TexteaInc/json-viewer/commit/b55a08b39086835bb3794e469f460a1ee80ca7a9)), closes [#20](https://github.com/TexteaInc/json-viewer/issues/20)
* finish basic view of next component ([c9f6d32](https://github.com/TexteaInc/json-viewer/commit/c9f6d325ecc512e7c0096ee259c92832f96d7ea9))
* init JsonViewerStore ([2673a2d](https://github.com/TexteaInc/json-viewer/commit/2673a2d48916ce4bccdad8112300b3cc71575332))
* init next JsonViewer component ([cdb20f2](https://github.com/TexteaInc/json-viewer/commit/cdb20f292744ae6d442bfae9ac9872f103c54dd5))
* next component ([#18](https://github.com/TexteaInc/json-viewer/issues/18)) ([d354967](https://github.com/TexteaInc/json-viewer/commit/d354967433ddbaa90b3728885fdc4a407aca0a0e))
* **next:** implement basic indent and json parse ([6335512](https://github.com/TexteaInc/json-viewer/commit/6335512528a82777bc22770463f9357393942485))
* **next:** use TreeView ([b9fd642](https://github.com/TexteaInc/json-viewer/commit/b9fd6428c1bf8878cf7b068865709ee919ec1922))
* show copy success ([#26](https://github.com/TexteaInc/json-viewer/issues/26)) ([a7d513a](https://github.com/TexteaInc/json-viewer/commit/a7d513aa81dcd5c8d2f4a7aba73fc9ca00fcab82))
* support `groupArraysAfterLength` ([#21](https://github.com/TexteaInc/json-viewer/issues/21)) ([6568d91](https://github.com/TexteaInc/json-viewer/commit/6568d91326d4cdd0120e959a26399c504c0944b0))
* support `props.editable` ([d3fb54e](https://github.com/TexteaInc/json-viewer/commit/d3fb54eea3281a383d1a2d2edbbd175d60fa5050))
* support `props.enableClipboard` ([e41102c](https://github.com/TexteaInc/json-viewer/commit/e41102ccd45f89031f9be759cbf801dff5a5aed4))
* support `props.maxDisplayLength` ([#30](https://github.com/TexteaInc/json-viewer/issues/30)) ([498efe2](https://github.com/TexteaInc/json-viewer/commit/498efe2a37d6db9e65721577d1da8a4202c9fa7d))
* support dark and light theme ([5fb3139](https://github.com/TexteaInc/json-viewer/commit/5fb313977b4d044c58dfc69173578546058d3b29))
* support inspect `Map` and `Set` ([#31](https://github.com/TexteaInc/json-viewer/issues/31)) ([06c886c](https://github.com/TexteaInc/json-viewer/commit/06c886c4a3f78ece664edcd074173da838e7c5ec))
* support inspect cache ([95f80c7](https://github.com/TexteaInc/json-viewer/commit/95f80c7ff3165b84fa957e1c1b707470e852feba))
* support plugin system ([fdf9962](https://github.com/TexteaInc/json-viewer/commit/fdf996241683cc1b642bbd232d4a94b8874b9918))
* update example for `onEdit` ([0dd8a93](https://github.com/TexteaInc/json-viewer/commit/0dd8a93e350f00f31f6ce0762b3bb395c92cf32b))
* update example for stackblitz ([688a934](https://github.com/TexteaInc/json-viewer/commit/688a9344495e8bb33504de3bb274fce7b504d3ca))
* use `copy-to-clipboard` ([61cf64e](https://github.com/TexteaInc/json-viewer/commit/61cf64e10ea3f6d215483ce246032f414a0cae5e))


### Bug Fixes

* border color and expand icon ([d11316a](https://github.com/TexteaInc/json-viewer/commit/d11316a717a76f231604397252706993ac9389f6))
* bugs ([c966281](https://github.com/TexteaInc/json-viewer/commit/c966281d1c6913948f8d60387f8a2acaefb8a6c7))
* disable ObjectKeyModal when inactive ([45b7132](https://github.com/TexteaInc/json-viewer/commit/45b7132bc476bc080d7748bf48c40944e395dddc))
* example ([117a166](https://github.com/TexteaInc/json-viewer/commit/117a16620c842bba64231c33c67f4e253fc2482b))
* ignore circular dependency ([bd275f5](https://github.com/TexteaInc/json-viewer/commit/bd275f5b24d605f0a6f11ff9747a14c377ad94da))
* **next:** indent width ([dfafd4b](https://github.com/TexteaInc/json-viewer/commit/dfafd4bc3fffd720dddb616c6e7886e2bd927a38))
* remove ``.stackblitzrc` ([d208e71](https://github.com/TexteaInc/json-viewer/commit/d208e71a92142924373acc18a3fa45617360752f))
* remove export default ([339640b](https://github.com/TexteaInc/json-viewer/commit/339640b9b7efe4def049789580cef59405e72cf6))
* replace `Object.hasOwn` ([7cdc134](https://github.com/TexteaInc/json-viewer/commit/7cdc134abf8091bc900a57e062f3c9b86f453edc))
* ssr on date value ([15037d1](https://github.com/TexteaInc/json-viewer/commit/15037d139061fbe027cd708fd0be6e8bdb5e0d42))
* state on nested array ([#28](https://github.com/TexteaInc/json-viewer/issues/28)) ([661151a](https://github.com/TexteaInc/json-viewer/commit/661151aee6dcd764945a681ccff2ed5016a153dc))
* string on parseInput ([f9da340](https://github.com/TexteaInc/json-viewer/commit/f9da34079b265ef9a857d6afe4261596159839ed))
* support indent width ([#32](https://github.com/TexteaInc/json-viewer/issues/32)) ([4f8b32f](https://github.com/TexteaInc/json-viewer/commit/4f8b32f6cd6c7ea392f934769cde7c3dc8dbc7df))
* type ([2c85ef3](https://github.com/TexteaInc/json-viewer/commit/2c85ef31c1e84a89534195190e797d55b7dde0f3))
* type requirement in example ([9e34a81](https://github.com/TexteaInc/json-viewer/commit/9e34a81d4a5191843f19d3cbaa2f085cd30812b2))


### Code Refactoring

* component ObjectKeyModal ([#6](https://github.com/TexteaInc/json-viewer/issues/6)) ([5c572d9](https://github.com/TexteaInc/json-viewer/commit/5c572d9296dac60445498e1c9350c5a73fd357a5))
* remove `react-lifecycles-compat` ([9ad888e](https://github.com/TexteaInc/json-viewer/commit/9ad888e3939bb7f1efd5ad3bde29afc47bcf17e4))


### Build System

* fix release-please ci ([dc5b28f](https://github.com/TexteaInc/json-viewer/commit/dc5b28fbf9d807c8004e44d9c25a0072a9e51a48))

## [1.24.4](https://github.com/TexteaInc/json-viewer/compare/v1.24.3...v1.24.4) (2022-08-23)


### Bug Fixes

* rename `class` into `className` ([2a2cfe3](https://github.com/TexteaInc/json-viewer/commit/2a2cfe3eb47600aab3591db97fa4715dd56ad92d))

## [1.24.3](https://github.com/TexteaInc/json-viewer/compare/v1.24.2...v1.24.3) (2022-08-23)


### Bug Fixes

* ignore postinstall when publish ([21c5148](https://github.com/TexteaInc/json-viewer/commit/21c5148efef5fd7d9b528839415ddcb897b4508b))
