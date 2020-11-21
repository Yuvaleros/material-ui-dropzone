import PropTypes from 'prop-types';
import * as React from 'react';

import {createFileFromUrl, readFile} from '../helpers';

import DropzoneAreaBase from './DropzoneAreaBase';

const splitDropzoneAreaProps = (props) => {
    const {clearOnUnmount, initialFiles, onChange, onDelete, ...dropzoneAreaProps} = props;
    return [{clearOnUnmount, initialFiles, onChange, onDelete}, dropzoneAreaProps];
};

/**
 * This components creates an uncontrolled Material-UI Dropzone, with previews and snackbar notifications.
 *
 * It supports all props of `DropzoneAreaBase` but keeps the files state internally.
 *
 * **Note** To listen to file changes use `onChange` event handler and notice that `onDelete` returns a `File` instance instead of `FileObject`.
 */
class DropzoneArea extends React.PureComponent {
    state = {
        fileObjects: [],
    }

    componentDidMount() {
        this.loadInitialFiles();
    }

    componentWillUnmount() {
        const {clearOnUnmount} = this.props;

        if (clearOnUnmount) {
            this.setState({
                fileObjects: [],
            }, this.notifyFileChange);
        }
    }

    notifyFileChange = () => {
        const {onChange} = this.props;
        const {fileObjects} = this.state;

        if (onChange) {
            onChange(fileObjects.map((fileObject) => fileObject.file));
        }
    }

    loadInitialFiles = async() => {
        const {initialFiles} = this.props;
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

            this.setState((state) => ({
                fileObjects: [].concat(
                    state.fileObjects,
                    fileObjs
                ),
            }), this.notifyFileChange);
        } catch (err) {
            console.log(err);
        }
    }

    addFiles = async(newFileObjects) => {
        const {filesLimit} = this.props;
        // Update component state
        this.setState((state) => {
            // Handle a single file
            if (filesLimit <= 1) {
                return {
                    fileObjects: [].concat(newFileObjects[0]),
                };
            }

            // Handle multiple files
            return {
                fileObjects: [].concat(
                    state.fileObjects,
                    newFileObjects
                ),
            };
        }, this.notifyFileChange);
    }

    deleteFile = (removedFileObj, removedFileObjIdx) => {
        event.stopPropagation();

        const {onDelete} = this.props;
        const {fileObjects} = this.state;

        // Calculate remaining fileObjects array
        const remainingFileObjs = fileObjects.filter((fileObject, i) => {
            return i !== removedFileObjIdx;
        });

        // Notify removed file
        if (onDelete) {
            onDelete(removedFileObj.file, removedFileObjIdx);
        }

        // Update local state
        this.setState({
            fileObjects: remainingFileObjs,
        }, this.notifyFileChange);
    }

    render() {
        const [, dropzoneAreaProps] = splitDropzoneAreaProps(this.props);
        const {fileObjects} = this.state;

        return (
            <DropzoneAreaBase
                {...dropzoneAreaProps}
                fileObjects={fileObjects}
                onAdd={this.addFiles}
                onDelete={this.deleteFile}
            />
        );
    }
}

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
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.any,
        ])
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
     * @param {number} index The index of the removed file object.
     */
    onDelete: PropTypes.func,
};

export default DropzoneArea;
