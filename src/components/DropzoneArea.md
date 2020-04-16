### Import

```jsx static
import { DropzoneArea } from 'material-ui-dropzone';
```

### Basic usage

```jsx
<DropzoneArea
  onChange={(files) => console.log('Files:', files)}
/>
```

### Accept only images

```jsx
<DropzoneArea
  acceptedFiles={['image/*']}
  dropzoneText={"Drag and drop an image here or click"}
  onChange={(files) => console.log('Files:', files)}
/>
```
