import PropTypes from 'prop-types';
import * as React from 'react';

import useFiles from '../hooks/useFiles';

import DropzoneAreaBase from './DropzoneAreaBase';

/**
 * This components creates an uncontrolled Material-UI Dropzone, with previews and snackbar notifications.
 *
 * It supports all props of `DropzoneAreaBase` but keeps the files state internally.
 *
 * **Note** To listen to file changes use `onChange` event handler and notice that `onDelete` returns a `File` instance instead of `FileObject`.
 */

const DropzoneArea = ({
  clearOnUnmount,
  initialFiles,
  onChange,
  onDelete,
  filesLimit,
  ...dropzoneAreaBaseProps
}) => {
  const { handleDeleteFile, handleAddFiles, fileObjects } = useFiles({
    onChange,
    clearOnUnmount,
    initialFiles,
    filesLimit,
    onDelete,
  });

  return (
    <DropzoneAreaBase
      {...dropzoneAreaBaseProps}
      fileObjects={fileObjects}
      onAdd={handleAddFiles}
      onDelete={handleDeleteFile}
    />
  );
};

DropzoneArea.defaultProps = {
  clearOnUnmount: true,
  filesLimit: 3,
  initialFiles: [],
};

DropzoneArea.propTypes = {
  ...DropzoneAreaBase.propTypes,
  /** Clear uploaded files when component is unmounted. */
  clearOnUnmount: PropTypes.bool,
  /** List containing File objects or URL strings.<br/>
   * **Note:** Please take care of CORS.
   */
  initialFiles: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  ),
  /** Maximum number of files that can be loaded into the dropzone. */
  filesLimit: PropTypes.number,
  /**
   * Fired when the files inside dropzone change.
   *
   * @param {File[]} loadedFiles All the files currently loaded into the dropzone.
   */
  onChange: PropTypes.func,
  /**
   * Fired when a file is deleted from the previews panel.
   *
   * @param {File} deletedFile The file that was removed.
   */
  onDelete: PropTypes.func,
};

export default DropzoneArea;
