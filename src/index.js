import React, {Fragment} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import Dropzone from 'react-dropzone';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';  
import PreviewList from './PreviewList'
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle'

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
  uploadIconSize: {
    width: 51,
    height: 51,
    color: '#909090' 
  },
  dropzoneParagraph:{
    fontSize: 24
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
    componentDidUpdate(prevProps, prevState){
        if(this.props.open !== prevProps.open){
            this.setState({
                open: this.props.open
            });
        }
        if(this.state.fileObjects.length !== prevState.fileObjects.length){
            this.setState({
                disabled: this.state.fileObjects.length === 0 
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
            this.setState({
                openSnackBar: true,
                errorMessage: 'File ' + file.name+ ' removed',
            });
        });
    }
    saveFiles() {
        const files = this.state.fileObjects.map( fileObject => fileObject.file )
        if (files.length > this.props.filesLimit) {
            this.setState({
                openSnackBar: true,
                errorMessage: 'Cannot upload more then ' + filesLimit + ' items.',
            });
        } else if(this.props.saveFiles){
            this.props.saveFiles(files);
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
        return (
            <Fragment>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose.bind(this)}
                >
                    <DialogTitle>Upload File</DialogTitle>
                    <DialogContent>
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
                        {this.props.showPreviews && this.state.fileObjects.length &&
                            <Grid container>
                                <span>Preview:</span>
                            </Grid>
                            <PreviewList 
                                fileObjects={this.state.fileObjects} 
                                handleRemove={this.handleRemove.bind(this)}
                            />
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={this.handleClose.bind(this)}
                            >
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            disabled={this.state.disabled}
                            onClick={this.saveFiles.bind(this)}
                            >
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
                {showAlerts &&
                    <Snackbar
                        open={this.state.openSnackBar}
                        message={this.state.errorMessage}
                        autoHideDuration={4000}
                        onClose={this.handleRequestCloseSnackBar}
                    />               
                }
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
    showPreviews: true,
    onChange: false,
    showAlerts: true
}
MaterialDropZone.propTypes = {
    acceptedFiles: PropTypes.array,
    filesLimit: PropTypes.number,
    maxFileSize: PropTypes.number,
    showPreviews: PropTypes.bool, 
    onChange: PropTypes.function,
    showAlerts: PropTypes.bool
}

export default withStyles(styles)(MaterialDropZone);
