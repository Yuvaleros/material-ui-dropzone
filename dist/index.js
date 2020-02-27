'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Chip = _interopDefault(require('@material-ui/core/Chip'));
var Fab = _interopDefault(require('@material-ui/core/Fab'));
var Grid = _interopDefault(require('@material-ui/core/Grid'));
var styles = require('@material-ui/core/styles');
var AttachFileIcon = _interopDefault(require('@material-ui/icons/AttachFile'));
var DeleteIcon = _interopDefault(require('@material-ui/icons/Delete'));
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var clsx = _interopDefault(require('clsx'));
var CheckCircleIcon = _interopDefault(require('@material-ui/icons/CheckCircle'));
var ErrorIcon = _interopDefault(require('@material-ui/icons/Error'));
var InfoIcon = _interopDefault(require('@material-ui/icons/Info'));
var CloseIcon = _interopDefault(require('@material-ui/icons/Close'));
var green = _interopDefault(require('@material-ui/core/colors/green'));
var amber = _interopDefault(require('@material-ui/core/colors/amber'));
var IconButton = _interopDefault(require('@material-ui/core/IconButton'));
var SnackbarContent = _interopDefault(require('@material-ui/core/SnackbarContent'));
var WarningIcon = _interopDefault(require('@material-ui/icons/Warning'));
var Snackbar = _interopDefault(require('@material-ui/core/Snackbar'));
var CloudUploadIcon = _interopDefault(require('@material-ui/icons/CloudUpload'));
var Dropzone = _interopDefault(require('react-dropzone'));
var Button = _interopDefault(require('@material-ui/core/Button'));
var Dialog = _interopDefault(require('@material-ui/core/Dialog'));
var DialogActions = _interopDefault(require('@material-ui/core/DialogActions'));
var DialogContent = _interopDefault(require('@material-ui/core/DialogContent'));
var DialogTitle = _interopDefault(require('@material-ui/core/DialogTitle'));

var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

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

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

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

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

function isImage(file) {
  if (file.type.split('/')[0] === 'image') {
    return true;
  }
}
function convertBytesToMbsOrKbs(filesize) {
  var size = '';
  // I know, not technically correct...
  if (filesize >= 1000000) {
    size = filesize / 1000000 + ' megabytes';
  } else if (filesize >= 1000) {
    size = filesize / 1000 + ' kilobytes';
  } else {
    size = filesize + ' bytes';
  }
  return size;
}

var createFileFromUrl = function () {
  var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    var response, data, metadata, filename, ext;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(url);

          case 2:
            response = _context.sent;
            _context.next = 5;
            return response.blob();

          case 5:
            data = _context.sent;
            metadata = { type: data.type };
            filename = url.replace(/\?.+/, '').split('/').pop();
            ext = data.type.split('/').pop();
            return _context.abrupt('return', new File([data], filename + '.' + ext, metadata));

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function createFileFromUrl(_x) {
    return _ref.apply(this, arguments);
  };
}();

var styles$1 = {
    removeBtn: {
        transition: '.5s ease',
        position: 'absolute',
        opacity: 0,
        top: -5,
        right: -5,
        width: 40,
        height: 40
    },
    smallPreviewImg: {
        height: 100,
        width: 'initial',
        maxWidth: '100%',
        marginTop: 5,
        marginRight: 10,
        color: 'rgba(0, 0, 0, 0.87)',
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        boxSizing: 'border-box',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px',
        borderRadius: 2,
        zIndex: 5,
        opacity: 1
    },
    imageContainer: {
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        '&:hover $smallPreviewImg': {
            opacity: 0.3
        },
        '&:hover $removeBtn': {
            opacity: 1
        }
    }
};

function PreviewList(props) {
    var fileObjects = props.fileObjects,
        handleRemove = props.handleRemove,
        showFileNames = props.showFileNames,
        useChipsForPreview = props.useChipsForPreview,
        previewChipProps = props.previewChipProps,
        classes = props.classes;

    if (useChipsForPreview) {
        return fileObjects.map(function (fileObject, i) {
            return React__default.createElement(
                'div',
                { key: i },
                React__default.createElement(Chip, _extends({
                    label: fileObject.file.name,
                    onDelete: handleRemove(i),
                    variant: 'outlined'
                }, previewChipProps))
            );
        });
    }
    return React__default.createElement(
        Grid,
        { container: true, spacing: 8 },
        fileObjects.map(function (fileObject, i) {
            var img = isImage(fileObject.file) ? React__default.createElement('img', { className: classes.smallPreviewImg, role: 'presentation', src: fileObject.data }) : React__default.createElement(AttachFileIcon, { className: classes.smallPreviewImg });
            return React__default.createElement(
                Grid,
                { item: true, xs: 4, key: i, className: classes.imageContainer },
                img,
                showFileNames && React__default.createElement(
                    'p',
                    null,
                    fileObject.file.name
                ),
                React__default.createElement(
                    Fab,
                    { onClick: handleRemove(i),
                        'aria-label': 'Delete',
                        className: classes.removeBtn },
                    React__default.createElement(DeleteIcon, null)
                )
            );
        })
    );
}

var PreviewList$1 = styles.withStyles(styles$1)(PreviewList);

var variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

var styles$2 = function styles$$1(theme) {
  return {
    success: {
      backgroundColor: green[600]
    },
    error: {
      backgroundColor: theme.palette.error.dark
    },
    info: {
      backgroundColor: theme.palette.primary.dark
    },
    warning: {
      backgroundColor: amber[700]
    },
    icon: {
      fontSize: 20
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1)
    },
    message: {
      display: 'flex',
      alignItems: 'center'
    }
  };
};

function SnackbarContentWrapper(props) {
  var classes = props.classes,
      className = props.className,
      message = props.message,
      onClose = props.onClose,
      variant = props.variant,
      other = objectWithoutProperties(props, ['classes', 'className', 'message', 'onClose', 'variant']);

  var Icon = variantIcon[variant];

  return React__default.createElement(SnackbarContent, _extends({
    className: clsx(classes[variant], className),
    'aria-describedby': 'client-snackbar',
    message: React__default.createElement(
      'span',
      { id: 'client-snackbar', className: classes.message },
      React__default.createElement(Icon, { className: clsx(classes.icon, classes.iconVariant) }),
      message
    ),
    action: [React__default.createElement(
      IconButton,
      {
        key: 'close',
        'aria-label': 'Close',
        color: 'inherit',
        className: classes.close,
        onClick: onClose
      },
      React__default.createElement(CloseIcon, { className: classes.icon })
    )]
  }, other));
}

SnackbarContentWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired
};

var SnackbarContentWrapper$1 = styles.withStyles(styles$2)(SnackbarContentWrapper);

var styles$3 = {
    '@keyframes progress': {
        '0%': {
            backgroundPosition: '0 0'
        },
        '100%': {
            backgroundPosition: '-70px 0'
        }
    },
    dropZone: {
        position: 'relative',
        width: '100%',
        minHeight: '250px',
        backgroundColor: '#F0F0F0',
        border: 'dashed',
        borderColor: '#C8C8C8',
        cursor: 'pointer',
        boxSizing: 'border-box'
    },
    stripes: {
        border: 'solid',
        backgroundImage: 'repeating-linear-gradient(-45deg, #F0F0F0, #F0F0F0 25px, #C8C8C8 25px, #C8C8C8 50px)',
        animation: 'progress 2s linear infinite !important',
        backgroundSize: '150% 100%'
    },
    rejectStripes: {
        border: 'solid',
        backgroundImage: 'repeating-linear-gradient(-45deg, #fc8785, #fc8785 25px, #f4231f 25px, #f4231f 50px)',
        animation: 'progress 2s linear infinite !important',
        backgroundSize: '150% 100%'
    },
    dropzoneTextStyle: {
        textAlign: 'center'
    },
    uploadIconSize: {
        width: 51,
        height: 51,
        color: '#909090'
    },
    dropzoneParagraph: {
        fontSize: 24
    }
};

var DropzoneArea = function (_Component) {
    inherits(DropzoneArea, _Component);

    function DropzoneArea(props) {
        classCallCheck(this, DropzoneArea);

        var _this2 = possibleConstructorReturn(this, (DropzoneArea.__proto__ || Object.getPrototypeOf(DropzoneArea)).call(this, props));

        _this2.handleRemove = function (fileIndex) {
            return function (event) {
                event.stopPropagation();
                var fileObjects = _this2.state.fileObjects;

                var file = fileObjects.filter(function (fileObject, i) {
                    return i === fileIndex;
                })[0].file;
                fileObjects.splice(fileIndex, 1);
                _this2.setState(fileObjects, function () {
                    if (_this2.props.onDelete) {
                        _this2.props.onDelete(file);
                    }
                    if (_this2.props.onChange) {
                        _this2.props.onChange(_this2.state.fileObjects.map(function (fileObject) {
                            return fileObject.file;
                        }));
                    }
                    _this2.setState({
                        openSnackBar: true,
                        snackbarMessage: _this2.props.getFileRemovedMessage(file.name),
                        snackbarVariant: 'info'
                    });
                });
            };
        };

        _this2.onCloseSnackbar = function () {
            _this2.setState({
                openSnackBar: false
            });
        };

        _this2.state = {
            fileObjects: [],
            openSnackBar: false,
            snackbarMessage: '',
            snackbarVariant: 'success',
            dropzoneText: props.dropzoneText
        };
        return _this2;
    }

    createClass(DropzoneArea, [{
        key: 'filesArray',
        value: function () {
            var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(urls) {
                var _this3 = this;

                var _loop, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, url;

                return regeneratorRuntime.wrap(function _callee$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop(url) {
                                    var file, reader;
                                    return regeneratorRuntime.wrap(function _loop$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    _context.next = 2;
                                                    return createFileFromUrl(url);

                                                case 2:
                                                    file = _context.sent;
                                                    reader = new FileReader();

                                                    reader.onload = function (event) {
                                                        _this3.setState({
                                                            fileObjects: _this3.state.fileObjects.concat({ file: file, data: event.target.result })
                                                        });
                                                    };
                                                    reader.readAsDataURL(file);

                                                case 6:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _loop, _this3);
                                });
                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                _context2.prev = 5;
                                _iterator = urls[Symbol.iterator]();

                            case 7:
                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                    _context2.next = 13;
                                    break;
                                }

                                url = _step.value;
                                return _context2.delegateYield(_loop(url), 't0', 10);

                            case 10:
                                _iteratorNormalCompletion = true;
                                _context2.next = 7;
                                break;

                            case 13:
                                _context2.next = 19;
                                break;

                            case 15:
                                _context2.prev = 15;
                                _context2.t1 = _context2['catch'](5);
                                _didIteratorError = true;
                                _iteratorError = _context2.t1;

                            case 19:
                                _context2.prev = 19;
                                _context2.prev = 20;

                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }

                            case 22:
                                _context2.prev = 22;

                                if (!_didIteratorError) {
                                    _context2.next = 25;
                                    break;
                                }

                                throw _iteratorError;

                            case 25:
                                return _context2.finish(22);

                            case 26:
                                return _context2.finish(19);

                            case 27:
                                _context2.next = 32;
                                break;

                            case 29:
                                _context2.prev = 29;
                                _context2.t2 = _context2['catch'](0);

                                console.log(_context2.t2);

                            case 32:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee, this, [[0, 29], [5, 15, 19, 27], [20,, 22, 26]]);
            }));

            function filesArray(_x) {
                return _ref.apply(this, arguments);
            }

            return filesArray;
        }()
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.filesArray(this.props.initialFiles);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.props.clearOnUnmount) {
                this.setState({
                    fileObjects: []
                });
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (this.props.dropzoneText !== prevProps.dropzoneText) {
                this.setState({
                    dropzoneText: this.props.dropzoneText
                });
            }
        }
    }, {
        key: 'onDrop',
        value: function onDrop(files) {
            var _this4 = this;

            var _this = this;
            if (this.props.filesLimit > 1 && this.state.fileObjects.length + files.length > this.props.filesLimit) {
                this.setState({
                    openSnackBar: true,
                    snackbarMessage: this.props.getFileLimitExceedMessage(this.props.filesLimit),
                    snackbarVariant: 'error'
                });
            } else {
                var count = 0;
                var message = '';
                if (!Array.isArray(files)) files = [files];

                files.forEach(function (file) {
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        _this.setState({
                            fileObjects: _this4.props.filesLimit <= 1 ? [{ file: file, data: event.target.result }] : _this.state.fileObjects.concat({ file: file, data: event.target.result })
                        }, function () {
                            if (_this4.props.onChange) {
                                _this4.props.onChange(_this.state.fileObjects.map(function (fileObject) {
                                    return fileObject.file;
                                }));
                            }
                            if (_this4.props.onDrop) {
                                _this4.props.onDrop(file);
                            }
                            message += _this4.props.getFileAddedMessage(file.name);
                            count++; // we cannot rely on the index because this is asynchronous
                            if (count === files.length) {
                                // display message when the last one fires
                                _this4.setState({
                                    openSnackBar: true,
                                    snackbarMessage: message,
                                    snackbarVariant: 'success'
                                });
                            }
                        });
                    };
                    reader.readAsDataURL(file);
                });
            }
        }
    }, {
        key: 'handleDropRejected',
        value: function handleDropRejected(rejectedFiles, evt) {
            var _this5 = this;

            var message = '';
            rejectedFiles.forEach(function (rejectedFile) {
                message = _this5.props.getDropRejectMessage(rejectedFile, _this5.props.acceptedFiles, _this5.props.maxFileSize);
            });
            if (this.props.onDropRejected) {
                this.props.onDropRejected(rejectedFiles, evt);
            }
            this.setState({
                openSnackBar: true,
                snackbarMessage: message,
                snackbarVariant: 'error'
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var classes = this.props.classes;

            var showPreviews = this.props.showPreviews && this.state.fileObjects.length > 0;
            var showPreviewsInDropzone = this.props.showPreviewsInDropzone && this.state.fileObjects.length > 0;
            return React__default.createElement(
                React.Fragment,
                null,
                React__default.createElement(
                    Dropzone,
                    {
                        accept: this.props.acceptedFiles.join(','),
                        onDrop: this.onDrop.bind(this),
                        onDropRejected: this.handleDropRejected.bind(this),
                        className: clsx(this.props.dropzoneClass, classes.dropZone),
                        acceptClassName: classes.stripes,
                        rejectClassName: classes.rejectStripes,
                        maxSize: this.props.maxFileSize,
                        multiple: this.props.filesLimit > 1
                    },
                    React__default.createElement(
                        'div',
                        { className: classes.dropzoneTextStyle },
                        React__default.createElement(
                            'p',
                            { className: clsx(classes.dropzoneParagraph, this.props.dropzoneParagraphClass) },
                            this.state.dropzoneText
                        ),
                        React__default.createElement(CloudUploadIcon, { className: classes.uploadIconSize })
                    ),
                    showPreviewsInDropzone && React__default.createElement(PreviewList$1, {
                        fileObjects: this.state.fileObjects,
                        handleRemove: this.handleRemove.bind(this),
                        showFileNames: this.props.showFileNames,
                        useChipsForPreview: this.props.useChipsForPreview,
                        previewChipProps: this.props.previewChipProps
                    })
                ),
                showPreviews && React__default.createElement(
                    React.Fragment,
                    null,
                    React__default.createElement(
                        Grid,
                        { container: true },
                        React__default.createElement(
                            'span',
                            null,
                            'Preview:'
                        )
                    ),
                    React__default.createElement(PreviewList$1, {
                        fileObjects: this.state.fileObjects,
                        handleRemove: this.handleRemove.bind(this),
                        showFileNames: this.props.showFileNamesInPreview,
                        useChipsForPreview: this.props.useChipsForPreview,
                        previewChipProps: this.props.previewChipProps
                    })
                ),
                this.props.showAlerts && React__default.createElement(
                    Snackbar,
                    {
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left'
                        },
                        open: this.state.openSnackBar,
                        autoHideDuration: 6000,
                        onClose: this.onCloseSnackbar
                    },
                    React__default.createElement(SnackbarContentWrapper$1, {
                        onClose: this.onCloseSnackbar,
                        variant: this.state.snackbarVariant,
                        message: this.state.snackbarMessage
                    })
                )
            );
        }
    }]);
    return DropzoneArea;
}(React.Component);

DropzoneArea.defaultProps = {
    acceptedFiles: ['image/*', 'video/*', 'application/*'],
    filesLimit: 3,
    maxFileSize: 3000000,
    dropzoneText: 'Drag and drop an image file here or click',
    showPreviews: false, // By default previews show up under in the dialog and inside in the standalone
    showPreviewsInDropzone: true,
    showFileNamesInPreview: false,
    previewChipProps: {},
    showAlerts: true,
    clearOnUnmount: true,
    initialFiles: [],
    getFileLimitExceedMessage: function getFileLimitExceedMessage(filesLimit) {
        return 'Maximum allowed number of files exceeded. Only ' + filesLimit + ' allowed';
    },
    getFileAddedMessage: function getFileAddedMessage(fileName) {
        return 'File ' + fileName + ' successfully added.';
    },
    getFileRemovedMessage: function getFileRemovedMessage(fileName) {
        return 'File ' + fileName + ' removed.';
    },
    getDropRejectMessage: function getDropRejectMessage(rejectedFile, acceptedFiles, maxFileSize) {
        var message = 'File ' + rejectedFile.name + ' was rejected. ';
        if (!acceptedFiles.includes(rejectedFile.type)) {
            message += 'File type not supported. ';
        }
        if (rejectedFile.size > maxFileSize) {
            message += 'File is too big. Size limit is ' + convertBytesToMbsOrKbs(maxFileSize) + '. ';
        }
        return message;
    },
    onChange: function onChange() {},
    onDrop: function onDrop() {},
    onDropRejected: function onDropRejected() {},
    onDelete: function onDelete() {}
};
DropzoneArea.propTypes = {
    acceptedFiles: PropTypes.array,
    filesLimit: PropTypes.number,
    maxFileSize: PropTypes.number,
    dropzoneText: PropTypes.string,
    dropzoneClass: PropTypes.string,
    showPreviews: PropTypes.bool,
    showPreviewsInDropzone: PropTypes.bool,
    showFileNamesInPreview: PropTypes.bool,
    useChipsForPreview: PropTypes.bool,
    previewChipProps: PropTypes.object,
    showAlerts: PropTypes.bool,
    clearOnUnmount: PropTypes.bool,
    initialFiles: PropTypes.arrayOf(PropTypes.string),
    getFileLimitExceedMessage: PropTypes.func,
    getFileAddedMessage: PropTypes.func,
    getFileRemovedMessage: PropTypes.func,
    getDropRejectMessage: PropTypes.func,
    onChange: PropTypes.func,
    onDrop: PropTypes.func,
    onDropRejected: PropTypes.func,
    onDelete: PropTypes.func
};

var DropzoneArea$1 = styles.withStyles(styles$3)(DropzoneArea);

var DropzoneDialog = function (_React$Component) {
    inherits(DropzoneDialog, _React$Component);

    function DropzoneDialog(props) {
        classCallCheck(this, DropzoneDialog);

        var _this = possibleConstructorReturn(this, (DropzoneDialog.__proto__ || Object.getPrototypeOf(DropzoneDialog)).call(this, props));

        _this.state = {
            open: false,
            files: [],
            disabled: true
        };
        return _this;
    }

    createClass(DropzoneDialog, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.props.clearOnUnmount) {
                this.setState({
                    files: []
                });
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (this.props.open !== prevProps.open) {
                this.setState({
                    open: this.props.open
                });
                if (this.props.onClose && !this.props.open) {
                    this.props.onClose();
                }
            }
            if (this.state.files.length !== prevState.files.length) {
                this.setState({
                    disabled: this.state.files.length === 0
                });
            }
        }
    }, {
        key: 'handleClose',
        value: function handleClose(event) {
            if (this.props.onClose) {
                this.props.onClose(event);
            }
            this.setState({ open: false });
        }
    }, {
        key: 'onChange',
        value: function onChange(files) {
            var _this2 = this;

            if (this.props.logEvents) {
                console.log('Files changed', files);
            }
            this.setState({
                files: files
            }, function () {
                if (_this2.props.onChange) {
                    _this2.props.onChange(files);
                }
            });
        }
    }, {
        key: 'onDelete',
        value: function onDelete(file) {
            // this passes it on to the parent component to do with it what they will
            if (this.props.logEvents) {
                console.log('File removed', file);
            }
            if (this.props.onDelete) {
                this.props.onDelete(file);
            }
        }
    }, {
        key: 'onDrop',
        value: function onDrop(files) {
            // this passes it on to the parent component to do with it what they will
            if (this.props.logEvents) {
                console.log('Files dropped', files);
            }
            if (this.props.onDrop) {
                this.props.onDrop(files);
            }
        }
    }, {
        key: 'onDropRejected',
        value: function onDropRejected(files, evt) {
            // this passes it on to the parent component to do with it what they will
            if (this.props.logEvents) {
                console.log('Files rejected', files);
            }
            if (this.props.onDropRejected) {
                this.props.onDropRejected(files, evt);
            }
        }
    }, {
        key: 'handleSaveClick',
        value: function handleSaveClick() {
            if (this.props.onSave) {
                this.props.onSave(this.state.files);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React__default.createElement(
                React.Fragment,
                null,
                React__default.createElement(
                    Dialog,
                    _extends({}, this.props.dialogProps, {
                        open: this.state.open,
                        onClose: this.handleClose.bind(this),
                        maxWidth: this.props.maxWidth,
                        fullWidth: this.props.fullWidth
                    }),
                    React__default.createElement(
                        DialogTitle,
                        null,
                        this.props.dialogTitle
                    ),
                    React__default.createElement(
                        DialogContent,
                        null,
                        React__default.createElement(DropzoneArea$1, {
                            dropzoneText: this.props.dropzoneText,
                            acceptedFiles: this.props.acceptedFiles,
                            filesLimit: this.props.filesLimit,
                            maxFileSize: this.props.maxFileSize,
                            showPreviews: this.props.showPreviews,
                            showPreviewsInDropzone: this.props.showPreviewsInDropzone,
                            showFileNames: this.props.showFileNames,
                            showAlerts: this.props.showAlerts,
                            onChange: this.onChange.bind(this),
                            onDrop: this.onDrop.bind(this),
                            onDropRejected: this.onDropRejected.bind(this),
                            onDelete: this.onDelete.bind(this),
                            clearOnUnmount: this.props.clearOnUnmount,
                            showFileNamesInPreview: this.props.showFileNamesInPreview,
                            useChipsForPreview: this.props.useChipsForPreview,
                            previewChipProps: this.props.previewChipProps
                        })
                    ),
                    React__default.createElement(
                        DialogActions,
                        null,
                        React__default.createElement(
                            Button,
                            {
                                color: 'primary',
                                onClick: this.handleClose.bind(this)
                            },
                            this.props.cancelButtonText
                        ),
                        React__default.createElement(
                            Button,
                            {
                                color: 'primary',
                                disabled: this.state.disabled,
                                onClick: this.handleSaveClick.bind(this)
                            },
                            this.props.submitButtonText
                        )
                    )
                )
            );
        }
    }]);
    return DropzoneDialog;
}(React__default.Component);

DropzoneDialog.defaultProps = {
    open: false,
    acceptedFiles: ['image/*', 'video/*', 'application/*'],
    filesLimit: 3,
    maxFileSize: 3000000,
    showPreviews: true,
    showPreviewsInDropzone: false,
    showFileNamesInPreview: true,
    previewChipProps: {},
    showAlerts: true,
    clearOnUnmount: true,
    dialogTitle: "Upload file",
    dialogProps: {},
    submitButtonText: "Submit",
    cancelButtonText: "Cancel",
    maxWidth: "sm",
    fullWidth: true,
    onSave: function onSave() {},
    onDelete: function onDelete() {},
    onClose: function onClose() {},
    onChange: function onChange() {},
    onDrop: function onDrop() {},
    onDropRejected: function onDropRejected() {},
    logEvents: false
};

DropzoneDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onSave: PropTypes.func,
    onDelete: PropTypes.func,
    onClose: PropTypes.func,
    onChange: PropTypes.func,
    onDrop: PropTypes.func,
    onDropRejected: PropTypes.func,
    acceptedFiles: PropTypes.array,
    filesLimit: PropTypes.number,
    maxFileSize: PropTypes.number,
    showPreviews: PropTypes.bool,
    showPreviewsInDropzone: PropTypes.bool,
    showFileNamesInPreview: PropTypes.bool,
    useChipsForPreview: PropTypes.bool,
    previewChipProps: PropTypes.object,
    showAlerts: PropTypes.bool,
    clearOnUnmount: PropTypes.bool,
    dialogTitle: PropTypes.string,
    dialogProps: PropTypes.object,
    submitButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string,
    maxWidth: PropTypes.string,
    fullWidth: PropTypes.bool,
    logEvents: PropTypes.bool
};

exports.DropzoneArea = DropzoneArea$1;
exports.DropzoneDialog = DropzoneDialog;
//# sourceMappingURL=index.js.map
