### Import

```jsx static
import { DropzoneDialogBase } from 'material-ui-dropzone';
```

### Basic usage

```jsx
import Button from '@material-ui/core/Button';

const [open, setOpen] = React.useState(false);
const [fileObjects, setFileObjects] = React.useState([]);

<div>
  <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
    Add Image
  </Button>

  <DropzoneDialogBase
    acceptedFiles={['image/*']}
    fileObjects={fileObjects}
    cancelButtonText={"cancel"}
    submitButtonText={"submit"}
    maxFileSize={5000000}
    open={open}
    onAdd={newFileObjs => {
      console.log('onAdd', newFileObjs);
      setFileObjects([].concat(fileObjects, newFileObjs));
    }}
    onDelete={deleteFileObj => {
      console.log('onDelete', deleteFileObj);
    }}
    onClose={() => setOpen(false)}
    onSave={() => {
      console.log('onSave', fileObjects);
      setOpen(false);
    }}
    showPreviews={true}
    showFileNamesInPreview={true}
  />
</div>
```
