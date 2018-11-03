## DropzoneArea Component

This components creates the dropzone, previews and snackbar notifications without a dialog

### Usage

```jsx
import React, {component} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'

class DropzoneAreaExample extends Component{
  constructor(props){
    super(props);
    this.state = {
      files = []
    };
  }
  handleChange(files){
    this.setState({
      files: files
    });
  }
  render(){
    <DropzoneArea 
      onChange=(this.handleChange.bind(this))
      />
  }
} 
export default DropzoneAreaExample;
```

### DropzoneArea Component Properties

| Name           |Type         |Default     |Description
|----------------|-------------|------------|--------------------------------
| acceptedFiles  | Array       |\['image/*', 'video/*', 'application/*'], | A list of file mime types to accept. 
| filesLimit    | Number       | 3           | Maximum number of files that can be loaded into the dropzone
| maxFileSize   | Number       | 3000000     | Maximum file size (in bytes) that the dropzone will accept
| showPreviews  | Boolean | false       | Shows previews **BELOW** the Dropzone
| showPreviewsInDropzone| Boolean| true      | Shows preview **INSIDE** the dropzone
| showAlerts    | Boolean | true             | shows styled snackbar alerts when files are dropped, deleted or rejected. 
    


### DropzoneArea Component Events

|Name            |Return Params|Description
|----------------|-------------|--------------------------------
|onChange        |files(array) | Fired when the user drops files into dropzone or deletes a file. Returns all the files currently loaded into the dropzone.
|onDrop          |files(array) | Fired when the user drops files into the dropzone. Returns the files dropped 
|onDropRejected  |files(array) | Fired when a file is rejected because of wrong file type, size or goes beyond the filesLimit. Returns the files that were rejected
|onDelete        |file        | Fired when a file is deleted from the previews panel. 
