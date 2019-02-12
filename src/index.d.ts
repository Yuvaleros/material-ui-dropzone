import * as React from "react";

export interface DropzoneAreaProps {
    acceptedFiles?: string[];
    filesLimit?: number;
    maxFileSize?: number;
    dropzoneText?: string;
    showPreviews?: boolean;
    showPreviewsInDropzone?: boolean;
    showFileNamesInPreview?: boolean;
    showAlerts?: boolean;
    clearOnUnmount?: boolean;
    onChange?: (files: any) => void;
    onDrop?: (files: any) => void;
    onDropRejected?: (files: any, evt: any) => void;
    onDelete?: (file: any) => void;
}
export const DropzoneArea: React.ComponentType<DropzoneAreaProps>;

export interface DropzoneDialogProps {
    open: boolean
    onSave?: (files: any) => void;
    onDelete?: (file: any) => void;
    onClose?: () => void;
    onChange?: (files: any) => void;
    onDrop?: (files: any) => void;
    onDropRejected?: (files: any, evt: any) => void;
    acceptedFiles?: string[];
    filesLimit?: number;
    maxFileSize?: number
    showPreviews?: boolean;
    showPreviewsInDropzone?: boolean;
    showAlerts?: boolean;
    clearOnUnmount?: boolean;
}
export const DropzoneDialog: React.ComponentType<DropzoneDialogProps>;
