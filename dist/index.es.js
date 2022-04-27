import _extends from '@babel/runtime/helpers/extends';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _inherits from '@babel/runtime/helpers/inherits';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import PropTypes from 'prop-types';
import { createElement, Fragment, PureComponent } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import { withStyles } from '@mui/styles';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import clsx from 'clsx';
import Dropzone from 'react-dropzone';
import Chip from '@mui/material/Chip';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import SnackbarContent from '@mui/material/SnackbarContent';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function isImage(file) {
  if (file.type.split('/')[0] === 'image') {
    return true;
  }
}
function convertBytesToMbsOrKbs(filesize) {
  var size = '';

  if (filesize >= 1048576) {
    size = filesize / 1048576 + ' megabytes';
  } else if (filesize >= 1024) {
    size = filesize / 1024 + ' kilobytes';
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
    var response, data, metadata, filename;
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
            return _context.abrupt("return", new File([data], filename, metadata));

          case 9:
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

var styles = function styles(_ref) {
  var palette = _ref.palette,
      shape = _ref.shape,
      spacing = _ref.spacing;
  return {
    root: {},
    imageContainer: {
      position: 'relative',
      zIndex: 10,
      textAlign: 'center',
      '&:hover $image': {
        opacity: 0.3
      },
      '&:hover $removeButton': {
        opacity: 1
      }
    },
    image: {
      height: 100,
      width: 'initial',
      maxWidth: '100%',
      color: palette.text.primary,
      transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
      boxSizing: 'border-box',
      boxShadow: 'rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px',
      borderRadius: shape.borderRadius,
      zIndex: 5,
      opacity: 1
    },
    removeButton: {
      transition: '.5s ease',
      position: 'absolute',
      opacity: 0,
      top: spacing(-1),
      right: spacing(-1),
      width: 40,
      height: 40,
      '&:focus': {
        opacity: 1
      }
    }
  };
};

var _ref3 = /*#__PURE__*/createElement(DeleteIcon, null);

function PreviewList(_ref2) {
  var fileObjects = _ref2.fileObjects,
      handleRemove = _ref2.handleRemove,
      showFileNames = _ref2.showFileNames,
      useChipsForPreview = _ref2.useChipsForPreview,
      previewChipProps = _ref2.previewChipProps,
      previewGridClasses = _ref2.previewGridClasses,
      previewGridProps = _ref2.previewGridProps,
      classes = _ref2.classes,
      getPreviewIcon = _ref2.getPreviewIcon;

  if (useChipsForPreview) {
    return /*#__PURE__*/createElement(Grid, _extends({
      spacing: 1,
      direction: "row"
    }, previewGridProps.container, {
      container: true,
      className: clsx(classes.root, previewGridClasses.container)
    }), fileObjects.map(function (fileObject, i) {
      var _fileObject$file$name, _fileObject$file;

      return /*#__PURE__*/createElement(Grid, _extends({}, previewGridProps.item, {
        item: true,
        key: "".concat((_fileObject$file$name = (_fileObject$file = fileObject.file) === null || _fileObject$file === void 0 ? void 0 : _fileObject$file.name) !== null && _fileObject$file$name !== void 0 ? _fileObject$file$name : 'file', "-").concat(i),
        className: classes.imageContainer
      }), /*#__PURE__*/createElement(Chip, _extends({
        variant: "outlined"
      }, previewChipProps, {
        label: fileObject.file.name,
        onDelete: handleRemove(i)
      })));
    }));
  }

  return /*#__PURE__*/createElement(Grid, _extends({
    spacing: 8
  }, previewGridProps.container, {
    container: true,
    className: clsx(classes.root, previewGridClasses.container)
  }), fileObjects.map(function (fileObject, i) {
    var _fileObject$file$name2, _fileObject$file2;

    return /*#__PURE__*/createElement(Grid, _extends({
      xs: 4
    }, previewGridProps.item, {
      item: true,
      key: "".concat((_fileObject$file$name2 = (_fileObject$file2 = fileObject.file) === null || _fileObject$file2 === void 0 ? void 0 : _fileObject$file2.name) !== null && _fileObject$file$name2 !== void 0 ? _fileObject$file$name2 : 'file', "-").concat(i),
      className: clsx(classes.imageContainer, previewGridClasses.item)
    }), getPreviewIcon(fileObject, classes), showFileNames && /*#__PURE__*/createElement(Typography, {
      variant: "body1",
      component: "p"
    }, fileObject.file.name), /*#__PURE__*/createElement(Fab, {
      onClick: handleRemove(i),
      "aria-label": "Delete",
      className: classes.removeButton
    }, _ref3));
  }));
}

process.env.NODE_ENV !== "production" ? PreviewList.propTypes = {
  classes: PropTypes.object.isRequired,
  fileObjects: PropTypes.arrayOf(PropTypes.object).isRequired,
  getPreviewIcon: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  previewChipProps: PropTypes.object,
  previewGridClasses: PropTypes.object,
  previewGridProps: PropTypes.object,
  showFileNames: PropTypes.bool,
  useChipsForPreview: PropTypes.bool
} : void 0;
var PreviewList$1 = withStyles(styles, {
  name: 'MuiDropzonePreviewList'
})(PreviewList);

var variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

var styles$1 = function styles(theme) {
  return {
    successAlert: {
      backgroundColor: theme.palette.success.main
    },
    errorAlert: {
      backgroundColor: theme.palette.error.main
    },
    infoAlert: {
      backgroundColor: theme.palette.info.main
    },
    warningAlert: {
      backgroundColor: theme.palette.warning.main
    },
    message: {
      display: 'flex',
      alignItems: 'center',
      '& > svg': {
        marginRight: theme.spacing(1)
      }
    },
    icon: {
      fontSize: 20,
      opacity: 0.9
    },
    closeButton: {}
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
  return /*#__PURE__*/createElement(SnackbarContent, _extends({
    className: clsx(classes["".concat(variant, "Alert")], className),
    "aria-describedby": "client-snackbar",
    message: /*#__PURE__*/createElement("span", {
      id: "client-snackbar",
      className: classes.message
    }, /*#__PURE__*/createElement(Icon, {
      className: classes.icon
    }), message),
    action: [/*#__PURE__*/createElement(IconButton, {
      key: "close",
      "aria-label": "Close",
      color: "inherit",
      className: classes.closeButton,
      onClick: onClose
    }, /*#__PURE__*/createElement(CloseIcon, {
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
var SnackbarContentWrapper$1 = withStyles(styles$1, {
  name: 'MuiDropzoneSnackbar'
})(SnackbarContentWrapper);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var styles$2 = function styles(_ref) {
  var palette = _ref.palette,
      shape = _ref.shape,
      spacing = _ref.spacing;
  return {
    '@keyframes progress': {
      '0%': {
        backgroundPosition: '0 0'
      },
      '100%': {
        backgroundPosition: '-70px 0'
      }
    },
    root: {
      position: 'relative',
      width: '100%',
      minHeight: '250px',
      backgroundColor: palette.background.paper,
      border: 'dashed',
      borderColor: palette.divider,
      borderRadius: shape.borderRadius,
      boxSizing: 'border-box',
      cursor: 'pointer',
      overflow: 'hidden'
    },
    active: {
      animation: '$progress 2s linear infinite !important',
      // eslint-disable-next-line max-len
      backgroundImage: "repeating-linear-gradient(-45deg, ".concat(palette.background.paper, ", ").concat(palette.background.paper, " 25px, ").concat(palette.divider, " 25px, ").concat(palette.divider, " 50px)"),
      backgroundSize: '150% 100%',
      border: 'solid',
      borderColor: palette.primary.light
    },
    invalid: {
      // eslint-disable-next-line max-len
      backgroundImage: "repeating-linear-gradient(-45deg, ".concat(palette.error.light, ", ").concat(palette.error.light, " 25px, ").concat(palette.error.dark, " 25px, ").concat(palette.error.dark, " 50px)"),
      borderColor: palette.error.main
    },
    textContainer: {
      textAlign: 'center'
    },
    text: {
      marginBottom: spacing(3),
      marginTop: spacing(3)
    },
    icon: {
      width: 51,
      height: 51,
      color: palette.text.primary
    }
  };
};

var defaultSnackbarAnchorOrigin = {
  horizontal: 'left',
  vertical: 'bottom'
};

var defaultGetPreviewIcon = function defaultGetPreviewIcon(fileObject, classes) {
  if (isImage(fileObject.file)) {
    return /*#__PURE__*/createElement("img", {
      className: classes.image,
      role: "presentation",
      src: fileObject.data
    });
  }

  return /*#__PURE__*/createElement(AttachFileIcon, {
    className: classes.image
  });
};
/**
 * This components creates a Material-UI Dropzone, with previews and snackbar notifications.
 */


var DropzoneAreaBase = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(DropzoneAreaBase, _React$PureComponent);

  var _super = _createSuper(DropzoneAreaBase);

  function DropzoneAreaBase() {
    var _this;

    _classCallCheck(this, DropzoneAreaBase);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      openSnackBar: false,
      snackbarMessage: '',
      snackbarVariant: 'success'
    };

    _this.handleDropAccepted = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(acceptedFiles, evt) {
        var _this$props, fileObjects, filesLimit, getFileAddedMessage, getFileLimitExceedMessage, onAdd, onDrop, fileObjs, message;

        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$props = _this.props, fileObjects = _this$props.fileObjects, filesLimit = _this$props.filesLimit, getFileAddedMessage = _this$props.getFileAddedMessage, getFileLimitExceedMessage = _this$props.getFileLimitExceedMessage, onAdd = _this$props.onAdd, onDrop = _this$props.onDrop;

                if (!(filesLimit > 1 && fileObjects.length + acceptedFiles.length > filesLimit)) {
                  _context2.next = 4;
                  break;
                }

                _this.setState({
                  openSnackBar: true,
                  snackbarMessage: getFileLimitExceedMessage(filesLimit),
                  snackbarVariant: 'error'
                }, _this.notifyAlert);

                return _context2.abrupt("return");

              case 4:
                // Notify Drop event
                if (onDrop) {
                  onDrop(acceptedFiles, evt);
                } // Retrieve fileObjects data


                _context2.next = 7;
                return Promise.all(acceptedFiles.map( /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(file) {
                    var data;
                    return _regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return readFile(file);

                          case 2:
                            data = _context.sent;
                            return _context.abrupt("return", {
                              file: file,
                              data: data
                            });

                          case 4:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x3) {
                    return _ref3.apply(this, arguments);
                  };
                }()));

              case 7:
                fileObjs = _context2.sent;

                // Notify added files
                if (onAdd) {
                  onAdd(fileObjs);
                } // Display message


                message = fileObjs.reduce(function (msg, fileObj) {
                  return msg + getFileAddedMessage(fileObj.file.name);
                }, '');

                _this.setState({
                  openSnackBar: true,
                  snackbarMessage: message,
                  snackbarVariant: 'success'
                }, _this.notifyAlert);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.handleDropRejected = function (rejectedFiles, evt) {
      var _this$props2 = _this.props,
          acceptedFiles = _this$props2.acceptedFiles,
          filesLimit = _this$props2.filesLimit,
          fileObjects = _this$props2.fileObjects,
          getDropRejectMessage = _this$props2.getDropRejectMessage,
          getFileLimitExceedMessage = _this$props2.getFileLimitExceedMessage,
          maxFileSize = _this$props2.maxFileSize,
          onDropRejected = _this$props2.onDropRejected;
      var message = '';

      if (fileObjects.length + rejectedFiles.length > filesLimit) {
        message = getFileLimitExceedMessage(filesLimit);
      } else {
        rejectedFiles.forEach(function (rejectedFile) {
          message = getDropRejectMessage(rejectedFile, acceptedFiles, maxFileSize);
        });
      }

      if (onDropRejected) {
        onDropRejected(rejectedFiles, evt);
      }

      _this.setState({
        openSnackBar: true,
        snackbarMessage: message,
        snackbarVariant: 'error'
      }, _this.notifyAlert);
    };

    _this.handleRemove = function (fileIndex) {
      return function (event) {
        event.stopPropagation();
        var _this$props3 = _this.props,
            fileObjects = _this$props3.fileObjects,
            getFileRemovedMessage = _this$props3.getFileRemovedMessage,
            onDelete = _this$props3.onDelete; // Find removed fileObject

        var removedFileObj = fileObjects[fileIndex]; // Notify removed file

        if (onDelete) {
          onDelete(removedFileObj, fileIndex);
        }

        _this.setState({
          openSnackBar: true,
          snackbarMessage: getFileRemovedMessage(removedFileObj.file.name),
          snackbarVariant: 'info'
        }, _this.notifyAlert);
      };
    };

    _this.handleCloseSnackbar = function () {
      _this.setState({
        openSnackBar: false
      });
    };

    return _this;
  }

  _createClass(DropzoneAreaBase, [{
    key: "notifyAlert",
    value: function notifyAlert() {
      var onAlert = this.props.onAlert;
      var _this$state = this.state,
          openSnackBar = _this$state.openSnackBar,
          snackbarMessage = _this$state.snackbarMessage,
          snackbarVariant = _this$state.snackbarVariant;

      if (openSnackBar && onAlert) {
        onAlert(snackbarMessage, snackbarVariant);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          acceptedFiles = _this$props4.acceptedFiles,
          alertSnackbarProps = _this$props4.alertSnackbarProps,
          classes = _this$props4.classes,
          disableRejectionFeedback = _this$props4.disableRejectionFeedback,
          dropzoneClass = _this$props4.dropzoneClass,
          dropzoneParagraphClass = _this$props4.dropzoneParagraphClass,
          dropzoneProps = _this$props4.dropzoneProps,
          dropzoneText = _this$props4.dropzoneText,
          fileObjects = _this$props4.fileObjects,
          filesLimit = _this$props4.filesLimit,
          getPreviewIcon = _this$props4.getPreviewIcon,
          Icon = _this$props4.Icon,
          inputProps = _this$props4.inputProps,
          maxFileSize = _this$props4.maxFileSize,
          previewChipProps = _this$props4.previewChipProps,
          previewGridClasses = _this$props4.previewGridClasses,
          previewGridProps = _this$props4.previewGridProps,
          previewText = _this$props4.previewText,
          showAlerts = _this$props4.showAlerts,
          showFileNames = _this$props4.showFileNames,
          showFileNamesInPreview = _this$props4.showFileNamesInPreview,
          showPreviews = _this$props4.showPreviews,
          showPreviewsInDropzone = _this$props4.showPreviewsInDropzone,
          useChipsForPreview = _this$props4.useChipsForPreview;
      var _this$state2 = this.state,
          openSnackBar = _this$state2.openSnackBar,
          snackbarMessage = _this$state2.snackbarMessage,
          snackbarVariant = _this$state2.snackbarVariant;
      var acceptFiles = acceptedFiles === null || acceptedFiles === void 0 ? void 0 : acceptedFiles.join(',');
      var isMultiple = filesLimit > 1;
      var previewsVisible = showPreviews && fileObjects.length > 0;
      var previewsInDropzoneVisible = showPreviewsInDropzone && fileObjects.length > 0;
      return /*#__PURE__*/createElement(Fragment, null, /*#__PURE__*/createElement(Dropzone, _extends({}, dropzoneProps, {
        accept: acceptFiles,
        onDropAccepted: this.handleDropAccepted,
        onDropRejected: this.handleDropRejected,
        maxSize: maxFileSize,
        multiple: isMultiple
      }), function (_ref4) {
        var getRootProps = _ref4.getRootProps,
            getInputProps = _ref4.getInputProps,
            isDragActive = _ref4.isDragActive,
            isDragReject = _ref4.isDragReject;
        return /*#__PURE__*/createElement("div", getRootProps({
          className: clsx(classes.root, dropzoneClass, isDragActive && classes.active, !disableRejectionFeedback && isDragReject && classes.invalid)
        }), /*#__PURE__*/createElement("input", getInputProps(inputProps)), /*#__PURE__*/createElement("div", {
          className: classes.textContainer
        }, /*#__PURE__*/createElement(Typography, {
          variant: "h5",
          component: "p",
          className: clsx(classes.text, dropzoneParagraphClass)
        }, dropzoneText), Icon ? /*#__PURE__*/createElement(Icon, {
          className: classes.icon
        }) : /*#__PURE__*/createElement(CloudUploadIcon, {
          className: classes.icon
        })), previewsInDropzoneVisible && /*#__PURE__*/createElement(PreviewList$1, {
          fileObjects: fileObjects,
          handleRemove: _this2.handleRemove,
          getPreviewIcon: getPreviewIcon,
          showFileNames: showFileNames,
          useChipsForPreview: useChipsForPreview,
          previewChipProps: previewChipProps,
          previewGridClasses: previewGridClasses,
          previewGridProps: previewGridProps
        }));
      }), previewsVisible && /*#__PURE__*/createElement(Fragment, null, /*#__PURE__*/createElement(Typography, {
        variant: "subtitle1",
        component: "span"
      }, previewText), /*#__PURE__*/createElement(PreviewList$1, {
        fileObjects: fileObjects,
        handleRemove: this.handleRemove,
        getPreviewIcon: getPreviewIcon,
        showFileNames: showFileNamesInPreview,
        useChipsForPreview: useChipsForPreview,
        previewChipProps: previewChipProps,
        previewGridClasses: previewGridClasses,
        previewGridProps: previewGridProps
      })), (typeof showAlerts === 'boolean' && showAlerts || Array.isArray(showAlerts) && showAlerts.includes(snackbarVariant)) && /*#__PURE__*/createElement(Snackbar, _extends({
        anchorOrigin: defaultSnackbarAnchorOrigin,
        autoHideDuration: 6000
      }, alertSnackbarProps, {
        open: openSnackBar,
        onClose: this.handleCloseSnackbar
      }), /*#__PURE__*/createElement(SnackbarContentWrapper$1, {
        onClose: this.handleCloseSnackbar,
        variant: snackbarVariant,
        message: snackbarMessage
      })));
    }
  }]);

  return DropzoneAreaBase;
}(PureComponent);

DropzoneAreaBase.defaultProps = {
  acceptedFiles: [],
  filesLimit: 3,
  fileObjects: [],
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
  getFileLimitExceedMessage: function getFileLimitExceedMessage(filesLimit) {
    return "Maximum allowed number of files exceeded. Only ".concat(filesLimit, " allowed");
  },
  getFileAddedMessage: function getFileAddedMessage(fileName) {
    return "File ".concat(fileName, " successfully added.");
  },
  getPreviewIcon: defaultGetPreviewIcon,
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
var FileObjectShape = PropTypes.shape({
  file: PropTypes.object,
  data: PropTypes.any
});
process.env.NODE_ENV !== "production" ? DropzoneAreaBase.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,

  /** A list of file types to accept.
   * @see See [here](https://react-dropzone.js.org/#section-accepting-specific-file-types) for more details.
   */
  acceptedFiles: PropTypes.arrayOf(PropTypes.string),

  /** Maximum number of files that can be loaded into the dropzone. */
  filesLimit: PropTypes.number,

  /** Icon to be displayed inside the dropzone area. */
  Icon: PropTypes.elementType,

  /** Currently loaded files. */
  fileObjects: PropTypes.arrayOf(FileObjectShape),

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

  /**
   * Shows styled Material-UI Snackbar when files are dropped, deleted or rejected.
   *
   * - can be a boolean ("global" `true` or `false` for all alerts).
   * - can be an array, with values 'error', 'info', 'success' to select to view only certain alerts:
   *  - showAlerts={['error']} for only errors.
   *  - showAlerts={['error', 'info']} for both errors and info.
   *  - showAlerts={['error', 'success', 'info']} is same as showAlerts={true}.
   *  - showAlerts={[]} is same as showAlerts={false}.
   */
  showAlerts: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.oneOf(['error', 'success', 'info']))]),

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
   * A function which determines which icon to display for a file preview.
   *
   * *Default*: If its an image then displays a preview the image, otherwise it will display an attachment icon
   *
   * @param {FileObject} objectFile The file which the preview will belong to
   * @param {Object} classes The classes for the file preview icon, in the default case we use the 'image' className.
   */
  getPreviewIcon: PropTypes.func,

  /**
   * Fired when new files are added to dropzone.
   *
   * @param {FileObject[]} newFiles The new files added to the dropzone.
   */
  onAdd: PropTypes.func,

  /**
   * Fired when a file is deleted from the previews panel.
   *
   * @param {FileObject} deletedFileObject The file that was removed.
   * @param {number} index The index of the removed file object.
   */
  onDelete: PropTypes.func,

  /**
   * Fired when the user drops files into the dropzone.
   *
   * @param {File[]} droppedFiles All the files dropped into the dropzone.
   * @param {Event} event The react-dropzone drop event.
   */
  onDrop: PropTypes.func,

  /**
   * Fired when a file is rejected because of wrong file type, size or goes beyond the filesLimit.
   *
   * @param {File[]} rejectedFiles All the rejected files.
   * @param {Event} event The react-dropzone drop event.
   */
  onDropRejected: PropTypes.func,

  /**
   * Fired when an alert is triggered.
   *
   * @param {string} message Alert message.
   * @param {string} variant One of "error", "info", "success".
   */
  onAlert: PropTypes.func
} : void 0;
var DropzoneAreaBase$1 = withStyles(styles$2, {
  name: 'MuiDropzoneArea'
})(DropzoneAreaBase);

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var splitDropzoneAreaProps = function splitDropzoneAreaProps(props) {
  var clearOnUnmount = props.clearOnUnmount,
      initialFiles = props.initialFiles,
      onChange = props.onChange,
      onDelete = props.onDelete,
      dropzoneAreaProps = _objectWithoutProperties(props, ["clearOnUnmount", "initialFiles", "onChange", "onDelete"]);

  return [{
    clearOnUnmount: clearOnUnmount,
    initialFiles: initialFiles,
    onChange: onChange,
    onDelete: onDelete
  }, dropzoneAreaProps];
};
/**
 * This components creates an uncontrolled Material-UI Dropzone, with previews and snackbar notifications.
 *
 * It supports all props of `DropzoneAreaBase` but keeps the files state internally.
 *
 * **Note** To listen to file changes use `onChange` event handler and notice that `onDelete` returns a `File` instance instead of `FileObject`.
 */


var DropzoneArea = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(DropzoneArea, _React$PureComponent);

  var _super = _createSuper$1(DropzoneArea);

  function DropzoneArea() {
    var _this;

    _classCallCheck(this, DropzoneArea);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      fileObjects: []
    };

    _this.notifyFileChange = function () {
      var onChange = _this.props.onChange;
      var fileObjects = _this.state.fileObjects;

      if (onChange) {
        onChange(fileObjects.map(function (fileObject) {
          return fileObject.file;
        }));
      }
    };

    _this.loadInitialFiles = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var initialFiles, fileObjs;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              initialFiles = _this.props.initialFiles;
              _context2.prev = 1;
              _context2.next = 4;
              return Promise.all(initialFiles.map( /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(initialFile) {
                  var file, data;
                  return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!(typeof initialFile === 'string')) {
                            _context.next = 6;
                            break;
                          }

                          _context.next = 3;
                          return createFileFromUrl(initialFile);

                        case 3:
                          file = _context.sent;
                          _context.next = 7;
                          break;

                        case 6:
                          file = initialFile;

                        case 7:
                          _context.next = 9;
                          return readFile(file);

                        case 9:
                          data = _context.sent;
                          return _context.abrupt("return", {
                            file: file,
                            data: data
                          });

                        case 11:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x) {
                  return _ref2.apply(this, arguments);
                };
              }()));

            case 4:
              fileObjs = _context2.sent;

              _this.setState(function (state) {
                return {
                  fileObjects: [].concat(state.fileObjects, fileObjs)
                };
              }, _this.notifyFileChange);

              _context2.next = 11;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](1);
              console.log(_context2.t0);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 8]]);
    }));

    _this.addFiles = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(newFileObjects) {
        var filesLimit;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                filesLimit = _this.props.filesLimit; // Update component state

                _this.setState(function (state) {
                  // Handle a single file
                  if (filesLimit <= 1) {
                    return {
                      fileObjects: [].concat(newFileObjects[0])
                    };
                  } // Handle multiple files


                  return {
                    fileObjects: [].concat(state.fileObjects, newFileObjects)
                  };
                }, _this.notifyFileChange);

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }();

    _this.deleteFile = function (removedFileObj, removedFileObjIdx) {
      event.stopPropagation();
      var onDelete = _this.props.onDelete;
      var fileObjects = _this.state.fileObjects; // Calculate remaining fileObjects array

      var remainingFileObjs = fileObjects.filter(function (fileObject, i) {
        return i !== removedFileObjIdx;
      }); // Notify removed file

      if (onDelete) {
        onDelete(removedFileObj.file);
      } // Update local state


      _this.setState({
        fileObjects: remainingFileObjs
      }, _this.notifyFileChange);
    };

    return _this;
  }

  _createClass(DropzoneArea, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadInitialFiles();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var clearOnUnmount = this.props.clearOnUnmount;

      if (clearOnUnmount) {
        this.setState({
          fileObjects: []
        }, this.notifyFileChange);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _splitDropzoneAreaPro = splitDropzoneAreaProps(this.props),
          _splitDropzoneAreaPro2 = _slicedToArray(_splitDropzoneAreaPro, 2),
          dropzoneAreaProps = _splitDropzoneAreaPro2[1];

      var fileObjects = this.state.fileObjects;
      return /*#__PURE__*/createElement(DropzoneAreaBase$1, _extends({}, dropzoneAreaProps, {
        fileObjects: fileObjects,
        onAdd: this.addFiles,
        onDelete: this.deleteFile
      }));
    }
  }]);

  return DropzoneArea;
}(PureComponent);

DropzoneArea.defaultProps = {
  clearOnUnmount: true,
  filesLimit: 3,
  initialFiles: []
};
process.env.NODE_ENV !== "production" ? DropzoneArea.propTypes = _extends({}, DropzoneAreaBase$1.propTypes, {
  /** Clear uploaded files when component is unmounted. */
  clearOnUnmount: PropTypes.bool,

  /** List containing File objects or URL strings.<br/>
   * **Note:** Please take care of CORS.
  */
  initialFiles: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.any])),

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
   */
  onDelete: PropTypes.func
}) : void 0;

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

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
 * It supports all the Props and Methods from `DropzoneAreaBase`.
 */


var DropzoneDialogBase = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(DropzoneDialogBase, _React$PureComponent);

  var _super = _createSuper$2(DropzoneDialogBase);

  function DropzoneDialogBase() {
    _classCallCheck(this, DropzoneDialogBase);

    return _super.apply(this, arguments);
  }

  _createClass(DropzoneDialogBase, [{
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
          onClose = dropzoneDialogProps.onClose,
          onSave = dropzoneDialogProps.onSave,
          open = dropzoneDialogProps.open,
          submitButtonText = dropzoneDialogProps.submitButtonText; // Submit button state

      var submitDisabled = dropzoneAreaProps.fileObjects.length === 0;
      return /*#__PURE__*/createElement(Dialog, _extends({}, dialogProps, {
        fullWidth: fullWidth,
        maxWidth: maxWidth,
        onClose: onClose,
        open: open
      }), /*#__PURE__*/createElement(DialogTitle, null, dialogTitle), /*#__PURE__*/createElement(DialogContent, null, /*#__PURE__*/createElement(DropzoneAreaBase$1, dropzoneAreaProps)), /*#__PURE__*/createElement(DialogActions, null, /*#__PURE__*/createElement(Button, {
        color: "primary",
        onClick: onClose
      }, cancelButtonText), /*#__PURE__*/createElement(Button, {
        color: "primary",
        disabled: submitDisabled,
        onClick: onSave
      }, submitButtonText)));
    }
  }]);

  return DropzoneDialogBase;
}(PureComponent);

DropzoneDialogBase.defaultProps = {
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
};
process.env.NODE_ENV !== "production" ? DropzoneDialogBase.propTypes = _extends({}, DropzoneAreaBase$1.propTypes, {
  /** Sets whether the dialog is open or closed. */
  open: PropTypes.bool,

  /** The Dialog title. */
  dialogTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

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
   * Fired when the modal is closed.
   *
   * @param {SyntheticEvent} event The react `SyntheticEvent`
   */
  onClose: PropTypes.func,

  /**
   * Fired when the user clicks the Submit button.
   *
   * @param {SyntheticEvent} event The react `SyntheticEvent`
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

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * This component provides an uncontrolled version of the DropzoneDialogBase component.
 *
 * It supports all the Props and Methods from `DropzoneDialogBase` but keeps the files state internally.
 *
 * **Note** The `onSave` handler also returns `File[]` with all the accepted files.
 */

var DropzoneDialog = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(DropzoneDialog, _React$PureComponent);

  var _super = _createSuper$3(DropzoneDialog);

  function DropzoneDialog() {
    var _this;

    _classCallCheck(this, DropzoneDialog);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      fileObjects: []
    };

    _this.notifyFileChange = function () {
      var onChange = _this.props.onChange;
      var fileObjects = _this.state.fileObjects;

      if (onChange) {
        onChange(fileObjects.map(function (fileObject) {
          return fileObject.file;
        }));
      }
    };

    _this.loadInitialFiles = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var initialFiles, fileObjs;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              initialFiles = _this.props.initialFiles;
              _context2.prev = 1;
              _context2.next = 4;
              return Promise.all(initialFiles.map( /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(initialFile) {
                  var file, data;
                  return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!(typeof initialFile === 'string')) {
                            _context.next = 6;
                            break;
                          }

                          _context.next = 3;
                          return createFileFromUrl(initialFile);

                        case 3:
                          file = _context.sent;
                          _context.next = 7;
                          break;

                        case 6:
                          file = initialFile;

                        case 7:
                          _context.next = 9;
                          return readFile(file);

                        case 9:
                          data = _context.sent;
                          return _context.abrupt("return", {
                            file: file,
                            data: data
                          });

                        case 11:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x) {
                  return _ref2.apply(this, arguments);
                };
              }()));

            case 4:
              fileObjs = _context2.sent;

              _this.setState(function (state) {
                return {
                  fileObjects: [].concat(state.fileObjects, fileObjs)
                };
              }, _this.notifyFileChange);

              _context2.next = 11;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](1);
              console.log(_context2.t0);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 8]]);
    }));

    _this.addFiles = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(newFileObjects) {
        var filesLimit;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                filesLimit = _this.props.filesLimit; // Update component state

                _this.setState(function (state) {
                  // Handle a single file
                  if (filesLimit <= 1) {
                    return {
                      fileObjects: [].concat(newFileObjects[0])
                    };
                  } // Handle multiple files


                  return {
                    fileObjects: [].concat(state.fileObjects, newFileObjects)
                  };
                }, _this.notifyFileChange);

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }();

    _this.deleteFile = function (removedFileObj, removedFileObjIdx) {
      event.stopPropagation();
      var onDelete = _this.props.onDelete;
      var fileObjects = _this.state.fileObjects; // Calculate remaining fileObjects array

      var remainingFileObjs = fileObjects.filter(function (fileObject, i) {
        return i !== removedFileObjIdx;
      }); // Notify removed file

      if (onDelete) {
        onDelete(removedFileObj.file);
      } // Update local state


      _this.setState({
        fileObjects: remainingFileObjs
      }, _this.notifyFileChange);
    };

    _this.handleClose = function (evt) {
      var _this$props = _this.props,
          clearOnUnmount = _this$props.clearOnUnmount,
          onClose = _this$props.onClose;

      if (onClose) {
        onClose(evt);
      }

      if (clearOnUnmount) {
        _this.setState({
          fileObjects: []
        }, _this.notifyFileChange);
      }
    };

    _this.handleSave = function (evt) {
      var _this$props2 = _this.props,
          clearOnUnmount = _this$props2.clearOnUnmount,
          onSave = _this$props2.onSave;
      var fileObjects = _this.state.fileObjects;

      if (onSave) {
        onSave(fileObjects.map(function (fileObject) {
          return fileObject.file;
        }), evt);
      }

      if (clearOnUnmount) {
        _this.setState({
          fileObjects: []
        }, _this.notifyFileChange);
      }
    };

    return _this;
  }

  _createClass(DropzoneDialog, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadInitialFiles();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var clearOnUnmount = this.props.clearOnUnmount;

      if (clearOnUnmount) {
        this.setState({
          fileObjects: []
        }, this.notifyFileChange);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var fileObjects = this.state.fileObjects;
      return /*#__PURE__*/createElement(DropzoneDialogBase, _extends({}, this.props, {
        fileObjects: fileObjects,
        onAdd: this.addFiles,
        onDelete: this.deleteFile,
        onClose: this.handleClose,
        onSave: this.handleSave
      }));
    }
  }]);

  return DropzoneDialog;
}(PureComponent);

DropzoneDialog.defaultProps = {
  clearOnUnmount: true,
  filesLimit: 3,
  initialFiles: []
};
process.env.NODE_ENV !== "production" ? DropzoneDialog.propTypes = _extends({}, DropzoneDialogBase.propTypes, {
  /** Clear uploaded files when component is unmounted. */
  clearOnUnmount: PropTypes.bool,

  /** Maximum number of files that can be loaded into the dropzone. */
  filesLimit: PropTypes.number,

  /** List containing File objects or URL strings.<br/>
   * **Note:** Please take care of CORS.
  */
  initialFiles: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.any])),

  /**
   * Fired when the user clicks the Submit button.
   *
   * @param {File[]} files All the files currently inside the Dropzone.
   * @param {SyntheticEvent} event The react `SyntheticEvent`.
   */
  onSave: PropTypes.func
}) : void 0;

export { DropzoneArea, DropzoneAreaBase$1 as DropzoneAreaBase, DropzoneDialog, DropzoneDialogBase };
//# sourceMappingURL=index.es.js.map
