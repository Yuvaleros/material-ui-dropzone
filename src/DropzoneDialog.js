import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import DropzoneArea from './DropzoneArea';


class DropzoneDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: [],
            disabled: true,
        };
    }
    componentWillUnmount() {
        if (this.props.clearOnUnmount) {
            this.setState({
                files: []
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.open !== prevProps.open) {
            this.setState({
                open: this.props.open
            });
            if (this.props.onClose && !this.props.open) {
                this.props.onClose();
            }
        }
        if (this.state.files.length !== prevState.files.length) {
            this.setState({
                disabled: this.state.files.length === 0
            });
        }
    }

    handleClose(event) {
        if (this.props.onClose) {
            this.props.onClose(event);
        }
        this.setState({ open: false });
    }
    onChange(files) {
        console.log('Files changed', files);
        this.setState({
            files: files
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(files);
            }
        })
    }

    onDelete(file) { // this passes it on to the parent component to do with it what they will
        console.log('File removed', file);
        if (this.props.onDelete) {
            this.props.onDelete(file)
        }
    }
    onDrop(files) { // this passes it on to the parent component to do with it what they will
        console.log('Files dropped', files);
        if (this.props.onDrop) {
            this.props.onDrop(files)
        }
    }
    onDropRejected(files, evt) { // this passes it on to the parent component to do with it what they will
        console.log('Files rejected', files);
        if (this.props.onDropRejected) {
            this.props.onDropRejected(files, evt);
        }
    }
    handleSaveClick() {
        if (this.props.onSave) {
            this.props.onSave(this.state.files);
        }
    }
    render() {
        return (
            <Fragment>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose.bind(this)}
                    maxWidth={this.props.maxWidth}
                    fullWidth={this.props.fullWidth}
                >
                    <DialogTitle>{this.props.dialogTitle}</DialogTitle>
                    <DialogContent>
                        <DropzoneArea
                            dropzoneText={this.props.dropzoneText}
                            acceptedFiles={this.props.acceptedFiles}
                            filesLimit={this.props.filesLimit}
                            maxFileSize={this.props.maxFileSize}
                            showPreviews={this.props.showPreviews}
                            showPreviewsInDropzone={this.props.showPreviewsInDropzone}
                            showFileNames={this.props.showFileNames}
                            showAlerts={this.props.showAlerts}
                            onChange={this.onChange.bind(this)}
                            onDrop={this.onDrop.bind(this)}
                            onDropRejected={this.onDropRejected.bind(this)}
                            onDelete={this.onDelete.bind(this)}
                            clearOnUnmount={this.props.clearOnUnmount}
                            showFileNamesInPreview={this.props.showFileNamesInPreview}
                            useChipsForPreview={this.props.useChipsForPreview}
                            previewChipProps={this.props.previewChipProps}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={this.handleClose.bind(this)}
                        >
                            {this.props.cancelButtonText}
                        </Button>
                        <Button
                            color="primary"
                            disabled={this.state.disabled}
                            onClick={this.handleSaveClick.bind(this)}
                        >
                            {this.props.submitButtonText}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}
DropzoneDialog.defaultProps = {
    open: false,
    acceptedFiles: ['image/*', 'video/*', 'application/*'],
    filesLimit: 3,
    maxFileSize: 3000000,
    showPreviews: true,
    showPreviewsInDropzone: false,
    showFileNamesInPreview: true,
    previewChipProps: {},
    showAlerts: true,
    clearOnUnmount: true,
    dialogTitle: "Upload file",
    submitButtonText: "Submit",
    cancelButtonText: "Cancel",
    maxWidth: "sm",
    fullWidth: true,
    onSave: () => { },
    onDelete: () => { },
    onClose: () => { },
    onChange: () => { },
    onDrop: () => { },
    onDropRejected: () => { },
};

DropzoneDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onSave: PropTypes.func,
    onDelete: PropTypes.func,
    onClose: PropTypes.func,
    onChange: PropTypes.func,
    onDrop: PropTypes.func,
    onDropRejected: PropTypes.func,
    acceptedFiles: PropTypes.array,
    filesLimit: PropTypes.number,
    maxFileSize: PropTypes.number,
    showPreviews: PropTypes.bool,
    showPreviewsInDropzone: PropTypes.bool,
    showFileNamesInPreview: PropTypes.bool,
    useChipsForPreview: PropTypes.bool,
    previewChipProps: PropTypes.object,
    showAlerts: PropTypes.bool,
    clearOnUnmount: PropTypes.bool,
    dialogTitle: PropTypes.string,
    submitButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string,
    maxWidth: PropTypes.string,
    fullWidth: PropTypes.bool,
};

export default DropzoneDialog;
