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
import { AttachFile, AudioTrack, Description, PictureAsPdf, Theaters } from '@mui/icons-material';

const handlePreviewIcon = (fileObject, classes) => {
  const {type} = fileObject.file
  const iconProps = {
    className : classes.image,
  }

  if (type.startsWith("video/")) return <Theaters {...iconProps} />
  if (type.startsWith("audio/")) return <AudioTrack {...iconProps} />

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

### Loading initial files

```jsx

const file = new File(["foo"], "foo.txt", {
  type: "text/plain",
});

<DropzoneArea
  initialFiles = {[file]}
  onChange={(files) => console.log('Files:', files)}
/>
```

### Using chips for preview

Chips use the Grid system as well, so you can customize the way they appears and benefit from the Material-UI grid customizations

```jsx
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => createStyles({
  previewChip: {
    minWidth: 160,
    maxWidth: 210
  },
}));

const classes = useStyles();

<DropzoneArea
  showPreviews={true}
  showPreviewsInDropzone={false}
  useChipsForPreview
  previewGridProps={{container: { spacing: 1, direction: 'row' }}}
  previewChipProps={{classes: { root: classes.previewChip } }}
  previewText="Selected files"
/>
```
