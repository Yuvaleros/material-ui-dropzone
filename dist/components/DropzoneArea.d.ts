import { PureComponent } from "react";
import { FileObject } from "../types";
import { DropzoneAreaBaseProps } from "./DropzoneAreaBase";
export declare type DropzoneAreaProps = Omit<DropzoneAreaBaseProps, "fileObjects" | "onAdd" | "onDelete"> & {
    /** Clear uploaded files when component is unmounted. */
    clearOnUnmount?: boolean;
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
     * Fired when a file is deleted from the previews panel.
     *
     * @param {File} deletedFile The file that was removed.
     */
    onDelete?: (deletedFile: File) => void;
};
declare type DropzoneAreaState = {
    fileObjects: FileObject[];
};
/**
 * This components creates an uncontrolled Material-UI Dropzone, with previews and snackbar notifications.
 *
 * It supports all props of `DropzoneAreaBase` but keeps the files state internally.
 *
 * **Note** To listen to file changes use `onChange` event handler and notice that `onDelete` returns a `File` instance instead of `FileObject`.
 */
declare class DropzoneArea extends PureComponent<DropzoneAreaProps, DropzoneAreaState> {
    static propTypes: any;
    static defaultProps: {
        clearOnUnmount: boolean;
        filesLimit: number;
        initialFiles: (string | File)[];
    };
    state: DropzoneAreaState;
    componentDidMount(): void;
    componentWillUnmount(): void;
    notifyFileChange: () => void;
    loadInitialFiles: () => Promise<void>;
    addFiles: DropzoneAreaBaseProps["onAdd"];
    deleteFile: DropzoneAreaBaseProps["onDelete"];
    render(): JSX.Element;
}
export default DropzoneArea;
//# sourceMappingURL=DropzoneArea.d.ts.map