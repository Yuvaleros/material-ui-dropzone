import PropTypes from "prop-types";
import React, { PureComponent, SyntheticEvent } from "react";

import { createFileFromUrl, readFile } from "../helpers";
import { FileObject } from "../types";
import DropzoneDialogBase, {
  DropzoneDialogBaseProps,
} from "./DropzoneDialogBase";

export type DropzoneDialogProps = Omit<
  DropzoneDialogBaseProps,
  "fileObjects" | "onAdd" | "onDelete" | "onSave"
> & {
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

type DropzoneDialogState = {
  fileObjects: FileObject[];
};

/**
 * This component provides an uncontrolled version of the DropzoneDialogBase component.
 *
 * It supports all the Props and Methods from `DropzoneDialogBase` but keeps the files state internally.
 *
 * **Note** The `onSave` handler also returns `File[]` with all the accepted files.
 */
class DropzoneDialog extends PureComponent<
  DropzoneDialogProps,
  DropzoneDialogState
> {
  static propTypes = {
    ...DropzoneDialogBase.propTypes,
    clearOnUnmount: PropTypes.bool,
    filesLimit: PropTypes.number,
    initialFiles: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.any])
    ),
    onSave: PropTypes.func,
  };

  static defaultProps = {
    clearOnUnmount: true,
    filesLimit: 3,
    initialFiles: [],
  };

  state: DropzoneDialogState = {
    fileObjects: [],
  };

  componentDidMount() {
    this.loadInitialFiles();
  }

  componentWillUnmount() {
    const { clearOnUnmount } = this.props;

    if (clearOnUnmount) {
      this.setState({ fileObjects: [] }, this.notifyFileChange);
    }
  }

  notifyFileChange = () => {
    const { onChange } = this.props;
    const { fileObjects } = this.state;

    if (onChange) {
      onChange(fileObjects.map((fileObject) => fileObject.file));
    }
  };

  loadInitialFiles = async () => {
    const { initialFiles = DropzoneDialog.defaultProps.initialFiles } =
      this.props;
    try {
      const fileObjs = await Promise.all(
        initialFiles.map(async (initialFile) => {
          let file;
          if (typeof initialFile === "string") {
            file = await createFileFromUrl(initialFile);
          } else {
            file = initialFile;
          }
          const data = await readFile(file);

          const fileObj: FileObject = { file, data };
          return fileObj;
        })
      );

      this.setState(
        (state) => ({
          fileObjects: [...state.fileObjects, ...fileObjs],
        }),
        this.notifyFileChange
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  addFiles: DropzoneDialogBaseProps["onAdd"] = async (newFileObjects) => {
    const { filesLimit = DropzoneDialog.defaultProps.filesLimit } = this.props;

    // Update component state
    this.setState((state) => {
      // Handle a single file
      if (filesLimit <= 1) {
        return {
          fileObjects: [newFileObjects[0]],
        };
      }

      // Handle multiple files
      return {
        fileObjects: [...state.fileObjects, ...newFileObjects],
      };
    }, this.notifyFileChange);
  };

  deleteFile: DropzoneDialogBaseProps["onDelete"] = (
    removedFileObj,
    removedFileObjIdx
  ) => {
    event?.stopPropagation();

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

  handleClose: DropzoneDialogBaseProps["onClose"] = (evt, reason) => {
    const { clearOnUnmount, onClose } = this.props;

    if (onClose) {
      onClose(evt, reason);
    }

    if (clearOnUnmount) {
      this.setState({ fileObjects: [] }, this.notifyFileChange);
    }
  };

  handleSave: DropzoneDialogBaseProps["onSave"] = (evt) => {
    const { clearOnUnmount, onSave } = this.props;
    const { fileObjects } = this.state;

    if (onSave) {
      onSave(
        fileObjects.map((fileObject) => fileObject.file),
        evt
      );
    }

    if (clearOnUnmount) {
      this.setState({ fileObjects: [] }, this.notifyFileChange);
    }
  };

  render() {
    const { fileObjects } = this.state;

    return (
      <DropzoneDialogBase
        {...this.props}
        fileObjects={fileObjects}
        onAdd={this.addFiles}
        onDelete={this.deleteFile}
        onClose={this.handleClose}
        onSave={this.handleSave}
      />
    );
  }
}

export default DropzoneDialog;
