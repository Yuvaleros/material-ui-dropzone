import React, { Component } from 'react'

import MaterialDropZone from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: []
        };
    }

    handleClose() {
        this.setState({open: false});
    }

    handleSave(files) {
        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files, 
            open: false
        });
    }

    handleOpen() {
        this.setState({
            open: true,
        });
    }

    handleDelete(file) {
        // do something with this information
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
                    <Button style={style.addFileBtn} onClick={this.handleOpen.bind(this)}>
                      Add Image
                    </Button>
                    <MaterialDropZone
                        open={this.state.open}
                        onSave={this.handleSave.bind(this)}
                        onDelete={this.handleDelete.bind(this)}
                        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                        showPreviews={true}
                        maxFileSize={5000000}
                        onClose={this.handleClose.bind(this)}
                    />
                </div>
        );
    }
}