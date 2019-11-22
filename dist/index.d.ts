import { ChipProps } from '@material-ui/core/Chip';
import * as React from 'react';

export interface DropzoneAreaProps {
  acceptedFiles?: string[];
  filesLimit?: number;
  maxFileSize?: number;
  dropzoneText?: string;
  showPreviews?: boolean;
  showPreviewsInDropzone?: boolean;
  showFileNamesInPreview?: boolean;
  showFileNames?: boolean;
  useChipsForPreview?: boolean;
  previewChipProps?: ChipProps;
  showAlerts?: boolean;
  clearOnUnmount?: boolean;
  dropzoneClass?: string;
  dropzoneParagraphClass?: string;
  initialFiles?: string[];
  onChange?: (files: any) => void;
  onDrop?: (files: any) => void;
  onDropRejected?: (files: any, evt: any) => void;
  onDelete?: (file: any) => void;
  getFileLimitExceedMessage?: (filesLimit: number) => string;
  getFileAddedMessage?: (fileName: string) => string;
  getFileRemovedMessage?: (fileName: string) => string;
  getDropRejectMessage?: (
    rejectedFile: { name: string; type: string | undefined; size: number },
    acceptedFiles: string[],
    maxFileSize: number
  ) => string;
}
export const DropzoneArea: React.ComponentType<DropzoneAreaProps>;

export interface DropzoneDialogProps {
  open: boolean;
  onSave?: (files: any) => void;
  onDelete?: (file: any) => void;
  onClose?: () => void;
  onChange?: (files: any) => void;
  onDrop?: (files: any) => void;
  onDropRejected?: (files: any, evt: any) => void;
  acceptedFiles?: string[];
  filesLimit?: number;
  maxFileSize?: number;
  dropzoneText?: string;
  showPreviews?: boolean;
  showPreviewsInDropzone?: boolean;
  useChipsForPreview?: boolean;
  previewChipProps?: ChipProps;
  showAlerts?: boolean;
  clearOnUnmount?: boolean;
  dialogTitle?: string;
  cancelButtonText?: string;
  submitButtonText?: string;
  maxWidth?: string;
  fullWidth?: boolean;
}
export const DropzoneDialog: React.ComponentType<DropzoneDialogProps>;
