import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import { createFileFromUrl, readFile } from "../helpers";
import { FileObject } from "../types";
import DropzoneAreaBase, { DropzoneAreaBaseProps } from "./DropzoneAreaBase";

const splitDropzoneAreaProps = (props: DropzoneAreaProps) => {
  const {
    clearOnUnmount,
    initialFiles,
    onChange,
    onDelete,
    ...dropzoneAreaBaseProps
  } = props;

  const dropzoneAreaProps = {
    clearOnUnmount,
    initialFiles,
    onChange,
    onDelete,
  };

  const splitProps: [typeof dropzoneAreaProps, typeof dropzoneAreaBaseProps] = [
    dropzoneAreaProps,
    dropzoneAreaBaseProps,
  ];
  return splitProps;
};

export type DropzoneAreaProps = Omit<
  DropzoneAreaBaseProps,
  "fileObjects" | "onAdd" | "onDelete"
> & {
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

type DropzoneAreaState = {
  fileObjects: FileObject[];
};

/**
 * This components creates an uncontrolled Material-UI Dropzone, with previews and snackbar notifications.
 *
 * It supports all props of `DropzoneAreaBase` but keeps the files state internally.
 *
 * **Note** To listen to file changes use `onChange` event handler and notice that `onDelete` returns a `File` instance instead of `FileObject`.
 */
class DropzoneArea extends PureComponent<DropzoneAreaProps, DropzoneAreaState> {
  static propTypes = {
    // @ts-ignore
    ...DropzoneAreaBase.propTypes,
    clearOnUnmount: PropTypes.bool,
    initialFiles: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.any])
    ),
    filesLimit: PropTypes.number,
    onChange: PropTypes.func,
    onDelete: PropTypes.func,
  };

  static defaultProps = {
    clearOnUnmount: true,
    filesLimit: 3,
    initialFiles: [] as NonNullable<DropzoneAreaProps["initialFiles"]>,
  };

  state: DropzoneAreaState = {
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
    const { initialFiles = DropzoneArea.defaultProps.initialFiles } =
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
        (prevState: DropzoneAreaState) => ({
          fileObjects: [...prevState.fileObjects, ...fileObjs],
        }),
        this.notifyFileChange
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  addFiles: DropzoneAreaBaseProps["onAdd"] = async (newFileObjects) => {
    const { filesLimit = DropzoneArea.defaultProps.filesLimit } = this.props;

    // Update component state
    this.setState((prevState: DropzoneAreaState) => {
      // Handle a single file
      if (filesLimit <= 1) {
        return {
          fileObjects: [newFileObjects[0]],
        };
      }

      // Handle multiple files
      return {
        fileObjects: [...prevState.fileObjects, ...newFileObjects],
      };
    }, this.notifyFileChange);
  };

  deleteFile: DropzoneAreaBaseProps["onDelete"] = (
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

  render() {
    const [, dropzoneAreaBaseProps] = splitDropzoneAreaProps(this.props);
    const { fileObjects } = this.state;

    return (
      <DropzoneAreaBase
        {...dropzoneAreaBaseProps}
        fileObjects={fileObjects}
        onAdd={this.addFiles}
        onDelete={this.deleteFile}
      />
    );
  }
}

export default DropzoneArea;
