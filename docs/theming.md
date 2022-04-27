`material-ui-dropzone` components support theming through [`MaterialUI Theme`](https://material-ui.com/customization/theming/).

#### DropzoneArea

**Theme Namespace:** `MuiDropzoneArea`

| Rule name     | Global class                   | Description                                                     |
| ------------- | ------------------------------ | --------------------------------------------------------------- |
| root          | .MuiDropzoneArea-root          | The class applied to DropzoneArea container.                    |
| active        | .MuiDropzoneArea-active        | The class applied when the Dropzone is 'active'.                |
| invalid       | .MuiDropzoneArea-invalid       | The class applied when the Dropzone is receiving invalid files. |
| textContainer | .MuiDropzoneArea-textContainer | The class applied to the text container div.                    |
| text          | .MuiDropzoneArea-text          | The class applied to the hint text.                             |
| icon          | .MuiDropzoneArea-icon          | The class applied to the hint icon.                             |

#### Preview list

**Theme Namespace:** `MuiDropzonePreviewList`

| Rule name      | Global class                           | Description                                              |
| -------------- | -------------------------------------- | -------------------------------------------------------- |
| root           | .MuiDropzonePreviewList-root           | The class applied to PreviewList container.              |
| imageContainer | .MuiDropzonePreviewList-imageContainer | The class applied to the single preview image container. |
| image          | .MuiDropzonePreviewList-image          | The class applied to the single preview image.           |
| removeButton   | .MuiDropzonePreviewList-removeButton   | The class applied to the preview 'remove' FAB.           |

#### Alert Snackbar

**Theme Namespace:** `MuiDropzoneSnackbar`

| Rule name    | Global class                      | Description                                                   |
| ------------ | --------------------------------- | ------------------------------------------------------------- |
| infoAlert    | .MuiDropzoneSnackbar-infoAlert    | The class applied to the alert snackbar in case of 'info'.    |
| successAlert | .MuiDropzoneSnackbar-successAlert | The class applied to the alert snackbar in case of 'success'. |
| warningAlert | .MuiDropzoneSnackbar-warningAlert | The class applied to the alert snackbar in case of 'warning'. |
| errorAlert   | .MuiDropzoneSnackbar-errorAlert   | The class applied to the alert snackbar in case of 'error'.   |
| message      | .MuiDropzoneSnackbar-message      | The class applied to the alert snackbar message.              |
| icon         | .MuiDropzoneSnackbar-icon         | The class applied to the alert snackbar icon.                 |
| closeButton  | .MuiDropzoneSnackbar-closeButton  | The class applied to the alert snackbar 'close' button.       |

### Sample theme override

```jsx
import { MuiThemeProvider, createMuiTheme } from "@mui/styles";

import DropzoneArea from '../src/components/DropzoneArea';

const theme = createMuiTheme({
  overrides: {
    MuiDropzoneSnackbar: {
      errorAlert: {
        backgroundColor: "#AFA",
        color: "#000"
      },
      successAlert: {
        backgroundColor: "#FAA",
        color: "#000"
      },
    }
  }
});

<MuiThemeProvider theme={theme}>
  <DropzoneArea maxFileSize={1} />
</MuiThemeProvider>
```
