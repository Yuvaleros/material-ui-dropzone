"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileObjectShape = void 0;
const tslib_1 = require("tslib");
const AttachFile_1 = (0, tslib_1.__importDefault)(require("@mui/icons-material/AttachFile"));
const CloudUpload_1 = (0, tslib_1.__importDefault)(require("@mui/icons-material/CloudUpload"));
const Snackbar_1 = (0, tslib_1.__importDefault)(require("@mui/material/Snackbar"));
const Typography_1 = (0, tslib_1.__importDefault)(require("@mui/material/Typography"));
const system_1 = require("@mui/system");
const clsx_1 = (0, tslib_1.__importDefault)(require("clsx"));
const prop_types_1 = (0, tslib_1.__importDefault)(require("prop-types"));
const react_1 = (0, tslib_1.__importStar)(require("react"));
const react_dropzone_1 = (0, tslib_1.__importDefault)(require("react-dropzone"));
const helpers_1 = require("../helpers");
const PreviewList_1 = (0, tslib_1.__importDefault)(require("./PreviewList"));
const SnackbarContentWrapper_1 = (0, tslib_1.__importDefault)(require("./SnackbarContentWrapper"));
const defaultSnackbarAnchorOrigin = {
    horizontal: "left",
    vertical: "bottom",
};
const defaultGetPreviewIcon = (fileObject, classes) => {
    const { data, file } = fileObject || {};
    if ((0, helpers_1.isImage)(file)) {
        const src = typeof data === "string" ? data : undefined;
        return <img className={classes === null || classes === void 0 ? void 0 : classes.image} role="presentation" src={src}/>;
    }
    return <AttachFile_1.default className={classes === null || classes === void 0 ? void 0 : classes.image}/>;
};
exports.FileObjectShape = prop_types_1.default.shape({
    file: prop_types_1.default.object,
    data: prop_types_1.default.any,
});
/**
 * This components creates a Material-UI Dropzone, with previews and snackbar notifications.
 */
class DropzoneAreaBase extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            openSnackBar: false,
            snackbarMessage: "",
            snackbarVariant: "success",
        };
        this.handleDropAccepted = (acceptedFiles, evt) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { fileObjects, filesLimit = DropzoneAreaBase.defaultProps.filesLimit, getFileAddedMessage = DropzoneAreaBase.defaultProps.getFileAddedMessage, getFileLimitExceedMessage = DropzoneAreaBase.defaultProps
                .getFileLimitExceedMessage, onAdd, onDrop, } = this.props;
            if (filesLimit > 1 &&
                fileObjects.length + acceptedFiles.length > filesLimit) {
                this.setState({
                    openSnackBar: true,
                    snackbarMessage: getFileLimitExceedMessage(filesLimit),
                    snackbarVariant: "error",
                }, this.notifyAlert);
                return;
            }
            // Notify Drop event
            if (onDrop) {
                onDrop(acceptedFiles, evt);
            }
            // Retrieve fileObjects data
            const fileObjs = yield Promise.all(acceptedFiles.map((file) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                const data = yield (0, helpers_1.readFile)(file);
                return {
                    file,
                    data,
                };
            })));
            // Notify added files
            if (onAdd) {
                onAdd(fileObjs);
            }
            // Display message
            const message = fileObjs.reduce((msg, fileObj) => msg + getFileAddedMessage(fileObj.file.name), "");
            this.setState({
                openSnackBar: true,
                snackbarMessage: message,
                snackbarVariant: "success",
            }, this.notifyAlert);
        });
        this.handleDropRejected = (rejectedFiles, evt) => {
            const { acceptedFiles, filesLimit = DropzoneAreaBase.defaultProps.filesLimit, fileObjects, getDropRejectMessage = DropzoneAreaBase.defaultProps.getDropRejectMessage, getFileLimitExceedMessage = DropzoneAreaBase.defaultProps
                .getFileLimitExceedMessage, maxFileSize = DropzoneAreaBase.defaultProps.maxFileSize, onDropRejected, } = this.props;
            let message = "";
            if (fileObjects.length + rejectedFiles.length > filesLimit) {
                message = getFileLimitExceedMessage(filesLimit);
            }
            else {
                rejectedFiles.forEach((rejectedFile) => {
                    message = getDropRejectMessage(rejectedFile, acceptedFiles || [], maxFileSize);
                });
            }
            if (onDropRejected) {
                onDropRejected(rejectedFiles, evt);
            }
            this.setState({
                openSnackBar: true,
                snackbarMessage: message,
                snackbarVariant: "error",
            }, this.notifyAlert);
        };
        this.handleRemove = (fileIndex) => (event) => {
            event.stopPropagation();
            const { fileObjects, getFileRemovedMessage = DropzoneAreaBase.defaultProps
                .getFileRemovedMessage, onDelete, } = this.props;
            // Find removed fileObject
            const removedFileObj = fileObjects[fileIndex];
            // Notify removed file
            if (onDelete) {
                onDelete(removedFileObj, fileIndex);
            }
            this.setState({
                openSnackBar: true,
                snackbarMessage: getFileRemovedMessage(removedFileObj.file.name),
                snackbarVariant: "info",
            }, this.notifyAlert);
        };
        this.handleCloseSnackbar = () => {
            this.setState({
                openSnackBar: false,
            });
        };
    }
    notifyAlert() {
        const { onAlert } = this.props;
        const { openSnackBar, snackbarMessage, snackbarVariant } = this.state;
        if (openSnackBar && onAlert) {
            onAlert(snackbarMessage, snackbarVariant);
        }
    }
    render() {
        const { acceptedFiles, alertSnackbarProps, classes = {}, disableRejectionFeedback, dropzoneClass, dropzoneParagraphClass, dropzoneProps, dropzoneText, fileObjects, filesLimit = DropzoneAreaBase.defaultProps.filesLimit, getPreviewIcon = DropzoneAreaBase.defaultProps.getPreviewIcon, Icon, inputProps, maxFileSize, previewChipProps, previewGridClasses, previewGridProps, previewText, showAlerts, showFileNames, showFileNamesInPreview, showPreviews, showPreviewsInDropzone, useChipsForPreview, } = this.props;
        const { openSnackBar, snackbarMessage, snackbarVariant } = this.state;
        const acceptFiles = acceptedFiles === null || acceptedFiles === void 0 ? void 0 : acceptedFiles.join(",");
        const isMultiple = filesLimit > 1;
        const previewsVisible = showPreviews && fileObjects.length > 0;
        const previewsInDropzoneVisible = showPreviewsInDropzone && fileObjects.length > 0;
        return (<react_1.Fragment>
        <react_dropzone_1.default {...dropzoneProps} accept={acceptFiles} onDropAccepted={this.handleDropAccepted} onDropRejected={this.handleDropRejected} maxSize={maxFileSize} multiple={isMultiple}>
          {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (<div {...getRootProps({
                className: (0, clsx_1.default)(classes.root, dropzoneClass, isDragActive && classes.active, !disableRejectionFeedback && isDragReject && classes.invalid),
            })}>
              <input {...getInputProps(inputProps)}/>

              <div className={classes.textContainer}>
                <Typography_1.default variant="h5" component="p" className={(0, clsx_1.default)(classes.text, dropzoneParagraphClass)}>
                  {dropzoneText}
                </Typography_1.default>
                {Icon ? (<Icon className={classes.icon}/>) : (<CloudUpload_1.default className={classes.icon}/>)}
              </div>

              {previewsInDropzoneVisible ? (<PreviewList_1.default fileObjects={fileObjects} handleRemove={this.handleRemove} getPreviewIcon={getPreviewIcon} showFileNames={showFileNames} useChipsForPreview={useChipsForPreview} previewChipProps={previewChipProps} previewGridClasses={previewGridClasses} previewGridProps={previewGridProps}/>) : null}
            </div>)}
        </react_dropzone_1.default>

        {previewsVisible ? (<react_1.Fragment>
            <Typography_1.default variant="subtitle1" component="span">
              {previewText}
            </Typography_1.default>

            <PreviewList_1.default fileObjects={fileObjects} handleRemove={this.handleRemove} getPreviewIcon={getPreviewIcon} showFileNames={showFileNamesInPreview} useChipsForPreview={useChipsForPreview} previewChipProps={previewChipProps} previewGridClasses={previewGridClasses} previewGridProps={previewGridProps}/>
          </react_1.Fragment>) : null}

        {(typeof showAlerts === "boolean" && showAlerts) ||
                (Array.isArray(showAlerts) && showAlerts.includes(snackbarVariant)) ? (<Snackbar_1.default anchorOrigin={defaultSnackbarAnchorOrigin} autoHideDuration={6000} {...alertSnackbarProps} open={openSnackBar} onClose={this.handleCloseSnackbar}>
            <SnackbarContentWrapper_1.default onClose={this.handleCloseSnackbar} variant={snackbarVariant} message={snackbarMessage}/>
          </Snackbar_1.default>) : null}
      </react_1.Fragment>);
    }
}
DropzoneAreaBase.propTypes = {
    /** @ignore */
    classes: prop_types_1.default.object.isRequired,
    acceptedFiles: prop_types_1.default.arrayOf(prop_types_1.default.string),
    filesLimit: prop_types_1.default.number,
    Icon: prop_types_1.default.elementType,
    fileObjects: prop_types_1.default.arrayOf(exports.FileObjectShape),
    maxFileSize: prop_types_1.default.number,
    dropzoneText: prop_types_1.default.string,
    dropzoneClass: prop_types_1.default.string,
    dropzoneParagraphClass: prop_types_1.default.string,
    disableRejectionFeedback: prop_types_1.default.bool,
    showPreviews: prop_types_1.default.bool,
    showPreviewsInDropzone: prop_types_1.default.bool,
    showFileNames: prop_types_1.default.bool,
    showFileNamesInPreview: prop_types_1.default.bool,
    useChipsForPreview: prop_types_1.default.bool,
    previewChipProps: prop_types_1.default.object,
    previewGridClasses: prop_types_1.default.object,
    previewGridProps: prop_types_1.default.object,
    previewText: prop_types_1.default.string,
    showAlerts: prop_types_1.default.oneOfType([
        prop_types_1.default.bool,
        prop_types_1.default.arrayOf(prop_types_1.default.oneOf(["error", "success", "info", "warning"])),
    ]),
    alertSnackbarProps: prop_types_1.default.object,
    dropzoneProps: prop_types_1.default.object,
    inputProps: prop_types_1.default.object,
    getFileLimitExceedMessage: prop_types_1.default.func,
    getFileAddedMessage: prop_types_1.default.func,
    getFileRemovedMessage: prop_types_1.default.func,
    getDropRejectMessage: prop_types_1.default.func,
    getPreviewIcon: prop_types_1.default.func,
    onAdd: prop_types_1.default.func,
    onDelete: prop_types_1.default.func,
    onDrop: prop_types_1.default.func,
    onDropRejected: prop_types_1.default.func,
    onAlert: prop_types_1.default.func,
};
DropzoneAreaBase.defaultProps = {
    acceptedFiles: [],
    filesLimit: 3,
    fileObjects: [],
    maxFileSize: 3000000,
    dropzoneText: "Drag and drop a file here or click",
    previewText: "Preview:",
    disableRejectionFeedback: false,
    showPreviews: false,
    showPreviewsInDropzone: true,
    showFileNames: false,
    showFileNamesInPreview: false,
    useChipsForPreview: false,
    previewChipProps: {},
    previewGridClasses: {},
    previewGridProps: {},
    showAlerts: true,
    alertSnackbarProps: {
        anchorOrigin: {
            horizontal: "left",
            vertical: "bottom",
        },
        autoHideDuration: 6000,
    },
    getFileLimitExceedMessage: ((filesLimit) => `Maximum allowed number of files exceeded. Only ${filesLimit} allowed`),
    getFileAddedMessage: ((fileName) => `File ${fileName} successfully added.`),
    getPreviewIcon: defaultGetPreviewIcon,
    getFileRemovedMessage: ((fileName) => `File ${fileName} removed.`),
    getDropRejectMessage: ((rejectedFile, acceptedFiles, maxFileSize) => {
        let message = `File ${rejectedFile.name} was rejected. `;
        if (!acceptedFiles.includes(rejectedFile.type)) {
            message += "File type not supported. ";
        }
        if (rejectedFile.size > maxFileSize) {
            message +=
                "File is too big. Size limit is " +
                    (0, helpers_1.convertBytesToMbsOrKbs)(maxFileSize) +
                    ". ";
        }
        return message;
    }),
};
const StyledDropzoneAreaBase = (0, system_1.styled)(DropzoneAreaBase, {
    name: "MuiDropzoneArea",
})((combinedProps) => {
    const { theme: { palette, shape, spacing }, } = combinedProps;
    return {
        "@keyframes progress": {
            "0%": {
                backgroundPosition: "0 0",
            },
            "100%": {
                backgroundPosition: "-70px 0",
            },
        },
        root: {
            position: "relative",
            width: "100%",
            minHeight: "250px",
            backgroundColor: palette.background.paper,
            border: "dashed",
            borderColor: palette.divider,
            borderRadius: shape.borderRadius,
            boxSizing: "border-box",
            cursor: "pointer",
            overflow: "hidden",
        },
        active: {
            animation: "$progress 2s linear infinite !important",
            // eslint-disable-next-line max-len
            backgroundImage: `repeating-linear-gradient(-45deg, ${palette.background.paper}, ${palette.background.paper} 25px, ${palette.divider} 25px, ${palette.divider} 50px)`,
            backgroundSize: "150% 100%",
            border: "solid",
            borderColor: palette.primary.light,
        },
        invalid: {
            // eslint-disable-next-line max-len
            backgroundImage: `repeating-linear-gradient(-45deg, ${palette.error.light}, ${palette.error.light} 25px, ${palette.error.dark} 25px, ${palette.error.dark} 50px)`,
            borderColor: palette.error.main,
        },
        textContainer: {
            textAlign: "center",
        },
        text: {
            marginBottom: spacing(3),
            marginTop: spacing(3),
        },
        icon: {
            width: 51,
            height: 51,
            color: palette.text.primary,
        },
    };
});
exports.default = StyledDropzoneAreaBase;
//# sourceMappingURL=DropzoneAreaBase.jsx.map