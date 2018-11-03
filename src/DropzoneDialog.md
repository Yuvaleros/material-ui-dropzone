## DropzoneDialog Component

This component provides the dropzone inside of a dialog. 

### DropzoneDialog Component Usage

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
                <Button style={style.addFileBtn} onClick={this.handleOpen.bind(this)}>
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

| Name           |Type         |Default     |Description
|----------------|-------------|------------|--------------------------------
| open           | Boolean     | false      | Required. Sets whether the dialog is open or closed 
| acceptedFiles  | Array       |\['image/*', 'video/*', 'application/*'], | A list of file mime types to accept. 
| filesLimit    | Number       | 3           | Maximum number of files that can be loaded into the dropzone
| maxFileSize   | Number       | 3000000     | Maximum file size (in bytes) that the dropzone will accept
| showPreviews  | Boolean | false       | Shows previews **BELOW** the Dropzone
| showPreviewsInDropzone| Boolean| true      | Shows preview **INSIDE** the dropzone
| showAlerts    | Boolean | true             | shows styled snackbar alerts when files are dropped, deleted or 


### DropzoneDialog Component Events

|Name            |Return Params|Description
|----------------|-------------|--------------------------------
| onSave         | files(array) | Fired when the user clicks the Submit button. 
| onClose        | event       | Fired when the modal is closed 
| onChange       |files(array) | Fired when the user drops files into dropzone **OR** deletes a file. Returns all the files currently loaded into the dropzone.
| onDrop         |files(array) | Fired when the user drops files into the dropzone. Returns the files dropped 
| onDropRejected |files(array) | Fired when a file is rejected because of wrong file type, size or goes beyond the filesLimit. Returns the files that were rejected
| onDelete       |file        | Fired when a file is deleted from the previews panel. 

  