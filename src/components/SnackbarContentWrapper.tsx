import { SvgIconComponent } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import { Box, BoxProps, SvgIconProps } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SnackbarContent, {
  SnackbarContentProps,
} from "@mui/material/SnackbarContent";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { forwardRef, useMemo } from "react";

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
  variant?: AlertType;
}

const SnackbarContentWrapper = forwardRef(function SnackbarContentWrapper(
  props: SnackbarContentWrapperProps,
  ref: SnackbarContentProps["ref"]
) {
  const {
    classes,
    className,
    message,
    onClose,
    variant = "info",
    ...other
  } = props;
  const Icon = variantIcon[variant];

  const sx = useMemo(
    () => ({
      icon: {
        fontSize: 20,
        opacity: 0.9,
      } as SvgIconProps["sx"],
      message: {
        display: "flex",
        alignItems: "center",
        "& > svg": {
          marginRight: 1,
        },
      } as BoxProps["sx"],
    }),
    []
  );

  const sxVariant = useMemo<SnackbarContentProps["sx"]>(
    () => ({ backgroundColor: `${variant}.main` }),
    [variant]
  );

  return (
    <SnackbarContent
      ref={ref}
      sx={sxVariant}
      className={clsx(classes?.[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <Box
          component="span"
          id="client-snackbar"
          sx={sx.message}
          className={classes?.message}
        >
          <Icon sx={sx.icon} className={classes?.icon} />
          {message}
        </Box>
      }
      action={
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes?.closeButton}
          onClick={onClose}
        >
          <CloseIcon sx={sx.icon} className={classes?.icon} />
        </IconButton>
      }
      {...other}
    />
  );
});

SnackbarContentWrapper.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]),
};

export default SnackbarContentWrapper;
