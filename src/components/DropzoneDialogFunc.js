import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Fragment } from "react";

import DropzoneAreaFunc from "./DropzoneAreaFunc";

/**
 * This component provides the DropzoneArea inside of a Material-UI Dialog.
 *
 * It supports all the Props and Methods from `DropzoneArea`.
 */
const DropzoneDialogFunc = (props) => {
  const {
    cancelButtonText,
    dialogProps,
    dialogTitle,
    fullWidth,
    maxWidth,
    onChange,
    onClose,
    onSave,
    open,
    submitButtonText,
    ...dropzoneAreaProps
  } = props;

  const [currentFiles, setCurrentFiles] = useState([]);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleClose = (event) => {
    // Notify onClose
    if (onClose) {
      onClose(event);
    }
  };

  const handleChange = (files) => {
    setCurrentFiles(files);
    if (onChange) {
      onChange(files);
    }
  };

  const handleSaveClick = () => {
    if (onSave) {
      onSave(currentFiles);
    }
  };

  // Submit button state
  useEffect(() => {
    setSubmitDisabled(currentFiles.length === 0);
  }, [currentFiles]);

  return (
    <Fragment>
      <Dialog
        {...dialogProps}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        onClose={handleClose}
        open={open}
      >
        <DialogTitle>{dialogTitle}</DialogTitle>

        <DialogContent>
          <DropzoneAreaFunc {...dropzoneAreaProps} onChange={handleChange} />
        </DialogContent>

        <DialogActions>
          <Button color='primary' onClick={handleClose}>
            {cancelButtonText}
          </Button>

          <Button
            color='primary'
            disabled={submitDisabled}
            onClick={handleSaveClick}
          >
            {submitButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

DropzoneDialogFunc.defaultProps = {
  ...DropzoneAreaFunc.defaultProps,
  open: false,
  dialogTitle: "Upload file",
  dialogProps: {},
  fullWidth: true,
  maxWidth: "sm",
  cancelButtonText: "Cancel",
  submitButtonText: "Submit",
  showPreviews: true,
  showPreviewsInDropzone: false,
  showFileNamesInPreview: true,
};

DropzoneDialogFunc.propTypes = {
  ...DropzoneAreaFunc.propTypes,
  /** Sets whether the dialog is open or closed. */
  open: PropTypes.bool,
  /** The Dialog title. */
  dialogTitle: PropTypes.string,
  /**
   * Props to pass to the Material-UI Dialog components.
   * @see See [Material-UI Dialog](https://material-ui.com/api/dialog/#props) for available values.
   */
  dialogProps: PropTypes.object,
  /**
   * If `true`, the dialog stretches to `maxWidth`.<br/>
   * Notice that the dialog width grow is limited by the default margin.
   */
  fullWidth: PropTypes.bool,
  /**
   * Determine the max-width of the dialog. The dialog width grows with the size of the screen.<br/>
   * Set to `false` to disable `maxWidth`.
   */
  maxWidth: PropTypes.string,
  /** Cancel button text in dialog. */
  cancelButtonText: PropTypes.string,
  /** Submit button text in dialog. */
  submitButtonText: PropTypes.string,
  /**
   * Fired when the modal is closed
   *
   * @param {SyntheticEvent} event The react `SyntheticEvent`
   */
  onClose: PropTypes.func,
  /**
   * Fired when the user clicks the Submit button.
   *
   * @param {File[]} files All the files currently inside the Dropzone.
   */
  onSave: PropTypes.func,
  /**
   * Shows previews **BELOW** the dropzone.<br/>
   * **Note:** By default previews show up under in the Dialog and inside in the standalone.
   */
  showPreviews: PropTypes.bool,
  /** Shows preview **INSIDE** the dropzone area. */
  showPreviewsInDropzone: PropTypes.bool,
  /** Shows file name under the image. */
  showFileNamesInPreview: PropTypes.bool,
};

export default DropzoneDialogFunc;

