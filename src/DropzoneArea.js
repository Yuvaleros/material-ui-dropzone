import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import {Fragment} from 'react';
import Dropzone from 'react-dropzone';

import {convertBytesToMbsOrKbs, createFileFromUrl, readFile} from './helpers';
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
        backgroundImage: 'repeating-linear-gradient(-45deg, #fc8785, #fc8785 25px, #f4231f 25px, #f4231f 50px)',
    },
    dropzoneTextStyle: {
        textAlign: 'center',
    },
    uploadIconSize: {
        width: 51,
        height: 51,
        color: '#909090',
    },
    dropzoneParagraph: {
        marginBottom: 20,
        marginTop: 20,
    },
};

const snackbarAnchorOrigin = {
    vertical: 'bottom',
    horizontal: 'left',
};

class DropzoneArea extends React.PureComponent {
    state = {
        fileObjects: [],
        openSnackBar: false,
        snackbarMessage: '',
        snackbarVariant: 'success',
    };

    componentDidMount() {
        this.filesArray(this.props.initialFiles);
    }

    componentWillUnmount() {
        const {clearOnUnmount, onChange} = this.props;

        if (clearOnUnmount) {
            this.setState({
                fileObjects: [],
            });

            if (onChange) {
                onChange([]);
            }
        }
    }

    filesArray = async(urls) => {
        try {
            const fileObjs = await Promise.all(
                urls.map(async(url) => {
                    const file = await createFileFromUrl(url);
                    const data = await readFile(file);

                    return {
                        file,
                        data,
                    };
                })
            );

            this.setState((state) => ({
                fileObjects: [].concat(
                    state.fileObjects,
                    fileObjs
                ),
            }),
            () => {
                const {onChange} = this.props;
                const {fileObjects} = this.state;

                if (onChange) {
                    onChange(fileObjects.map((fileObject) => fileObject.file));
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    handleDropAccepted = async(acceptedFiles, evt) => {
        const {filesLimit, getFileAddedMessage, getFileLimitExceedMessage, onDrop} = this.props;
        const {fileObjects} = this.state;

        if (filesLimit > 1 && fileObjects.length + acceptedFiles.length > filesLimit) {
            this.setState({
                openSnackBar: true,
                snackbarMessage: getFileLimitExceedMessage(filesLimit),
                snackbarVariant: 'error',
            });
            return;
        }

        // Notify Drop event
        if (onDrop) {
            onDrop(acceptedFiles, evt);
        }

        // Retrieve fileObjects data
        const fileObjs = await Promise.all(
            acceptedFiles.map(async(file) => {
                const data = await readFile(file);
                return {
                    file,
                    data,
                };
            })
        );

        // Display message
        const message = fileObjs.reduce((msg, fileObj) => msg + getFileAddedMessage(fileObj.file.name), '');
        this.setState({
            openSnackBar: true,
            snackbarMessage: message,
            snackbarVariant: 'success',
        });

        // Update component state
        this.setState((state) => {
            // Handle a single file
            if (filesLimit <= 1) {
                return {
                    fileObjects: fileObjs[0],
                };
            }

            // Handle multiple files
            return {
                fileObjects: [].concat(
                    state.fileObjects,
                    fileObjs
                ),
            };
        },
        () => {
            const {onChange} = this.props;
            const {fileObjects} = this.state;

            if (onChange) {
                onChange(fileObjects.map((fileObject) => fileObject.file));
            }
        });
    }

    handleDropRejected = (rejectedFiles, evt) => {
        const {acceptedFiles, getDropRejectMessage, maxFileSize, onDropRejected} = this.props;

        let message = '';
        rejectedFiles.forEach((rejectedFile) => {
            message = getDropRejectMessage(rejectedFile, acceptedFiles, maxFileSize);
        });

        if (onDropRejected) {
            onDropRejected(rejectedFiles, evt);
        }

        this.setState({
            openSnackBar: true,
            snackbarMessage: message,
            snackbarVariant: 'error',
        });
    }

    handleRemove = (fileIndex) => (event) => {
        event.stopPropagation();

        const {getFileRemovedMessage, onChange, onDelete} = this.props;
        const {fileObjects} = this.state;

        // Find removed fileObject
        const removedFileObj = fileObjects.filter((fileObject, i) => {
            return i === fileIndex;
        })[0];
        // Calculate remaining fileObjects array
        const remainingFileObjs = fileObjects.filter((fileObject, i) => {
            return i !== fileIndex;
        });

        this.setState({fileObjects: remainingFileObjs}, () => {
            if (onDelete) {
                onDelete(removedFileObj.file);
            }

            if (onChange) {
                onChange(this.state.fileObjects.map((fileObject) => fileObject.file));
            }

            this.setState({
                openSnackBar: true,
                snackbarMessage: getFileRemovedMessage(removedFileObj.file.name),
                snackbarVariant: 'info',
            });
        });
    };

    handleCloseSnackbar = () => {
        this.setState({
            openSnackBar: false,
        });
    };

    render() {
        const {
            acceptedFiles,
            classes,
            dropzoneClass,
            dropzoneParagraphClass,
            dropzoneText,
            filesLimit,
            maxFileSize,
            previewChipProps,
            previewGridClasses,
            previewGridProps,
            showAlerts,
            showFileNames,
            showFileNamesInPreview,
            showPreviews,
            showPreviewsInDropzone,
            useChipsForPreview,
        } = this.props;
        const {fileObjects, openSnackBar, snackbarMessage, snackbarVariant} = this.state;

        const acceptFiles = acceptedFiles?.join(',');
        const isMultiple = filesLimit > 1;
        const previewsVisible = showPreviews && fileObjects.length > 0;
        const previewsInDropzoneVisible = showPreviewsInDropzone && fileObjects.length > 0;

        return (
            <Fragment>
                <Dropzone
                    accept={acceptFiles}
                    onDropAccepted={this.handleDropAccepted}
                    onDropRejected={this.handleDropRejected}
                    maxSize={maxFileSize}
                    multiple={isMultiple}
                >
                    {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                        <div
                            {...getRootProps()}
                            className={clsx(
                                classes.dropZone,
                                dropzoneClass,
                                isDragActive && classes.stripes,
                                isDragReject && classes.rejectStripes,
                            )}
                        >
                            <input {...getInputProps()} />

                            <div className={classes.dropzoneTextStyle}>
                                <Typography
                                    variant="h5"
                                    component="p"
                                    className={clsx(classes.dropzoneParagraph, dropzoneParagraphClass)}
                                >
                                    {dropzoneText}
                                </Typography>
                                <CloudUploadIcon className={classes.uploadIconSize} />
                            </div>

                            {previewsInDropzoneVisible &&
                                <PreviewList
                                    fileObjects={fileObjects}
                                    handleRemove={this.handleRemove}
                                    showFileNames={showFileNames}
                                    useChipsForPreview={useChipsForPreview}
                                    previewChipProps={previewChipProps}
                                    previewGridClasses={previewGridClasses}
                                    previewGridProps={previewGridProps}
                                />
                            }
                        </div>
                    )}
                </Dropzone>

                {previewsVisible &&
                    <Fragment>
                        <Typography variant="subtitle1" component="span">
                            Preview:
                        </Typography>

                        <PreviewList
                            fileObjects={fileObjects}
                            handleRemove={this.handleRemove}
                            showFileNames={showFileNamesInPreview}
                            useChipsForPreview={useChipsForPreview}
                            previewChipProps={previewChipProps}
                            previewGridClasses={previewGridClasses}
                            previewGridProps={previewGridProps}
                        />
                    </Fragment>
                }

                {showAlerts &&
                    <Snackbar
                        anchorOrigin={snackbarAnchorOrigin}
                        open={openSnackBar}
                        autoHideDuration={6000}
                        onClose={this.handleCloseSnackbar}
                    >
                        <SnackbarContentWrapper
                            onClose={this.handleCloseSnackbar}
                            variant={snackbarVariant}
                            message={snackbarMessage}
                        />
                    </Snackbar>
                }
            </Fragment>
        );
    }
}

DropzoneArea.defaultProps = {
    acceptedFiles: ['image/*', 'video/*', 'application/*'],
    filesLimit: 3,
    maxFileSize: 3000000,
    dropzoneText: 'Drag and drop an image file here or click',
    showPreviews: false, // By default previews show up under in the dialog and inside in the standalone
    showPreviewsInDropzone: true,
    showFileNames: false,
    showFileNamesInPreview: false,
    previewChipProps: {},
    previewGridClasses: {},
    previewGridProps: {},
    showAlerts: true,
    clearOnUnmount: true,
    initialFiles: [],
    getFileLimitExceedMessage: (filesLimit) => (`Maximum allowed number of files exceeded. Only ${filesLimit} allowed`),
    getFileAddedMessage: (fileName) => (`File ${fileName} successfully added.`),
    getFileRemovedMessage: (fileName) => (`File ${fileName} removed.`),
    getDropRejectMessage: (rejectedFile, acceptedFiles, maxFileSize) => {
        let message = `File ${rejectedFile.name} was rejected. `;
        if (!acceptedFiles.includes(rejectedFile.type)) {
            message += 'File type not supported. ';
        }
        if (rejectedFile.size > maxFileSize) {
            message += 'File is too big. Size limit is ' + convertBytesToMbsOrKbs(maxFileSize) + '. ';
        }
        return message;
    },
    onChange: () => { },
    onDrop: () => { },
    onDropRejected: () => { },
    onDelete: () => { },
};

DropzoneArea.propTypes = {
    classes: PropTypes.object.isRequired,
    acceptedFiles: PropTypes.array,
    filesLimit: PropTypes.number,
    maxFileSize: PropTypes.number,
    dropzoneText: PropTypes.string,
    dropzoneClass: PropTypes.string,
    dropzoneParagraphClass: PropTypes.string,
    showPreviews: PropTypes.bool,
    showPreviewsInDropzone: PropTypes.bool,
    showFileNames: PropTypes.bool,
    showFileNamesInPreview: PropTypes.bool,
    useChipsForPreview: PropTypes.bool,
    previewChipProps: PropTypes.object,
    previewGridClasses: PropTypes.object,
    previewGridProps: PropTypes.object,
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
    onDelete: PropTypes.func,
};

export default withStyles(styles)(DropzoneArea);
