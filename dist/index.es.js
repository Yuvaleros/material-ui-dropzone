import _extends from '@babel/runtime/helpers/extends';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import _inherits from '@babel/runtime/helpers/inherits';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { createElement, Fragment, PureComponent } from 'react';
import Dropzone from 'react-dropzone';
import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import DeleteIcon from '@material-ui/icons/Delete';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

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
    var response, data, metadata, filename, ext, fullFilename;
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
            ext = data.type.split('/').pop(); // Append extension only if not already present

            fullFilename = !(filename === null || filename === void 0 ? void 0 : filename.endsWith(ext)) ? "".concat(filename, ".").concat(ext) : filename;
            return _context.abrupt("return", new File([data], fullFilename, metadata));

          case 11:
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

var _ref2 = /*#__PURE__*/createElement(DeleteIcon, null);

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
      return createElement("div", {
        key: i
      }, createElement(Chip, _extends({
        label: fileObject.file.name,
        onDelete: handleRemove(i),
        variant: "outlined"
      }, previewChipProps)));
    });
  }

  return createElement(Grid, _extends({
    container: true,
    spacing: 8,
    className: previewGridClasses.container
  }, previewGridProps.container), fileObjects.map(function (fileObject, i) {
    var img = isImage(fileObject.file) ? createElement("img", {
      className: classes.smallPreviewImg,
      role: "presentation",
      src: fileObject.data
    }) : createElement(AttachFileIcon, {
      className: classes.smallPreviewImg
    });
    return createElement(Grid, _extends({
      key: i,
      item: true,
      xs: 4
    }, previewGridProps.item, {
      className: clsx(previewGridClasses.item, classes.imageContainer)
    }), img, showFileNames && createElement(Typography, {
      variant: "body1",
      component: "p"
    }, fileObject.file.name), createElement(Fab, {
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
var PreviewList$1 = withStyles(styles)(PreviewList);

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
  return createElement(SnackbarContent, _extends({
    className: clsx(classes[variant], className),
    "aria-describedby": "client-snackbar",
    message: createElement("span", {
      id: "client-snackbar",
      className: classes.message
    }, createElement(Icon, {
      className: clsx(classes.icon, classes.iconVariant)
    }), message),
    action: [createElement(IconButton, {
      key: "close",
      "aria-label": "Close",
      color: "inherit",
      className: classes.close,
      onClick: onClose
    }, createElement(CloseIcon, {
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
var SnackbarContentWrapper$1 = withStyles(styles$1)(SnackbarContentWrapper);

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
var defaultSnackbarAnchorOrigin = {
  horizontal: 'left',
  vertical: 'bottom'
};
/**
 * This components creates a Material-UI Dropzone, with previews and snackbar notifications.
 */

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
          alertSnackbarProps = _this$props5.alertSnackbarProps,
          classes = _this$props5.classes,
          disableRejectionFeedback = _this$props5.disableRejectionFeedback,
          dropzoneClass = _this$props5.dropzoneClass,
          dropzoneParagraphClass = _this$props5.dropzoneParagraphClass,
          dropzoneProps = _this$props5.dropzoneProps,
          dropzoneText = _this$props5.dropzoneText,
          filesLimit = _this$props5.filesLimit,
          inputProps = _this$props5.inputProps,
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
      return createElement(Fragment, null, createElement(Dropzone, _extends({}, dropzoneProps, {
        accept: acceptFiles,
        onDropAccepted: this.handleDropAccepted,
        onDropRejected: this.handleDropRejected,
        maxSize: maxFileSize,
        multiple: isMultiple
      }), function (_ref5) {
        var getRootProps = _ref5.getRootProps,
            getInputProps = _ref5.getInputProps,
            isDragActive = _ref5.isDragActive,
            isDragReject = _ref5.isDragReject;
        return createElement("div", _extends({}, getRootProps(), {
          className: clsx(classes.dropZone, dropzoneClass, isDragActive && classes.stripes, !disableRejectionFeedback && isDragReject && classes.rejectStripes)
        }), createElement("input", _extends({}, inputProps, getInputProps())), createElement("div", {
          className: classes.dropzoneTextStyle
        }, createElement(Typography, {
          variant: "h5",
          component: "p",
          className: clsx(classes.dropzoneParagraph, dropzoneParagraphClass)
        }, dropzoneText), createElement(CloudUploadIcon, {
          className: classes.uploadIconSize
        })), previewsInDropzoneVisible && createElement(PreviewList$1, {
          fileObjects: fileObjects,
          handleRemove: _this2.handleRemove,
          showFileNames: showFileNames,
          useChipsForPreview: useChipsForPreview,
          previewChipProps: previewChipProps,
          previewGridClasses: previewGridClasses,
          previewGridProps: previewGridProps
        }));
      }), previewsVisible && createElement(Fragment, null, createElement(Typography, {
        variant: "subtitle1",
        component: "span"
      }, previewText), createElement(PreviewList$1, {
        fileObjects: fileObjects,
        handleRemove: this.handleRemove,
        showFileNames: showFileNamesInPreview,
        useChipsForPreview: useChipsForPreview,
        previewChipProps: previewChipProps,
        previewGridClasses: previewGridClasses,
        previewGridProps: previewGridProps
      })), showAlerts && createElement(Snackbar, _extends({
        anchorOrigin: defaultSnackbarAnchorOrigin,
        autoHideDuration: 6000
      }, alertSnackbarProps, {
        open: openSnackBar,
        onClose: this.handleCloseSnackbar
      }), createElement(SnackbarContentWrapper$1, {
        onClose: this.handleCloseSnackbar,
        variant: snackbarVariant,
        message: snackbarMessage
      })));
    }
  }]);

  return DropzoneArea;
}(PureComponent);

DropzoneArea.defaultProps = {
  acceptedFiles: ['image/*', 'video/*', 'application/*'],
  filesLimit: 3,
  maxFileSize: 3000000,
  dropzoneText: 'Drag and drop a file here or click',
  previewText: 'Preview:',
  disableRejectionFeedback: false,
  showPreviews: false,
  // By default previews show up under in the dialog and inside in the standalone
  showPreviewsInDropzone: true,
  showFileNames: false,
  showFileNamesInPreview: false,
  useChipsForPreview: false,
  previewChipProps: {},
  previewGridClasses: {},
  previewGridProps: {},
  showAlerts: true,
  alertSnackbarProps: {
    anchorOrigin: {
      horizontal: 'left',
      vertical: 'bottom'
    },
    autoHideDuration: 6000
  },
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
  }
};
process.env.NODE_ENV !== "production" ? DropzoneArea.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,

  /** A list of file types to accept.
   * @see See [here](https://react-dropzone.js.org/#section-accepting-specific-file-types) for more details.
   */
  acceptedFiles: PropTypes.arrayOf(PropTypes.string),

  /** Maximum number of files that can be loaded into the dropzone. */
  filesLimit: PropTypes.number,

  /** Maximum file size (in bytes) that the dropzone will accept. */
  maxFileSize: PropTypes.number,

  /** Text inside the dropzone. */
  dropzoneText: PropTypes.string,

  /** Custom CSS class name for dropzone container. */
  dropzoneClass: PropTypes.string,

  /** Custom CSS class name for text inside the container. */
  dropzoneParagraphClass: PropTypes.string,

  /** Disable feedback effect when dropping rejected files. */
  disableRejectionFeedback: PropTypes.bool,

  /** Shows previews **BELOW** the dropzone. */
  showPreviews: PropTypes.bool,

  /** Shows preview **INSIDE** the dropzone area. */
  showPreviewsInDropzone: PropTypes.bool,

  /** Shows file name under the dropzone image. */
  showFileNames: PropTypes.bool,

  /** Shows file name under the image. */
  showFileNamesInPreview: PropTypes.bool,

  /** Uses deletable Material-UI Chip components to display file names. */
  useChipsForPreview: PropTypes.bool,

  /**
   * Props to pass to the Material-UI Chip components.<br/>Requires `useChipsForPreview` prop to be `true`.
   *
   * @see See [Material-UI Chip](https://material-ui.com/api/chip/#props) for available values.
   */
  previewChipProps: PropTypes.object,

  /**
   * Custom CSS classNames for preview Grid components.<br/>
   * Should be in the form {container: string, item: string, image: string}.
   */
  previewGridClasses: PropTypes.object,

  /**
   * Props to pass to the Material-UI Grid components.<br/>
   * Should be in the form {container: GridProps, item: GridProps}.
   *
   * @see See [Material-UI Grid](https://material-ui.com/api/grid/#props) for available GridProps values.
   */
  previewGridProps: PropTypes.object,

  /** The label for the file preview section. */
  previewText: PropTypes.string,

  /** Shows styled Material-UI Snackbar when files are dropped, deleted or rejected. */
  showAlerts: PropTypes.bool,

  /**
   * Props to pass to the Material-UI Snackbar components.<br/>Requires `showAlerts` prop to be `true`.
   *
   * @see See [Material-UI Snackbar](https://material-ui.com/api/snackbar/#props) for available values.
   */
  alertSnackbarProps: PropTypes.object,

  /**
   * Props to pass to the Dropzone component.
   *
   * @see See [Dropzone props](https://react-dropzone.js.org/#src) for available values.
   */
  dropzoneProps: PropTypes.object,

  /**
   * Attributes applied to the input element.
   *
   * @see See [MDN Input File attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Additional_attributes) for available values.
   */
  inputProps: PropTypes.object,

  /** Clear uploaded files when component is unmounted. */
  clearOnUnmount: PropTypes.bool,

  /** List of URLs of already uploaded images.<br/>**Note:** Please take care of CORS. */
  initialFiles: PropTypes.arrayOf(PropTypes.string),

  /**
   * Get alert message to display when files limit is exceed.
   *
   * *Default*: "Maximum allowed number of files exceeded. Only ${filesLimit} allowed"
   *
   * @param {number} filesLimit The `filesLimit` currently set for the component.
   */
  getFileLimitExceedMessage: PropTypes.func,

  /**
   * Get alert message to display when a new file is added.
   *
   * *Default*: "File ${fileName} successfully added."
   *
   * @param {string} fileName The newly added file name.
   */
  getFileAddedMessage: PropTypes.func,

  /**
   * Get alert message to display when a file is removed.
   *
   * *Default*: "File ${fileName} removed."
   *
   * @param {string} fileName The name of the removed file.
   */
  getFileRemovedMessage: PropTypes.func,

  /**
   * Get alert message to display when a file is rejected onDrop.
   *
   * *Default*: "File ${rejectedFile.name} was rejected."
   *
   * @param {Object} rejectedFile The file that got rejected
   * @param {string[]} acceptedFiles The `acceptedFiles` prop currently set for the component
   * @param {number} maxFileSize The `maxFileSize` prop currently set for the component
   */
  getDropRejectMessage: PropTypes.func,

  /**
   * Fired when the files inside dropzone change.
   *
   * @param {File[]} loadedFiles All the files currently loaded into the dropzone.
   */
  onChange: PropTypes.func,

  /**
   * Fired when the user drops files into the dropzone.
   *
   * @param {File[]} droppedFiles All the files dropped into the dropzone.
   */
  onDrop: PropTypes.func,

  /**
   * Fired when a file is rejected because of wrong file type, size or goes beyond the filesLimit.
   *
   * @param {File[]} rejectedFiles All the rejected files.
   */
  onDropRejected: PropTypes.func,

  /**
   * Fired when a file is deleted from the previews panel.
   *
   * @param {File} deletedFile The file that was removed.
   */
  onDelete: PropTypes.func
} : void 0;
var DropzoneArea$1 = withStyles(styles$2)(DropzoneArea);

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
/**
 * This component provides the DropzoneArea inside of a Material-UI Dialog.
 *
 * It supports all the Props and Methods from `DropzoneArea`.
 */


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
      return createElement(Fragment, null, createElement(Dialog, _extends({}, dialogProps, {
        fullWidth: fullWidth,
        maxWidth: maxWidth,
        onClose: this.handleClose,
        open: open
      }), createElement(DialogTitle, null, dialogTitle), createElement(DialogContent, null, createElement(DropzoneArea$1, _extends({}, dropzoneAreaProps, {
        onChange: this.handleChange
      }))), createElement(DialogActions, null, createElement(Button, {
        color: "primary",
        onClick: this.handleClose
      }, cancelButtonText), createElement(Button, {
        color: "primary",
        disabled: submitDisabled,
        onClick: this.handleSaveClick
      }, submitButtonText))));
    }
  }]);

  return DropzoneDialog;
}(PureComponent);

DropzoneDialog.defaultProps = _extends({}, DropzoneArea$1.defaultProps, {
  open: false,
  dialogTitle: 'Upload file',
  dialogProps: {},
  fullWidth: true,
  maxWidth: 'sm',
  cancelButtonText: 'Cancel',
  submitButtonText: 'Submit',
  showPreviews: true,
  showPreviewsInDropzone: false,
  showFileNamesInPreview: true
});
process.env.NODE_ENV !== "production" ? DropzoneDialog.propTypes = _extends({}, DropzoneArea$1.propTypes, {
  /** Sets whether the dialog is open or closed. */
  open: PropTypes.bool,

  /** The Dialog title. */
  dialogTitle: PropTypes.string,

  /**
   * Props to pass to the Material-UI Dialog components.
   * @see See [Material-UI Dialog](https://material-ui.com/api/dialog/#props) for available values.
   */
  dialogProps: PropTypes.object,

  /**
   * If `true`, the dialog stretches to `maxWidth`.<br/>
   * Notice that the dialog width grow is limited by the default margin.
   */
  fullWidth: PropTypes.bool,

  /**
   * Determine the max-width of the dialog. The dialog width grows with the size of the screen.<br/>
   * Set to `false` to disable `maxWidth`.
   */
  maxWidth: PropTypes.string,

  /** Cancel button text in dialog. */
  cancelButtonText: PropTypes.string,

  /** Submit button text in dialog. */
  submitButtonText: PropTypes.string,

  /**
   * Fired when the modal is closed
   *
   * @param {SyntheticEvent} event The react `SyntheticEvent`
   */
  onClose: PropTypes.func,

  /**
   * Fired when the user clicks the Submit button.
   *
   * @param {File[]} files All the files currently inside the Dropzone.
   */
  onSave: PropTypes.func,

  /**
   * Shows previews **BELOW** the dropzone.<br/>
   * **Note:** By default previews show up under in the Dialog and inside in the standalone.
   */
  showPreviews: PropTypes.bool,

  /** Shows preview **INSIDE** the dropzone area. */
  showPreviewsInDropzone: PropTypes.bool,

  /** Shows file name under the image. */
  showFileNamesInPreview: PropTypes.bool
}) : void 0;

export { DropzoneArea$1 as DropzoneArea, DropzoneDialog };
//# sourceMappingURL=index.es.js.map
