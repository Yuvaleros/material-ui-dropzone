import { ChipProps } from '@material-ui/core/Chip';
import { DialogProps } from '@material-ui/core/Dialog';
import { GridProps } from '@material-ui/core/Grid';
import { SnackbarProps } from '@material-ui/core/Snackbar';
import * as React from 'react';
import { DropEvent, DropzoneProps } from 'react-dropzone';

// DropzoneArea

export interface DropzoneAreaProps {
  acceptedFiles?: string[];
  filesLimit?: number;
  maxFileSize?: number;
  dropzoneText?: string;
  previewText?: string;
  showPreviews?: boolean;
  showPreviewsInDropzone?: boolean;
  showFileNamesInPreview?: boolean;
  showFileNames?: boolean;
  useChipsForPreview?: boolean;
  previewChipProps?: ChipProps;
  previewGridClasses?: {
    container?: string,
    item?: string,
    image?: string
  };
  previewGridProps?: {
    container?: GridProps,
    item?: GridProps
  };
  showAlerts?: boolean;
  alertSnackbarProps?: SnackbarProps;
  dropzoneProps?: DropzoneProps;
  inputProps?: React.HTMLProps<HTMLInputElement>;
  clearOnUnmount?: boolean;
  dropzoneClass?: string;
  dropzoneParagraphClass?: string;
  initialFiles?: string[];
  onChange?: (files: File[]) => void;
  onDrop?: (files: File[], event: DropEvent) => void;
  onDropRejected?: (files: File[], event: DropEvent) => void;
  onDelete?: (file: File) => void;
  getFileLimitExceedMessage?: (filesLimit: number) => string;
  getFileAddedMessage?: (fileName: string) => string;
  getFileRemovedMessage?: (fileName: string) => string;
  getDropRejectMessage?: (
    rejectedFile: File,
    acceptedFiles: string[],
    maxFileSize: number,
  ) => string;
}

export const DropzoneArea: React.ComponentType<DropzoneAreaProps>;

// DropzoneDialog

export interface DropzoneDialogProps extends DropzoneAreaProps {
  cancelButtonText?: string;
  dialogProps?: DialogProps;
  dialogTitle?: string;
  fullWidth?: boolean;
  maxWidth?: string;
  onClose?: () => void;
  onSave?: (files: File[]) => void;
  open?: boolean;
  submitButtonText?: string;
}

export const DropzoneDialog: React.ComponentType<DropzoneDialogProps>;
