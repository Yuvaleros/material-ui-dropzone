import {useState, useEffect, useCallback} from 'react';
import {createFileFromUrl, readFile} from '../helpers';

/**
 * holds files in its state and provides some handler methods to add and remove from that state
 */
export const useFiles = ({
    onChange,
    clearOnUnmount,
    initialFiles,
    filesLimit,
    onDelete}) => {
    const [fileObjects, setFileObjects] = useState([]);

    // When the fileObjects change, fire the onChange method if it's defined
    useEffect(() => {
        if (onChange) {
            onChange(fileObjects.map((fileObject) => fileObject.file));
        }
    }, [fileObjects, onChange]);

    // Initialize the files when the hook is loaded
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
                initialFiles.map(async(initialFile) => {
                    let file;
                    if (typeof initialFile === 'string' ) {
                        file = await createFileFromUrl(initialFile);
                    } else {
                        file = initialFile;
                    }
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

    const handleAddFiles = useCallback((newFileObjects) => {
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

    const handleResetFiles = () => setFileObjects([]);

    return {
        handleAddFiles,
        handleDeleteFile,
        handleResetFiles,
        fileObjects,
    };
};
