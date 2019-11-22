import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Dropzone from 'react-dropzone';
import { convertBytesToMbsOrKbs, createFileFromUrl } from './helpers/helpers';
import PreviewList from './PreviewList';
import SnackbarContentWrapper from './SnackbarContentWrapper';
const styles = {
    '@keyframes progress': {
        '0%': {
            backgroundPosition: '0 0',
        },
        '100%': {
            backgroundPosition: '-70px 0',
        },
    },
    dropZone: {
        position: 'relative',
        width: '100%',
        minHeight: '250px',
        backgroundColor: '#F0F0F0',
        border: 'dashed',
        borderColor: '#C8C8C8',
        cursor: 'pointer',
        boxSizing: 'border-box',
    },
    stripes: {
        border: 'solid',
        backgroundImage: 'repeating-linear-gradient(-45deg, #F0F0F0, #F0F0F0 25px, #C8C8C8 25px, #C8C8C8 50px)',
        animation: 'progress 2s linear infinite !important',
        backgroundSize: '150% 100%',
    },
    rejectStripes: {
        border: 'solid',
        backgroundImage: 'repeating-linear-gradient(-45deg, #fc8785, #fc8785 25px, #f4231f 25px, #f4231f 50px)',
        animation: 'progress 2s linear infinite !important',
        backgroundSize: '150% 100%',
    },
    dropzoneTextStyle: {
        textAlign: 'center'
    },
    uploadIconSize: {
        width: 51,
        height: 51,
        color: '#909090'
    },
    dropzoneParagraph: {
        fontSize: 24
    }
};


class DropzoneArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileObjects: [],
            openSnackBar: false,
            snackbarMessage: '',
            snackbarVariant: 'success',
            dropzoneText: props.dropzoneText
        }
    }
    async filesArray(urls) {
        try {
            for (const url of urls) {
                const file = await createFileFromUrl(url);
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.setState({
                        fileObjects: this.state.fileObjects.concat({ file: file, data: event.target.result })
                    });
                };
                reader.readAsDataURL(file);
            }
        } catch (e) {
            console.log(e)
        }
    }
    componentDidMount() {
        this.filesArray(this.props.initialFiles);
    }
    componentWillUnmount() {
        if (this.props.clearOnUnmount) {
            this.setState({
                fileObjects: []
            })
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.dropzoneText !== prevProps.dropzoneText) {
            this.setState({
                dropzoneText: this.props.dropzoneText
            });
        }

    }
    onDrop(files) {
        const _this = this;
        if (this.state.fileObjects.length + files.length > this.props.filesLimit) {
            this.setState({
                openSnackBar: true,
                snackbarMessage: this.props.getFileLimitExceedMessage(this.props.filesLimit),
                snackbarVariant: 'error'
            });
        } else {
            var count = 0;
            var message = '';
            files.forEach((file) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    _this.setState({
                        fileObjects: _this.state.fileObjects.concat({ file: file, data: event.target.result })
                    }, () => {
                        if (this.props.onChange) {
                            this.props.onChange(_this.state.fileObjects.map(fileObject => fileObject.file));
                        }
                        if (this.props.onDrop) {
                            this.props.onDrop(file)
                        }
                        message += this.props.getFileAddedMessage(file.name);
                        count++; // we cannot rely on the index because this is asynchronous
                        if (count === files.length) {
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
        const { fileObjects } = this.state;
        const file = fileObjects.filter((fileObject, i) => { return i === fileIndex })[0].file;
        fileObjects.splice(fileIndex, 1);
        this.setState(fileObjects, () => {
            if (this.props.onDelete) {
                this.props.onDelete(file);
            }
            if (this.props.onChange) {
                this.props.onChange(this.state.fileObjects.map(fileObject => fileObject.file));
            }
            this.setState({
                openSnackBar: true,
                snackbarMessage: this.props.getFileRemovedMessage(file.name),
                snackbarVariant: 'info'
            });
        });
    };
    handleDropRejected(rejectedFiles, evt) {
        var message = '';
        rejectedFiles.forEach((rejectedFile) => {
            message = this.props.getDropRejectMessage(
                rejectedFile,
                this.props.acceptedFiles,
                this.props.maxFileSize
            );
        });
        if (this.props.onDropRejected) {
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
    render() {
        const { classes } = this.props;
        const showPreviews = this.props.showPreviews && this.state.fileObjects.length > 0;
        const showPreviewsInDropzone = this.props.showPreviewsInDropzone && this.state.fileObjects.length > 0;
        return (
            <Fragment>
                <Dropzone
                    accept={this.props.acceptedFiles.join(',')}
                    onDrop={this.onDrop.bind(this)}
                    onDropRejected={this.handleDropRejected.bind(this)}
                    className={classNames(this.props.dropzoneClass, classes.dropZone)}
                    acceptClassName={classes.stripes}
                    rejectClassName={classes.rejectStripes}
                    maxSize={this.props.maxFileSize}
                >
                    <div className={classes.dropzoneTextStyle}>
                        <p className={classNames(classes.dropzoneParagraph, this.props.dropzoneParagraphClass)}>
                            {this.state.dropzoneText}
                        </p>
                        <CloudUploadIcon className={classes.uploadIconSize} />
                    </div>
                    {showPreviewsInDropzone &&
                        <PreviewList
                            fileObjects={this.state.fileObjects}
                            handleRemove={this.handleRemove.bind(this)}
                            showFileNames={this.props.showFileNames}
                            useChipsForPreview={this.props.useChipsForPreview}
                            previewChipProps={this.props.previewChipProps}
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
                            showFileNames={this.props.showFileNamesInPreview}
                            useChipsForPreview={this.props.useChipsForPreview}
                            previewChipProps={this.props.previewChipProps}
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
    dropzoneText: 'Drag and drop an image file here or click',
    showPreviews: false, // By default previews show up under in the dialog and inside in the standalone
    showPreviewsInDropzone: true,
    showFileNamesInPreview: false,
    previewChipProps: {},
    showAlerts: true,
    clearOnUnmount: true,
    initialFiles: [],
    getFileLimitExceedMessage: (filesLimit) => (`Maximum allowed number of files exceeded. Only ${filesLimit} allowed`),
    getFileAddedMessage: (fileName) => (`File ${fileName} successfully added.`),
    getFileRemovedMessage: (fileName) => (`File ${fileName} removed.`),
    getDropRejectMessage: (rejectedFile, acceptedFiles, maxFileSize) => {
        let message = `File ${rejectedFile.name} was rejected. `;
        if (!acceptedFiles.includes(rejectedFile.type)) {
            message += 'File type not supported. '
        }
        if (rejectedFile.size > maxFileSize) {
            message += 'File is too big. Size limit is ' + convertBytesToMbsOrKbs(maxFileSize) + '. ';
        }
        return message;
    },
    onChange: () => { },
    onDrop: () => { },
    onDropRejected: () => { },
    onDelete: () => { }
};
DropzoneArea.propTypes = {
    acceptedFiles: PropTypes.array,
    filesLimit: PropTypes.number,
    maxFileSize: PropTypes.number,
    dropzoneText: PropTypes.string,
    dropzoneClass: PropTypes.string,
    showPreviews: PropTypes.bool,
    showPreviewsInDropzone: PropTypes.bool,
    showFileNamesInPreview: PropTypes.bool,
    useChipsForPreview: PropTypes.bool,
    previewChipProps: PropTypes.object,
    showAlerts: PropTypes.bool,
    clearOnUnmount: PropTypes.bool,
    initialFiles: PropTypes.arrayOf(PropTypes.string),
    getFileLimitExceedMessage: PropTypes.func,
    getFileAddedMessage: PropTypes.func,
    getFileRemovedMessage: PropTypes.func,
    getDropRejectMessage: PropTypes.func,
    onChange: PropTypes.func,
    onDrop: PropTypes.func,
    onDropRejected: PropTypes.func,
    onDelete: PropTypes.func
};
export default withStyles(styles)(DropzoneArea)
