import IconButton from '@mui/material/IconButton';
import SnackbarContent from '@mui/material/SnackbarContent';
import {withStyles} from '@mui/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const styles = (theme) => ({
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
        display: 'flex',
        alignItems: 'center',
        '& > svg': {
            marginRight: theme.spacing(1),
        },
    },
    icon: {
        fontSize: 20,
        opacity: 0.9,
    },
    closeButton: {},
});

function SnackbarContentWrapper(props) {
    const {classes, className, message, onClose, variant, ...other} = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={clsx(classes[`${variant}Alert`], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={classes.icon} />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

SnackbarContentWrapper.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

export default withStyles(styles, {name: 'MuiDropzoneSnackbar'})(SnackbarContentWrapper);
