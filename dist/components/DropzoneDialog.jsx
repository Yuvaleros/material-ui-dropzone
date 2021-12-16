"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const prop_types_1 = (0, tslib_1.__importDefault)(require("prop-types"));
const react_1 = (0, tslib_1.__importStar)(require("react"));
const helpers_1 = require("../helpers");
const DropzoneDialogBase_1 = (0, tslib_1.__importDefault)(require("./DropzoneDialogBase"));
/**
 * This component provides an uncontrolled version of the DropzoneDialogBase component.
 *
 * It supports all the Props and Methods from `DropzoneDialogBase` but keeps the files state internally.
 *
 * **Note** The `onSave` handler also returns `File[]` with all the accepted files.
 */
class DropzoneDialog extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            fileObjects: [],
        };
        this.notifyFileChange = () => {
            const { onChange } = this.props;
            const { fileObjects } = this.state;
            if (onChange) {
                onChange(fileObjects.map((fileObject) => fileObject.file));
            }
        };
        this.loadInitialFiles = () => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { initialFiles = DropzoneDialog.defaultProps.initialFiles } = this.props;
            try {
                const fileObjs = yield Promise.all(initialFiles.map((initialFile) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                    let file;
                    if (typeof initialFile === "string") {
                        file = yield (0, helpers_1.createFileFromUrl)(initialFile);
                    }
                    else {
                        file = initialFile;
                    }
                    const data = yield (0, helpers_1.readFile)(file);
                    const fileObj = { file, data };
                    return fileObj;
                })));
                this.setState((state) => ({
                    fileObjects: [...state.fileObjects, ...fileObjs],
                }), this.notifyFileChange);
            }
            catch (err) {
                // eslint-disable-next-line no-console
                console.log(err);
            }
        });
        this.addFiles = (newFileObjects) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { filesLimit = DropzoneDialog.defaultProps.filesLimit } = this.props;
            // Update component state
            this.setState((state) => {
                // Handle a single file
                if (filesLimit <= 1) {
                    return {
                        fileObjects: [newFileObjects[0]],
                    };
                }
                // Handle multiple files
                return {
                    fileObjects: [...state.fileObjects, ...newFileObjects],
                };
            }, this.notifyFileChange);
        });
        this.deleteFile = (removedFileObj, removedFileObjIdx) => {
            event === null || event === void 0 ? void 0 : event.stopPropagation();
            const { onDelete } = this.props;
            const { fileObjects } = this.state;
            // Calculate remaining fileObjects array
            const remainingFileObjs = fileObjects.filter((fileObject, i) => {
                return i !== removedFileObjIdx;
            });
            // Notify removed file
            if (onDelete) {
                onDelete(removedFileObj.file);
            }
            // Update local state
            this.setState({ fileObjects: remainingFileObjs }, this.notifyFileChange);
        };
        this.handleClose = (evt, reason) => {
            const { clearOnUnmount, onClose } = this.props;
            if (onClose) {
                onClose(evt, reason);
            }
            if (clearOnUnmount) {
                this.setState({ fileObjects: [] }, this.notifyFileChange);
            }
        };
        this.handleSave = (evt) => {
            const { clearOnUnmount, onSave } = this.props;
            const { fileObjects } = this.state;
            if (onSave) {
                onSave(fileObjects.map((fileObject) => fileObject.file), evt);
            }
            if (clearOnUnmount) {
                this.setState({ fileObjects: [] }, this.notifyFileChange);
            }
        };
    }
    componentDidMount() {
        this.loadInitialFiles();
    }
    componentWillUnmount() {
        const { clearOnUnmount } = this.props;
        if (clearOnUnmount) {
            this.setState({ fileObjects: [] }, this.notifyFileChange);
        }
    }
    render() {
        const { fileObjects } = this.state;
        return (<DropzoneDialogBase_1.default {...this.props} fileObjects={fileObjects} onAdd={this.addFiles} onDelete={this.deleteFile} onClose={this.handleClose} onSave={this.handleSave}/>);
    }
}
DropzoneDialog.propTypes = Object.assign(Object.assign({}, DropzoneDialogBase_1.default.propTypes), { clearOnUnmount: prop_types_1.default.bool, filesLimit: prop_types_1.default.number, initialFiles: prop_types_1.default.arrayOf(prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.any])), onSave: prop_types_1.default.func });
DropzoneDialog.defaultProps = {
    clearOnUnmount: true,
    filesLimit: 3,
    initialFiles: [],
};
exports.default = DropzoneDialog;
//# sourceMappingURL=DropzoneDialog.jsx.map