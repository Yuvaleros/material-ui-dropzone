import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import * as React from 'react';
import PreviewImage from './PreviewImage';
import PropTypes from 'prop-types';

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

function PreviewList({
    fileObjects,
    handleRemove,
    showFileNames,
    useChipsForPreview,
    previewChipProps,
    previewGridClasses,
    previewGridProps,
    classes,
}) {
    if (useChipsForPreview) {
        return (
            fileObjects.map((fileObject, i) => (
                <div key={i}>
                    <Chip
                        label={fileObject.file.name}
                        onDelete={handleRemove(i)}
                        variant="outlined"
                        {...previewChipProps}
                    />
                </div>
            ))
        );
    }

    return (
        <Grid container={true} spacing={8} className={previewGridClasses.container} {...previewGridProps.container}>
            {fileObjects.map((fileObject, i) => {
                return (
                    <Grid
                        key={i}
                        item={true}
                        xs={4}
                        {...previewGridProps.item}
                        className={clsx(previewGridClasses.item, classes.imageContainer)}
                    >
                        <PreviewImage fileObject={fileObject} />

                        {showFileNames && (
                            <Typography variant="body1" component="p">
                                {fileObject.file.name}
                            </Typography>
                        )}

                        <Fab
                            onClick={handleRemove(i)}
                            aria-label="Delete"
                            className={classes.removeBtn}
                        >
                            <DeleteIcon />
                        </Fab>
                    </Grid>
                );
            })}
        </Grid>
    );
}

PreviewList.propTypes = {
    classes: PropTypes.object.isRequired,
    fileObjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleRemove: PropTypes.func.isRequired,
    previewChipProps: PropTypes.object,
    previewGridClasses: PropTypes.object,
    previewGridProps: PropTypes.object,
    showFileNames: PropTypes.bool,
    useChipsForPreview: PropTypes.bool,
};

export default withStyles(styles)(PreviewList);
