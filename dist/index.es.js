import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Dropzone from 'react-dropzone';
import ActionDelete from 'material-ui/svg-icons/content/clear';
import FileIcon from 'material-ui/svg-icons/editor/insert-drive-file';
import CloudUploadIcon from 'material-ui/svg-icons/file/cloud-upload';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".index_dropzoneTextStyle__1FRO7 {\n    text-align: center;\n    top: 25%;\n    position: relative;\n}\n\n.index_uploadIconSize__3hv8K {\n    width: 51px !important;\n    height: 51px !important;\n    color: #909090 !important;\n}\n\n.index_dropzoneParagraph__3tINs {\n    font-size: 24px\n}\n\n.index_dropZone__EtOtY {\n    position: relative;\n    width: 100%;\n    height: 250px;\n    background-color: #F0F0F0;\n    border: dashed;\n    border-color: #C8C8C8;\n    cursor: pointer;\n}\n\n.index_stripes__2-xJq {\n    width: 100%;\n    height: 250px;\n    cursor: pointer;\n    border: solid;\n    border-color: #C8C8C8;\n    background-image: repeating-linear-gradient(-45deg, #F0F0F0, #F0F0F0 25px, #C8C8C8 25px, #C8C8C8 50px);\n    -webkit-animation: index_progress__33vEl 2s linear infinite !important;\n    -moz-animation: index_progress__33vEl 2s linear infinite !important;\n    animation: index_progress__33vEl 2s linear infinite !important;\n    background-size: 150% 100%;\n}\n\n.index_rejectStripes__2se3T {\n    width: 100%;\n    height: 250px;\n    cursor: pointer;\n    border: solid;\n    border-color: #C8C8C8;\n    background-image: repeating-linear-gradient(-45deg, #fc8785, #fc8785 25px, #f4231f 25px, #f4231f 50px);\n    -webkit-animation: index_progress__33vEl 2s linear infinite !important;\n    -moz-animation: index_progress__33vEl 2s linear infinite !important;\n    animation: index_progress__33vEl 2s linear infinite !important;\n    background-size: 150% 100%;\n}\n\n.index_fileIconImg__2fHgy {\n    color: #909090 !important;\n}\n\n.index_smallPreviewImg__2Gksb {\n    height: 100px !important;\n    width: initial !important;\n    max-width: 100%;\n    margin-top: 5px;\n    margin-right: 10px;\n    color: rgba(0, 0, 0, 0.87);\n    transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms !important;\n    box-sizing: border-box;\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n    box-shadow: rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px !important;\n    border-radius: 2px;\n    z-index: 5;\n}\n\n@-webkit-keyframes index_progress__33vEl {\n    0% {\n        background-position: 0 0;\n    }\n    100% {\n        background-position: -75px 0;\n    }\n}\n\n@-moz-keyframes index_progress__33vEl {\n    0% {\n        background-position: 0 0;\n    }\n    100% {\n        background-position: -75px 0;\n    }\n}\n\n@-ms-keyframes index_progress__33vEl {\n    0% {\n        background-position: 0 0;\n    }\n    100% {\n        background-position: -75px 0;\n    }\n}\n\n@keyframes index_progress__33vEl {\n    0% {\n        background-position: 0 0;\n    }\n    100% {\n        background-position: -70px 0;\n    }\n}\n\n.index_imageContainer__2Ygay {\n    position: relative;\n    z-index: 10;\n}\n\n.index_imageContainer__2Ygay:hover .index_smallPreviewImg__2Gksb {\n    opacity: 0.3;\n}\n\n.index_imageContainer__2Ygay:hover .index_middle__1_Kne {\n    opacity: 1;\n}\n\n.index_imageContainer__2Ygay:hover .index_middleBigPic__2j-cK {\n    opacity: 1;\n}\n\n.index_removeBtn__2eo0F {\n    color: white;\n    margin-left: 5px;\n    z-index: 3;\n}\n\n.index_middle__1_Kne {\n    transition: .5s ease;\n    opacity: 0;\n    position: absolute;\n    top: 20px;\n    left: 5px;\n    transform: translate(-50%, -50%);\n    -ms-transform: translate(-50%, -50%)\n}\n\n.index_row__vZVjm {\n    margin-right: -0.5rem;\n    margin-left: -0.5rem;\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    flex: 0 1 auto;\n    -webkit-box-flex: 0;\n    -ms-flex: 0 1 auto;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-wrap: wrap;\n    flex-wrap: wrap;\n}\n";
styleInject(css);

function isImage(file) {
    var fileName = file.name || file.path;
    var suffix = fileName.substr(fileName.indexOf('.') + 1).toLowerCase();
    if (suffix === 'jpg' || suffix === 'jpeg' || suffix === 'bmp' || suffix === 'png') {
        return true;
    }
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var MaterialDropZone = function (_React$Component) {
    inherits(MaterialDropZone, _React$Component);

    function MaterialDropZone(props) {
        classCallCheck(this, MaterialDropZone);

        var _this = possibleConstructorReturn(this, (MaterialDropZone.__proto__ || Object.getPrototypeOf(MaterialDropZone)).call(this, props));

        _this.handleRequestCloseSnackBar = function () {
            _this.setState({
                openSnackBar: false
            });
        };

        _this.state = {
            open: false,
            openSnackBar: false,
            errorMessage: '',
            files: _this.props.files || [],
            disabled: true,
            acceptedFiles: _this.props.acceptedFiles || ['image/jpeg', 'image/png', 'image/bmp', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        };
        return _this;
    }

    createClass(MaterialDropZone, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                open: nextProps.open,
                files: nextProps.files
            });
        }
    }, {
        key: 'handleClose',
        value: function handleClose() {
            this.props.closeDialog();
            this.setState({ open: false });
        }
    }, {
        key: 'onDrop',
        value: function onDrop(files) {
            var oldFiles = this.state.files;
            var filesLimit = this.props.filesLimit || '3';

            oldFiles = oldFiles.concat(files);
            if (oldFiles.length > filesLimit) {
                this.setState({
                    openSnackBar: true,
                    errorMessage: 'Cannot upload more then ' + filesLimit + ' items.'
                });
            } else {
                this.setState({
                    files: oldFiles
                }, this.changeButtonDisable);
            }
        }
    }, {
        key: 'handleRemove',
        value: function handleRemove(file, fileIndex) {
            var files = this.state.files;
            // This is to prevent memory leaks.
            window.URL.revokeObjectURL(file.preview);

            files.splice(fileIndex, 1);
            this.setState(files, this.changeButtonDisable);

            if (file.path) {
                this.props.deleteFile(file);
            }
        }
    }, {
        key: 'changeButtonDisable',
        value: function changeButtonDisable() {
            if (this.state.files.length !== 0) {
                this.setState({
                    disabled: false
                });
            } else {
                this.setState({
                    disabled: true
                });
            }
        }
    }, {
        key: 'saveFiles',
        value: function saveFiles() {
            var filesLimit = this.props.filesLimit || '3';

            if (this.state.files.length > filesLimit) {
                this.setState({
                    openSnackBar: true,
                    errorMessage: 'Cannot upload more then ' + filesLimit + ' items.'
                });
            } else {
                this.props.saveFiles(this.state.files);
            }
        }
    }, {
        key: 'onDropRejected',
        value: function onDropRejected() {
            this.setState({
                openSnackBar: true,
                errorMessage: 'File too big, max size is 3MB'
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var img = void 0;
            var previews = '';
            var fileSizeLimit = this.props.maxSize || 3000000;

            if (this.props.showPreviews === true) {
                previews = this.state.files.map(function (file, i) {
                    var path = file.preview || '/pic' + file.path;

                    if (isImage(file)) {
                        //show image preview.
                        img = React.createElement('img', { className: 'smallPreviewImg', src: path });
                    } else {
                        //Show default file image in preview.
                        img = React.createElement(FileIcon, { className: 'smallPreviewImg' });
                    }

                    return React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'div',
                            { className: 'imageContainer col fileIconImg', key: i },
                            img,
                            React.createElement(
                                'div',
                                { className: 'middle' },
                                React.createElement(
                                    IconButton,
                                    { touch: true },
                                    React.createElement(ActionDelete, {
                                        className: 'removeBtn',
                                        onTouchTap: _this2.handleRemove.bind(_this2, file, i)
                                    })
                                )
                            )
                        )
                    );
                });
            }

            var actions = [React.createElement(FlatButton, {
                label: 'Cancel',
                primary: true,
                onTouchTap: this.handleClose.bind(this)
            }), React.createElement(FlatButton, {
                label: 'Submit',
                primary: true,
                disabled: this.state.disabled,
                onTouchTap: this.saveFiles.bind(this)
            })];

            return React.createElement(
                'div',
                null,
                React.createElement(
                    Dialog,
                    {
                        title: 'Upload File',
                        actions: actions,
                        modal: false,
                        open: this.state.open,
                        onRequestClose: this.handleClose.bind(this),
                        autoScrollBodyContent: true
                    },
                    React.createElement(
                        Dropzone,
                        {
                            accept: this.state.acceptedFiles.join(','),
                            onDrop: this.onDrop.bind(this),
                            className: 'dropZone',
                            acceptClassName: 'stripes',
                            rejectClassName: 'rejectStripes',
                            onDropRejected: this.onDropRejected.bind(this),
                            maxSize: fileSizeLimit
                        },
                        React.createElement(
                            'div',
                            { className: 'dropzoneTextStyle' },
                            React.createElement(
                                'p',
                                { className: 'dropzoneParagraph' },
                                'Drag and drop an image file here or click'
                            ),
                            React.createElement('br', null),
                            React.createElement(CloudUploadIcon, { className: 'uploadIconSize' })
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        'div',
                        { className: 'row' },
                        this.state.files.length ? React.createElement(
                            'span',
                            null,
                            'Preview:'
                        ) : ''
                    ),
                    React.createElement(
                        'div',
                        { className: 'row' },
                        previews
                    )
                ),
                React.createElement(Snackbar, {
                    open: this.state.openSnackBar,
                    message: this.state.errorMessage,
                    autoHideDuration: 4000,
                    onRequestClose: this.handleRequestCloseSnackBar
                })
            );
        }
    }]);
    return MaterialDropZone;
}(React.Component);

export default MaterialDropZone;
//# sourceMappingURL=index.es.js.map
