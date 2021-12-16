import { PureComponent, SyntheticEvent } from "react";
import { FileObject } from "../types";
import { DropzoneDialogBaseProps } from "./DropzoneDialogBase";
export declare type DropzoneDialogProps = Omit<DropzoneDialogBaseProps, "fileObjects" | "onAdd" | "onDelete" | "onSave"> & {
    /** Clear uploaded files when component is unmounted. */
    clearOnUnmount?: boolean;
    /** Maximum number of files that can be loaded into the dropzone. */
    filesLimit?: number;
    /** List containing File objects or URL strings.
     *
     * **Note:** Please take care of CORS.
     */
    initialFiles?: (File | string)[];
    /**
     * Fired when the files inside dropzone change.
     *
     * @param {File[]} loadedFiles All the files currently loaded into the dropzone.
     */
    onChange?: (loadedFiles: File[]) => void;
    /**
     * Fired when the user clicks the Submit button.
     *
     * @param {File[]} files All the files currently inside the Dropzone.
     * @param {SyntheticEvent} event The react `SyntheticEvent`.
     */
    onSave?: (files: File[], event: SyntheticEvent) => void;
    /**
     * Fired when a file is deleted from the previews panel.
     *
     * @param {File} deletedFile The file that was removed.
     */
    onDelete?: (deletedFile: File) => void;
};
declare type DropzoneDialogState = {
    fileObjects: FileObject[];
};
/**
 * This component provides an uncontrolled version of the DropzoneDialogBase component.
 *
 * It supports all the Props and Methods from `DropzoneDialogBase` but keeps the files state internally.
 *
 * **Note** The `onSave` handler also returns `File[]` with all the accepted files.
 */
declare class DropzoneDialog extends PureComponent<DropzoneDialogProps, DropzoneDialogState> {
    static propTypes: any;
    static defaultProps: {
        clearOnUnmount: boolean;
        filesLimit: number;
        initialFiles: never[];
    };
    state: DropzoneDialogState;
    componentDidMount(): void;
    componentWillUnmount(): void;
    notifyFileChange: () => void;
    loadInitialFiles: () => Promise<void>;
    addFiles: DropzoneDialogBaseProps["onAdd"];
    deleteFile: DropzoneDialogBaseProps["onDelete"];
    handleClose: DropzoneDialogBaseProps["onClose"];
    handleSave: DropzoneDialogBaseProps["onSave"];
    render(): JSX.Element;
}
export default DropzoneDialog;
//# sourceMappingURL=DropzoneDialog.d.ts.map