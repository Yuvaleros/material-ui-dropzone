import PropTypes from 'prop-types';
import * as React from 'react';

import {useFiles} from '../hooks/useFiles';

import DropzoneDialogBase from './DropzoneDialogBase';


/**
 * This component provides an uncontrolled version of the DropzoneDialogBase component.
 *
 * It supports all the Props and Methods from `DropzoneDialogBase` but keeps the files state internally.
 *
 * **Note** The `onSave` handler also returns `File[]` with all the accepted files.
 */
const DropzoneDialog = ({
    clearOnUnmount,
    onClose,
    onSave,
    initialFiles,
    filesLimit,
    onDelete,
    onChange,
    ...other
}) => {
    const {
        handleDeleteFile,
        handleAddFiles,
        fileObjects,
        handleResetFiles,
    } = useFiles({
        onChange,
        clearOnUnmount,
        initialFiles,
        filesLimit,
        onDelete,
    });

    const handleClose = (evt) => {
        if (onClose) {
            onClose(evt);
        }
    };

    const handleSave = (evt) => {
        if (onSave) {
            onSave(fileObjects.map((fileObject) => fileObject.file), evt);
        }

        if (clearOnUnmount) {
            handleResetFiles();
        }
    };

    return (
        <DropzoneDialogBase
            clearOnUnmount={clearOnUnmount}
            initialFiles={initialFiles}
            filesLimit={filesLimit}
            onChange={onChange}
            fileObjects={fileObjects}
            onAdd={handleAddFiles}
            onDelete={handleDeleteFile}
            onClose={handleClose}
            onSave={handleSave}
            {...other}
        />
    );
};


DropzoneDialog.defaultProps = {
    clearOnUnmount: true,
    filesLimit: 3,
    initialFiles: [],
};

DropzoneDialog.propTypes = {
    ...DropzoneDialogBase.propTypes,
    /** Clear uploaded files when component is unmounted. */
    clearOnUnmount: PropTypes.bool,
    /** Maximum number of files that can be loaded into the dropzone. */
    filesLimit: PropTypes.number,
    /** List containing File objects or URL strings.<br/>
     * **Note:** Please take care of CORS.
    */
    initialFiles: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.any,
        ])
    ),
    /**
   * Fired when the user clicks the Submit button.
   *
   * @param {File[]} files All the files currently inside the Dropzone.
   * @param {SyntheticEvent} event The react `SyntheticEvent`.
   */
    onSave: PropTypes.func,
};

export default DropzoneDialog;
