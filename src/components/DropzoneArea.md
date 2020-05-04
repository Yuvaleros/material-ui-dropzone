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

### Custom Preview Icon

Demonstration of how to customize the preview icon for: 
* PDF files
* Video
* Audio
* Word Documents


```jsx
import react from 'react'
import { AttachFile, AudioTrack, Description, PictureAsPdf, Theaters } from '@material-ui/icons';

const handlePreviewIcon=(fileObject, classes) => {
  const {type} = fileObject.file 
  const iconProps = { className : classes.smallPreviewImg} 

  if (type.startsWith("video/")) return <Theaters {...iconProps} />
  if (type.startsWith("audio/")) return <AudioTrack {...iconProps} />

  let component
  switch (type) {
    case "application/msword": 
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": 
      return <Description {...iconProps} />      
    case "application/pdf":
      return <PictureAsPdf {...iconProps} />  
    default:
      return <AttachFile {...iconProps} />  
  }

}

<DropzoneArea
  getPreviewIcon={handlePreviewIcon}
/>
```
