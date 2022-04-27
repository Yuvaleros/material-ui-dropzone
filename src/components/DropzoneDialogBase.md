### Import

```jsx static
import { DropzoneDialogBase } from 'material-ui-dropzone';
```

### Basic usage

```jsx
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const [open, setOpen] = React.useState(false);
const [fileObjects, setFileObjects] = React.useState([]);

const dialogTitle = () => (
  <>
    <span>Upload file</span>
    <IconButton
      style={{right: '12px', top: '8px', position: 'absolute'}}
      onClick={() => setOpen(false)}>
      <CloseIcon />
    </IconButton>
  </>
);

<div>
  <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
    Add Image
  </Button>

  <DropzoneDialogBase
    dialogTitle={dialogTitle()}
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
