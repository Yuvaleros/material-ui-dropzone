### Import

```jsx static
import { DropzoneArea } from 'material-ui-dropzone';
```

### Basic usage

Add up to 3 files

```jsx
<DropzoneArea
  onChange={(files) => console.log('Files:', files)}
/>
```

### Single file upload

```jsx
<DropzoneArea
  filesLimit={1}
  onChange={(files) => console.log('Files:', files)}
/>
```

### Up to 20 files (previewed inside dropzone area)

```jsx
<DropzoneArea
  filesLimit={20}  
  onChange={(files) => console.log('Files:', files)}
/>
```


### Up to 20 Files (previewed below dropzone area)

```jsx
<DropzoneArea
  filesLimit={20}
  previewType='below'
  showFileNames
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
import * as React from 'react';
import Grid from '@material-ui/core/Grid'
import { AttachFile, AudioTrack, Description, PictureAsPdf, Theaters } from '@material-ui/icons';
import clsx from 'clsx'

const handlePreviewIcon = (fileObject, classes, isImage, titleBarTop) => {
  const {type} = fileObject.file
  const iconProps = {
     className : clsx(classes.fileIcon, {[classes.fileIconBottom]: titleBarTop})
  }

  let icon

  if (type.startsWith("video/")) icon = <Theaters {...iconProps} />
  if (type.startsWith("audio/")) icon = <AudioTrack {...iconProps} />

  switch (type) {
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      icon = <Description {...iconProps} />;
      break;
    case "application/pdf":
      icon = <PictureAsPdf {...iconProps} />;
      break;
    default:
      icon = <AttachFile {...iconProps} />;
      break;      
  }

  return <Grid container className={classes.iconWrapper} justify="center" >
        {icon}
    </Grid>
}

<DropzoneArea
  getPreviewIcon={handlePreviewIcon}
  
/>
```


### With custom preview props

```jsx
<DropzoneArea
  filesLimit={20}
  showFileNames
  previewGridProps={{
    gridList : {
      cellHeight: 220, // the mui default is 180
      cols: 4, // force the number of columns
    },
    gridListTitleBar : {
      titlePosition : 'top', // mui default is bottom
      actionPosition: 'left', // mui default is right
      style: {backgroundColor: 'rgba(248, 132, 132, 0.63)'}
    },
  }}
  
  onChange={(files) => console.log('Files:', files)}
/>
```