import React, {Fragment} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import Dropzone from 'react-dropzone';
import DeleteIcon from '@material-ui/icons/Delete'; 
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar'; 
import {isImage} from './helpers/helpers.js'; 

// what?

const styles = theme => ({
  dropZone: {
    position: 'relative',
    width: '100%',
    minHeight: 250,
    height: '100%',
    backgroundColor: '#F0F0F0',
    border: 'dashed',
    borderColor: '#C8C8C8',
    cursor: 'pointer',
    boxSizing: 'border-box',
    padding: '0 20px'
  },
  stripes: {
    width: '100%',
    minHeight: 250,
    height: '100%',
    cursor: 'pointer',
    border: 'solid',
    borderColor: '#C8C8C8',
    backgroundImage: 'repeating-linear-gradient(-45deg, #F0F0F0, #F0F0F0 25px, #C8C8C8 25px, #C8C8C8 50px)',
    animation: 'progress 2s linear infinite !important',
    backgroundSize: '150% 100%'
  },
  rejectStripes: {
    width: '100%',
    minHeight: 250,
    height: '100%',
    cursor: 'pointer',
    border: 'solid',
    borderColor: '#C8C8C8',
    backgroundImage: 'repeating-linear-gradient(-45deg, #fc8785, #fc8785 25px, #f4231f 25px, #f4231f 50px)',
    animation: 'progress 2s linear infinite !important',
    backgroundSize: '150% 100%',
  },
  dropzoneTextStyle:{
    textAlign: 'center'
  },
  removeBtn: {
    transition: '.5s ease',
    position: 'absolute',
    opacity: 0,
    top: -5,
    right: -5,
    width: 40,
    height: 40
  },
  uploadIconSize: {
    width: 51,
    height: 51,
    color: '#909090' 
  },
  dropzoneParagraph:{
    fontSize: 24
  },
  smallPreviewImg: {
    height: 100,
    width: 'initial',
    maxWidth: '100%',
    marginTop: 5,
    marginRight: 10,
    color: 'rgba(0, 0, 0, 0.87)',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    boxSizing: 'border-box',
    boxShadow: 'rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px',
    borderRadius: 2,
    zIndex: 5,
    opacity: 1
  },
  imageContainer: {
    position: 'relative',
    zIndex: 10,
    '&:hover $smallPreviewImg': {
      opacity: 0.3
    },
    '&:hover $removeBtn': {
      opacity: 1
    }
  }
})

class MaterialDropZone extends React.Component {
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
    componentDidUpdate(){
        console.log('here')
        this.setState({
            open: this.props.open,
            files: this.props.files
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
                    <div className={'imageContainer col fileIconImg'} key={i}>
                        {img}
                        <div className="middle">
                            <IconButton touch={true}>
                                <DeleteIcon
                                    className="removeBtn"
                                    onTouchTap={this.handleRemove.bind(this, file, i)}
                                />
                            </IconButton>
                        </div>
                    </div>
                </div>);
            });
        }

        const actions = [
            <Button
                label={'Cancel'}
                primary={true}
                onTouchTap={this.handleClose.bind(this)}
            />,
            <Button
                label={'Submit'}
                primary={true}
                disabled={this.state.disabled}
                onTouchTap={this.saveFiles.bind(this)}
            />];

        return (
            <Fragment>
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
                    <div className="row">
                        {this.state.files.length ? <span>Preview:</span> : ''}
                    </div>
                    <div className="row">
                        {previews}
                    </div>
                </Dialog>
                <Snackbar
                    open={this.state.openSnackBar}
                    message={this.state.errorMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestCloseSnackBar}
                />
            </Fragment>
        );
    }
}
export default withStyles(styles)(MaterialDropZone);
