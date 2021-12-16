import { ChipProps } from "@mui/material/Chip";
import { GridProps } from "@mui/material/Grid";
import { SnackbarProps } from "@mui/material/Snackbar";
import PropTypes from "prop-types";
import { ComponentType, HTMLProps } from "react";
import { DropEvent, DropzoneProps } from "react-dropzone";
import { AlertType, FileObject } from "../types";
import { PreviewListProps } from "./PreviewList";
export declare const FileObjectShape: PropTypes.Requireable<PropTypes.InferProps<{
    file: PropTypes.Requireable<object>;
    data: PropTypes.Requireable<any>;
}>>;
export declare type DropzoneAreaBaseClasses = {
    /** Material-UI class applied to the root Dropzone div */
    root: string;
    /** Material-UI class applied to the Dropzone when 'active' */
    active: string;
    /** Material-UI class applied to the Dropzone when 'invalid' */
    invalid: string;
    /** Material-UI class applied to the Dropzone text container div */
    textContainer: string;
    /** Material-UI class applied to the Dropzone text */
    text: string;
    /** Material-UI class applied to the Dropzone icon */
    icon: string;
};
export declare type DropzoneAreaBaseProps = {
    classes?: Partial<DropzoneAreaBaseClasses>;
    /** A list of file types to accept.
     *
     * @see See [here](https://react-dropzone.js.org/#section-accepting-specific-file-types) for more details.
     */
    acceptedFiles?: string[];
    /** Maximum number of files that can be loaded into the dropzone. */
    filesLimit?: number;
    /** Currently loaded files. */
    fileObjects: FileObject[];
    /** Icon to be displayed inside the dropzone area. */
    Icon?: ComponentType<{
        className?: string;
    }>;
    /** Maximum file size (in bytes) that the dropzone will accept. */
    maxFileSize?: number;
    /** Text inside the dropzone. */
    dropzoneText?: string;
    /** The label for the file preview section. */
    previewText?: string;
    /** Shows previews **BELOW** the dropzone. */
    showPreviews?: boolean;
    /** Shows preview **INSIDE** the dropzone area. */
    showPreviewsInDropzone?: boolean;
    /** Shows file name under the image. */
    showFileNamesInPreview?: boolean;
    /** Shows file name under the dropzone image. */
    showFileNames?: boolean;
    /** Uses deletable Material-UI Chip components to display file names. */
    useChipsForPreview?: boolean;
    /**
     * Props to pass to the Material-UI Chip components.
     *
     * Requires `useChipsForPreview` prop to be `true`.
     *
     * @see See [Material-UI Chip](https://material-ui.com/api/chip/#props) for available values.
     */
    previewChipProps?: ChipProps;
    /**
     * Custom CSS classNames for preview Grid components.
     *
     * Should be in the form {container: string, item: string, image: string}.
     */
    previewGridClasses?: {
        container?: string;
        item?: string;
        image?: string;
    };
    /**
     * Props to pass to the Material-UI Grid components.
     *
     * Should be in the form {container: GridProps, item: GridProps}.
     *
     * @see See [Material-UI Grid](https://material-ui.com/api/grid/#props) for available GridProps values.
     */
    previewGridProps?: {
        container?: GridProps;
        item?: GridProps;
    };
    /**
     * Shows styled Material-UI Snackbar when files are dropped, deleted or rejected.
     *
     * - can be a boolean ("global" `true` or `false` for all alerts).
     * - can be an array, with values 'error', 'info', 'success', 'warning' to select to view only certain alerts:
     *  - showAlerts={['error']} for only errors.
     *  - showAlerts={['error', 'info']} for both errors and info.
     *  - showAlerts={['error', 'success', 'info', 'warning']} is same as showAlerts={true}.
     *  - showAlerts={[]} is same as showAlerts={false}.
     */
    showAlerts?: boolean | AlertType[];
    /**
     * Props to pass to the Material-UI Snackbar components.
     * Requires `showAlerts` prop to be `true`.
     *
     * @see See [Material-UI Snackbar](https://material-ui.com/api/snackbar/#props) for available values.
     */
    alertSnackbarProps?: SnackbarProps;
    /**
     * Props to pass to the Dropzone component.
     *
     * @see See [Dropzone props](https://react-dropzone.js.org/#src) for available values.
     */
    dropzoneProps?: DropzoneProps;
    /**
     * Attributes applied to the input element.
     *
     * @see See [MDN Input File attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Additional_attributes) for available values.
     */
    inputProps?: HTMLProps<HTMLInputElement>;
    clearOnUnmount?: boolean;
    /** Custom CSS class name for dropzone container. */
    dropzoneClass?: string;
    /** Custom CSS class name for text inside the container. */
    dropzoneParagraphClass?: string;
    /** Disable feedback effect when dropping rejected files. */
    disableRejectionFeedback?: boolean;
    /**
     * Fired when new files are added to dropzone.
     *
     * @param {FileObject[]} newFiles The new files added to the dropzone.
     */
    onAdd?: (newFiles: FileObject[]) => void;
    /**
     * Fired when a file is deleted from the previews panel.
     *
     * @param {FileObject} deletedFileObject The file that was removed.
     * @param {number} index The index of the removed file object.
     */
    onDelete?: (deletedFileObject: FileObject, index: number) => void;
    /**
     * Fired when the user drops files into the dropzone.
     *
     * @param {File[]} droppedFiles All the files dropped into the dropzone.
     * @param {Event} event The react-dropzone drop event.
     */
    onDrop?: (droppedFiles: File[], event: DropEvent) => void;
    /**
     * Fired when a file is rejected because of wrong file type, size or goes beyond the filesLimit.
     *
     * @param {File[]} rejectedFiles All the rejected files.
     * @param {Event} event The react-dropzone drop event.
     */
    onDropRejected?: (rejectedFiles: File[], event: DropEvent) => void;
    /**
     * Fired when an alert is triggered.
     *
     * @param {string} message Alert message.
     * @param {string} variant One of "error", "info", "success".
     */
    onAlert?: (message: string, variant: AlertType) => void;
    /**
     * Get alert message to display when files limit is exceed.
     *
     * *Default*: "Maximum allowed number of files exceeded. Only ${filesLimit} allowed"
     *
     * @param {number} filesLimit The `filesLimit` currently set for the component.
     */
    getFileLimitExceedMessage?: (filesLimit: number) => string;
    /**
     * Get alert message to display when a new file is added.
     *
     * *Default*: "File ${fileName} successfully added."
     *
     * @param {string} fileName The newly added file name.
     */
    getFileAddedMessage?: (fileName: string) => string;
    /**
     * Get alert message to display when a file is removed.
     *
     * *Default*: "File ${fileName} removed."
     *
     * @param {string} fileName The name of the removed file.
     */
    getFileRemovedMessage?: (fileName: string) => string;
    /**
     * Get alert message to display when a file is rejected onDrop.
     *
     * *Default*: "File ${rejectedFile.name} was rejected."
     *
     * @param {Object} rejectedFile The file that got rejected
     * @param {string[]} acceptedFiles The `acceptedFiles` prop currently set for the component
     * @param {number} maxFileSize The `maxFileSize` prop currently set for the component
     */
    getDropRejectMessage?: (rejectedFile: File, acceptedFiles: string[], maxFileSize: number) => string;
    /**
     * A function which determines which icon to display for a file preview.
     *
     * *Default*: If its an image then displays a preview the image, otherwise it will display an attachment icon
     *
     * @param {FileObject} fileObject The file which the preview will belong to
     * @param {Object} classes The classes for the file preview icon, in the default case we use the 'image' className.
     */
    getPreviewIcon?: PreviewListProps["getPreviewIcon"];
};
declare const StyledDropzoneAreaBase: StyledComponent<ComponentProps, SpecificComponentProps, JSXProps>;
export default StyledDropzoneAreaBase;
//# sourceMappingURL=DropzoneAreaBase.d.ts.map