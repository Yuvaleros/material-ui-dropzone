'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var Button = _interopDefault(require('@material-ui/core/Button'));
var CheckCircleIcon = _interopDefault(require('@material-ui/icons/CheckCircle'));
var ErrorIcon = _interopDefault(require('@material-ui/icons/Error'));
var InfoIcon = _interopDefault(require('@material-ui/icons/Info'));
var CloseIcon = _interopDefault(require('@material-ui/icons/Close'));
var green = _interopDefault(require('@material-ui/core/colors/green'));
var amber = _interopDefault(require('@material-ui/core/colors/amber'));
var IconButton = _interopDefault(require('@material-ui/core/IconButton'));
var Snackbar = _interopDefault(require('@material-ui/core/Snackbar'));
var SnackbarContent = _interopDefault(require('@material-ui/core/SnackbarContent'));
var WarningIcon = _interopDefault(require('@material-ui/icons/Warning'));
var styles = require('@material-ui/core/styles');
var Grid = _interopDefault(require('@material-ui/core/Grid'));
var DeleteIcon = _interopDefault(require('@material-ui/icons/Delete'));
var AttachFileIcon = _interopDefault(require('@material-ui/icons/AttachFile'));
var Fab = _interopDefault(require('@material-ui/core/Fab'));
var CloudUploadIcon = _interopDefault(require('@material-ui/icons/CloudUpload'));
var Dialog = _interopDefault(require('@material-ui/core/Dialog'));
var DialogContent = _interopDefault(require('@material-ui/core/DialogContent'));
var DialogActions = _interopDefault(require('@material-ui/core/DialogActions'));
var DialogTitle = _interopDefault(require('@material-ui/core/DialogTitle'));

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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

var _typeof$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

var accepts = require('attr-accept');

var supportMultiple = typeof document !== 'undefined' && document && document.createElement ? 'multiple' in document.createElement('input') : true;

function getDataTransferItems(event) {
  var dataTransferItemsList = [];
  if (event.dataTransfer) {
    var dt = event.dataTransfer;

    // NOTE: Only the 'drop' event has access to DataTransfer.files,
    // otherwise it will always be empty
    if (dt.files && dt.files.length) {
      dataTransferItemsList = dt.files;
    } else if (dt.items && dt.items.length) {
      // During the drag even the dataTransfer.files is null
      // but Chrome implements some drag store, which is accesible via dataTransfer.items
      dataTransferItemsList = dt.items;
    }
  } else if (event.target && event.target.files) {
    dataTransferItemsList = event.target.files;
  }

  // Convert from DataTransferItemsList to the native Array
  return Array.prototype.slice.call(dataTransferItemsList);
}

// Firefox versions prior to 53 return a bogus MIME type for every file drag, so dragovers with
// that MIME type will always be accepted
function fileAccepted(file, accept) {
  return file.type === 'application/x-moz-file' || accepts(file, accept);
}

function fileMatchSize(file, maxSize, minSize) {
  return file.size <= maxSize && file.size >= minSize;
}

function allFilesAccepted(files, accept) {
  return files.every(function (file) {
    return fileAccepted(file, accept);
  });
}

function isDragDataWithFiles(evt) {
  if (!evt.dataTransfer) {
    return true;
  }
  // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/types
  // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Recommended_drag_types#file
  return Array.prototype.every.call(evt.dataTransfer.types, function (type) {
    return type === 'Files' || type === 'application/x-moz-file';
  });
}

// allow the entire document to be a drag target
function onDocumentDragOver(evt) {
  evt.preventDefault();
}

function isIe(userAgent) {
  return userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident/') !== -1;
}

function isEdge(userAgent) {
  return userAgent.indexOf('Edge/') !== -1;
}

function isIeOrEdge() {
  var userAgent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.navigator.userAgent;

  return isIe(userAgent) || isEdge(userAgent);
}

var styles$1 = {
  active: {
    borderStyle: 'solid',
    backgroundColor: '#eee'
  },
  accepted: {
    borderStyle: 'solid',
    borderColor: '#6c6',
    backgroundColor: '#eee'
  },
  rejected: {
    borderStyle: 'solid',
    borderColor: '#c66',
    backgroundColor: '#eee'
  },
  default: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#666',
    borderStyle: 'dashed',
    borderRadius: 5
  },
  disabled: {
    opacity: 0.5
  }
};

var _extends$1 = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Dropzone = function (_React$Component) {
  _inherits(Dropzone, _React$Component);

  function Dropzone(props, context) {
    _classCallCheck(this, Dropzone);

    var _this = _possibleConstructorReturn(this, (Dropzone.__proto__ || Object.getPrototypeOf(Dropzone)).call(this, props, context));

    _this.renderChildren = function (children, isDragActive, isDragAccept, isDragReject) {
      if (typeof children === 'function') {
        return children(_extends$1({}, _this.state, {
          isDragActive: isDragActive,
          isDragAccept: isDragAccept,
          isDragReject: isDragReject,
          open: _this.open
        }));
      }
      return children;
    };

    _this.composeHandlers = _this.composeHandlers.bind(_this);
    _this.onClick = _this.onClick.bind(_this);
    _this.onDocumentDrop = _this.onDocumentDrop.bind(_this);
    _this.onDragEnter = _this.onDragEnter.bind(_this);
    _this.onDragLeave = _this.onDragLeave.bind(_this);
    _this.onDragOver = _this.onDragOver.bind(_this);
    _this.onDragStart = _this.onDragStart.bind(_this);
    _this.onDrop = _this.onDrop.bind(_this);
    _this.onFileDialogCancel = _this.onFileDialogCancel.bind(_this);
    _this.onInputElementClick = _this.onInputElementClick.bind(_this);
    _this.open = _this.open.bind(_this);

    _this.setRef = _this.setRef.bind(_this);
    _this.setRefs = _this.setRefs.bind(_this);

    _this.isFileDialogActive = false;

    _this.state = {
      draggedFiles: [],
      acceptedFiles: [],
      rejectedFiles: []
    };
    return _this;
  }

  _createClass(Dropzone, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var preventDropOnDocument = this.props.preventDropOnDocument;

      this.dragTargets = [];

      if (preventDropOnDocument) {
        document.addEventListener('dragover', onDocumentDragOver, false);
        document.addEventListener('drop', this.onDocumentDrop, false);
      }
      if (this.fileInputEl != null) {
        this.fileInputEl.addEventListener('click', this.onInputElementClick, false);
      }
      window.addEventListener('focus', this.onFileDialogCancel, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var preventDropOnDocument = this.props.preventDropOnDocument;

      if (preventDropOnDocument) {
        document.removeEventListener('dragover', onDocumentDragOver);
        document.removeEventListener('drop', this.onDocumentDrop);
      }
      if (this.fileInputEl != null) {
        this.fileInputEl.removeEventListener('click', this.onInputElementClick, false);
      }
      window.removeEventListener('focus', this.onFileDialogCancel, false);
    }
  }, {
    key: 'composeHandlers',
    value: function composeHandlers(handler) {
      if (this.props.disabled) {
        return null;
      }

      return handler;
    }
  }, {
    key: 'onDocumentDrop',
    value: function onDocumentDrop(evt) {
      if (this.node && this.node.contains(evt.target)) {
        // if we intercepted an event for our instance, let it propagate down to the instance's onDrop handler
        return;
      }
      evt.preventDefault();
      this.dragTargets = [];
    }
  }, {
    key: 'onDragStart',
    value: function onDragStart(evt) {
      evt.persist();
      if (this.props.onDragStart && isDragDataWithFiles(evt)) {
        this.props.onDragStart.call(this, evt);
      }
    }
  }, {
    key: 'onDragEnter',
    value: function onDragEnter(evt) {
      var _this2 = this;

      evt.preventDefault();

      // Count the dropzone and any children that are entered.
      if (this.dragTargets.indexOf(evt.target) === -1) {
        this.dragTargets.push(evt.target);
      }

      evt.persist();

      if (isDragDataWithFiles(evt)) {
        Promise.resolve(this.props.getDataTransferItems(evt)).then(function (draggedFiles) {
          if (evt.isPropagationStopped()) {
            return;
          }

          _this2.setState({
            draggedFiles: draggedFiles,
            // Do not rely on files for the drag state. It doesn't work in Safari.
            isDragActive: true
          });
        });

        if (this.props.onDragEnter) {
          this.props.onDragEnter.call(this, evt);
        }
      }
    }
  }, {
    key: 'onDragOver',
    value: function onDragOver(evt) {
      // eslint-disable-line class-methods-use-this
      evt.preventDefault();
      evt.persist();

      try {
        // The file dialog on Chrome allows users to drag files from the dialog onto
        // the dropzone, causing the browser the crash when the file dialog is closed.
        // A drop effect of 'none' prevents the file from being dropped
        evt.dataTransfer.dropEffect = this.isFileDialogActive ? 'none' : 'copy'; // eslint-disable-line no-param-reassign
      } catch (err) {
        // continue regardless of error
      }

      if (this.props.onDragOver && isDragDataWithFiles(evt)) {
        this.props.onDragOver.call(this, evt);
      }

      return false;
    }
  }, {
    key: 'onDragLeave',
    value: function onDragLeave(evt) {
      var _this3 = this;

      evt.preventDefault();
      evt.persist();

      // Only deactivate once the dropzone and all children have been left.
      this.dragTargets = this.dragTargets.filter(function (el) {
        return el !== evt.target && _this3.node.contains(el);
      });
      if (this.dragTargets.length > 0) {
        return;
      }

      // Clear dragging files state
      this.setState({
        isDragActive: false,
        draggedFiles: []
      });

      if (this.props.onDragLeave && isDragDataWithFiles(evt)) {
        this.props.onDragLeave.call(this, evt);
      }
    }
  }, {
    key: 'onDrop',
    value: function onDrop(evt) {
      var _this4 = this;

      var _props = this.props,
          onDrop = _props.onDrop,
          onDropAccepted = _props.onDropAccepted,
          onDropRejected = _props.onDropRejected,
          multiple = _props.multiple,
          accept = _props.accept,
          getDataTransferItems$$1 = _props.getDataTransferItems;

      // Stop default browser behavior

      evt.preventDefault();

      // Persist event for later usage
      evt.persist();

      // Reset the counter along with the drag on a drop.
      this.dragTargets = [];
      this.isFileDialogActive = false;

      // Clear files value
      this.draggedFiles = null;

      // Reset drag state
      this.setState({
        isDragActive: false,
        draggedFiles: []
      });

      if (isDragDataWithFiles(evt)) {
        Promise.resolve(getDataTransferItems$$1(evt)).then(function (fileList) {
          var acceptedFiles = [];
          var rejectedFiles = [];

          if (evt.isPropagationStopped()) {
            return;
          }

          fileList.forEach(function (file) {
            if (fileAccepted(file, accept) && fileMatchSize(file, _this4.props.maxSize, _this4.props.minSize)) {
              acceptedFiles.push(file);
            } else {
              rejectedFiles.push(file);
            }
          });

          if (!multiple && acceptedFiles.length > 1) {
            // if not in multi mode add any extra accepted files to rejected.
            // This will allow end users to easily ignore a multi file drop in "single" mode.
            rejectedFiles.push.apply(rejectedFiles, _toConsumableArray(acceptedFiles.splice(0)));
          }

          // Update `acceptedFiles` and `rejectedFiles` state
          // This will make children render functions receive the appropriate
          // values
          _this4.setState({ acceptedFiles: acceptedFiles, rejectedFiles: rejectedFiles }, function () {
            if (onDrop) {
              onDrop.call(_this4, acceptedFiles, rejectedFiles, evt);
            }

            if (rejectedFiles.length > 0 && onDropRejected) {
              onDropRejected.call(_this4, rejectedFiles, evt);
            }

            if (acceptedFiles.length > 0 && onDropAccepted) {
              onDropAccepted.call(_this4, acceptedFiles, evt);
            }
          });
        });
      }
    }
  }, {
    key: 'onClick',
    value: function onClick(evt) {
      var _props2 = this.props,
          onClick = _props2.onClick,
          disableClick = _props2.disableClick;

      // if onClick prop is given, run it first

      if (onClick) {
        onClick.call(this, evt);
      }

      // if disableClick is not set and the event hasn't been default prefented within
      // the onClick listener, open the file dialog
      if (!disableClick && !evt.isDefaultPrevented()) {
        evt.stopPropagation();

        // in IE11/Edge the file-browser dialog is blocking, ensure this is behind setTimeout
        // this is so react can handle state changes in the onClick prop above above
        // see: https://github.com/react-dropzone/react-dropzone/issues/450
        if (isIeOrEdge()) {
          setTimeout(this.open, 0);
        } else {
          this.open();
        }
      }
    }
  }, {
    key: 'onInputElementClick',
    value: function onInputElementClick(evt) {
      evt.stopPropagation();
      if (this.props.inputProps && this.props.inputProps.onClick) {
        this.props.inputProps.onClick(evt);
      }
    }
  }, {
    key: 'onFileDialogCancel',
    value: function onFileDialogCancel() {
      var _this5 = this;

      // timeout will not recognize context of this method
      var onFileDialogCancel = this.props.onFileDialogCancel;
      // execute the timeout only if the FileDialog is opened in the browser

      if (this.isFileDialogActive) {
        setTimeout(function () {
          if (_this5.fileInputEl != null) {
            // Returns an object as FileList
            var files = _this5.fileInputEl.files;

            if (!files.length) {
              _this5.isFileDialogActive = false;

              if (typeof onFileDialogCancel === 'function') {
                onFileDialogCancel();
              }
            }
          }
        }, 300);
      }
    }
  }, {
    key: 'setRef',
    value: function setRef(ref) {
      this.node = ref;
    }
  }, {
    key: 'setRefs',
    value: function setRefs(ref) {
      this.fileInputEl = ref;
    }
    /**
     * Open system file upload dialog.
     *
     * @public
     */

  }, {
    key: 'open',
    value: function open() {
      this.isFileDialogActive = true;
      this.fileInputEl.value = null;
      this.fileInputEl.click();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          accept = _props3.accept,
          acceptClassName = _props3.acceptClassName,
          activeClassName = _props3.activeClassName,
          children = _props3.children,
          disabled = _props3.disabled,
          disabledClassName = _props3.disabledClassName,
          inputProps = _props3.inputProps,
          multiple = _props3.multiple,
          name = _props3.name,
          rejectClassName = _props3.rejectClassName,
          rest = _objectWithoutProperties(_props3, ['accept', 'acceptClassName', 'activeClassName', 'children', 'disabled', 'disabledClassName', 'inputProps', 'multiple', 'name', 'rejectClassName']);

      var acceptStyle = rest.acceptStyle,
          activeStyle = rest.activeStyle,
          _rest$className = rest.className,
          className = _rest$className === undefined ? '' : _rest$className,
          disabledStyle = rest.disabledStyle,
          rejectStyle = rest.rejectStyle,
          style = rest.style,
          props = _objectWithoutProperties(rest, ['acceptStyle', 'activeStyle', 'className', 'disabledStyle', 'rejectStyle', 'style']);

      var _state = this.state,
          isDragActive = _state.isDragActive,
          draggedFiles = _state.draggedFiles;

      var filesCount = draggedFiles.length;
      var isMultipleAllowed = multiple || filesCount <= 1;
      var isDragAccept = filesCount > 0 && allFilesAccepted(draggedFiles, this.props.accept);
      var isDragReject = filesCount > 0 && (!isDragAccept || !isMultipleAllowed);
      var noStyles = !className && !style && !activeStyle && !acceptStyle && !rejectStyle && !disabledStyle;

      if (isDragActive && activeClassName) {
        className += ' ' + activeClassName;
      }
      if (isDragAccept && acceptClassName) {
        className += ' ' + acceptClassName;
      }
      if (isDragReject && rejectClassName) {
        className += ' ' + rejectClassName;
      }
      if (disabled && disabledClassName) {
        className += ' ' + disabledClassName;
      }

      if (noStyles) {
        style = styles$1.default;
        activeStyle = styles$1.active;
        acceptStyle = styles$1.accepted;
        rejectStyle = styles$1.rejected;
        disabledStyle = styles$1.disabled;
      }

      var appliedStyle = _extends$1({ position: 'relative' }, style);
      if (activeStyle && isDragActive) {
        appliedStyle = _extends$1({}, appliedStyle, activeStyle);
      }
      if (acceptStyle && isDragAccept) {
        appliedStyle = _extends$1({}, appliedStyle, acceptStyle);
      }
      if (rejectStyle && isDragReject) {
        appliedStyle = _extends$1({}, appliedStyle, rejectStyle);
      }
      if (disabledStyle && disabled) {
        appliedStyle = _extends$1({}, appliedStyle, disabledStyle);
      }

      var inputAttributes = {
        accept: accept,
        disabled: disabled,
        type: 'file',
        style: _extends$1({
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          opacity: 0.00001,
          pointerEvents: 'none'
        }, inputProps.style),
        multiple: supportMultiple && multiple,
        ref: this.setRefs,
        onChange: this.onDrop,
        autoComplete: 'off'
      };

      if (name && name.length) {
        inputAttributes.name = name;
      }

      // Destructure custom props away from props used for the div element
      /* eslint-disable no-unused-vars */

      var divProps = _objectWithoutProperties(props, ['acceptedFiles', 'preventDropOnDocument', 'disableClick', 'onDropAccepted', 'onDropRejected', 'onFileDialogCancel', 'maxSize', 'minSize', 'getDataTransferItems']);
      /* eslint-enable no-unused-vars */

      /* eslint-disable jsx-a11y/no-static-element-interactions */
      /* eslint-disable jsx-a11y/click-events-have-key-events */

      return React__default.createElement('div', _extends$1({
        className: className,
        style: appliedStyle
      }, divProps /* expand user provided props first so event handlers are never overridden */
      , {
        onClick: this.composeHandlers(this.onClick),
        onDragStart: this.composeHandlers(this.onDragStart),
        onDragEnter: this.composeHandlers(this.onDragEnter),
        onDragOver: this.composeHandlers(this.onDragOver),
        onDragLeave: this.composeHandlers(this.onDragLeave),
        onDrop: this.composeHandlers(this.onDrop),
        ref: this.setRef,
        'aria-disabled': disabled
      }), this.renderChildren(children, isDragActive, isDragAccept, isDragReject), React__default.createElement('input', _extends$1({}, inputProps /* expand user provided inputProps first so inputAttributes override them */
      , inputAttributes)));
    }
  }]);

  return Dropzone;
}(React__default.Component);

Dropzone.propTypes = {
  /**
   * Allow specific types of files. See https://github.com/okonet/attr-accept for more information.
   * Keep in mind that mime type determination is not reliable across platforms. CSV files,
   * for example, are reported as text/plain under macOS but as application/vnd.ms-excel under
   * Windows. In some cases there might not be a mime type set at all.
   * See: https://github.com/react-dropzone/react-dropzone/issues/276
   */
  accept: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),

  /**
   * Contents of the dropzone
   */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  /**
   * Disallow clicking on the dropzone container to open file dialog
   */
  disableClick: PropTypes.bool,

  /**
   * Enable/disable the dropzone entirely
   */
  disabled: PropTypes.bool,

  /**
   * If false, allow dropped items to take over the current browser window
   */
  preventDropOnDocument: PropTypes.bool,

  /**
   * Pass additional attributes to the `<input type="file"/>` tag
   */
  inputProps: PropTypes.object,

  /**
   * Allow dropping multiple files
   */
  multiple: PropTypes.bool,

  /**
   * `name` attribute for the input tag
   */
  name: PropTypes.string,

  /**
   * Maximum file size (in bytes)
   */
  maxSize: PropTypes.number,

  /**
   * Minimum file size (in bytes)
   */
  minSize: PropTypes.number,

  /**
   * className
   */
  className: PropTypes.string,

  /**
   * className to apply when drag is active
   */
  activeClassName: PropTypes.string,

  /**
   * className to apply when drop will be accepted
   */
  acceptClassName: PropTypes.string,

  /**
   * className to apply when drop will be rejected
   */
  rejectClassName: PropTypes.string,

  /**
   * className to apply when dropzone is disabled
   */
  disabledClassName: PropTypes.string,

  /**
   * CSS styles to apply
   */
  style: PropTypes.object,

  /**
   * CSS styles to apply when drag is active
   */
  activeStyle: PropTypes.object,

  /**
   * CSS styles to apply when drop will be accepted
   */
  acceptStyle: PropTypes.object,

  /**
   * CSS styles to apply when drop will be rejected
   */
  rejectStyle: PropTypes.object,

  /**
   * CSS styles to apply when dropzone is disabled
   */
  disabledStyle: PropTypes.object,

  /**
   * getDataTransferItems handler
   * @param {Event} event
   * @returns {Array} array of File objects
   */
  getDataTransferItems: PropTypes.func,

  /**
   * onClick callback
   * @param {Event} event
   */
  onClick: PropTypes.func,

  /**
   * onDrop callback
   */
  onDrop: PropTypes.func,

  /**
   * onDropAccepted callback
   */
  onDropAccepted: PropTypes.func,

  /**
   * onDropRejected callback
   */
  onDropRejected: PropTypes.func,

  /**
   * onDragStart callback
   */
  onDragStart: PropTypes.func,

  /**
   * onDragEnter callback
   */
  onDragEnter: PropTypes.func,

  /**
   * onDragOver callback
   */
  onDragOver: PropTypes.func,

  /**
   * onDragLeave callback
   */
  onDragLeave: PropTypes.func,

  /**
   * Provide a callback on clicking the cancel button of the file dialog
   */
  onFileDialogCancel: PropTypes.func
};

Dropzone.defaultProps = {
  preventDropOnDocument: true,
  disabled: false,
  disableClick: false,
  inputProps: {},
  multiple: true,
  maxSize: Infinity,
  minSize: 0,
  getDataTransferItems: getDataTransferItems
};

function isImage(file) {
  var fileName = file.name || file.path;
  var suffix = fileName.substr(fileName.indexOf('.') + 1).toLowerCase();
  if (suffix === 'jpg' || suffix === 'jpeg' || suffix === 'bmp' || suffix === 'png') {
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

/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (typeof define === 'function' && _typeof(define.amd) === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
})();

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
      marginRight: theme.spacing.unit
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
    className: classNames(classes[variant], className),
    'aria-describedby': 'client-snackbar',
    message: React__default.createElement(
      'span',
      { id: 'client-snackbar', className: classes.message },
      React__default.createElement(Icon, { className: classNames(classes.icon, classes.iconVariant) }),
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
        classes = props.classes;

    return React__default.createElement(
        Grid,
        { container: true, spacing: 8 },
        fileObjects.map(function (fileObject, i) {
            var img = isImage(fileObject.file) ? React__default.createElement('img', { className: classes.smallPreviewImg, role: 'presentation', src: fileObject.data }) : React__default.createElement(AttachFileIcon, { className: classes.smallPreviewImg });
            return React__default.createElement(
                Grid,
                { item: true, xs: 4, key: i, className: classes.imageContainer },
                img,
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

var PreviewList$1 = styles.withStyles(styles$3)(PreviewList);

var styles$4 = {
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
                        _this2.props.onChange(_this2.state.fileObjects);
                    }
                    _this2.setState({
                        openSnackBar: true,
                        snackbarMessage: 'File ' + file.name + ' removed',
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
            snackbarVariant: 'success'
        };
        return _this2;
    }

    createClass(DropzoneArea, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.props.clearOnUnmount) {
                this.setState({
                    fileObjects: []
                });
            }
        }
    }, {
        key: 'onDrop',
        value: function onDrop(files) {
            var _this3 = this;

            var _this = this;
            if (this.state.fileObjects + files.length > this.props.filesLimit) {
                this.setState({
                    openSnackBar: true,
                    snackbarMessage: 'Maximum allowed number of files exceeded. Only ' + this.props.filesLimit + ' allowed',
                    snackbarVariant: 'error'
                });
            } else {
                var count = 0;
                var message = '';
                files.forEach(function (file) {
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        _this.setState({
                            fileObjects: _this.state.fileObjects.concat({ file: file, data: event.target.result })
                        }, function () {
                            if (_this3.props.onChange) {
                                _this3.props.onChange(_this.state.fileObjects.map(function (fileObject) {
                                    return fileObject.file;
                                }));
                            }
                            if (_this3.props.onDrop) {
                                _this3.props.onDrop(file);
                            }
                            message += 'File ' + file.name + ' successfully uploaded. ';
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
        key: 'handleDropRejected',
        value: function handleDropRejected(rejectedFiles, evt) {
            var _this4 = this;

            var message = '';
            rejectedFiles.forEach(function (rejectedFile) {
                message = 'File ' + rejectedFile.name + ' was rejected. ';
                if (!_this4.props.acceptedFiles.includes(rejectedFile.type)) {
                    message += 'File type not supported. ';
                }
                if (rejectedFile.size > _this4.props.fileSizeLimit) {
                    message += 'File is too big. Size limit is ' + convertBytesToMbsOrKbs(_this4.props.fileSizeLimit) + '. ';
                }
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
                        className: classes.dropZone,
                        acceptClassName: classes.stripes,
                        rejectClassName: classes.rejectStripes,
                        maxSize: this.props.maxFileSize
                    },
                    React__default.createElement(
                        'div',
                        { className: classes.dropzoneTextStyle },
                        React__default.createElement(
                            'p',
                            { className: classes.dropzoneParagraph },
                            this.props.dropzoneText
                        ),
                        React__default.createElement(CloudUploadIcon, { className: classes.uploadIconSize })
                    ),
                    showPreviewsInDropzone && React__default.createElement(PreviewList$1, {
                        fileObjects: this.state.fileObjects,
                        handleRemove: this.handleRemove.bind(this)
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
                        handleRemove: this.handleRemove.bind(this)
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
    showAlerts: true,
    clearOnUnmount: true,
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
    showPreviews: PropTypes.bool,
    showPreviewsInDropzone: PropTypes.bool,
    showAlerts: PropTypes.bool,
    clearOnUnmount: PropTypes.bool,
    onChange: PropTypes.func,
    onDrop: PropTypes.func,
    onDropRejected: PropTypes.func,
    onDelete: PropTypes.func
};
var DropzoneArea$1 = styles.withStyles(styles$4)(DropzoneArea);

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

            console.log('Files changed', files);
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
            console.log('File removed', file);
            if (this.props.onDelete) {
                this.props.onDelete(file);
            }
        }
    }, {
        key: 'onDrop',
        value: function onDrop(files) {
            // this passes it on to the parent component to do with it what they will
            console.log('Files dropped', files);
            if (this.props.onDrop) {
                this.props.onDrop(files);
            }
        }
    }, {
        key: 'onDropRejected',
        value: function onDropRejected(files, evt) {
            // this passes it on to the parent component to do with it what they will
            console.log('Files rejected', files);
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
                    {
                        open: this.state.open,
                        onClose: this.handleClose.bind(this)
                    },
                    React__default.createElement(
                        DialogTitle,
                        null,
                        'Upload File'
                    ),
                    React__default.createElement(
                        DialogContent,
                        null,
                        React__default.createElement(DropzoneArea$1, {
                            acceptedFiles: this.props.acceptedFiles,
                            filesLimit: this.props.filesLimit,
                            maxFileSize: this.props.maxFileSize,
                            showPreviews: this.props.showPreviews,
                            showPreviewsInDropzone: this.props.showPreviewsInDropzone,
                            showAlerts: this.props.showAlerts,
                            onChange: this.onChange.bind(this),
                            onDrop: this.onDrop.bind(this),
                            onDropRejected: this.onDropRejected.bind(this),
                            onDelete: this.onDelete.bind(this),
                            clearOnUnmount: this.props.clearOnUnmount
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
                            'Cancel'
                        ),
                        React__default.createElement(
                            Button,
                            {
                                color: 'primary',
                                disabled: this.state.disabled,
                                onClick: this.handleSaveClick.bind(this)
                            },
                            'Submit'
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
    showAlerts: true,
    clearOnUnmount: true,
    onSave: function onSave() {},
    onDelete: function onDelete() {},
    onClose: function onClose() {},
    onChange: function onChange() {},
    onDrop: function onDrop() {},
    onDropRejected: function onDropRejected() {}
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
    showAlerts: PropTypes.bool,
    clearOnUnmount: PropTypes.bool
};

exports.DropzoneArea = DropzoneArea$1;
exports.DropzoneDialog = DropzoneDialog;
//# sourceMappingURL=index.js.map
