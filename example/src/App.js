import React, { Component } from 'react'

import MaterialDropZone from 'material-ui-dropzone'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openUploadModal: false,
            files: [],
        };
    }

    closeDialog() {
        this.setState({openUploadModal: false});
    }

    saveFiles(files) {
        //Saving files to state for further use and closing Modal.
        this.setState({files: files, openUploadModal: false});
    }

    handleOpenUpload() {
        this.setState({
            openUploadModal: true,
        });
    }

    deleteFile(fileName) {
        this.props.deleteFile(fileName);
    }

    render() {
        //If we already saved files they will be shown again in modal preview.
        let files = this.state.files;
        let style = {
            addFileBtn: {
                'marginTop': '15px',
            },
        };

        return (
                <div>
                    <Button style={style.addFileBtn}>
                      Add Image
                    </Button>
                    <MaterialDropZone
                        open={this.state.openUploadModal}
                        saveFiles={this.saveFiles.bind(this)}
                        deleteFile={this.deleteFile.bind(this)}
                        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                        files={files}
                        showPreviews={true}
                        maxSize={5000000}
                        closeDialog={this.closeDialog.bind(this)}
                    />
                </div>
        );
    }
}