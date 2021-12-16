"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const prop_types_1 = (0, tslib_1.__importDefault)(require("prop-types"));
const react_1 = (0, tslib_1.__importStar)(require("react"));
const helpers_1 = require("../helpers");
const DropzoneAreaBase_1 = (0, tslib_1.__importDefault)(require("./DropzoneAreaBase"));
const splitDropzoneAreaProps = (props) => {
    const { clearOnUnmount, initialFiles, onChange, onDelete } = props, dropzoneAreaBaseProps = (0, tslib_1.__rest)(props, ["clearOnUnmount", "initialFiles", "onChange", "onDelete"]);
    const dropzoneAreaProps = {
        clearOnUnmount,
        initialFiles,
        onChange,
        onDelete,
    };
    const splitProps = [
        dropzoneAreaProps,
        dropzoneAreaBaseProps,
    ];
    return splitProps;
};
/**
 * This components creates an uncontrolled Material-UI Dropzone, with previews and snackbar notifications.
 *
 * It supports all props of `DropzoneAreaBase` but keeps the files state internally.
 *
 * **Note** To listen to file changes use `onChange` event handler and notice that `onDelete` returns a `File` instance instead of `FileObject`.
 */
class DropzoneArea extends react_1.PureComponent {
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
            const { initialFiles = DropzoneArea.defaultProps.initialFiles } = this.props;
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
                this.setState((prevState) => ({
                    fileObjects: [...prevState.fileObjects, ...fileObjs],
                }), this.notifyFileChange);
            }
            catch (err) {
                // eslint-disable-next-line no-console
                console.log(err);
            }
        });
        this.addFiles = (newFileObjects) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { filesLimit = DropzoneArea.defaultProps.filesLimit } = this.props;
            // Update component state
            this.setState((prevState) => {
                // Handle a single file
                if (filesLimit <= 1) {
                    return {
                        fileObjects: [newFileObjects[0]],
                    };
                }
                // Handle multiple files
                return {
                    fileObjects: [...prevState.fileObjects, ...newFileObjects],
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
        const [, dropzoneAreaBaseProps] = splitDropzoneAreaProps(this.props);
        const { fileObjects } = this.state;
        return (<DropzoneAreaBase_1.default {...dropzoneAreaBaseProps} fileObjects={fileObjects} onAdd={this.addFiles} onDelete={this.deleteFile}/>);
    }
}
DropzoneArea.propTypes = Object.assign(Object.assign({}, DropzoneAreaBase_1.default.propTypes), { clearOnUnmount: prop_types_1.default.bool, initialFiles: prop_types_1.default.arrayOf(prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.any])), filesLimit: prop_types_1.default.number, onChange: prop_types_1.default.func, onDelete: prop_types_1.default.func });
DropzoneArea.defaultProps = {
    clearOnUnmount: true,
    filesLimit: 3,
    initialFiles: [],
};
exports.default = DropzoneArea;
//# sourceMappingURL=DropzoneArea.jsx.map