import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import PropTypes from 'prop-types';
import {isImage} from './helpers/helpers.js';
import clsx from 'clsx';

const styles = {
    removeBtn: {
        transition: '.5s ease',
        position: 'absolute',
        opacity: 0,
        top: -5,
        right: -5,
        width: 40,
        height: 40,
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
        opacity: 1,
    },
    imageContainer: {
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        '&:hover $smallPreviewImg': {
            opacity: 0.3,
        },
        '&:hover $removeBtn': {
            opacity: 1,
        },
    },
};

function PreviewList(props) {
    const {
        fileObjects,
        handleRemove,
        showFileNames,
        useChipsForPreview,
        previewChipProps,
        previewGridClasses,
        previewGridProps,
        classes,
    } = props;
    if (useChipsForPreview) {
        return (
            fileObjects.map((fileObject, i) => {
                return (<div key={i}>
                    <Chip
                        label={fileObject.file.name}
                        onDelete={handleRemove(i)}
                        variant="outlined"
                        {...previewChipProps}
                    />
                </div>);
            })
        );
    }
    return (
        <Grid container={true} spacing={8} className={previewGridClasses.container} {...previewGridProps.container}>
            {
                fileObjects.map((fileObject, i) => {
                    const img = (isImage(fileObject.file) ?
                        <img className={clsx(previewGridClasses.image, classes.smallPreviewImg)}
                            role="presentation" src={fileObject.data} /> :
                        <AttachFileIcon className={clsx(previewGridClasses.image, classes.smallPreviewImg)} />
                    );
                    return (
                        <Grid
                            item={true} xs={4} key={i} {...previewGridProps.item}
                            className={clsx(previewGridClasses.item, classes.imageContainer)}
                        >
                            {img}

                            {showFileNames &&
                                <p>{fileObject.file.name}</p>
                            }

                            <Fab
                                onClick={handleRemove(i)}
                                aria-label="Delete"
                                className={classes.removeBtn}
                            >
                                <DeleteIcon />
                            </Fab>
                        </Grid>
                    );
                })
            }
        </Grid>
    );
}

PreviewList.propTypes = {
    classes: PropTypes.object.isRequired,
    fileObjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleRemove: PropTypes.func.isRequired,
    showFileNames: PropTypes.bool,
    useChipsForPreview: PropTypes.bool,
    previewChipProps: PropTypes.object,
    previewGridClasses: PropTypes.object,
    previewGridProps: PropTypes.object,
};

export default withStyles(styles)(PreviewList);
