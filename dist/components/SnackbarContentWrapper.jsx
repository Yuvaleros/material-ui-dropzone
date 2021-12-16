"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const CheckCircle_1 = (0, tslib_1.__importDefault)(require("@mui/icons-material/CheckCircle"));
const Close_1 = (0, tslib_1.__importDefault)(require("@mui/icons-material/Close"));
const Error_1 = (0, tslib_1.__importDefault)(require("@mui/icons-material/Error"));
const Info_1 = (0, tslib_1.__importDefault)(require("@mui/icons-material/Info"));
const Warning_1 = (0, tslib_1.__importDefault)(require("@mui/icons-material/Warning"));
const IconButton_1 = (0, tslib_1.__importDefault)(require("@mui/material/IconButton"));
const SnackbarContent_1 = (0, tslib_1.__importDefault)(require("@mui/material/SnackbarContent"));
const system_1 = require("@mui/system");
const clsx_1 = (0, tslib_1.__importDefault)(require("clsx"));
const prop_types_1 = (0, tslib_1.__importDefault)(require("prop-types"));
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const variantIcon = {
    error: Error_1.default,
    info: Info_1.default,
    success: CheckCircle_1.default,
    warning: Warning_1.default,
};
function SnackbarContentWrapper(props) {
    const { classes, className, message, onClose, variant } = props, other = (0, tslib_1.__rest)(props, ["classes", "className", "message", "onClose", "variant"]);
    const Icon = variantIcon[variant];
    return (<SnackbarContent_1.default className={(0, clsx_1.default)(classes === null || classes === void 0 ? void 0 : classes[variant], className)} aria-describedby="client-snackbar" message={<span id="client-snackbar" className={classes === null || classes === void 0 ? void 0 : classes.message}>
          <Icon className={classes === null || classes === void 0 ? void 0 : classes.icon}/>
          {message}
        </span>} action={<IconButton_1.default key="close" aria-label="Close" color="inherit" className={classes === null || classes === void 0 ? void 0 : classes.closeButton} onClick={onClose}>
          <Close_1.default className={classes === null || classes === void 0 ? void 0 : classes.icon}/>
        </IconButton_1.default>} {...other}/>);
}
SnackbarContentWrapper.propTypes = {
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    message: prop_types_1.default.node,
    onClose: prop_types_1.default.func,
    variant: prop_types_1.default.oneOf(["success", "warning", "error", "info"]),
};
const StyledSnackbarContentWrapper = (0, system_1.styled)(SnackbarContentWrapper, {
    name: "MuiDropzoneSnackbar",
})((combinedProps) => {
    const { theme } = combinedProps;
    return {
        successAlert: {
            backgroundColor: theme.palette.success.main,
        },
        errorAlert: {
            backgroundColor: theme.palette.error.main,
        },
        infoAlert: {
            backgroundColor: theme.palette.info.main,
        },
        warningAlert: {
            backgroundColor: theme.palette.warning.main,
        },
        message: {
            display: "flex",
            alignItems: "center",
            "& > svg": {
                marginRight: theme.spacing(1),
            },
        },
        icon: {
            fontSize: 20,
            opacity: 0.9,
        },
        closeButton: {},
    };
});
exports.default = StyledSnackbarContentWrapper;
//# sourceMappingURL=SnackbarContentWrapper.jsx.map