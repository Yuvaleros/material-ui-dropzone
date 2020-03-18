# material-ui-dropzone

> Material-UI-dropzone is a [React](https://github.com/facebook/react) component using [Material-UI](https://github.com/mui-org/material-ui) and is based on the excellent [react-dropzone](https://github.com/react-dropzone/react-dropzone) library.

This components provide either a file-upload dropzone or a file-upload dropzone inside of a dialog.

The file-upload dropzone features some snazzy "File Allowed/Not Allowed" effects, previews and alerts.

## Installation

```sh
npm install --save material-ui-dropzone
```

or

```sh
yarn add material-ui-dropzone
```

## Screenshots

This is the Dialog component:

![Dialog](https://raw.githubusercontent.com/Yuvaleros/material-ui-dropzone/master/pics/demo_pic.jpg)
![Dialog with Previews](https://raw.githubusercontent.com/Yuvaleros/material-ui-dropzone/master/pics/demo_pic5.JPG)

When you drag a file onto the dropzone, you get a neat effect:

![Drag Overlay](https://raw.githubusercontent.com/Yuvaleros/material-ui-dropzone/master/pics/demo_pic2.JPG)

And if you drag in a wrong type of file, you'll get yelled at:

![Drag Error Overlay](https://raw.githubusercontent.com/Yuvaleros/material-ui-dropzone/master/pics/demo_pic4.JPG)

**N.B. This has some limitations (see [here](https://github.com/react-dropzone/react-dropzone/tree/master/examples/accept#browser-limitations) for more details).**

## DropzoneArea Component

This components creates the dropzone, previews and snackbar notifications without a dialog

### Usage

```jsx
import React, {Component} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'

class DropzoneAreaExample extends Component{
  constructor(props){
    super(props);
    this.state = {
      files: []
    };
  }
  handleChange(files){
    this.setState({
      files: files
    });
  }
  render(){
    return (
      <DropzoneArea
        onChange={this.handleChange.bind(this)}
        />
    )
  }
}

export default DropzoneAreaExample;
```

### DropzoneArea Component Properties

| Name                   | Type     | Default                                     | Description                                                                                                                        |
| ---------------------- | -------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| acceptedFiles          | String[] | \['image/\*', 'video/\*', 'application/\*'] | A list of file types to accept. See [here](https://react-dropzone.js.org/#section-accepting-specific-file-types) for more details. |
| filesLimit             | Number   | 3                                           | Maximum number of files that can be loaded into the dropzone                                                                       |
| maxFileSize            | Number   | 3000000                                     | Maximum file size (in bytes) that the dropzone will accept                                                                         |
| initialFiles           | String[] | []                                          | A list of urls of already uploaded images. Please take care of CORS                                                                |
| dropzoneText           | String   | 'Drag and drop an image file here or click' | Text in dropzone                                                                                                                   |
| dropzoneClass          | String   | null                                        | Custom CSS class name for dropzone container.                                                                                      |
| dropzoneParagraphClass | String   | null                                        | Custom CSS class name for text inside the container.                                                                               |
| previewText            | String   | 'Preview:'                                  | The label for the file preview section                                                                                             |
| showPreviewsInDropzone | Boolean  | true                                        | Shows preview **INSIDE** the Dropzone                                                                                              |
| showFileNames          | Boolean  | false                                       | Shows file name under the dropzone image.                                                                                          |
| showPreviews           | Boolean  | false                                       | Shows previews **BELOW** the Dropzone                                                                                              |
| showFileNamesInPreview | Boolean  | false                                       | Shows file name under the image                                                                                                    |
| useChipsForPreview     | Boolean  | false                                       | Uses deletable Material-ui Chip components to display file names                                                                   |
| previewChipProps       | Object   | {}                                          | Props to pass to the Material-ui Chip components                                                                                   |
| previewGridClasses     | Object   | {}                                          | {container: string, item: string, image: string}. Custom CSS classNames for preview grid components.                               |
| previewGridProps       | Object   | {}                                          | {container: GridProps, item: GridProps}. Props to pass to the Material-ui Grid components.                                         |
| showAlerts             | Boolean  | true                                        | shows styled snackbar alerts when files are dropped, deleted or rejected.                                                          |

### DropzoneArea Component Events

| Name           | Return Params | Description                                                                                                                        |
| -------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| onChange       | File[]        | Fired when the files inside dropzone change. Returns all the files currently loaded into the dropzone.                             |
| onDrop         | File[]        | Fired when the user drops files into the dropzone. Returns the files dropped                                                       |
| onDropRejected | File[]        | Fired when a file is rejected because of wrong file type, size or goes beyond the filesLimit. Returns the files that were rejected |
| onDelete       | File          | Fired when a file is deleted from the previews panel.                                                                              |

### DropzoneArea Componet Get Alert Messages

| Name                      | Params                                   | Return Type | Description                                             | Default message                                                        |
| ------------------------- | ---------------------------------------- | ----------- | ------------------------------------------------------- | ---------------------------------------------------------------------- |
| getFileAddedMessage       | fileName                                 | String      | Get alert message to display when a new file is added   | File `${fileName}` successfully added.                                 |
| getFileLimitExceedMessage | filesLimit                               | String      | Get alert message to display when files limit is exceed | Maximum allowed number of files exceeded. Only `${filesLimit}` allowed |
| getFileRemovedMessage     | fileName                                 | String      | Get alert message to display when a file is removed     | File `${fileName}` removed.                                            |
| getDropRejectMessage      | rejectedFile, acceptedFiles, maxFileSize | String      | Get alert message to display when a file is removed     | File `${rejectedFile.name}` was rejected..                             |

## DropzoneDialog Component

This component provides the DropzoneArea inside of a MaterialUI Dialog.

### Usage

```jsx
import React, { Component } from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';

export default class DropzoneDialogExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: []
        };
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    handleSave(files) {
        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files,
            open: false
        });
    }

    handleOpen() {
        this.setState({
            open: true,
        });
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleOpen.bind(this)}>
                  Add Image
                </Button>
                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={this.handleClose.bind(this)}
                />
            </div>
        );
    }
}
```

### DropzoneDialog Component Properties

DropzoneDialog accepts all the properties of [DropzoneArea](#dropzonearea-component-properties) plus the following

| Name             | Type    | Default | Description                                                 |
| ---------------- | ------- | ------- | ----------------------------------------------------------- |
| open             | Boolean | false   | Required. Sets whether the dialog is open or closed         |
| dialogTitle      | String  | true    | Sets dialog title.                                          |
| dialogProps      | Object  | {}      | Props to pass to the Material-ui Dialog component           |
| cancelButtonText | String  | true    | Sets submit button text in dialog.                          |
| submitButtonText | String  | true    | Sets cancel button text in dialog.                          |
| maxWidth         | String  | 'sm'    | Sets dialog width. Width grows with the size of the screen. |
| fullWidth        | Boolean | true    | If true, the dialog stretches to maxWidth.                  |

### DropzoneDialog Component Events

DropzoneDialog emits all the events of [DropzoneArea](#dropzonearea-component-events) plus the following

| Name    | Return Params | Description                                   |
| ------- | ------------- | --------------------------------------------- |
| onSave  | File[]        | Fired when the user clicks the Submit button. |
| onClose | event         | Fired when the modal is closed                |

## License

MIT
