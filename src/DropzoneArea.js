import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';  
import Dropzone from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Grid from '@material-ui/core/Grid';
import {convertBytesToMbsOrKbs} from './helpers/helpers'
import SnackbarContentWrapper from './SnackbarContentWrapper';
import PreviewList from './PreviewList';
import style from './css/index.css'
console.log(style)

const styles = {
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
}


class DropzoneArea extends Component{
    constructor(props){
        super(props);
        this.state = {
            fileObjects: [],
            openSnackBar: false,
            snackbarMessage: '',
            snackbarVariant: 'success'
        }
    }
    onDrop(files){
        const _this = this;
        if(this.state.fileObjects + files.length > this.props.filesLimit){
            this.setState({
                openSnackBar: true,
                snackbarMessage: `Maximum allowed number of files exceeded. Only ${this.props.filesLimit} allowed`, 
                snackbarVariant: 'error'
            });
        }else{
            var count = 0;
            var message = '';
            files.forEach((file) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    _this.setState({
                        fileObjects: _this.state.fileObjects.concat({file: file, data: event.target.result})
                    },() => {
                        if(this.props.onChange){
                            this.props.onChange(_this.state.fileObjects.map(fileObject => fileObject.file));    
                        }
                        if(this.props.onDrop){
                            this.props.onDrop(file)
                        }
                        message += `File ${file.name} successfully uploaded. `;
                        count++; // we cannot rely on the index because this is asynchronous
                        if(count === files.length){
                            // display message when the last one fires
                            this.setState({
                                openSnackBar: true,
                                snackbarMessage: message, 
                                snackbarVariant: 'success'
                            });
                        }
                    });
                };
                reader.readAsDataURL(file);
            })
        }
    }
    handleRemove = fileIndex => event => {
        event.stopPropagation();
        const {fileObjects} = this.state;
        const file = fileObjects.filter((fileObject, i) => { return i === fileIndex})[0].file;
        fileObjects.splice(fileIndex, 1);
        this.setState(fileObjects,() => {
            if(this.props.onDelete){
                this.props.onDelete(file);    
            }
            if(this.props.onChange){
                this.props.onChange(this.state.fileObjects);    
            }
            this.setState({
                openSnackBar: true,
                snackbarMessage: ('File ' + file.name+ ' removed'),
                snackbarVariant: 'info'
            });
        });
    }
    handleDropRejected(rejectedFiles, evt) {
        var message = '';
        rejectedFiles.forEach((rejectedFile) => {
            message = `File ${rejectedFile.name} was rejected. `;
            if(!this.props.acceptedFiles.includes(rejectedFile.type)){
                message += 'File type not supported. '
            }
            if(rejectedFile.size > this.props.fileSizeLimit){
                message += 'File is too big. Size limit is ' + convertBytesToMbsOrKbs(this.props.fileSizeLimit) + '. ';
            }
        });
        if(this.props.onDropRejected){
            this.props.onDropRejected(rejectedFiles, evt);
        }
        this.setState({
            openSnackBar: true,
            snackbarMessage: message,
            snackbarVariant: 'error'
        });
    }
    onCloseSnackbar = () => {
        this.setState({
            openSnackBar: false,
        });
    };
    render(){
        const {classes} = this.props;
        const showPreviews = this.props.showPreviews && this.state.fileObjects.length > 0;
        const showPreviewsInDropzone = this.props.showPreviewsInDropzone && this.state.fileObjects.length > 0;
        return (
            <Fragment>
                <Dropzone
                    accept={this.props.acceptedFiles.join(',')}
                    onDrop={this.onDrop.bind(this)}
                    onDropRejected={this.handleDropRejected.bind(this)}
                    className={style.dropZone}
                    acceptClassName={style.stripes}
                    rejectClassName={style.rejectStripes}
                    maxSize={this.props.maxFileSize}
                     >
                    <div className={classes.dropzoneTextStyle}>
                        <p className={classes.dropzoneParagraph}>
                            Drag and drop an image file here or click
                        </p>
                        <CloudUploadIcon className={classes.uploadIconSize}/>
                    </div>
                    {showPreviewsInDropzone &&
                        <PreviewList 
                            fileObjects={this.state.fileObjects} 
                            handleRemove={this.handleRemove.bind(this)}
                        />
                    }
                </Dropzone>
                {showPreviews &&
                    <Fragment>
                        <Grid container>
                            <span>Preview:</span>
                        </Grid>
                        <PreviewList 
                            fileObjects={this.state.fileObjects} 
                            handleRemove={this.handleRemove.bind(this)}
                        />
                    </Fragment>
                }
                {this.props.showAlerts &&
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.openSnackBar}
                        autoHideDuration={6000}
                        onClose={this.onCloseSnackbar}
                        >
                        <SnackbarContentWrapper
                            onClose={this.onCloseSnackbar}
                            variant={this.state.snackbarVariant}
                            message={this.state.snackbarMessage}
                        />
                    </Snackbar>              
                }
            </Fragment>
        )
    }
}

DropzoneArea.defaultProps = {
    acceptedFiles: ['image/*', 'video/*', 'application/*'],
    filesLimit: 3,
    maxFileSize: 3000000,
    showPreviews: false, // By default previews show up under in the dialog and inside in the standalone
    showPreviewsInDropzone: true,
    showAlerts: true,
    onChange: () => {},
    onDrop: () => {},
    onDropRejected: () => {},
    onDelete: () => {}
}
DropzoneArea.propTypes = {
    acceptedFiles: PropTypes.array,
    filesLimit: PropTypes.number,
    maxFileSize: PropTypes.number,
    showPreviews: PropTypes.bool,
    showPreviewsInDropzone: PropTypes.bool,
    showAlerts: PropTypes.bool,
    onChange: PropTypes.func,
    onDrop: PropTypes.func,
    onDropRejected: PropTypes.func,
    onDelete: PropTypes.func
}
export default withStyles(styles)(DropzoneArea)