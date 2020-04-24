# material-ui-dropzone

Thanks to all contributers who improved **material-ui-dropzone** by opening an issue/PR.

This changelog refers to `master` branch (currently `v3.x`), for `v2.x`-specific changelog see [`v2.x CHANGELOG.md`](https://github.com/Yuvaleros/material-ui-dropzone/blob/v2.x/CHANGELOG.md).

## `v3.0.0`

###### to be published

#### :boom: **BREAKING**

* Upgrade `react-dropzone` to version 10 (PR [#120](https://github.com/Yuvaleros/material-ui-dropzone/pull/120) by **@panz3r**)
* Drop support for React `<16.8` and Material-UI `v3` (PR [#120](https://github.com/Yuvaleros/material-ui-dropzone/pull/120) by **@panz3r**)

#### :sparkles: New Features

* Addition of `previewText` prop to `DropzoneArea` component (PR [#121](https://github.com/Yuvaleros/material-ui-dropzone/pull/121) by **@panz3r**, same as [#112](https://github.com/Yuvaleros/material-ui-dropzone/pull/112) by **@charlot567**)
* Add `disableRejectionFeedback` prop to `DropzoneArea` component (PR [#142](https://github.com/Yuvaleros/material-ui-dropzone/pull/142) by **@panz3r**, reported as [#141](https://github.com/Yuvaleros/material-ui-dropzone/issues/141) by **@PabloCanalSuarez**)

#### :bug: Bugfixes

* Avoid appending extension if present when loading external files (PR [#137](https://github.com/Yuvaleros/material-ui-dropzone/pull/137) by **@panz3r**, reported as [#135](https://github.com/Yuvaleros/material-ui-dropzone/issues/135) by **@mballeng91**)
* onDrop returns each file one at a time (PR [#121](https://github.com/Yuvaleros/material-ui-dropzone/pull/121) by **@panz3r**, reported as [#65](https://github.com/Yuvaleros/material-ui-dropzone/issues/65) by **@AlanOrtega91**)
* Fully support setting `acceptedFiles` as `.fileending` (PR [#121](https://github.com/Yuvaleros/material-ui-dropzone/pull/121) by **@panz3r**, reported as [#107](https://github.com/Yuvaleros/material-ui-dropzone/issues/107) by **@wirmar**)

#### :lipstick: UI

* Should be using Typography instead of `<p></p>` (PR [#121](https://github.com/Yuvaleros/material-ui-dropzone/pull/121) by **@panz3r**, reported as [#31](https://github.com/Yuvaleros/material-ui-dropzone/issues/31) by **@PolGuixe** and **@IsabellaRey**)

#### :recycle: Refactoring

* Code refactor ([#121](https://github.com/Yuvaleros/material-ui-dropzone/pull/121) by **@panz3r**)

#### :pencil: Docs

* Improved docs ([#128](https://github.com/Yuvaleros/material-ui-dropzone/pull/128) by **@panz3r**)

<br />

## `v2.5.0`

###### April 15, 2020

#### :sparkles: New Features

* Add `previewGridClasses`, `previewGridProps` props (PR [#124](https://github.com/Yuvaleros/material-ui-dropzone/pull/124) by **@loongyh**, reported as [#85](https://github.com/Yuvaleros/material-ui-dropzone/issues/85) by **@zeckdude**)
* Add `dialogProps` prop to customize `DropzoneDialog` appearance (PR [#105](https://github.com/Yuvaleros/material-ui-dropzone/pull/105) by **@chattling**)

#### :bug: Bugfixes

* ReferenceError: regeneratorRuntime is not defined (PR [#111](https://github.com/Yuvaleros/material-ui-dropzone/pull/111) by **@panz3r**, reported as [#77](https://github.com/Yuvaleros/material-ui-dropzone/issues/77) by **@rooch84**, **@Tassfighter** and **@eluchsinger**)

#### :zap: Improvements

* Review dependencies (PR [#111](https://github.com/Yuvaleros/material-ui-dropzone/pull/111) by **@panz3r**)
* Tooling upgrade (PR [#115](https://github.com/Yuvaleros/material-ui-dropzone/pull/115) by **@panz3r**)

#### :pencil: Docs

* Added new `dialogProps` prop to `README` (PR [#113](https://github.com/Yuvaleros/material-ui-dropzone/pull/113) by **@chattling**)
* Fix submit/cancel typo (PR [#126](https://github.com/Yuvaleros/material-ui-dropzone/pull/126) by **@Maxim-Mazurok**)

<br />

## `v2.4.9`

###### March 10, 2020

#### :sparkles: New Features

* Add `dialogProps` prop to customize `DropzoneDialog` appearance (PR [#105](https://github.com/Yuvaleros/material-ui-dropzone/pull/105) by **@chattling**)

#### :bug: Bugfixes

* Move `@material-ui/icons` to `peerDependencies` (PR [#104](https://github.com/Yuvaleros/material-ui-dropzone/pull/104) by **@panz3r**, reported as [#95](https://github.com/Yuvaleros/material-ui-dropzone/issues/95) by **@char0n**)

<br />

## `v2.4.8`

###### February 22, 2020

#### :bug: Bugfixes

* initialFiles not shown up (PR [#101](https://github.com/Yuvaleros/material-ui-dropzone/pull/101) by **@faupol3**, reported as [#87](https://github.com/Yuvaleros/material-ui-dropzone/issues/87) by **@ameenazeemiacmedocs**)
* Unable to preview png file (PR [#101](https://github.com/Yuvaleros/material-ui-dropzone/pull/101) by **@faupol3**, reported as [#90](https://github.com/Yuvaleros/material-ui-dropzone/issues/90) by **@shailesh-padave**)
* remove console logs from Dropzone dialog (PR [#102](https://github.com/Yuvaleros/material-ui-dropzone/pull/102) by **@chattling**, reported as [#96](https://github.com/Yuvaleros/material-ui-dropzone/issues/96) by **@Morteza-Jenabzadeh**)

#### :recycle: Refactoring

* Improved code quality (PR [#94](https://github.com/Yuvaleros/material-ui-dropzone/pull/94) by **@GRcwolf**)
