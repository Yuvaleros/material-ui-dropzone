"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Button_1 = (0, tslib_1.__importDefault)(require("@mui/material/Button"));
const Dialog_1 = (0, tslib_1.__importDefault)(require("@mui/material/Dialog"));
const DialogActions_1 = (0, tslib_1.__importDefault)(require("@mui/material/DialogActions"));
const DialogContent_1 = (0, tslib_1.__importDefault)(require("@mui/material/DialogContent"));
const DialogTitle_1 = (0, tslib_1.__importDefault)(require("@mui/material/DialogTitle"));
const prop_types_1 = (0, tslib_1.__importDefault)(require("prop-types"));
const react_1 = (0, tslib_1.__importStar)(require("react"));
const DropzoneAreaBase_1 = (0, tslib_1.__importDefault)(require("./DropzoneAreaBase"));
// Split props related to DropzoneDialog from DropzoneArea ones
function splitDropzoneDialogProps(allProps) {
    const defaults = DropzoneDialogBase.defaultProps;
    const { cancelButtonText = defaults.cancelButtonText, dialogProps = defaults.dialogProps, dialogTitle = defaults.dialogTitle, fullWidth = defaults.fullWidth, maxWidth = defaults.maxWidth, onClose, onSave, open = defaults.open, submitButtonText = defaults.submitButtonText } = allProps, dropzoneAreaProps = (0, tslib_1.__rest)(allProps, ["cancelButtonText", "dialogProps", "dialogTitle", "fullWidth", "maxWidth", "onClose", "onSave", "open", "submitButtonText"]);
    const dropzoneDialogProps = {
        cancelButtonText,
        dialogProps,
        dialogTitle,
        fullWidth,
        maxWidth,
        onClose,
        onSave,
        open,
        submitButtonText,
    };
    const splitProps = [dropzoneDialogProps, dropzoneAreaProps];
    return splitProps;
}
/**
 * This component provides the DropzoneArea inside of a Material-UI Dialog.
 *
 * It supports all the Props and Methods from `DropzoneAreaBase`.
 */
class DropzoneDialogBase extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.handlePressClose = (e) => {
            const { onClose } = this.props;
            onClose === null || onClose === void 0 ? void 0 : onClose(e, "backdropClick");
        };
    }
    render() {
        const [dropzoneDialogProps, dropzoneAreaProps] = splitDropzoneDialogProps(this.props);
        const { cancelButtonText, dialogProps, dialogTitle, fullWidth, maxWidth, onClose, onSave, open, submitButtonText, } = dropzoneDialogProps;
        // Submit button state
        const submitDisabled = dropzoneAreaProps.fileObjects.length === 0;
        return (<Dialog_1.default {...dialogProps} fullWidth={fullWidth} maxWidth={maxWidth} onClose={onClose} open={open}>
        <DialogTitle_1.default>{dialogTitle}</DialogTitle_1.default>

        <DialogContent_1.default>
          <DropzoneAreaBase_1.default {...dropzoneAreaProps}/>
        </DialogContent_1.default>

        <DialogActions_1.default>
          <Button_1.default onClick={this.handlePressClose}>{cancelButtonText}</Button_1.default>

          <Button_1.default disabled={submitDisabled} onClick={onSave}>
            {submitButtonText}
          </Button_1.default>
        </DialogActions_1.default>
      </Dialog_1.default>);
    }
}
DropzoneDialogBase.propTypes = Object.assign(Object.assign({}, DropzoneAreaBase_1.default.propTypes), { open: prop_types_1.default.bool, dialogTitle: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.element]), dialogProps: prop_types_1.default.object, fullWidth: prop_types_1.default.bool, maxWidth: prop_types_1.default.string, cancelButtonText: prop_types_1.default.string, submitButtonText: prop_types_1.default.string, onClose: prop_types_1.default.func, onSave: prop_types_1.default.func, showPreviews: prop_types_1.default.bool, showPreviewsInDropzone: prop_types_1.default.bool, showFileNamesInPreview: prop_types_1.default.bool });
DropzoneDialogBase.defaultProps = {
    open: false,
    dialogTitle: "Upload file",
    dialogProps: {},
    fullWidth: true,
    maxWidth: "sm",
    cancelButtonText: "Cancel",
    submitButtonText: "Submit",
    showPreviews: true,
    showPreviewsInDropzone: false,
    showFileNamesInPreview: true,
};
exports.default = DropzoneDialogBase;
//# sourceMappingURL=DropzoneDialogBase.jsx.map