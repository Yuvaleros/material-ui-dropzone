import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Dropzone from 'react-dropzone';
import ActionDelete from 'material-ui/svg-icons/content/clear';
import FileIcon from 'material-ui/svg-icons/editor/insert-drive-file';
import CloudUploadIcon from 'material-ui/svg-icons/file/cloud-upload';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import './index.css';
import {isImage} from './helpers/helpers.js';

export default class MaterialDropZone extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            openSnackBar: false,
            errorMessage: '',
            files: this.props.files || [],
            disabled: true,
            acceptedFiles: this.props.acceptedFiles ||
            ['image/jpeg', 'image/png', 'image/bmp', 'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.ms-powerpoint',
                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open,
            files: nextProps.files,
        });
    }

    handleClose() {
        this.props.closeDialog();
        this.setState({open: false});
    }

    onDrop(files) {
        let oldFiles = this.state.files;
        const filesLimit = this.props.filesLimit || '3';

        oldFiles = oldFiles.concat(files);
        if (oldFiles.length > filesLimit) {
            this.setState({
                openSnackBar: true,
                errorMessage: 'Cannot upload more then ' + filesLimit + ' items.',
            });
        } else {
            this.setState({
                files: oldFiles,
            }, this.changeButtonDisable);
        }
    }

    handleRemove(file, fileIndex) {
        const files = this.state.files;
        // This is to prevent memory leaks.
        window.URL.revokeObjectURL(file.preview);

        files.splice(fileIndex, 1);
        this.setState(files, this.changeButtonDisable);

        if (file.path) {
            this.props.deleteFile(file);
        }
    }

    changeButtonDisable() {
        if (this.state.files.length !== 0) {
            this.setState({
                disabled: false,
            });
        } else {
            this.setState({
                disabled: true,
            });
        }
    }

    saveFiles() {
        const filesLimit = this.props.filesLimit || '3';

        if (this.state.files.length > filesLimit) {
            this.setState({
                openSnackBar: true,
                errorMessage: 'Cannot upload more then ' + filesLimit + ' items.',
            });
        } else {
            this.props.saveFiles(this.state.files);
        }
    }

    onDropRejected() {
        this.setState({
            openSnackBar: true,
            errorMessage: 'File too big, max size is 3MB',
        });
    }

    handleRequestCloseSnackBar = () => {
        this.setState({
            openSnackBar: false,
        });
    };

    render() {
        let img;
        let previews = '';
        const fileSizeLimit = this.props.maxSize || 3000000;

        if (this.props.showPreviews === true) {
            previews = this.state.files.map((file, i) => {
                const path = file.preview || '/pic' + file.path;

                if (isImage(file)) {
                    //show image preview.
                    img = <img className="smallPreviewImg" src={path}/>;
                } else {
                    //Show default file image in preview.
                    img = <FileIcon className="smallPreviewImg"/>;
                }

                return (<div>
                    <div className="row">
                        {this.state.files.length ? <span>Preview:</span> : ''}
                    </div>
                    <div className="row">
                        <div className={'imageContainer col fileIconImg'} key={i}>
                            {img}
                            <div className="middle">
                                <IconButton touch={true}>
                                    <ActionDelete
                                        className="removeBtn"
                                        onTouchTap={this.handleRemove.bind(this, file, i)}
                                    />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>);
            });
        }

        const actions = [
            <FlatButton
                label={'Cancel'}
                primary={true}
                onTouchTap={this.handleClose.bind(this)}
            />,
            <FlatButton
                label={'Submit'}
                primary={true}
                disabled={this.state.disabled}
                onTouchTap={this.saveFiles.bind(this)}
            />];

        return (
            <div>
                <Dialog
                    title={'Upload File'}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose.bind(this)}
                    autoScrollBodyContent={true}
                >
                    <Dropzone
                        accept={this.state.acceptedFiles.join(',')}
                        onDrop={this.onDrop.bind(this)}
                        className={'dropZone'}
                        acceptClassName={'stripes'}
                        rejectClassName={'rejectStripes'}
                        onDropRejected={this.onDropRejected.bind(this)}
                        maxSize={fileSizeLimit}
                    >
                        <div className={'dropzoneTextStyle'}>
                            <p className={'dropzoneParagraph'}>{'Drag and drop an image file here or click'}</p>
                            <br/>
                            <CloudUploadIcon className={'uploadIconSize'}/>
                        </div>
                    </Dropzone>
                    <br/>
                    {previews}
                </Dialog>
                <Snackbar
                    open={this.state.openSnackBar}
                    message={this.state.errorMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestCloseSnackBar}
                />
            </div>
        );
    }
}
