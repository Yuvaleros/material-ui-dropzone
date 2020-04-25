import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import Dropzone from "react-dropzone";

import {
  convertBytesToMbsOrKbs,
  createFileFromUrl,
  readFile,
} from "../helpers";

import PreviewList from "./PreviewList";
import SnackbarContentWrapper from "./SnackbarContentWrapper";

const styles = {
  "@keyframes progress": {
    "0%": {
      backgroundPosition: "0 0",
    },
    "100%": {
      backgroundPosition: "-70px 0",
    },
  },
  dropZone: {
    position: "relative",
    width: "100%",
    minHeight: "250px",
    backgroundColor: "#F0F0F0",
    border: "dashed",
    borderColor: "#C8C8C8",
    cursor: "pointer",
    boxSizing: "border-box",
  },
  stripes: {
    border: "solid",
    backgroundImage:
      "repeating-linear-gradient(-45deg, #F0F0F0, #F0F0F0 25px, #C8C8C8 25px, #C8C8C8 50px)",
    animation: "progress 2s linear infinite !important",
    backgroundSize: "150% 100%",
  },
  rejectStripes: {
    backgroundImage:
      "repeating-linear-gradient(-45deg, #fc8785, #fc8785 25px, #f4231f 25px, #f4231f 50px)",
  },
  dropzoneTextStyle: {
    textAlign: "center",
  },
  uploadIconSize: {
    width: 51,
    height: 51,
    color: "#909090",
  },
  dropzoneParagraph: {
    marginBottom: 20,
    marginTop: 20,
  },
};

const snackbarAnchorOrigin = {
  vertical: "bottom",
  horizontal: "left",
};

/**
 * This components creates a Material-UI Dropzone, with previews and snackbar notifications.
 */
const DropzoneAreaFunc = (props) => {
  const {
    acceptedFiles,
    classes,
    clearOnUnmount,
    disableRejectionFeedback,
    dropzoneClass,
    dropzoneParagraphClass,
    dropzoneText,
    filesLimit,
    getDropRejectMessage,
    getFileAddedMessage,
    getFileLimitExceedMessage,
    getFileRemovedMessage,
    initialFiles,
    maxFileSize,
    onChange,
    onDelete,
    onDrop,
    onDropRejected,
    previewChipProps,
    previewGridClasses,
    previewGridProps,
    previewText,
    showAlerts,
    showFileNames,
    showFileNamesInPreview,
    showPreviews,
    showPreviewsInDropzone,
    useChipsForPreview,
  } = props;

  const [fileObjects, setFileObjects] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState("success");

  useEffect(() => {
    filesArray(initialFiles);

    return () => {
      if (clearOnUnmount) {
        setFileObjects([]);

        if (onChange) {
          onChange([]);
        }
      }
    };
  }, []);

  const filesArray = async (urls) => {
    try {
      const fileObjs = await Promise.all(
        urls.map(async (url) => {
          const file = await createFileFromUrl(url);
          const data = await readFile(file);

          return {
            file,
            data,
          };
        })
      );

      setFileObjects([].concat(fileObjects, fileObjs));
      if (onChange) {
        onChange(fileObjects.map((fileObject) => fileObject.file));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSnackbarState = (shouldOpen, message, variant) => {
    setOpenSnackBar(shouldOpen);
    setSnackbarMessage(message);
    setSnackbarVariant(variant);
  };

  const handleDropAccepted = async (acceptedFiles, evt) => {
    if (
      filesLimit > 1 &&
      fileObjects.length + acceptedFiles.length > filesLimit
    ) {
      handleSnackbarState(true, getFileLimitExceedMessage(filesLimit), "error");
      return;
    }

    // Notify Drop event
    if (onDrop) {
      onDrop(acceptedFiles, evt);
    }

    // Retrieve fileObjects data
    const fileObjs = await Promise.all(
      acceptedFiles.map(async (file) => {
        const data = await readFile(file);
        return {
          file,
          data,
        };
      })
    );

    // Display message
    const message = fileObjs.reduce(
      (msg, fileObj) => msg + getFileAddedMessage(fileObj.file.name),
      ""
    );

    handleSnackbarState(true, message, "success");

    // Update component state
    const concatedFiles = [...fileObjects, ...fileObjs];

    setFileObjects(concatedFiles);

    if (onChange) {
      onChange(concatedFiles.map((fileObject) => fileObject.file));
    }
  };

  const handleDropRejected = (rejectedFiles, evt) => {
    let message = "";
    rejectedFiles.forEach((rejectedFile) => {
      message = getDropRejectMessage(rejectedFile, acceptedFiles, maxFileSize);
    });

    if (onDropRejected) {
      onDropRejected(rejectedFiles, evt);
    }

    handleSnackbarState(true, message, "error");
  };

  const handleRemove = (fileIndex) => (event) => {
    event.stopPropagation();

    // Find removed fileObject
    const removedFileObj = fileObjects.filter((fileObject, i) => {
      return i === fileIndex;
    })[0];
    // Calculate remaining fileObjects array
    const remainingFileObjs = fileObjects.filter((fileObject, i) => {
      return i !== fileIndex;
    });

    setFileObjects(remainingFileObjs);

    if (onDelete) {
      onDelete(removedFileObj.file);
    }

    if (onChange) {
      onChange(remainingFileObjs.map((fileObject) => fileObject.file));
    }

    handleSnackbarState(
      true,
      getFileRemovedMessage(removedFileObj.file.name),
      "info"
    );
  };

  const handleCloseSnackbar = () => {
    setOpenSnackBar(false);
  };

  const acceptFiles = acceptedFiles?.join(",");
  const isMultiple = filesLimit > 1;
  const previewsVisible = showPreviews && fileObjects.length > 0;
  const previewsInDropzoneVisible =
    showPreviewsInDropzone && fileObjects.length > 0;

  return (
    <Fragment>
      <Dropzone
        accept={acceptFiles}
        onDropAccepted={handleDropAccepted}
        onDropRejected={handleDropRejected}
        maxSize={maxFileSize}
        multiple={isMultiple}
      >
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <div
            {...getRootProps()}
            className={clsx(
              classes.dropZone,
              dropzoneClass,
              isDragActive && classes.stripes,
              !disableRejectionFeedback && isDragReject && classes.rejectStripes
            )}
          >
            <input {...getInputProps()} />

            <div className={classes.dropzoneTextStyle}>
              <Typography
                variant='h5'
                component='p'
                className={clsx(
                  classes.dropzoneParagraph,
                  dropzoneParagraphClass
                )}
              >
                {dropzoneText}
              </Typography>
              <CloudUploadIcon className={classes.uploadIconSize} />
            </div>

            {previewsInDropzoneVisible && (
              <PreviewList
                fileObjects={fileObjects}
                handleRemove={handleRemove}
                showFileNames={showFileNames}
                useChipsForPreview={useChipsForPreview}
                previewChipProps={previewChipProps}
                previewGridClasses={previewGridClasses}
                previewGridProps={previewGridProps}
              />
            )}
          </div>
        )}
      </Dropzone>

      {previewsVisible && (
        <Fragment>
          <Typography variant='subtitle1' component='span'>
            {previewText}
          </Typography>

          <PreviewList
            fileObjects={fileObjects}
            handleRemove={handleRemove}
            showFileNames={showFileNamesInPreview}
            useChipsForPreview={useChipsForPreview}
            previewChipProps={previewChipProps}
            previewGridClasses={previewGridClasses}
            previewGridProps={previewGridProps}
          />
        </Fragment>
      )}

      {showAlerts && (
        <Snackbar
          anchorOrigin={snackbarAnchorOrigin}
          open={openSnackBar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <SnackbarContentWrapper
            onClose={handleCloseSnackbar}
            variant={snackbarVariant}
            message={snackbarMessage}
          />
        </Snackbar>
      )}
    </Fragment>
  );
};

DropzoneAreaFunc.defaultProps = {
  acceptedFiles: ["image/*", "video/*", "application/*"],
  filesLimit: 3,
  maxFileSize: 3000000,
  dropzoneText: "Drag and drop a file here or click",
  previewText: "Preview:",
  disableRejectionFeedback: false,
  showPreviews: false, // By default previews show up under in the dialog and inside in the standalone
  showPreviewsInDropzone: true,
  showFileNames: false,
  showFileNamesInPreview: false,
  useChipsForPreview: false,
  previewChipProps: {},
  previewGridClasses: {},
  previewGridProps: {},
  showAlerts: true,
  clearOnUnmount: true,
  initialFiles: [],
  getFileLimitExceedMessage: (filesLimit) =>
    `Maximum allowed number of files exceeded. Only ${filesLimit} allowed`,
  getFileAddedMessage: (fileName) => `File ${fileName} successfully added.`,
  getFileRemovedMessage: (fileName) => `File ${fileName} removed.`,
  getDropRejectMessage: (rejectedFile, acceptedFiles, maxFileSize) => {
    let message = `File ${rejectedFile.name} was rejected. `;
    if (!acceptedFiles.includes(rejectedFile.type)) {
      message += "File type not supported. ";
    }
    if (rejectedFile.size > maxFileSize) {
      message +=
        "File is too big. Size limit is " +
        convertBytesToMbsOrKbs(maxFileSize) +
        ". ";
    }
    return message;
  },
};

DropzoneAreaFunc.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** A list of file types to accept.
   * @see See [here](https://react-dropzone.js.org/#section-accepting-specific-file-types) for more details.
   */
  acceptedFiles: PropTypes.arrayOf(PropTypes.string),
  /** Maximum number of files that can be loaded into the dropzone. */
  filesLimit: PropTypes.number,
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
  /** Shows previews **BELOW** the dropzone. */
  showPreviews: PropTypes.bool,
  /** Shows preview **INSIDE** the dropzone area. */
  showPreviewsInDropzone: PropTypes.bool,
  /** Shows file name under the dropzone image. */
  showFileNames: PropTypes.bool,
  /** Shows file name under the image. */
  showFileNamesInPreview: PropTypes.bool,
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
  /** Shows styled Material-UI Snackbar when files are dropped, deleted or rejected. */
  showAlerts: PropTypes.bool,
  /** Clear uploaded files when component is unmounted. */
  clearOnUnmount: PropTypes.bool,
  /** List of URLs of already uploaded images.<br/>**Note:** Please take care of CORS. */
  initialFiles: PropTypes.arrayOf(PropTypes.string),
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
   * Fired when the files inside dropzone change.
   *
   * @param {File[]} loadedFiles All the files currently loaded into the dropzone.
   */
  onChange: PropTypes.func,
  /**
   * Fired when the user drops files into the dropzone.
   *
   * @param {File[]} droppedFiles All the files dropped into the dropzone.
   */
  onDrop: PropTypes.func,
  /**
   * Fired when a file is rejected because of wrong file type, size or goes beyond the filesLimit.
   *
   * @param {File[]} rejectedFiles All the rejected files.
   */
  onDropRejected: PropTypes.func,
  /**
   * Fired when a file is deleted from the previews panel.
   *
   * @param {File} deletedFile The file that was removed.
   */
  onDelete: PropTypes.func,
};

export default withStyles(styles)(DropzoneAreaFunc);

