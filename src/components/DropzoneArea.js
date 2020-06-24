import PropTypes from 'prop-types';
import * as React from 'react';
import {useState, useEffect, useCallback} from 'react';

import {createFileFromUrl, readFile} from '../helpers';

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
    const {
        handleDeleteFile,
        handleAddFiles,
        fileObjects,
    } = useFiles({
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
    /** List of URLs of already uploaded images.<br/>**Note:** Please take care of CORS. */
    initialFiles: PropTypes.arrayOf(PropTypes.string),
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

const useFiles = ({
    onChange,
    clearOnUnmount,
    initialFiles,
    filesLimit,
    onDelete,
}) => {
    const [fileObjects, setFileObjects] = useState([]);

    useEffect(() => {
        if (onChange) {
            onChange(fileObjects.map((fileObject) => fileObject.file));
        }
    }, [fileObjects, onChange]);

    useEffect(() => {
        loadInitialFiles();

        return () => {
            if (clearOnUnmount) {
                setFileObjects([]);
            }
        };
    }, [loadInitialFiles]);

    const loadInitialFiles = useCallback(async() => {
        try {
            const fileObjs = await Promise.all(
                initialFiles.map(async(url) => {
                    const file = await createFileFromUrl(url);
                    const data = await readFile(file);
                    return {
                        file,
                        data,
                    };
                })
            );

            setFileObjects((prev) => ([...prev, ...fileObjs]));
        } catch (err) {
            console.log(err);
        }
    }, [initialFiles]);

    const handleAddFiles = useCallback( async(newFileObjects) => {
        // Update component state
        setFileObjects((prev) => {
            if (filesLimit <= 1) {
                return [newFileObjects[0]];
            }

            return [...prev, ...newFileObjects];
        });
    }, [filesLimit]);

    const handleDeleteFile = useCallback((removedFileObj, removedFileObjIdx) => {
        event.stopPropagation();

        // Calculate remaining fileObjects array
        const remainingFileObjs = fileObjects.filter((fileObject, i) => {
            return i !== removedFileObjIdx;
        });

        // Notify removed file
        if (onDelete) {
            onDelete(removedFileObj.file);
        }

        // Update local state
        setFileObjects(remainingFileObjs);
    }, [onDelete, fileObjects]);

    return {
        handleDeleteFile,
        handleAddFiles,
        fileObjects,
    };
};
