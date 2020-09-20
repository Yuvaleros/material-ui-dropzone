# material-ui-dropzone

Thanks to all contributers who improved **material-ui-dropzone** by opening an issue/PR.

This changelog refers to `master` branch (currently `v3.x`), for `v2.x`-specific changelog see [`v2.x CHANGELOG.md`](https://github.com/Yuvaleros/material-ui-dropzone/blob/v2.x/CHANGELOG.md).

## `v3.5.0`

###### To be released

#### :sparkles: Features

* Update DropzoneDialog to allow for a custom dialog title (PR [#234](https://github.com/Yuvaleros/material-ui-dropzone/pull/234) by **@4-Eyes**)

#### :bug: Bugfixes

* Use binary system instead of decimal for size error (PR [#245](https://github.com/Yuvaleros/material-ui-dropzone/pull/245) by **@AntoineGrandchamp**)

#### :label: Typings

* Add disableRejectionFeedback to DropzoneAreaBaseProps type (PR [#247](https://github.com/Yuvaleros/material-ui-dropzone/pull/247) by **@Parya-Jafari**, related to issue [#141](https://github.com/Yuvaleros/material-ui-dropzone/issues/141) by **@PabloCanalSuarez**)

## `v3.4.1`

###### Unreleased

#### :bug: Bugfixes

* Fix `react-dropzone` props not being passed properly (PR [#239](https://github.com/Yuvaleros/material-ui-dropzone/pull/239) by **@panz3r**, fixes [#235](https://github.com/Yuvaleros/material-ui-dropzone/issues/235) by **@grahamlangford**)

## `v3.4.0`

###### August 18, 2020

#### :sparkles: New Features

* Allow all filetypes by default (PR [#226](https://github.com/Yuvaleros/material-ui-dropzone/pull/226) by **@panz3r**, fixes [#214](https://github.com/Yuvaleros/material-ui-dropzone/issues/214) by **@FilipeCosta06**)
* Allow passing a custom Icon to be displayed inside Dropzone area (PR [#227](https://github.com/Yuvaleros/material-ui-dropzone/pull/227) by **@panz3r**, closes [#48](https://github.com/Yuvaleros/material-ui-dropzone/issues/48) by **@N4Design**)

#### :lipstick: UI Changes

* Fix Snackbar icons margins (PR [#223](https://github.com/Yuvaleros/material-ui-dropzone/pull/223) by **@Armanio**)

## `v3.3.1`

###### July 24, 2020

#### :label: Typings

* Update PropTypes for `initialFiles` to avoid issues with `NextJS` (Fixes [#208](https://github.com/Yuvaleros/material-ui-dropzone/issues/208))

## `v3.3.0`

###### June 20, 2020

#### :sparkles: New Features

* Make `previewChips` use the grid system as well (PR [#173](https://github.com/Yuvaleros/material-ui-dropzone/pull/173) by **@anthonyraymond**)
* Set `initialFiles` with `File` or `URL string` (PR [#194](https://github.com/Yuvaleros/material-ui-dropzone/pull/194) by **@isaacbuckman**, reported as [#192](https://github.com/Yuvaleros/material-ui-dropzone/issues/192) by **@isaacbuckman**)
* Add `onAlert` callback prop to hook into Snackbar messaging (PR [#205](https://github.com/Yuvaleros/material-ui-dropzone/pull/205) by **@mattcorner**, reported as [#200](https://github.com/Yuvaleros/material-ui-dropzone/issues/200) by **@mattcorner**)

## `v3.2.1`

###### Unreleased

#### :bug: Bugfixes

* Show remove buttons when they have focus (PR [#191](https://github.com/Yuvaleros/material-ui-dropzone/pull/191) by **@MatthijsMud**, reported as [#190](https://github.com/Yuvaleros/material-ui-dropzone/issues/190) by **@MatthijsMud**)
* Change `SnackbarContentWrapper` class names for variants to avoid conflicts with Material UI internals (PR [#198](https://github.com/Yuvaleros/material-ui-dropzone/pull/198) by **@panz3r**, reported as [#183](https://github.com/Yuvaleros/material-ui-dropzone/issues/183) by **@mattcorner**)
* Fix error message when dropping more than `filesLimit` files (PR [#199](https://github.com/Yuvaleros/material-ui-dropzone/pull/199) by **@panz3r**, reported as [#196](https://github.com/Yuvaleros/material-ui-dropzone/issues/196) by **@edricwu**)

#### :label: Typings

* Update Typescript typings
  * Fixes issue [#172](https://github.com/Yuvaleros/material-ui-dropzone/issues/172) by **@amirmishani**
  * Fixes issue [#184](https://github.com/Yuvaleros/material-ui-dropzone/issues/184) by **@zikaeroh**

#### :arrow_up: Dependencies Update

* Bump `websocket-extensions` from `0.1.3` to `0.1.4`
* Bump `@babel/*` devDeps to `7.10.x`

## `v3.2.0`

###### June 03, 2020

#### :sparkles: New Features

* Add `DropzoneAreaBase` and `DropzoneDialogBase` controlled components (PR [#175](https://github.com/Yuvaleros/material-ui-dropzone/pull/175) by **@panz3r**)

## `v3.1.0`

###### May 27, 2020

#### :sparkles: New Features

* Add `getPreviewIcon` prop to DropzoneArea component to customize file preview (PR [#154](https://github.com/Yuvaleros/material-ui-dropzone/pull/154) by **@max-carroll**)
* Add support for style with MUI Theme, see [docs](https://yuvaleros.github.io/material-ui-dropzone/#section-theme) for more details (PR [#158](https://github.com/Yuvaleros/material-ui-dropzone/pull/158) by **@panz3r**):
  * Closes issue [#73](https://github.com/Yuvaleros/material-ui-dropzone/issues/73) by **@sirsaeta**
  * Closes issue [#80](https://github.com/Yuvaleros/material-ui-dropzone/issues/80) by **@mikiasmohamed**
  * Closes issue [#125](https://github.com/Yuvaleros/material-ui-dropzone/issues/125) by **@suiaing**
  * Closes issue [#146](https://github.com/Yuvaleros/material-ui-dropzone/issues/146) by **@mattcorner**
* Add `showAlerts` property to show alerts only on error (PR [#170](https://github.com/Yuvaleros/material-ui-dropzone/pull/170) by **@blouin**):
  * `showAlerts` can be a boolean ("global" `true` or `false` for all alerts).
  * `showAlerts` can be an array, with values `error`, `info`, `success`:
    * `showAlerts={['error']}` for only `errors`
    * `showAlerts={['error', 'info']}` for both `errors` and `info`
    * `showAlerts={['error', 'success', 'info']}` is same as `showAlerts={true}`
    * `showAlerts={[]}` is same as `showAlerts={false}`

#### :bug: Bugfixes

* Avoid appending extension if present when loading external files (PR [#150](https://github.com/Yuvaleros/material-ui-dropzone/pull/150) by **@panz3r**, reported as [#135](https://github.com/Yuvaleros/material-ui-dropzone/issues/135) by **@mballeng91**)
* Prevent control focus rubber band (PR [#156](https://github.com/Yuvaleros/material-ui-dropzone/pull/156) by **@max-carroll**, reported as [#145](https://github.com/Yuvaleros/material-ui-dropzone/issues/145) by **@topninja**)

## `v3.0.0`

###### April 25, 2020

#### :boom: **BREAKING**

* Upgrade `react-dropzone` to version 10 (PR [#120](https://github.com/Yuvaleros/material-ui-dropzone/pull/120) by **@panz3r**)
* Drop support for React `<16.8` and Material-UI `v3` (PR [#120](https://github.com/Yuvaleros/material-ui-dropzone/pull/120) by **@panz3r**)
* After the code refactor of PR [#121](https://github.com/Yuvaleros/material-ui-dropzone/pull/121), the `onChange` handler is invoked also on component mount (with or without files depending on the value of the `initialFiles` prop) - see issue [#153](https://github.com/Yuvaleros/material-ui-dropzone/issues/153) for more details.

#### :sparkles: New Features

* Addition of `previewText` prop to `DropzoneArea` component (PR [#121](https://github.com/Yuvaleros/material-ui-dropzone/pull/121) by **@panz3r**, same as [#112](https://github.com/Yuvaleros/material-ui-dropzone/pull/112) by **@charlot567**)
* Add `disableRejectionFeedback` prop to `DropzoneArea` component (PR [#142](https://github.com/Yuvaleros/material-ui-dropzone/pull/142) by **@panz3r**, reported as [#141](https://github.com/Yuvaleros/material-ui-dropzone/issues/141) by **@PabloCanalSuarez**)
* Add `inputProps` prop to `DropzoneArea` component (PR [#134](https://github.com/Yuvaleros/material-ui-dropzone/pull/134) by **@panz3r**), fixes:
  * set name for `<input>` element ([#92](https://github.com/Yuvaleros/material-ui-dropzone/issues/92) by **@mnlbox**)
  * Upload Directory/folder ([#122](https://github.com/Yuvaleros/material-ui-dropzone/issues/122) by **@antares-va-tech**)
* Add `dropzoneProps` prop to `DropzoneArea` component (PR [#134](https://github.com/Yuvaleros/material-ui-dropzone/pull/134) by **@panz3r**), fixes:
  * Dropzone disable attribute not working ([#103](https://github.com/Yuvaleros/material-ui-dropzone/issues/103) by **@stefanstankovic995**)
* Add `alertSnackbarProps` prop to `DropzoneArea` component (PR [#134](https://github.com/Yuvaleros/material-ui-dropzone/pull/134) by **@panz3r**), fixes:
  * Ability to override snackbard background colours ([#45](https://github.com/Yuvaleros/material-ui-dropzone/issues/45) by **@IsabellaRey**)
  * Allow the abillity of change anchorOrigin of snackbar ([#64](https://github.com/Yuvaleros/material-ui-dropzone/issues/64) by **@widomin**)

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
