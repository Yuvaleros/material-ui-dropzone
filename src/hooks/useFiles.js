import {useState, useEffect, useCallback} from 'react';
import {createFileFromUrl, readFile} from '../helpers';

export const useFiles = ({
    onChange,
    clearOnUnmount,
    initialFiles,
    filesLimit,
    onDelete}) => {
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

    const handleAddFiles = useCallback(async(newFileObjects) => {
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
