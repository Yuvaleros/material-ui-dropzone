# material-ui-dropzone

> Material-UI-dropzone is a [React](https://github.com/facebook/react) component using [Material-UI](https://github.com/mui-org/material-ui) and is based on the excellent [react-dropzone](https://github.com/react-dropzone/react-dropzone) library.

[![License](https://img.shields.io/github/license/yuvaleros/material-ui-dropzone)](https://github.com/Yuvaleros/material-ui-dropzone/blob/master/LICENSE) <!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->[![All Contributors](https://img.shields.io/badge/all_contributors-9-orange.svg)](#contributors)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Rebuild Dist Workflow Status](https://img.shields.io/github/workflow/status/yuvaleros/material-ui-dropzone/Rebuild%20Dist?label=build)](https://github.com/Yuvaleros/material-ui-dropzone/actions?query=workflow%3A%22Rebuild+Dist%22) [![Update Docs Workflow Status](https://img.shields.io/github/workflow/status/yuvaleros/material-ui-dropzone/Update%20Docs?label=docs)](https://github.com/Yuvaleros/material-ui-dropzone/actions?query=workflow%3A%22Update+Docs%22)

[![npm package](https://img.shields.io/npm/v/material-ui-dropzone)](https://www.npmjs.com/package/material-ui-dropzone) [![npm downloads](https://img.shields.io/npm/dm/material-ui-dropzone.svg)](https://www.npmjs.com/package/material-ui-dropzone)

This components provide either a file-upload dropzone or a file-upload dropzone inside of a dialog.

The file-upload dropzone features some snazzy "File Allowed/Not Allowed" effects, previews and alerts.

## Installation

```shell
npm install --save material-ui-dropzone
```

or

```shell
yarn add material-ui-dropzone
```

## Support

`material-ui-dropzone` complies to the following support matrix.

| version | React            | Material-UI    |
| ------- | ---------------- | -------------- |
| `3.x`   | `16.8+`          | `4.x`          |
| `2.x`   | `15.x` or `16.x` | `3.x` or `4.x` |

## Screenshots

This is the Dialog component:

![Dialog](https://raw.githubusercontent.com/Yuvaleros/material-ui-dropzone/master/pics/demo_pic.jpg)
![Dialog with Previews](https://raw.githubusercontent.com/Yuvaleros/material-ui-dropzone/master/pics/demo_pic5.JPG)

When you drag a file onto the dropzone, you get a neat effect:

![Drag Overlay](https://raw.githubusercontent.com/Yuvaleros/material-ui-dropzone/master/pics/demo_pic2.JPG)

And if you drag in a wrong type of file, you'll get yelled at:

![Drag Error Overlay](https://raw.githubusercontent.com/Yuvaleros/material-ui-dropzone/master/pics/demo_pic4.JPG)

**N.B. This has some limitations (see [here](https://github.com/react-dropzone/react-dropzone/tree/master/examples/accept#browser-limitations) for more details).**

## Documentation and Examples

See [https://yuvaleros.github.io/material-ui-dropzone](https://yuvaleros.github.io/material-ui-dropzone) for Documentation and Examples.

## Components

### DropzoneArea

This components creates the dropzone, previews and snackbar notifications without a dialog

```jsx static
import React, {Component} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'

class DropzoneAreaExample extends Component{
  constructor(props){
    super(props);
    this.state = {
      files: []
    };
  }
  handleChange(files){
    this.setState({
      files: files
    });
  }
  render(){
    return (
      <DropzoneArea
        onChange={this.handleChange.bind(this)}
        />
    )
  }
}

export default DropzoneAreaExample;
```

### DropzoneDialog

This component provides the DropzoneArea inside of a MaterialUI Dialog.

```jsx static
import React, { Component } from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';

export default class DropzoneDialogExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: []
        };
    }

    handleClose() {
        this.setState({
            open: false
        });
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

    render() {
        return (
            <div>
                <Button onClick={this.handleOpen.bind(this)}>
                  Add Image
                </Button>
                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={this.handleClose.bind(this)}
                />
            </div>
        );
    }
}
```

## License

MIT

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/Yuvaleros"><img src="https://avatars1.githubusercontent.com/u/3898166?v=4" width="80px;" alt=""/><br /><sub><b>Yuvaleros</b></sub></a><br /><a href="#ideas-Yuvaleros" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/Yuvaleros/material-ui-dropzone/commits?author=Yuvaleros" title="Code">💻</a> <a href="#design-Yuvaleros" title="Design">🎨</a> <a href="https://github.com/Yuvaleros/material-ui-dropzone/commits?author=Yuvaleros" title="Documentation">📖</a> <a href="#question-Yuvaleros" title="Answering Questions">💬</a> <a href="https://github.com/Yuvaleros/material-ui-dropzone/pulls?q=is%3Apr+reviewed-by%3AYuvaleros" title="Reviewed Pull Requests">👀</a> <a href="#maintenance-Yuvaleros" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/panz3r"><img src="https://avatars3.githubusercontent.com/u/1754457?v=4" width="80px;" alt=""/><br /><sub><b>Mattia Panzeri</b></sub></a><br /><a href="#ideas-panz3r" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/Yuvaleros/material-ui-dropzone/commits?author=panz3r" title="Code">💻</a> <a href="#design-panz3r" title="Design">🎨</a> <a href="https://github.com/Yuvaleros/material-ui-dropzone/commits?author=panz3r" title="Documentation">📖</a> <a href="#example-panz3r" title="Examples">💡</a> <a href="#infra-panz3r" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/Yuvaleros/material-ui-dropzone/issues?q=author%3Apanz3r" title="Bug reports">🐛</a> <a href="#question-panz3r" title="Answering Questions">💬</a> <a href="https://github.com/Yuvaleros/material-ui-dropzone/pulls?q=is%3Apr+reviewed-by%3Apanz3r" title="Reviewed Pull Requests">👀</a> <a href="#maintenance-panz3r" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/max-carroll"><img src="https://avatars2.githubusercontent.com/u/13512675?v=4" width="80px;" alt=""/><br /><sub><b>Max Carroll</b></sub></a><br /><a href="#ideas-max-carroll" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/Yuvaleros/material-ui-dropzone/commits?author=max-carroll" title="Code">💻</a> <a href="#design-max-carroll" title="Design">🎨</a> <a href="#example-max-carroll" title="Examples">💡</a> <a href="https://github.com/Yuvaleros/material-ui-dropzone/pulls?q=is%3Apr+reviewed-by%3Amax-carroll" title="Reviewed Pull Requests">👀</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/mattcorner"><img src="https://avatars1.githubusercontent.com/u/27866636?v=4" width="80px;" alt=""/><br /><sub><b>Matthew Corner</b></sub></a><br /><a href="https://github.com/Yuvaleros/material-ui-dropzone/issues?q=author%3Amattcorner" title="Bug reports">🐛</a> <a href="#ideas-mattcorner" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/Yuvaleros/material-ui-dropzone/commits?author=mattcorner" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/loongyh"><img src="https://avatars3.githubusercontent.com/u/20846761?v=4" width="80px;" alt=""/><br /><sub><b>Barry Loong</b></sub></a><br /><a href="#ideas-loongyh" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/Yuvaleros/material-ui-dropzone/commits?author=loongyh" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/blouin"><img src="https://avatars1.githubusercontent.com/u/20212446?v=4" width="80px;" alt=""/><br /><sub><b>JF Blouin</b></sub></a><br /><a href="#ideas-blouin" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/Yuvaleros/material-ui-dropzone/commits?author=blouin" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://stackoverflow.com/users/2275818/anthony-raymond"><img src="https://avatars1.githubusercontent.com/u/7503585?v=4" width="80px;" alt=""/><br /><sub><b>Anthony Raymond</b></sub></a><br /><a href="https://github.com/Yuvaleros/material-ui-dropzone/commits?author=anthonyraymond" title="Code">💻</a> <a href="#example-anthonyraymond" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/isaacbuckman"><img src="https://avatars1.githubusercontent.com/u/34870239?v=4" width="80px;" alt=""/><br /><sub><b>isaacbuckman</b></sub></a><br /><a href="https://github.com/Yuvaleros/material-ui-dropzone/issues?q=author%3Aisaacbuckman" title="Bug reports">🐛</a> <a href="https://github.com/Yuvaleros/material-ui-dropzone/commits?author=isaacbuckman" title="Code">💻</a> <a href="#example-isaacbuckman" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/MatthijsMud"><img src="https://avatars3.githubusercontent.com/u/11519728?v=4" width="80px;" alt=""/><br /><sub><b>MatthijsMud</b></sub></a><br /><a href="https://github.com/Yuvaleros/material-ui-dropzone/issues?q=author%3AMatthijsMud" title="Bug reports">🐛</a> <a href="https://github.com/Yuvaleros/material-ui-dropzone/commits?author=MatthijsMud" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
