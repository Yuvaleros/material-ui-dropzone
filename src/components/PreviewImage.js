
import {withStyles} from '@material-ui/core/styles';
import {AttachFile, Description} from '@material-ui/icons/';
import clsx from 'clsx';
import * as React from 'react';
import PropTypes from 'prop-types';
import {isImage} from '../helpers';

const styles = {
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
        opacity: 1,
    },
};

function getFileTypeIcon(type, classes) {
    const props = {className: classes.smallPreviewImg};

    console.log(type);

    switch (type) {
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return <Description {...props} />;
        default:
            return <AttachFile {...props} />;
    }
}

function PreviewImage({fileObject, classes}) {
    const image = isImage(fileObject.file) ?
        <img className={classes.smallPreviewImg} role="presentation" src={fileObject.data} /> :
        getFileTypeIcon(fileObject.file.type, classes);

    return (
        image
    );
}

PreviewImage.propTypes = {
    classes: PropTypes.object.isRequired,
    fileObject: PropTypes.object.isRequired,
};

export default withStyles(styles)(PreviewImage);
