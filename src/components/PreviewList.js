import Chip from '@material-ui/core/Chip';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';

import { isImage as isImageCheck } from '../helpers';
import useColumns from '../hooks/useColumns';

const useStyles = makeStyles(
  ({ spacing }) => ({
    root: {
      alignItems: 'center',
      position: 'absolute',
      width: '100%',
      height: '100%',
      margin: 0,
      backgroundColor: 'rgba(255,255,255,0.87)',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    iconWrapper: {
      height: '100%',
      backgroundColor: '#f2f2f2',
    },
    fileIcon: {
      flexGrow: 1,
      height: '50%',
      marginTop: spacing(3),
    },
    fileIconBottom: {
      marginTop: spacing(9),
    },
  }),
  { name: 'MuiDropzonePreviewList' },
);

const PreviewList = ({
  fileObjects,
  filesLimit,
  getCols,
  handleRemove,
  showFileNames,
  useChipsForPreview,
  previewChipProps,
  previewGridClasses,
  previewGridProps,
  previewType,
  getPreviewIcon,
  handlePreviewClick,
}) => {
  const classes = useStyles();
  const cols = useColumns(getCols, filesLimit, fileObjects.length);
  const previewInside = previewType === 'inside';

  if (useChipsForPreview) {
    return fileObjects.map((fileObject, i) => (
      <div key={i}>
        <Chip
          variant="outlined"
          {...previewChipProps}
          label={fileObject.file.name}
          onDelete={handleRemove(i)}
        />
      </div>
    ));
  }

  return (
    <GridList
      cols={cols}
      className={clsx(
        { [classes.root]: previewInside },
        previewGridClasses.container,
      )}
      {...previewGridProps?.gridList}
    >
      {fileObjects.map((fileObject, i) => {
        const fileTitle = showFileNames && fileObject.file?.name;
        const isImage = isImageCheck(fileObject.file);

        return (
          <GridListTile
            key={`${fileObject.file?.name ?? 'file'}-${i}`}
            className={clsx(previewGridClasses.gridListTile, {
              [classes.iconWrapper]: !isImage,
            })}
            onClick={handlePreviewClick(i)}
            onKeyDown={handlePreviewClick(i)}
            {...previewGridProps?.gridListTitle}
          >
            {getPreviewIcon(
              fileObject,
              classes,
              isImage,
              previewGridProps?.gridListTitleBar?.titlePosition === 'top',
            )}

            <GridListTileBar
              title={fileTitle}
              actionIcon={
                <IconButton
                  onClick={handleRemove(i)}
                  aria-label="Delete"
                  className={clsx(
                    previewGridClasses.removeIconButton,
                    classes.icon,
                  )}
                >
                  <DeleteIcon />
                </IconButton>
              }
              {...previewGridProps?.gridListTitleBar}
            />
          </GridListTile>
        );
      })}
    </GridList>
  );
};

PreviewList.propTypes = {
  fileObjects: PropTypes.arrayOf(PropTypes.object).isRequired,
  filesLimit: PropTypes.number.isRequired,
  getCols: PropTypes.func.isRequired,
  getPreviewIcon: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handlePreviewClick: PropTypes.func.isRequired,
  previewChipProps: PropTypes.object,
  previewGridClasses: PropTypes.object,
  previewGridProps: PropTypes.object,
  previewType: PropTypes.string.isRequired,
  showFileNames: PropTypes.bool,
  useChipsForPreview: PropTypes.bool,
};

export default PreviewList;
