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
    cancelButtonText: 'Cancel',
    dialogProps: {},
    dialogTitle: 'Upload file',
    fullWidth: true,
    maxWidth: 'sm',
    onClose: () => { },
    onSave: () => { },
    open: false,
    showPreviews: true, // By default previews show up under in the dialog and inside in the standalone
    showPreviewsInDropzone: false,
    showFileNamesInPreview: true,
    submitButtonText: 'Submit',
};

DropzoneDialog.propTypes = {
    ...DropzoneArea.propTypes,
    cancelButtonText: PropTypes.string,
    dialogProps: PropTypes.object,
    dialogTitle: PropTypes.string,
    fullWidth: PropTypes.bool,
    maxWidth: PropTypes.string,
    onClose: PropTypes.func,
    onSave: PropTypes.func,
    open: PropTypes.bool.isRequired,
    submitButtonText: PropTypes.string,
};

export default DropzoneDialog;
