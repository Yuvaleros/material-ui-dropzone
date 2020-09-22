### Import

```jsx static
import { DropzoneAreaBase } from "material-ui-dropzone";
```

### Basic usage

```jsx
<DropzoneAreaBase
  onAdd={(fileObjs) => console.log("Added Files:", fileObjs)}
  onDelete={(fileObj) => console.log("Removed File:", fileObj)}
  onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
  onPreviewClick={(fileObject) => console.log("onPreviewClick:", fileObject)}
/>
```

### Accept only images

```jsx
import React, { useState } from "react";
const [fileObjects, setFileObjects] = useState([]);

<DropzoneAreaBase
  fileObjects={fileObjects}
  acceptedFiles={["image/*"]}
  dropzoneText={"Drag and drop an image here or click"}
  onChange={(files) => console.log("Files:", files)}
  onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
  onAdd={(newFileObjs) => {
    console.log("onAdd", newFileObjs);
    setFileObjects([].concat(fileObjects, newFileObjs));
  }}
  onPreviewClick={(fileObject, index) =>
    console.log("onPreviewClick:", fileObject, "index", index)
  }
/>;
```

### Custom Dropzone Icon

```jsx
import { AttachFile } from "@material-ui/icons";

<DropzoneAreaBase
  Icon={AttachFile}
  dropzoneText={"Drag and drop an image here or click"}
  onChange={(files) => console.log("Files:", files)}
  onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
  onPreviewClick={(fileObject) => console.log("onPreviewClick:", fileObject)}
/>;
```

### Custom Preview Icon

Demonstration of how to customize the preview icon for:

- PDF files
- Video
- Audio
- Word Documents

```jsx
import React, { useState } from "react";
import {
  AttachFile,
  AudioTrack,
  Description,
  PictureAsPdf,
  Theaters,
} from "@material-ui/icons";

const handlePreviewIcon = (
  fileObject,
  classes,
  isImage,
  titleBarTop,
  handlePreviewClick
) => {
  const { type } = fileObject.file;
  const iconProps = {
    className: classes.image,
  };

  if (isImage)
    return (
      <img
        onClick={handlePreviewClick}
        tabIndex={handlePreviewClick ? 0 : -1}
        src={fileObject.data}
        {...iconProps}
      />
    );
  if (type.startsWith("video/")) return <Theaters {...iconProps} />;
  if (type.startsWith("audio/")) return <AudioTrack {...iconProps} />;

  switch (type) {
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return <Description {...iconProps} />;
    case "application/pdf":
      return <PictureAsPdf {...iconProps} />;
    default:
      return <AttachFile {...iconProps} />;
  }
};

const [fileObjects, setFileObjects] = useState([]);

<DropzoneAreaBase
  fileObjects={fileObjects}
  onAdd={(newFileObjs) => {
    console.log("onAdd", newFileObjs);
    setFileObjects([].concat(fileObjects, newFileObjs));
  }}
  onDelete={(deleteFileObj) => {
    console.log("onDelete", deleteFileObj);
  }}
  getPreviewIcon={handlePreviewIcon}
  onPreviewClick={(fileObject) => console.log("onPreviewClick:", fileObject)}
/>;
```
