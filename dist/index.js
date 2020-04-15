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
var Snackbar = _interopDefault(require('@material-ui/core/Snackbar'));
var Typography = _interopDefault(require('@material-ui/core/Typography'));
var styles$3 = require('@material-ui/core/styles');
var CloudUploadIcon = _interopDefault(require('@material-ui/icons/CloudUpload'));
var clsx = _interopDefault(require('clsx'));
var PropTypes = _interopDefault(require('prop-types'));
var React = require('react');
var Dropzone = _interopDefault(require('react-dropzone'));
var Chip = _interopDefault(require('@material-ui/core/Chip'));
var Fab = _interopDefault(require('@material-ui/core/Fab'));
var Grid = _interopDefault(require('@material-ui/core/Grid'));
var AttachFileIcon = _interopDefault(require('@material-ui/icons/AttachFile'));
var DeleteIcon = _interopDefault(require('@material-ui/icons/Delete'));
var _objectWithoutProperties = _interopDefault(require('@babel/runtime/helpers/objectWithoutProperties'));
var green = _interopDefault(require('@material-ui/core/colors/green'));
var amber = _interopDefault(require('@material-ui/core/colors/amber'));
var IconButton = _interopDefault(require('@material-ui/core/IconButton'));
var SnackbarContent = _interopDefault(require('@material-ui/core/SnackbarContent'));
var CheckCircleIcon = _interopDefault(require('@material-ui/icons/CheckCircle'));
var CloseIcon = _interopDefault(require('@material-ui/icons/Close'));
var ErrorIcon = _interopDefault(require('@material-ui/icons/Error'));
var InfoIcon = _interopDefault(require('@material-ui/icons/Info'));
var WarningIcon = _interopDefault(require('@material-ui/icons/Warning'));
var _slicedToArray = _interopDefault(require('@babel/runtime/helpers/slicedToArray'));
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

function readFile(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();

    reader.onload = function (event) {
      var _event$target;

      resolve(event === null || event === void 0 ? void 0 : (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.result);
    };

    reader.onerror = function (event) {
      reader.abort();
      reject(event);
    };

    reader.readAsDataURL(file);
  });
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

var _ref2 = /*#__PURE__*/React.createElement(DeleteIcon, null);

function PreviewList(_ref) {
  var fileObjects = _ref.fileObjects,
      handleRemove = _ref.handleRemove,
      showFileNames = _ref.showFileNames,
      useChipsForPreview = _ref.useChipsForPreview,
      previewChipProps = _ref.previewChipProps,
      previewGridClasses = _ref.previewGridClasses,
      previewGridProps = _ref.previewGridProps,
      classes = _ref.classes;

  if (useChipsForPreview) {
    return fileObjects.map(function (fileObject, i) {
      return React.createElement("div", {
        key: i
      }, React.createElement(Chip, _extends({
        label: fileObject.file.name,
        onDelete: handleRemove(i),
        variant: "outlined"
      }, previewChipProps)));
    });
  }

  return React.createElement(Grid, _extends({
    container: true,
    spacing: 8,
    className: previewGridClasses.container
  }, previewGridProps.container), fileObjects.map(function (fileObject, i) {
    var img = isImage(fileObject.file) ? React.createElement("img", {
      className: classes.smallPreviewImg,
      role: "presentation",
      src: fileObject.data
    }) : React.createElement(AttachFileIcon, {
      className: classes.smallPreviewImg
    });
    return React.createElement(Grid, _extends({
      key: i,
      item: true,
      xs: 4
    }, previewGridProps.item, {
      className: clsx(previewGridClasses.item, classes.imageContainer)
    }), img, showFileNames && React.createElement(Typography, {
      variant: "body1",
      component: "p"
    }, fileObject.file.name), React.createElement(Fab, {
      onClick: handleRemove(i),
      "aria-label": "Delete",
      className: classes.removeBtn
    }, _ref2));
  }));
}

process.env.NODE_ENV !== "production" ? PreviewList.propTypes = {
  classes: PropTypes.object.isRequired,
  fileObjects: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleRemove: PropTypes.func.isRequired,
  previewChipProps: PropTypes.object,
  previewGridClasses: PropTypes.object,
  previewGridProps: PropTypes.object,
  showFileNames: PropTypes.bool,
  useChipsForPreview: PropTypes.bool
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
  return React.createElement(SnackbarContent, _extends({
    className: clsx(classes[variant], className),
    "aria-describedby": "client-snackbar",
    message: React.createElement("span", {
      id: "client-snackbar",
      className: classes.message
    }, React.createElement(Icon, {
      className: clsx(classes.icon, classes.iconVariant)
    }), message),
    action: [React.createElement(IconButton, {
      key: "close",
      "aria-label": "Close",
      color: "inherit",
      className: classes.close,
      onClick: onClose
    }, React.createElement(CloseIcon, {
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
    marginBottom: 20,
    marginTop: 20
  }
};
var snackbarAnchorOrigin = {
  vertical: 'bottom',
  horizontal: 'left'
};

var DropzoneArea = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(DropzoneArea, _React$PureComponent);

  function DropzoneArea() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DropzoneArea);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DropzoneArea)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      fileObjects: [],
      openSnackBar: false,
      snackbarMessage: '',
      snackbarVariant: 'success'
    };

    _this.filesArray = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(urls) {
        var fileObjs;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return Promise.all(urls.map( /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(url) {
                    var file, data;
                    return _regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return createFileFromUrl(url);

                          case 2:
                            file = _context.sent;
                            _context.next = 5;
                            return readFile(file);

                          case 5:
                            data = _context.sent;
                            return _context.abrupt("return", {
                              file: file,
                              data: data
                            });

                          case 7:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x2) {
                    return _ref2.apply(this, arguments);
                  };
                }()));

              case 3:
                fileObjs = _context2.sent;

                _this.setState(function (state) {
                  return {
                    fileObjects: [].concat(state.fileObjects, fileObjs)
                  };
                }, function () {
                  var onChange = _this.props.onChange;
                  var fileObjects = _this.state.fileObjects;

                  if (onChange) {
                    onChange(fileObjects.map(function (fileObject) {
                      return fileObject.file;
                    }));
                  }
                });

                _context2.next = 10;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 7]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.handleDropAccepted = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(acceptedFiles, evt) {
        var _this$props, filesLimit, getFileAddedMessage, getFileLimitExceedMessage, onDrop, fileObjects, fileObjs, message;

        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this$props = _this.props, filesLimit = _this$props.filesLimit, getFileAddedMessage = _this$props.getFileAddedMessage, getFileLimitExceedMessage = _this$props.getFileLimitExceedMessage, onDrop = _this$props.onDrop;
                fileObjects = _this.state.fileObjects;

                if (!(filesLimit > 1 && fileObjects.length + acceptedFiles.length > filesLimit)) {
                  _context4.next = 5;
                  break;
                }

                _this.setState({
                  openSnackBar: true,
                  snackbarMessage: getFileLimitExceedMessage(filesLimit),
                  snackbarVariant: 'error'
                });

                return _context4.abrupt("return");

              case 5:
                // Notify Drop event
                if (onDrop) {
                  onDrop(acceptedFiles, evt);
                } // Retrieve fileObjects data


                _context4.next = 8;
                return Promise.all(acceptedFiles.map( /*#__PURE__*/function () {
                  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(file) {
                    var data;
                    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return readFile(file);

                          case 2:
                            data = _context3.sent;
                            return _context3.abrupt("return", {
                              file: file,
                              data: data
                            });

                          case 4:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function (_x5) {
                    return _ref4.apply(this, arguments);
                  };
                }()));

              case 8:
                fileObjs = _context4.sent;
                // Display message
                message = fileObjs.reduce(function (msg, fileObj) {
                  return msg + getFileAddedMessage(fileObj.file.name);
                }, '');

                _this.setState({
                  openSnackBar: true,
                  snackbarMessage: message,
                  snackbarVariant: 'success'
                }); // Update component state


                _this.setState(function (state) {
                  // Handle a single file
                  if (filesLimit <= 1) {
                    return {
                      fileObjects: [].concat(fileObjs[0])
                    };
                  } // Handle multiple files


                  return {
                    fileObjects: [].concat(state.fileObjects, fileObjs)
                  };
                }, function () {
                  var onChange = _this.props.onChange;
                  var fileObjects = _this.state.fileObjects;

                  if (onChange) {
                    onChange(fileObjects.map(function (fileObject) {
                      return fileObject.file;
                    }));
                  }
                });

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x3, _x4) {
        return _ref3.apply(this, arguments);
      };
    }();

    _this.handleDropRejected = function (rejectedFiles, evt) {
      var _this$props2 = _this.props,
          acceptedFiles = _this$props2.acceptedFiles,
          getDropRejectMessage = _this$props2.getDropRejectMessage,
          maxFileSize = _this$props2.maxFileSize,
          onDropRejected = _this$props2.onDropRejected;
      var message = '';
      rejectedFiles.forEach(function (rejectedFile) {
        message = getDropRejectMessage(rejectedFile, acceptedFiles, maxFileSize);
      });

      if (onDropRejected) {
        onDropRejected(rejectedFiles, evt);
      }

      _this.setState({
        openSnackBar: true,
        snackbarMessage: message,
        snackbarVariant: 'error'
      });
    };

    _this.handleRemove = function (fileIndex) {
      return function (event) {
        event.stopPropagation();
        var _this$props3 = _this.props,
            getFileRemovedMessage = _this$props3.getFileRemovedMessage,
            onChange = _this$props3.onChange,
            onDelete = _this$props3.onDelete;
        var fileObjects = _this.state.fileObjects; // Find removed fileObject

        var removedFileObj = fileObjects.filter(function (fileObject, i) {
          return i === fileIndex;
        })[0]; // Calculate remaining fileObjects array

        var remainingFileObjs = fileObjects.filter(function (fileObject, i) {
          return i !== fileIndex;
        });

        _this.setState({
          fileObjects: remainingFileObjs
        }, function () {
          if (onDelete) {
            onDelete(removedFileObj.file);
          }

          if (onChange) {
            onChange(_this.state.fileObjects.map(function (fileObject) {
              return fileObject.file;
            }));
          }

          _this.setState({
            openSnackBar: true,
            snackbarMessage: getFileRemovedMessage(removedFileObj.file.name),
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

    return _this;
  }

  _createClass(DropzoneArea, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.filesArray(this.props.initialFiles);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$props4 = this.props,
          clearOnUnmount = _this$props4.clearOnUnmount,
          onChange = _this$props4.onChange;

      if (clearOnUnmount) {
        this.setState({
          fileObjects: []
        });

        if (onChange) {
          onChange([]);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props5 = this.props,
          acceptedFiles = _this$props5.acceptedFiles,
          classes = _this$props5.classes,
          dropzoneClass = _this$props5.dropzoneClass,
          dropzoneParagraphClass = _this$props5.dropzoneParagraphClass,
          dropzoneText = _this$props5.dropzoneText,
          filesLimit = _this$props5.filesLimit,
          maxFileSize = _this$props5.maxFileSize,
          previewChipProps = _this$props5.previewChipProps,
          previewGridClasses = _this$props5.previewGridClasses,
          previewGridProps = _this$props5.previewGridProps,
          previewText = _this$props5.previewText,
          showAlerts = _this$props5.showAlerts,
          showFileNames = _this$props5.showFileNames,
          showFileNamesInPreview = _this$props5.showFileNamesInPreview,
          showPreviews = _this$props5.showPreviews,
          showPreviewsInDropzone = _this$props5.showPreviewsInDropzone,
          useChipsForPreview = _this$props5.useChipsForPreview;
      var _this$state = this.state,
          fileObjects = _this$state.fileObjects,
          openSnackBar = _this$state.openSnackBar,
          snackbarMessage = _this$state.snackbarMessage,
          snackbarVariant = _this$state.snackbarVariant;
      var acceptFiles = acceptedFiles === null || acceptedFiles === void 0 ? void 0 : acceptedFiles.join(',');
      var isMultiple = filesLimit > 1;
      var previewsVisible = showPreviews && fileObjects.length > 0;
      var previewsInDropzoneVisible = showPreviewsInDropzone && fileObjects.length > 0;
      return React.createElement(React.Fragment, null, React.createElement(Dropzone, {
        accept: acceptFiles,
        onDropAccepted: this.handleDropAccepted,
        onDropRejected: this.handleDropRejected,
        maxSize: maxFileSize,
        multiple: isMultiple
      }, function (_ref5) {
        var getRootProps = _ref5.getRootProps,
            getInputProps = _ref5.getInputProps,
            isDragActive = _ref5.isDragActive,
            isDragReject = _ref5.isDragReject;
        return React.createElement("div", _extends({}, getRootProps(), {
          className: clsx(classes.dropZone, dropzoneClass, isDragActive && classes.stripes, isDragReject && classes.rejectStripes)
        }), React.createElement("input", getInputProps()), React.createElement("div", {
          className: classes.dropzoneTextStyle
        }, React.createElement(Typography, {
          variant: "h5",
          component: "p",
          className: clsx(classes.dropzoneParagraph, dropzoneParagraphClass)
        }, dropzoneText), React.createElement(CloudUploadIcon, {
          className: classes.uploadIconSize
        })), previewsInDropzoneVisible && React.createElement(PreviewList$1, {
          fileObjects: fileObjects,
          handleRemove: _this2.handleRemove,
          showFileNames: showFileNames,
          useChipsForPreview: useChipsForPreview,
          previewChipProps: previewChipProps,
          previewGridClasses: previewGridClasses,
          previewGridProps: previewGridProps
        }));
      }), previewsVisible && React.createElement(React.Fragment, null, React.createElement(Typography, {
        variant: "subtitle1",
        component: "span"
      }, previewText), React.createElement(PreviewList$1, {
        fileObjects: fileObjects,
        handleRemove: this.handleRemove,
        showFileNames: showFileNamesInPreview,
        useChipsForPreview: useChipsForPreview,
        previewChipProps: previewChipProps,
        previewGridClasses: previewGridClasses,
        previewGridProps: previewGridProps
      })), showAlerts && React.createElement(Snackbar, {
        anchorOrigin: snackbarAnchorOrigin,
        open: openSnackBar,
        autoHideDuration: 6000,
        onClose: this.handleCloseSnackbar
      }, React.createElement(SnackbarContentWrapper$1, {
        onClose: this.handleCloseSnackbar,
        variant: snackbarVariant,
        message: snackbarMessage
      })));
    }
  }]);

  return DropzoneArea;
}(React.PureComponent);

DropzoneArea.defaultProps = {
  acceptedFiles: ['image/*', 'video/*', 'application/*'],
  filesLimit: 3,
  maxFileSize: 3000000,
  dropzoneText: 'Drag and drop an image file here or click',
  previewText: 'Preview:',
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
  previewText: PropTypes.string,
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

function splitDropzoneDialogProps(allProps) {
  var cancelButtonText = allProps.cancelButtonText,
      dialogProps = allProps.dialogProps,
      dialogTitle = allProps.dialogTitle,
      fullWidth = allProps.fullWidth,
      maxWidth = allProps.maxWidth,
      onClose = allProps.onClose,
      onSave = allProps.onSave,
      open = allProps.open,
      submitButtonText = allProps.submitButtonText,
      dropzoneAreaProps = _objectWithoutProperties(allProps, ["cancelButtonText", "dialogProps", "dialogTitle", "fullWidth", "maxWidth", "onClose", "onSave", "open", "submitButtonText"]);

  return [{
    cancelButtonText: cancelButtonText,
    dialogProps: dialogProps,
    dialogTitle: dialogTitle,
    fullWidth: fullWidth,
    maxWidth: maxWidth,
    onClose: onClose,
    onSave: onSave,
    open: open,
    submitButtonText: submitButtonText
  }, dropzoneAreaProps];
}

var DropzoneDialog = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(DropzoneDialog, _React$PureComponent);

  function DropzoneDialog() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DropzoneDialog);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DropzoneDialog)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      files: []
    };

    _this.handleClose = function (event) {
      var onClose = _this.props.onClose; // Notify onClose

      if (onClose) {
        onClose(event);
      }
    };

    _this.handleChange = function (files) {
      var onChange = _this.props.onChange;

      _this.setState({
        files: files
      });

      if (onChange) {
        onChange(files);
      }
    };

    _this.handleSaveClick = function () {
      var onSave = _this.props.onSave;
      var files = _this.state.files;

      if (onSave) {
        onSave(files);
      }
    };

    return _this;
  }

  _createClass(DropzoneDialog, [{
    key: "render",
    value: function render() {
      var _splitDropzoneDialogP = splitDropzoneDialogProps(this.props),
          _splitDropzoneDialogP2 = _slicedToArray(_splitDropzoneDialogP, 2),
          dropzoneDialogProps = _splitDropzoneDialogP2[0],
          dropzoneAreaProps = _splitDropzoneDialogP2[1];

      var cancelButtonText = dropzoneDialogProps.cancelButtonText,
          dialogProps = dropzoneDialogProps.dialogProps,
          dialogTitle = dropzoneDialogProps.dialogTitle,
          fullWidth = dropzoneDialogProps.fullWidth,
          maxWidth = dropzoneDialogProps.maxWidth,
          open = dropzoneDialogProps.open,
          submitButtonText = dropzoneDialogProps.submitButtonText;
      var files = this.state.files; // Submit button state

      var submitDisabled = files.length === 0;
      return React.createElement(React.Fragment, null, React.createElement(Dialog, _extends({}, dialogProps, {
        fullWidth: fullWidth,
        maxWidth: maxWidth,
        onClose: this.handleClose,
        open: open
      }), React.createElement(DialogTitle, null, dialogTitle), React.createElement(DialogContent, null, React.createElement(DropzoneArea$1, _extends({}, dropzoneAreaProps, {
        onChange: this.handleChange
      }))), React.createElement(DialogActions, null, React.createElement(Button, {
        color: "primary",
        onClick: this.handleClose
      }, cancelButtonText), React.createElement(Button, {
        color: "primary",
        disabled: submitDisabled,
        onClick: this.handleSaveClick
      }, submitButtonText))));
    }
  }]);

  return DropzoneDialog;
}(React.PureComponent);

DropzoneDialog.defaultProps = _extends({}, DropzoneArea$1.defaultProps, {
  cancelButtonText: 'Cancel',
  dialogProps: {},
  dialogTitle: 'Upload file',
  fullWidth: true,
  maxWidth: 'sm',
  onClose: function onClose() {},
  onSave: function onSave() {},
  open: false,
  showPreviews: true,
  // By default previews show up under in the dialog and inside in the standalone
  showPreviewsInDropzone: false,
  showFileNamesInPreview: true,
  submitButtonText: 'Submit'
});
process.env.NODE_ENV !== "production" ? DropzoneDialog.propTypes = _extends({}, DropzoneArea$1.propTypes, {
  cancelButtonText: PropTypes.string,
  dialogProps: PropTypes.object,
  dialogTitle: PropTypes.string,
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.string,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  open: PropTypes.bool.isRequired,
  submitButtonText: PropTypes.string
}) : void 0;

exports.DropzoneArea = DropzoneArea$1;
exports.DropzoneDialog = DropzoneDialog;
//# sourceMappingURL=index.js.map
