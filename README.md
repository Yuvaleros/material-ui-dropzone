# material-ui-dropzone

> Material-UI-dropzone is a [React](https://github.com/facebook/react) component using [Material-UI](https://github.com/mui-org/material-ui) and is based on the excellent [react-dropzone](https://github.com/react-dropzone/react-dropzone) library.

This components provide either a file-upload dropzone or a file-upload dropzone inside of a dialog.

The file-upload dropzone features some snazzy "File Allowed/Not Allowed" effects, previews and alerts.

## Installation

```shell
npm install --save material-ui-dropzone
```

or

```shell
yarn add material-ui-dropzone
```

## Support

`material-ui-dropzone` complies to the following support matrix.

| version | React            | Material-UI    |
| ------- | ---------------- | -------------- |
| `4.x`   | `16.8+`          | `4.x`          |
| `2.x`   | `15.x` or `16.x` | `3.x` or `4.x` |

## Screenshots

This is the Dialog component:

![Dialog](https://raw.githubusercontent.com/Yuvaleros/material-ui-dropzone/master/pics/demo_pic.jpg)
![Dialog with Previews](https://raw.githubusercontent.com/Yuvaleros/material-ui-dropzone/master/pics/demo_pic5.JPG)

When you drag a file onto the dropzone, you get a neat effect:

![Drag Overlay](https://raw.githubusercontent.com/Yuvaleros/material-ui-dropzone/master/pics/demo_pic2.JPG)

And if you drag in a wrong type of file, you'll get yelled at:

![Drag Error Overlay](https://raw.githubusercontent.com/Yuvaleros/material-ui-dropzone/master/pics/demo_pic4.JPG)

**N.B. This has some limitations (see [here](https://github.com/react-dropzone/react-dropzone/tree/master/examples/accept#browser-limitations) for more details).**

## Documentation and Examples

See [https://yuvaleros.github.io/material-ui-dropzone](https://yuvaleros.github.io/material-ui-dropzone) for Documentation and Examples.

## Components

### DropzoneArea

This components creates the dropzone, previews and snackbar notifications without a dialog

```jsx static
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

### DropzoneDialog

This component provides the DropzoneArea inside of a MaterialUI Dialog.

```jsx static
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

## License

MIT
