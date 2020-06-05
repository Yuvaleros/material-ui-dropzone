import { ChipProps } from '@material-ui/core/Chip';
import { DialogProps } from '@material-ui/core/Dialog';
import { GridProps } from '@material-ui/core/Grid';
import { SnackbarProps } from '@material-ui/core/Snackbar';
import * as React from 'react';
import { DropEvent, DropzoneProps } from 'react-dropzone';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface FileObject {
  readonly file: File;
  readonly data: string | ArrayBuffer | null;
}

export interface PreviewIconProps {
  readonly classes: string;
}

export type AlertType = 'error' | 'success' | 'info';

// DropzoneAreaBase

export type DropzoneAreaBaseClasses = {
  /** CSS properties applied to the root Dropzone div */
  root: React.CSSProperties;
  /** CSS properties applied to the Dropzone when 'active' */
  active: React.CSSProperties;
  /** CSS properties applied to the Dropzone when 'invalid' */
  invalid: React.CSSProperties;
  /** CSS properties applied to the Dropzone text container div */
  textContainer: React.CSSProperties;
  /** CSS properties applied to the Dropzone text */
  text: React.CSSProperties;
  /** CSS properties applied to the Dropzone icon */
  icon: React.CSSProperties;
};

export type DropzoneAreaBaseProps = {
  classes?: Partial<DropzoneAreaBaseClasses>;
  acceptedFiles?: string[];
  fileObjects: FileObject[];
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
    container?: string;
    item?: string;
    image?: string;
  };
  previewGridProps?: {
    container?: GridProps;
    item?: GridProps;
  };
  showAlerts?: boolean | AlertType[];
  alertSnackbarProps?: SnackbarProps;
  dropzoneProps?: DropzoneProps;
  inputProps?: React.HTMLProps<HTMLInputElement>;
  clearOnUnmount?: boolean;
  dropzoneClass?: string;
  dropzoneParagraphClass?: string;
  onAdd?: (newFiles: FileObject[]) => void;
  onDelete?: (deletedFileObject: FileObject, index: number) => void;
  onDrop?: (files: File[], event: DropEvent) => void;
  onDropRejected?: (files: File[], event: DropEvent) => void;
  getFileLimitExceedMessage?: (filesLimit: number) => string;
  getFileAddedMessage?: (fileName: string) => string;
  getFileRemovedMessage?: (fileName: string) => string;
  getDropRejectMessage?: (
    rejectedFile: File,
    acceptedFiles: string[],
    maxFileSize: number
  ) => string;
  getPreviewIcon?: (
    file: FileObject,
    classes: PreviewIconProps
  ) => React.ReactElement;
};

export const DropzoneAreaBase: React.ComponentType<DropzoneAreaBaseProps>;

// DropzoneArea

export type DropzoneAreaProps = Omit<
  DropzoneAreaBaseProps,
  'fileObjects' | 'onAdd' | 'onDelete'
> & {
  clearOnUnmount?: boolean;
  initialFiles?: string[];
  onChange?: (files: File[]) => void;
  onDelete?: (file: File) => void;
};

export const DropzoneArea: React.ComponentType<DropzoneAreaProps>;

// DropzoneDialogBase

export type DropzoneDialogBaseProps = DropzoneAreaBaseProps & {
  cancelButtonText?: string;
  dialogProps?: DialogProps;
  dialogTitle?: string;
  fullWidth?: boolean;
  maxWidth?: string;
  onClose?: (event: React.SyntheticEvent) => void;
  onSave?: (event: React.SyntheticEvent) => void;
  open?: boolean;
  submitButtonText?: string;
};

export const DropzoneDialogBase: React.ComponentType<DropzoneDialogBaseProps>;

// DropzoneDialog

export type DropzoneDialogProps = Omit<
  DropzoneDialogBaseProps,
  'fileObjects' | 'onAdd' | 'onDelete' | 'onClose' | 'onSave'
> & {
  clearOnUnmount?: boolean;
  initialFiles?: string[];
  onSave?: (files: File[], event: React.SyntheticEvent) => void;
};

export const DropzoneDialog: React.ComponentType<DropzoneDialogProps>;
