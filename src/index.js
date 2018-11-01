import React, {Fragment} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import Dropzone from 'react-dropzone';
import DeleteIcon from '@material-ui/icons/Delete'; 
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
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
            fileObjects: [],
            disabled: true,
        };
    }
    componentDidUpdate(prevProps){
        if(this.props.open !== prevProps.open){
            this.setState({
                open: this.props.open
            });
        }
    }

    handleClose() {
        this.props.closeDialog();
        this.setState({open: false});
    }

    onDrop(files) {
        //create the preview
        const _this = this;
        if(files.length + _this.state.fileObjects.length > _this.state.filesLimit){
            this.setState({
                openSnackBar: true,
                errorMessage: 'Cannot upload more then ' + this.props.filesLimit + ' items.',
            });
        }else{
            // we cannot do this on render because it is asynchronous and will cause bugs in older browsers
            files = files.forEach((file) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    _this.setState({
                        fileObjects: _this.state.fileObjects.concat({file: file, data: event.target.result})
                    },() => {
                        if(this.props.onChange){
                            this.props.onChange(_this.state.fileObjects.map(fileObject => fileObject.file));    
                        }
                        this.setState({
                            openSnackBar: true,
                            errorMessage: 'File ' + file.name+ ' successfully uploaded'
                        });
                    });
                };
                reader.readAsDataURL(file);
            })
        }
    }

    handleRemove = fileIndex => event => {
        event.stopPropagation();
        const {fileObjects} = this.state;
        const file = fileObjects.filter((fileObject, i) => i === fileIndex)[0].file;
        fileObjects.splice(fileIndex, 1);
        this.setState(fileObjects,() => {
          if(this.props.onSelect){
            this.props.onSelect(this.state.fileObjects.map(fileObject => fileObject.file));    
          }
          this.props.enqueueSnackbar(
            'File ' + file.name+ ' removed', 
            { variant: 'warning' }
          );
        });
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
        if (this.state.files.length > this.props.filesLimit) {
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
        const {classes} = this.props; 
        let img;
        let previews = '';
        console.log(this.state)
        if (this.props.showPreviews) {
            previews = this.state.fileObjects.map((fileObject, i) => {
                const img = (isImage(fileObject.file) ? 
                    <img className={classes.smallPreviewImg} role="presentation" src={fileObject.data}/>
                    :
                    <AttachFileIcon className={classes.smallPreviewImg}/>
                )
                return (<div key={i}>
                    <div className={'imageContainer col fileIconImg'}>
                        {img}
                        <div className="middle">
                            <IconButton>
                                <DeleteIcon
                                    className={classes.removeBtn}
                                    onClick={this.handleRemove.bind(i)}
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
                onClick={this.handleClose.bind(this)}
            />,
            <Button
                label={'Submit'}
                primary={true}
                disabled={this.state.disabled}
                onClick={this.saveFiles.bind(this)}
            />];

        return (
            <Fragment>
                <Dialog
                    title={'Upload File'}
                    actions={actions}
                    open={this.state.open}
                    onClose={this.handleClose.bind(this)}
                >
                    <Dropzone
                        accept={this.props.acceptedFiles.join(',')}
                        onDrop={this.onDrop.bind(this)}
                        className={classes.dropZone}
                        acceptClassName={classes.stripes}
                        rejectClassName={classes.rejectStripes}
                        onDropRejected={this.onDropRejected.bind(this)}
                        maxSize={this.props.maxFileSize}
                    >
                        <div className={classes.dropzoneTextStyle}>
                            <p className={classes.dropzoneParagraph}>
                                Drag and drop an image file here or click
                            </p>
                            <br/>
                            <CloudUploadIcon className={classes.uploadIconSize}/>
                        </div>
                    </Dropzone>
                    <br/>
                    <div className="row">
                        {this.state.fileObjects.length ? <span>Preview:</span> : ''}
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
MaterialDropZone.defaultProps = {
    acceptedFiles: ['image/jpeg', 'image/png', 'image/bmp', 'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.ms-powerpoint',
                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    filesLimit: 3,
    maxFileSize: 3000000,
    showPreviews: true
}
MaterialDropZone.PropTypes = {
    acceptedFiles: PropTypes.array,
    filesLimit: PropTypes.number,
    maxFileSize: PropTypes.number,
    onChange: PropTypes.function,
    showPreviews: PropTypes.bool
}

export default withStyles(styles)(MaterialDropZone);
