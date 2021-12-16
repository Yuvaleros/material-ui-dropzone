import { SvgIconComponent } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import IconButton from "@mui/material/IconButton";
import SnackbarContent, {
  SnackbarContentProps,
} from "@mui/material/SnackbarContent";
import { styled } from "@mui/system";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import { AlertType } from "../types";

const variantIcon: Record<AlertType, SvgIconComponent> = {
  error: ErrorIcon,
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: WarningIcon,
};

export interface SnackbarContentWrapperProps
  extends Omit<SnackbarContentProps, "variant"> {
  classes?: {
    closeButton?: string;
    icon?: string;
    message?: string;
  } & Partial<Record<AlertType, string>>;
  onClose?: () => void;
  variant: AlertType;
}

function SnackbarContentWrapper(props: SnackbarContentWrapperProps) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes?.[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes?.message}>
          <Icon className={classes?.icon} />
          {message}
        </span>
      }
      action={
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes?.closeButton}
          onClick={onClose}
        >
          <CloseIcon className={classes?.icon} />
        </IconButton>
      }
      {...other}
    />
  );
}

SnackbarContentWrapper.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]),
};

const StyledSnackbarContentWrapper = styled(SnackbarContentWrapper, {
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

export default StyledSnackbarContentWrapper;
