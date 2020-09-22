import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useCallback } from 'react';
import Dropzone from 'react-dropzone';

import { convertBytesToMbsOrKbs, readFile } from '../helpers';
import useSnackbar from '../hooks/useSnackbar';

import PreviewList from './PreviewList';
import SnackbarContentWrapper from './SnackbarContentWrapper';

const useStyles = makeStyles(
  ({ spacing, palette, shape }) => ({
    '@keyframes progress': {
      '0%': {
        backgroundPosition: '0 0',
      },
      '100%': {
        backgroundPosition: '-70px 0',
      },
    },
    root: {
      display: 'flex',
      position: 'relative',
      width: '100%',
      minHeight: '250px',
      backgroundColor: palette.background.paper,
      border: 'dashed',
      borderColor: palette.divider,
      borderRadius: shape.borderRadius,
      boxSizing: 'border-box',
      cursor: 'pointer',
      overflow: 'hidden',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    active: {
      animation: '$progress 2s linear infinite !important',
      backgroundImage: `repeating-linear-gradient(-45deg,
            ${palette.background.paper},
            ${palette.background.paper} 25px,
            ${palette.divider} 25px,
            ${palette.divider} 50px)`,
      backgroundSize: '150% 100%',
      border: 'solid',
      borderColor: palette.primary.light,
    },
    invalid: {
      backgroundImage: `repeating-linear-gradient(-45deg,
            ${palette.error.light},
            ${palette.error.light} 25px,
            ${palette.error.dark} 25px,
            ${palette.error.dark} 50px)`,
      borderColor: palette.error.main,
    },
    textContainer: {
      display: 'flex',
    },
    text: {
      marginBottom: spacing(3),
      marginTop: spacing(3),
    },
    icon: {
      width: 51,
      height: 51,
      color: palette.text.primary,
    },
  }),
  { name: 'MuiDropzoneArea' },
);

const shouldShowAlert = (enabledAlerts, alertVariant) => {
  if (!Array.isArray(enabledAlerts)) {
    return true;
  }
  return enabledAlerts.includes(alertVariant);
};

const defaultGetCols = (width, filesLimit) => {
  const returnBelowLimit = (number) => {
    if (number < filesLimit) {
      return number;
    }
    return filesLimit;
  };

  switch (width) {
    case 'xs':
      return returnBelowLimit(1);
    case 'sm':
      return returnBelowLimit(2);
    case 'md':
      return returnBelowLimit(3);
    case 'lg':
      return returnBelowLimit(4);
    case 'xl':
      return returnBelowLimit(5);
    default:
      return returnBelowLimit(3);
  }
};

const defaultSnackbarAnchorOrigin = {
  horizontal: 'left',
  vertical: 'bottom',
};

const defaultGetPreviewIcon = (fileObject, classes, isImage, titleBarTop) => {
  if (isImage) {
    return <img alt="" className={classes.image} src={fileObject.data} />;
  }

  return (
    <Grid container className={classes.iconWrapper} justify="center">
      <AttachFileIcon
        className={clsx(classes.fileIcon, {
          [classes.fileIconBottom]: titleBarTop,
        })}
      />
    </Grid>
  );
};

/**
 * This components creates a Material-UI Dropzone, with previews and snackbar notifications.
 */
const DropzoneAreaBase = ({
  fileObjects,
  filesLimit,
  getFileAddedMessage,
  getFileLimitExceedMessage,
  getFileRemovedMessage,
  getDropRejectMessage,
  onAdd,
  onAlert,
  onDrop,
  onDropRejected,
  onDelete,
  onPreviewClick,
  acceptedFiles,
  alertSnackbarProps,
  disableRejectionFeedback,
  dropzoneClass,
  dropzoneParagraphClass,
  dropzoneProps,
  dropzoneText,
  getCols,
  getPreviewIcon,
  Icon,
  inputProps,
  maxFileSize,
  previewChipProps,
  previewGridClasses,
  previewGridProps,
  previewText,
  previewType,
  showAlerts,
  showFileNames,
  useChipsForPreview,
}) => {
  const classes = useStyles();

  const {
    handleCloseSnackbar,
    sendMessage,
    snackbarMessage,
    snackbarOpen,
    snackbarVariant,
  } = useSnackbar(onAlert);

  const handleDropAccepted = useCallback(
    async (droppedFiles, evt) => {
      if (
        filesLimit > 1 &&
        fileObjects.length + droppedFiles.length > filesLimit
      ) {
        const message = getFileLimitExceedMessage(filesLimit);
        sendMessage(message, 'error');
        return;
      }

      // Notify Drop event
      if (onDrop) {
        onDrop(droppedFiles, evt);
      }

      // Retrieve fileObjects data
      const fileObjs = await Promise.all(
        droppedFiles.map(async (file) => {
          const data = await readFile(file);
          return {
            file,
            data,
          };
        }),
      );

      // Notify added files
      if (onAdd) {
        onAdd(fileObjs);
      }

      const successMessage = fileObjs.reduce(
        (msg, fileObj) => msg + getFileAddedMessage(fileObj.file.name),
        '',
      );
      sendMessage(successMessage, 'success');
    },
    [
      filesLimit,
      fileObjects.length,
      onDrop,
      onAdd,
      sendMessage,
      getFileLimitExceedMessage,
      getFileAddedMessage,
    ],
  );

  const handleDropRejected = useCallback(
    (rejectedFiles, evt) => {
      let message = '';
      rejectedFiles.forEach((rejectedFile) => {
        message = getDropRejectMessage(
          rejectedFile,
          acceptedFiles,
          maxFileSize,
        );
      });

      if (onDropRejected) {
        onDropRejected(rejectedFiles, evt);
      }
      sendMessage(message, 'error');
    },
    [
      acceptedFiles,
      getDropRejectMessage,
      maxFileSize,
      onDropRejected,
      sendMessage,
    ],
  );

  const handleRemove = useCallback(
    (fileIndex) => (event) => {
      event.stopPropagation();

      // Find removed fileObject
      const removedFileObj = fileObjects[fileIndex];

      // Notify removed file
      if (onDelete) {
        onDelete(removedFileObj, fileIndex);
      }
      const message = getFileRemovedMessage(removedFileObj.file.name);
      sendMessage(message, 'info');
    },
    [fileObjects, onDelete, getFileRemovedMessage, sendMessage],
  );

  const handlePreviewClick = useCallback(
    (fileIndex) => (event) => {
      event.stopPropagation();

      // Find previewed fileObject
      const previewedFileObj = fileObjects[fileIndex];

      onPreviewClick(previewedFileObj, fileIndex);
    },
    [fileObjects, onPreviewClick],
  );

  const acceptFiles = acceptedFiles?.join(',');
  const isMultiple = filesLimit > 1;
  const someFiles = fileObjects.length > 0;

  const alertsEnabled =
    (typeof showAlerts === 'boolean' && showAlerts) ||
    Array.isArray(showAlerts);
  const isAlertOpen =
    snackbarOpen && shouldShowAlert(showAlerts, snackbarVariant);

  return (
    <>
      <Dropzone
        {...dropzoneProps}
        accept={acceptFiles}
        onDropAccepted={handleDropAccepted}
        onDropRejected={handleDropRejected}
        maxSize={maxFileSize}
        multiple={isMultiple}
      >
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <div
            {...getRootProps({
              className: clsx(
                classes.root,
                dropzoneClass,
                isDragActive && classes.active,
                !disableRejectionFeedback && isDragReject && classes.invalid,
              ),
            })}
          >
            <input {...getInputProps(inputProps)} />

            <Grid
              container
              className={classes.textContainer}
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Typography
                variant="h5"
                component="p"
                className={clsx(classes.text, dropzoneParagraphClass)}
              >
                {dropzoneText}
              </Typography>

              {Icon ? (
                <Icon className={classes.icon} />
              ) : (
                <CloudUploadIcon className={classes.icon} />
              )}
            </Grid>

            {someFiles && previewType === 'inside' ? (
              <PreviewList
                fileObjects={fileObjects}
                filesLimit={filesLimit}
                getCols={getCols}
                handleRemove={handleRemove}
                getPreviewIcon={getPreviewIcon}
                showFileNames={showFileNames}
                useChipsForPreview={useChipsForPreview}
                previewChipProps={previewChipProps}
                previewGridClasses={previewGridClasses}
                previewGridProps={previewGridProps}
                previewType={previewType}
                handlePreviewClick={handlePreviewClick}
              />
            ) : null}
          </div>
        )}
      </Dropzone>

      {someFiles && previewType === 'below' ? (
        <>
          <Typography variant="subtitle1" component="span">
            {previewText}
          </Typography>

          <PreviewList
            fileObjects={fileObjects}
            filesLimit={filesLimit}
            getCols={getCols}
            handleRemove={handleRemove}
            getPreviewIcon={getPreviewIcon}
            showFileNames={showFileNames}
            useChipsForPreview={useChipsForPreview}
            previewChipProps={previewChipProps}
            previewGridClasses={previewGridClasses}
            previewGridProps={previewGridProps}
            previewType={previewType}
            handlePreviewClick={handlePreviewClick}
          />
        </>
      ) : null}

      {alertsEnabled ? (
        <Snackbar
          anchorOrigin={defaultSnackbarAnchorOrigin}
          autoHideDuration={6000}
          {...alertSnackbarProps}
          open={isAlertOpen}
          onClose={handleCloseSnackbar}
        >
          <SnackbarContentWrapper
            onClose={handleCloseSnackbar}
            variant={snackbarVariant}
            message={snackbarMessage}
          />
        </Snackbar>
      ) : null}
    </>
  );
};

DropzoneAreaBase.defaultProps = {
  acceptedFiles: [],
  filesLimit: 3,
  fileObjects: [],
  maxFileSize: 3000000,
  dropzoneText: 'Drag and drop a file here or click',
  previewText: 'Preview:',
  previewType: 'inside',
  disableRejectionFeedback: false,
  showFileNames: true,
  useChipsForPreview: false,
  previewChipProps: {},
  previewGridClasses: {},
  previewGridProps: {},
  showAlerts: true,
  alertSnackbarProps: {
    anchorOrigin: {
      horizontal: 'left',
      vertical: 'bottom',
    },
    autoHideDuration: 6000,
  },
  getCols: defaultGetCols,
  getFileLimitExceedMessage: (filesLimit) =>
    `Maximum allowed number of files exceeded. Only ${filesLimit} allowed`,
  getFileAddedMessage: (fileName) => `File ${fileName} successfully added.`,
  getPreviewIcon: defaultGetPreviewIcon,
  getFileRemovedMessage: (fileName) => `File ${fileName} removed.`,
  getDropRejectMessage: (rejectedFile, acceptedFiles, maxFileSize) => {
    let message = `File ${rejectedFile.name} was rejected. `;
    if (!acceptedFiles.includes(rejectedFile.type)) {
      message += 'File type not supported. ';
    }
    if (rejectedFile.size > maxFileSize) {
      message += `File is too big. Size limit is ${convertBytesToMbsOrKbs(
        maxFileSize,
      )}. `;
    }
    return message;
  },
  onPreviewClick: () => {},
};

export const FileObjectShape = PropTypes.shape({
  file: PropTypes.object,
  data: PropTypes.any,
});

DropzoneAreaBase.propTypes = {
  /** A list of file types to accept.
   * @see See [here](https://react-dropzone.js.org/#section-accepting-specific-file-types) for more details.
   */
  acceptedFiles: PropTypes.arrayOf(PropTypes.string),
  /** Maximum number of files that can be loaded into the dropzone. */
  filesLimit: PropTypes.number,
  /** Icon to be displayed inside the dropzone area. */
  Icon: PropTypes.elementType,
  /** Currently loaded files. */
  fileObjects: PropTypes.arrayOf(FileObjectShape),
  /** Maximum file size (in bytes) that the dropzone will accept. */
  maxFileSize: PropTypes.number,
  /** Text inside the dropzone. */
  dropzoneText: PropTypes.string,
  /** Custom CSS class name for dropzone container. */
  dropzoneClass: PropTypes.string,
  /** Custom CSS class name for text inside the container. */
  dropzoneParagraphClass: PropTypes.string,
  /** Disable feedback effect when dropping rejected files. */
  disableRejectionFeedback: PropTypes.bool,
  /** Shows file name under the dropzone image. */
  showFileNames: PropTypes.bool,
  /** Uses deletable Material-UI Chip components to display file names. */
  useChipsForPreview: PropTypes.bool,
  /**
   * Props to pass to the Material-UI Chip components.<br/>Requires `useChipsForPreview` prop to be `true`.
   *
   * @see See [Material-UI Chip](https://material-ui.com/api/chip/#props) for available values.
   */
  previewChipProps: PropTypes.object,
  /**
   * Custom CSS classNames for preview Grid components.<br/>
   * Should be in the form {container: string, item: string, image: string}.
   */
  previewGridClasses: PropTypes.object,
  /**
   * Props to pass to the Material-UI Grid components.<br/>
   * Should be in the form {container: GridProps, item: GridProps}.
   *
   * @see See [Material-UI Grid](https://material-ui.com/api/grid/#props) for available GridProps values.
   */
  previewGridProps: PropTypes.object,
  /** The label for the file preview section. */
  previewText: PropTypes.string,
  /** Determines whether previews are shown inside the dropzone area, below, or not at all. Acceptable values are 'inside', 'below', 'none'. */
  previewType: PropTypes.oneOf(['inside', 'below', 'none']),
  /**
   * Shows styled Material-UI Snackbar when files are dropped, deleted or rejected.
   *
   * - can be a boolean ("global" `true` or `false` for all alerts).
   * - can be an array, with values 'error', 'info', 'success' to select to view only certain alerts:
   *  - showAlerts={['error']} for only errors.
   *  - showAlerts={['error', 'info']} for both errors and info.
   *  - showAlerts={['error', 'success', 'info']} is same as showAlerts={true}.
   *  - showAlerts={[]} is same as showAlerts={false}.
   */
  showAlerts: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.oneOf(['error', 'success', 'info'])),
  ]),
  /**
   * Props to pass to the Material-UI Snackbar components.<br/>Requires `showAlerts` prop to be `true`.
   *
   * @see See [Material-UI Snackbar](https://material-ui.com/api/snackbar/#props) for available values.
   */
  alertSnackbarProps: PropTypes.object,
  /**
   * Props to pass to the Dropzone component.
   *
   * @see See [Dropzone props](https://react-dropzone.js.org/#src) for available values.
   */
  dropzoneProps: PropTypes.object,
  /**
   * Attributes applied to the input element.
   *
   * @see See [MDN Input File attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Additional_attributes) for available values.
   */
  inputProps: PropTypes.object,
  /**
   * A function which determines which the number of columns to display in the preview list
   *
   * *Default*: Returns a sensible number of columns depending on the screen size (i.e. xs=1, sm=2, md=3, lg=4, xl=5) without exceeding the filesLimit (e.g. There would be no point displaying 4 columns if the filesLimit is 3)
   *
   * @param {string} width Width prop from useWidth, this will be one of ['xs','sm','md','lg','xl'] depending on the current screen size
   * @param {number} filesLimit The `filesLimit` prop
   * @param {number} currentNumberOfFiles The number of files in the `state.fileObjects`
   */
  getCols: PropTypes.func,
  /**
   * Get alert message to display when files limit is exceed.
   *
   * *Default*: "Maximum allowed number of files exceeded. Only ${filesLimit} allowed"
   *
   * @param {number} filesLimit The `filesLimit` currently set for the component.
   */
  getFileLimitExceedMessage: PropTypes.func,
  /**
   * Get alert message to display when a new file is added.
   *
   * *Default*: "File ${fileName} successfully added."
   *
   * @param {string} fileName The newly added file name.
   */
  getFileAddedMessage: PropTypes.func,
  /**
   * Get alert message to display when a file is removed.
   *
   * *Default*: "File ${fileName} removed."
   *
   * @param {string} fileName The name of the removed file.
   */
  getFileRemovedMessage: PropTypes.func,
  /**
   * Get alert message to display when a file is rejected onDrop.
   *
   * *Default*: "File ${rejectedFile.name} was rejected."
   *
   * @param {Object} rejectedFile The file that got rejected
   * @param {string[]} acceptedFiles The `acceptedFiles` prop currently set for the component
   * @param {number} maxFileSize The `maxFileSize` prop currently set for the component
   */
  getDropRejectMessage: PropTypes.func,
  /**
   * A function which determines which icon to display for a file preview.
   *
   * *Default*: If its an image then displays a preview the image, otherwise it will display an attachment icon
   *
   * @param {FileObject} objectFile The file which the preview will belong to
   * @param {Object} classes The classes for the file preview icon, in the default case we use the 'image' className.
   */
  getPreviewIcon: PropTypes.func,
  /**
   * Fired when new files are added to dropzone.
   *
   * @param {FileObject[]} newFiles The new files added to the dropzone.
   */
  onAdd: PropTypes.func,
  /**
   * Fired when an alert is triggered.
   *
   * @param {string} message Alert message.
   * @param {string} variant One of "error", "info", "success".
   */
  onAlert: PropTypes.func,
  /**
   * Fired when a file is deleted from the previews panel.
   *
   * @param {FileObject} deletedFileObject The file that was removed.
   * @param {number} index The index of the removed file object.
   */
  onDelete: PropTypes.func,
  /**
   * Fired when the user drops files into the dropzone.
   *
   * @param {File[]} droppedFiles All the files dropped into the dropzone.
   * @param {Event} event The react-dropzone drop event.
   */
  onDrop: PropTypes.func,
  /**
   * Fired when a file is rejected because of wrong file type, size or goes beyond the filesLimit.
   *
   * @param {File[]} rejectedFiles All the rejected files.
   * @param {Event} event The react-dropzone drop event.
   */
  onDropRejected: PropTypes.func,
  /**
   * Fired when the user click que preview icon in the image. If this props was not informed, the preview icon doesn't appears.
   *
   * @param {File} clickedFile File was clicked.
   * @param {number} index The index of clicked file object.
   */
  onPreviewClick: PropTypes.func,
};

export default DropzoneAreaBase;
