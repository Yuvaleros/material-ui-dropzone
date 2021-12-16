import DeleteIcon from "@mui/icons-material/Delete";
import Box, { BoxProps } from "@mui/material/Box";
import Chip, { ChipProps } from "@mui/material/Chip";
import Fab, { FabProps } from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useMemo } from "react";

import { FileObject } from "../types";

export interface PreviewListProps {
  classes?: {
    image?: string;
    imageContainer?: string;
    removeButton?: string;
    root?: string;
  };
  fileObjects: FileObject[];
  getPreviewIcon: (
    fileObject: FileObject,
    classes: PreviewListProps["classes"]
  ) => JSX.Element;
  handleRemove: (index: number) => ChipProps["onDelete"];
  previewChipProps?: ChipProps;
  previewGridClasses?: { container?: string; item?: string };
  previewGridProps?: { container?: BoxProps; item?: BoxProps };
  showFileNames?: boolean;
  useChipsForPreview?: boolean;
}

function PreviewList(props: PreviewListProps) {
  const {
    fileObjects,
    handleRemove,
    showFileNames,
    useChipsForPreview,
    previewChipProps,
    previewGridClasses,
    previewGridProps,
    classes,
    getPreviewIcon,
  } = props;

  const sxGridContainer = useMemo<BoxProps["sx"]>(
    () => ({
      display: "flex",
      flexWrap: "wrap",
      width: "100%",
      gap: useChipsForPreview ? 1 : 8,
    }),
    [useChipsForPreview]
  );

  const sxImageContainer = useMemo<BoxProps["sx"]>(
    () => ({
      position: "relative",
      zIndex: 10,
      textAlign: "center",
      "& img": {
        height: 100,
        width: "initial",
        maxWidth: "100%",
        color: "text.primary",
        transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
        boxSizing: "border-box",
        boxShadow:
          "rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px",
        borderRadius: 1,
        zIndex: 5,
        opacity: 1,
      },
      "&:hover svg": {
        opacity: 0.3,
      },
      "&:hover button": {
        opacity: 1,
      },
    }),
    []
  );

  const sxRemoveButton = useMemo<FabProps["sx"]>(
    () => ({
      transition: ".5s ease",
      position: "absolute",
      opacity: 0,
      top: -16,
      right: -16,
      width: 40,
      height: 40,
      "&:focus": {
        opacity: 1,
      },
    }),
    []
  );

  if (useChipsForPreview) {
    return (
      <Box
        sx={sxGridContainer}
        {...previewGridProps?.container}
        className={clsx(classes?.root, previewGridClasses?.container)}
      >
        {fileObjects.map((fileObject, i) => {
          return (
            <Box
              {...previewGridProps?.item}
              key={i}
              sx={sxImageContainer}
              className={classes?.imageContainer}
            >
              <Chip
                variant="outlined"
                {...previewChipProps}
                label={fileObject.file.name}
                onDelete={handleRemove(i)}
              />
            </Box>
          );
        })}
      </Box>
    );
  }

  return (
    <Box
      sx={sxGridContainer}
      {...previewGridProps?.container}
      className={clsx(classes?.root, previewGridClasses?.container)}
    >
      {fileObjects.map((fileObject, i) => {
        return (
          <Box
            {...previewGridProps?.item}
            key={i}
            sx={sxImageContainer}
            className={clsx(classes?.imageContainer, previewGridClasses?.item)}
          >
            {getPreviewIcon(fileObject, classes)}

            {showFileNames ? (
              <Typography component="p">{fileObject.file.name}</Typography>
            ) : null}

            <Fab
              onClick={handleRemove(i)}
              aria-label="Delete"
              sx={sxRemoveButton}
              className={classes?.removeButton}
            >
              <DeleteIcon />
            </Fab>
          </Box>
        );
      })}
    </Box>
  );
}

PreviewList.propTypes = {
  classes: PropTypes.object,
  fileObjects: PropTypes.arrayOf(PropTypes.object).isRequired,
  getPreviewIcon: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  previewChipProps: PropTypes.object,
  previewGridClasses: PropTypes.object,
  previewGridProps: PropTypes.object,
  showFileNames: PropTypes.bool,
  useChipsForPreview: PropTypes.bool,
};

export default PreviewList;
