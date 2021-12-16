import { Breakpoint } from "@mui/material";
import { ButtonProps } from "@mui/material/Button";
import { DialogProps } from "@mui/material/Dialog";
import React, { PureComponent } from "react";
import { DropzoneAreaBaseProps } from "./DropzoneAreaBase";
export declare type DropzoneDialogBaseProps = DropzoneAreaBaseProps & {
    /** Cancel button text in dialog. */
    cancelButtonText?: string;
    /**
     * Props to pass to the Material-UI Dialog components.
     * @see See [Material-UI Dialog](https://material-ui.com/api/dialog/#props) for available values.
     */
    dialogProps?: DialogProps;
    /** The Dialog title. */
    dialogTitle?: string | JSX.Element;
    /**
     * If `true`, the dialog stretches to `maxWidth`.
     *
     * Notice that the dialog width grow is limited by the default margin.
     */
    fullWidth?: boolean;
    /**
     * Determine the max-width of the dialog. The dialog width grows with the size of the screen.
     *
     * Set to `false` to disable `maxWidth`.
     */
    maxWidth?: Breakpoint;
    /**
     * Fired when the modal is closed.
     *
     * @param {SyntheticEvent} event The react `SyntheticEvent`
     */
    onClose?: DialogProps["onClose"];
    /**
     * Fired when the user clicks the Submit button.
     *
     * @param {SyntheticEvent} event The react `SyntheticEvent`
     */
    onSave?: (event: React.SyntheticEvent) => void;
    /** Sets whether the dialog is open or closed. */
    open?: boolean;
    /**
     * Shows previews **BELOW** the dropzone.
     *
     * **Note:** By default previews show up under in the Dialog and inside in the standalone.
     */
    showPreviews?: boolean;
    /** Submit button text in dialog. */
    submitButtonText?: string;
};
/**
 * This component provides the DropzoneArea inside of a Material-UI Dialog.
 *
 * It supports all the Props and Methods from `DropzoneAreaBase`.
 */
declare class DropzoneDialogBase extends PureComponent<DropzoneDialogBaseProps> {
    static propTypes: any;
    static defaultProps: {
        open: boolean;
        dialogTitle: string;
        dialogProps: DialogProps;
        fullWidth: boolean;
        maxWidth: Breakpoint;
        cancelButtonText: string;
        submitButtonText: string;
        showPreviews: boolean;
        showPreviewsInDropzone: boolean;
        showFileNamesInPreview: boolean;
    };
    handlePressClose: ButtonProps["onClick"];
    render(): JSX.Element;
}
export default DropzoneDialogBase;
//# sourceMappingURL=DropzoneDialogBase.d.ts.map