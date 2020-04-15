'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _extends = _interopDefault(require('@babel/runtime/helpers/extends'));
var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));
var _possibleConstructorReturn = _interopDefault(require('@babel/runtime/helpers/possibleConstructorReturn'));
var _getPrototypeOf = _interopDefault(require('@babel/runtime/helpers/getPrototypeOf'));
var _inherits = _interopDefault(require('@babel/runtime/helpers/inherits'));
var Grid = _interopDefault(require('@material-ui/core/Grid'));
var Snackbar = _interopDefault(require('@material-ui/core/Snackbar'));
var styles$3 = require('@material-ui/core/styles');
var CloudUploadIcon = _interopDefault(require('@material-ui/icons/CloudUpload'));
var clsx = _interopDefault(require('clsx'));
var PropTypes = _interopDefault(require('prop-types'));
var React = require('react');
var React__default = _interopDefault(React);
var Dropzone = _interopDefault(require('react-dropzone'));
var Chip = _interopDefault(require('@material-ui/core/Chip'));
var Fab = _interopDefault(require('@material-ui/core/Fab'));
var AttachFileIcon = _interopDefault(require('@material-ui/icons/AttachFile'));
var DeleteIcon = _interopDefault(require('@material-ui/icons/Delete'));
var _objectWithoutProperties = _interopDefault(require('@babel/runtime/helpers/objectWithoutProperties'));
var CheckCircleIcon = _interopDefault(require('@material-ui/icons/CheckCircle'));
var ErrorIcon = _interopDefault(require('@material-ui/icons/Error'));
var InfoIcon = _interopDefault(require('@material-ui/icons/Info'));
var CloseIcon = _interopDefault(require('@material-ui/icons/Close'));
var green = _interopDefault(require('@material-ui/core/colors/green'));
var amber = _interopDefault(require('@material-ui/core/colors/amber'));
var IconButton = _interopDefault(require('@material-ui/core/IconButton'));
var SnackbarContent = _interopDefault(require('@material-ui/core/SnackbarContent'));
var WarningIcon = _interopDefault(require('@material-ui/icons/Warning'));
var Button = _interopDefault(require('@material-ui/core/Button'));
var Dialog = _interopDefault(require('@material-ui/core/Dialog'));
var DialogActions = _interopDefault(require('@material-ui/core/DialogActions'));
var DialogContent = _interopDefault(require('@material-ui/core/DialogContent'));
var DialogTitle = _interopDefault(require('@material-ui/core/DialogTitle'));

function isImage(file) {
  if (file.type.split('/')[0] === 'image') {
    return true;
  }
}
function convertBytesToMbsOrKbs(filesize) {
  var size = ''; // I know, not technically correct...

  if (filesize >= 1000000) {
    size = filesize / 1000000 + ' megabytes';
  } else if (filesize >= 1000) {
    size = filesize / 1000 + ' kilobytes';
  } else {
    size = filesize + ' bytes';
  }

  return size;
}
function createFileFromUrl(_x) {
  return _createFileFromUrl.apply(this, arguments);
}

function _createFileFromUrl() {
  _createFileFromUrl = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(url) {
    var response, data, metadata, filename, ext;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
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
            metadata = {
              type: data.type
            };
            filename = url.replace(/\?.+/, '').split('/').pop();
            ext = data.type.split('/').pop();
            return _context.abrupt("return", new File([data], "".concat(filename, ".").concat(ext), metadata));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createFileFromUrl.apply(this, arguments);
}

var styles = {
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

var _ref = /*#__PURE__*/React__default.createElement(DeleteIcon, null);

function PreviewList(props) {
  var fileObjects = props.fileObjects,
      handleRemove = props.handleRemove,
      showFileNames = props.showFileNames,
      useChipsForPreview = props.useChipsForPreview,
      previewChipProps = props.previewChipProps,
      previewGridClasses = props.previewGridClasses,
      previewGridProps = props.previewGridProps,
      classes = props.classes;

  if (useChipsForPreview) {
    return fileObjects.map(function (fileObject, i) {
      return React__default.createElement("div", {
        key: i
      }, React__default.createElement(Chip, _extends({
        label: fileObject.file.name,
        onDelete: handleRemove(i),
        variant: "outlined"
      }, previewChipProps)));
    });
  }

  return React__default.createElement(Grid, _extends({
    container: true,
    spacing: 8,
    className: previewGridClasses.container
  }, previewGridProps.container), fileObjects.map(function (fileObject, i) {
    var img = isImage(fileObject.file) ? React__default.createElement("img", {
      className: clsx(previewGridClasses.image, classes.smallPreviewImg),
      role: "presentation",
      src: fileObject.data
    }) : React__default.createElement(AttachFileIcon, {
      className: clsx(previewGridClasses.image, classes.smallPreviewImg)
    });
    return React__default.createElement(Grid, _extends({
      item: true,
      xs: 4,
      key: i
    }, previewGridProps.item, {
      className: clsx(previewGridClasses.item, classes.imageContainer)
    }), img, showFileNames && React__default.createElement("p", null, fileObject.file.name), React__default.createElement(Fab, {
      onClick: handleRemove(i),
      "aria-label": "Delete",
      className: classes.removeBtn
    }, _ref));
  }));
}

process.env.NODE_ENV !== "production" ? PreviewList.propTypes = {
  classes: PropTypes.object.isRequired,
  fileObjects: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleRemove: PropTypes.func.isRequired,
  showFileNames: PropTypes.bool,
  useChipsForPreview: PropTypes.bool,
  previewChipProps: PropTypes.object,
  previewGridClasses: PropTypes.object,
  previewGridProps: PropTypes.object
} : void 0;
var PreviewList$1 = styles$3.withStyles(styles)(PreviewList);

var variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

var styles$1 = function styles(theme) {
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
      other = _objectWithoutProperties(props, ["classes", "className", "message", "onClose", "variant"]);

  var Icon = variantIcon[variant];
  return React__default.createElement(SnackbarContent, _extends({
    className: clsx(classes[variant], className),
    "aria-describedby": "client-snackbar",
    message: React__default.createElement("span", {
      id: "client-snackbar",
      className: classes.message
    }, React__default.createElement(Icon, {
      className: clsx(classes.icon, classes.iconVariant)
    }), message),
    action: [React__default.createElement(IconButton, {
      key: "close",
      "aria-label": "Close",
      color: "inherit",
      className: classes.close,
      onClick: onClose
    }, React__default.createElement(CloseIcon, {
      className: classes.icon
    }))]
  }, other));
}

process.env.NODE_ENV !== "production" ? SnackbarContentWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired
} : void 0;
var SnackbarContentWrapper$1 = styles$3.withStyles(styles$1)(SnackbarContentWrapper);

var styles$2 = {
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
    backgroundImage: 'repeating-linear-gradient(-45deg, #fc8785, #fc8785 25px, #f4231f 25px, #f4231f 50px)'
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

var _ref2 = /*#__PURE__*/React__default.createElement(Grid, {
  container: true
}, React__default.createElement("span", null, "Preview:"));

var DropzoneArea = /*#__PURE__*/function (_Component) {
  _inherits(DropzoneArea, _Component);

  function DropzoneArea(props) {
    var _this;

    _classCallCheck(this, DropzoneArea);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DropzoneArea).call(this, props));

    _this.handleRemove = function (fileIndex) {
      return function (event) {
        event.stopPropagation();
        var fileObjects = _this.state.fileObjects;
        var file = fileObjects.filter(function (fileObject, i) {
          return i === fileIndex;
        })[0].file;
        fileObjects.splice(fileIndex, 1);

        _this.setState(fileObjects, function () {
          if (_this.props.onDelete) {
            _this.props.onDelete(file);
          }

          if (_this.props.onChange) {
            _this.props.onChange(_this.state.fileObjects.map(function (fileObject) {
              return fileObject.file;
            }));
          }

          _this.setState({
            openSnackBar: true,
            snackbarMessage: _this.props.getFileRemovedMessage(file.name),
            snackbarVariant: 'info'
          });
        });
      };
    };

    _this.handleCloseSnackbar = function () {
      _this.setState({
        openSnackBar: false
      });
    };

    _this.state = {
      fileObjects: [],
      openSnackBar: false,
      snackbarMessage: '',
      snackbarVariant: 'success',
      dropzoneText: props.dropzoneText
    };
    return _this;
  }

  _createClass(DropzoneArea, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.filesArray(this.props.initialFiles);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.dropzoneText !== prevProps.dropzoneText) {
        this.setState({
          dropzoneText: this.props.dropzoneText
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.clearOnUnmount) {
        this.setState({
          fileObjects: []
        });
      }
    }
  }, {
    key: "filesArray",
    value: function () {
      var _filesArray = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(urls) {
        var _this2 = this;

        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

        return _regeneratorRuntime.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 4;
                _loop = /*#__PURE__*/_regeneratorRuntime.mark(function _loop() {
                  var url, file, reader;
                  return _regeneratorRuntime.wrap(function _loop$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          url = _step.value;
                          _context.next = 3;
                          return createFileFromUrl(url);

                        case 3:
                          file = _context.sent;
                          reader = new FileReader();

                          reader.onload = function (event) {
                            _this2.setState({
                              fileObjects: _this2.state.fileObjects.concat({
                                file: file,
                                data: event.target.result
                              })
                            });
                          };

                          reader.readAsDataURL(file);

                        case 7:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _loop);
                });
                _iterator = urls[Symbol.iterator]();

              case 7:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 12;
                  break;
                }

                return _context2.delegateYield(_loop(), "t0", 9);

              case 9:
                _iteratorNormalCompletion = true;
                _context2.next = 7;
                break;

              case 12:
                _context2.next = 18;
                break;

              case 14:
                _context2.prev = 14;
                _context2.t1 = _context2["catch"](4);
                _didIteratorError = true;
                _iteratorError = _context2.t1;

              case 18:
                _context2.prev = 18;
                _context2.prev = 19;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 21:
                _context2.prev = 21;

                if (!_didIteratorError) {
                  _context2.next = 24;
                  break;
                }

                throw _iteratorError;

              case 24:
                return _context2.finish(21);

              case 25:
                return _context2.finish(18);

              case 26:
                _context2.next = 31;
                break;

              case 28:
                _context2.prev = 28;
                _context2.t2 = _context2["catch"](0);
                console.log(_context2.t2);

              case 31:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee, null, [[0, 28], [4, 14, 18, 26], [19,, 21, 25]]);
      }));

      function filesArray(_x) {
        return _filesArray.apply(this, arguments);
      }

      return filesArray;
    }()
  }, {
    key: "onDrop",
    value: function onDrop(files) {
      var _this3 = this;

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
              fileObjects: _this3.props.filesLimit <= 1 ? [{
                file: file,
                data: event.target.result
              }] : _this.state.fileObjects.concat({
                file: file,
                data: event.target.result
              })
            }, function () {
              if (_this3.props.onChange) {
                _this3.props.onChange(_this.state.fileObjects.map(function (fileObject) {
                  return fileObject.file;
                }));
              }

              if (_this3.props.onDrop) {
                _this3.props.onDrop(file);
              }

              message += _this3.props.getFileAddedMessage(file.name);
              count++; // we cannot rely on the index because this is asynchronous

              if (count === files.length) {
                // display message when the last one fires
                _this3.setState({
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
    key: "handleDropRejected",
    value: function handleDropRejected(rejectedFiles, evt) {
      var _this4 = this;

      var message = '';
      rejectedFiles.forEach(function (rejectedFile) {
        message = _this4.props.getDropRejectMessage(rejectedFile, _this4.props.acceptedFiles, _this4.props.maxFileSize);
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
    key: "render",
    value: function render() {
      var _this5 = this;

      var classes = this.props.classes;
      var showPreviews = this.props.showPreviews && this.state.fileObjects.length > 0;
      var showPreviewsInDropzone = this.props.showPreviewsInDropzone && this.state.fileObjects.length > 0;
      return React__default.createElement(React.Fragment, null, React__default.createElement(Dropzone, {
        accept: this.props.acceptedFiles.join(','),
        onDrop: this.onDrop.bind(this),
        onDropRejected: this.handleDropRejected.bind(this),
        maxSize: this.props.maxFileSize,
        multiple: this.props.filesLimit > 1
      }, function (_ref) {
        var getRootProps = _ref.getRootProps,
            getInputProps = _ref.getInputProps,
            isDragActive = _ref.isDragActive,
            isDragReject = _ref.isDragReject;
        return React__default.createElement("div", _extends({}, getRootProps(), {
          className: clsx(classes.dropZone, _this5.props.dropzoneClass, isDragActive && classes.stripes, isDragReject && classes.rejectStripes)
        }), React__default.createElement("input", getInputProps()), React__default.createElement("div", {
          className: classes.dropzoneTextStyle
        }, React__default.createElement("p", {
          className: clsx(classes.dropzoneParagraph, _this5.props.dropzoneParagraphClass)
        }, _this5.state.dropzoneText), React__default.createElement(CloudUploadIcon, {
          className: classes.uploadIconSize
        })), showPreviewsInDropzone && React__default.createElement(PreviewList$1, {
          fileObjects: _this5.state.fileObjects,
          handleRemove: _this5.handleRemove.bind(_this5),
          showFileNames: _this5.props.showFileNames,
          useChipsForPreview: _this5.props.useChipsForPreview,
          previewChipProps: _this5.props.previewChipProps,
          previewGridClasses: _this5.props.previewGridClasses,
          previewGridProps: _this5.props.previewGridProps
        }));
      }), showPreviews && React__default.createElement(React.Fragment, null, _ref2, React__default.createElement(PreviewList$1, {
        fileObjects: this.state.fileObjects,
        handleRemove: this.handleRemove.bind(this),
        showFileNames: this.props.showFileNamesInPreview,
        useChipsForPreview: this.props.useChipsForPreview,
        previewChipProps: this.props.previewChipProps,
        previewGridClasses: this.props.previewGridClasses,
        previewGridProps: this.props.previewGridProps
      })), this.props.showAlerts && React__default.createElement(Snackbar, {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left'
        },
        open: this.state.openSnackBar,
        autoHideDuration: 6000,
        onClose: this.handleCloseSnackbar
      }, React__default.createElement(SnackbarContentWrapper$1, {
        onClose: this.handleCloseSnackbar,
        variant: this.state.snackbarVariant,
        message: this.state.snackbarMessage
      })));
    }
  }]);

  return DropzoneArea;
}(React.Component);

DropzoneArea.defaultProps = {
  acceptedFiles: ['image/*', 'video/*', 'application/*'],
  filesLimit: 3,
  maxFileSize: 3000000,
  dropzoneText: 'Drag and drop an image file here or click',
  showPreviews: false,
  // By default previews show up under in the dialog and inside in the standalone
  showPreviewsInDropzone: true,
  showFileNames: false,
  showFileNamesInPreview: false,
  previewChipProps: {},
  previewGridClasses: {},
  previewGridProps: {},
  showAlerts: true,
  clearOnUnmount: true,
  initialFiles: [],
  getFileLimitExceedMessage: function getFileLimitExceedMessage(filesLimit) {
    return "Maximum allowed number of files exceeded. Only ".concat(filesLimit, " allowed");
  },
  getFileAddedMessage: function getFileAddedMessage(fileName) {
    return "File ".concat(fileName, " successfully added.");
  },
  getFileRemovedMessage: function getFileRemovedMessage(fileName) {
    return "File ".concat(fileName, " removed.");
  },
  getDropRejectMessage: function getDropRejectMessage(rejectedFile, acceptedFiles, maxFileSize) {
    var message = "File ".concat(rejectedFile.name, " was rejected. ");

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
process.env.NODE_ENV !== "production" ? DropzoneArea.propTypes = {
  classes: PropTypes.object.isRequired,
  acceptedFiles: PropTypes.array,
  filesLimit: PropTypes.number,
  maxFileSize: PropTypes.number,
  dropzoneText: PropTypes.string,
  dropzoneClass: PropTypes.string,
  dropzoneParagraphClass: PropTypes.string,
  showPreviews: PropTypes.bool,
  showPreviewsInDropzone: PropTypes.bool,
  showFileNames: PropTypes.bool,
  showFileNamesInPreview: PropTypes.bool,
  useChipsForPreview: PropTypes.bool,
  previewChipProps: PropTypes.object,
  previewGridClasses: PropTypes.object,
  previewGridProps: PropTypes.object,
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
} : void 0;
var DropzoneArea$1 = styles$3.withStyles(styles$2)(DropzoneArea);

var DropzoneDialog = /*#__PURE__*/function (_React$Component) {
  _inherits(DropzoneDialog, _React$Component);

  function DropzoneDialog(props) {
    var _this;

    _classCallCheck(this, DropzoneDialog);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DropzoneDialog).call(this, props));
    _this.state = {
      open: false,
      files: [],
      disabled: true
    };
    return _this;
  }

  _createClass(DropzoneDialog, [{
    key: "componentDidUpdate",
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
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.clearOnUnmount) {
        this.setState({
          files: []
        });
      }
    }
  }, {
    key: "handleClose",
    value: function handleClose(event) {
      if (this.props.onClose) {
        this.props.onClose(event);
      }

      this.setState({
        open: false
      });
    }
  }, {
    key: "onChange",
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
    key: "onDelete",
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
    key: "onDrop",
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
    key: "onDropRejected",
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
    key: "handleSaveClick",
    value: function handleSaveClick() {
      if (this.props.onSave) {
        this.props.onSave(this.state.files);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React__default.createElement(React.Fragment, null, React__default.createElement(Dialog, _extends({}, this.props.dialogProps, {
        open: this.state.open,
        onClose: this.handleClose.bind(this),
        maxWidth: this.props.maxWidth,
        fullWidth: this.props.fullWidth
      }), React__default.createElement(DialogTitle, null, this.props.dialogTitle), React__default.createElement(DialogContent, null, React__default.createElement(DropzoneArea$1, {
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
        previewChipProps: this.props.previewChipProps,
        previewGridClasses: this.props.previewGridClasses,
        previewGridProps: this.props.previewGridProps
      })), React__default.createElement(DialogActions, null, React__default.createElement(Button, {
        color: "primary",
        onClick: this.handleClose.bind(this)
      }, this.props.cancelButtonText), React__default.createElement(Button, {
        color: "primary",
        disabled: this.state.disabled,
        onClick: this.handleSaveClick.bind(this)
      }, this.props.submitButtonText))));
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
  previewGridClasses: {},
  previewGridProps: {},
  showAlerts: true,
  clearOnUnmount: true,
  dialogTitle: 'Upload file',
  dialogProps: {},
  submitButtonText: 'Submit',
  cancelButtonText: 'Cancel',
  maxWidth: 'sm',
  fullWidth: true,
  onSave: function onSave() {},
  onDelete: function onDelete() {},
  onClose: function onClose() {},
  onChange: function onChange() {},
  onDrop: function onDrop() {},
  onDropRejected: function onDropRejected() {},
  logEvents: false
};
process.env.NODE_ENV !== "production" ? DropzoneDialog.propTypes = {
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
  dropzoneText: PropTypes.string,
  showPreviews: PropTypes.bool,
  showPreviewsInDropzone: PropTypes.bool,
  showFileNames: PropTypes.bool,
  showFileNamesInPreview: PropTypes.bool,
  useChipsForPreview: PropTypes.bool,
  previewChipProps: PropTypes.object,
  previewGridClasses: PropTypes.object,
  previewGridProps: PropTypes.object,
  showAlerts: PropTypes.bool,
  clearOnUnmount: PropTypes.bool,
  dialogTitle: PropTypes.string,
  dialogProps: PropTypes.object,
  submitButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  maxWidth: PropTypes.string,
  fullWidth: PropTypes.bool,
  logEvents: PropTypes.bool
} : void 0;

exports.DropzoneArea = DropzoneArea$1;
exports.DropzoneDialog = DropzoneDialog;
//# sourceMappingURL=index.js.map
