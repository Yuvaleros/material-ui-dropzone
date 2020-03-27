import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import * as React from 'react';
import {Fragment} from 'react';

import DropzoneArea from './DropzoneArea';

// Split props related to DropzoneDialog from DropzoneArea ones
function splitDropzoneDialogProps(allProps) {
    const {
        cancelButtonText,
        dialogProps,
        dialogTitle,
        fullWidth,
        maxWidth,
        onClose,
        onSave,
        open,
        submitButtonText,
        ...dropzoneAreaProps
    } = allProps;

    return [
        {
            cancelButtonText,
            dialogProps,
            dialogTitle,
            fullWidth,
            maxWidth,
            onClose,
            onSave,
            open,
            submitButtonText,
        },
        dropzoneAreaProps,
    ];
}

/**
 * This component provides the DropzoneArea inside of a Material-UI Dialog.
 *
 * It supports all the Props and Methods from `DropzoneArea`.
 */
class DropzoneDialog extends React.PureComponent {
    state = {
        files: [],
    };

    handleClose = (event) => {
        const {onClose} = this.props;
        // Notify onClose
        if (onClose) {
            onClose(event);
        }
    }

    handleChange = (files) => {
        const {onChange} = this.props;

        this.setState({
            files,
        });

        if (onChange) {
            onChange(files);
        }
    }

    handleSaveClick = () => {
        const {onSave} = this.props;
        const {files} = this.state;

        if (onSave) {
            onSave(files);
        }
    }

    render() {
        const [dropzoneDialogProps, dropzoneAreaProps] = splitDropzoneDialogProps(this.props);
        const {
            cancelButtonText,
            dialogProps,
            dialogTitle,
            fullWidth,
            maxWidth,
            open,
            submitButtonText,
        } = dropzoneDialogProps;
        const {files} = this.state;

        // Submit button state
        const submitDisabled = files.length === 0;

        return (
            <Fragment>
                <Dialog
                    {...dialogProps}
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    onClose={this.handleClose}
                    open={open}
                >
                    <DialogTitle>{dialogTitle}</DialogTitle>

                    <DialogContent>
                        <DropzoneArea
                            {...dropzoneAreaProps}
                            onChange={this.handleChange}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={this.handleClose}
                        >
                            {cancelButtonText}
                        </Button>

                        <Button
                            color="primary"
                            disabled={submitDisabled}
                            onClick={this.handleSaveClick}
                        >
                            {submitButtonText}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

DropzoneDialog.defaultProps = {
    ...DropzoneArea.defaultProps,
    open: false,
    dialogTitle: 'Upload file',
    dialogProps: {},
    fullWidth: true,
    maxWidth: 'sm',
    cancelButtonText: 'Cancel',
    submitButtonText: 'Submit',
    showPreviews: true,
    showPreviewsInDropzone: false,
    showFileNamesInPreview: true,
};

DropzoneDialog.propTypes = {
    ...DropzoneArea.propTypes,
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

export default DropzoneDialog;
