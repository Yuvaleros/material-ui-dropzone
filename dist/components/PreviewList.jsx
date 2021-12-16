"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Delete_1 = (0, tslib_1.__importDefault)(require("@mui/icons-material/Delete"));
const Chip_1 = (0, tslib_1.__importDefault)(require("@mui/material/Chip"));
const Fab_1 = (0, tslib_1.__importDefault)(require("@mui/material/Fab"));
const Grid_1 = (0, tslib_1.__importDefault)(require("@mui/material/Grid"));
const Typography_1 = (0, tslib_1.__importDefault)(require("@mui/material/Typography"));
const system_1 = require("@mui/system");
const clsx_1 = (0, tslib_1.__importDefault)(require("clsx"));
const prop_types_1 = (0, tslib_1.__importDefault)(require("prop-types"));
const react_1 = (0, tslib_1.__importDefault)(require("react"));
function PreviewList(props) {
    const { fileObjects, handleRemove, showFileNames, useChipsForPreview, previewChipProps, previewGridClasses, previewGridProps, classes, getPreviewIcon, } = props;
    if (useChipsForPreview) {
        return (<Grid_1.default spacing={1} direction="row" {...previewGridProps === null || previewGridProps === void 0 ? void 0 : previewGridProps.container} container={true} className={(0, clsx_1.default)(classes === null || classes === void 0 ? void 0 : classes.root, previewGridClasses === null || previewGridClasses === void 0 ? void 0 : previewGridClasses.container)}>
        {fileObjects.map((fileObject, i) => {
                return (<Grid_1.default {...previewGridProps === null || previewGridProps === void 0 ? void 0 : previewGridProps.item} item={true} key={i} className={classes === null || classes === void 0 ? void 0 : classes.imageContainer}>
              <Chip_1.default variant="outlined" {...previewChipProps} label={fileObject.file.name} onDelete={handleRemove(i)}/>
            </Grid_1.default>);
            })}
      </Grid_1.default>);
    }
    return (<Grid_1.default spacing={8} {...previewGridProps === null || previewGridProps === void 0 ? void 0 : previewGridProps.container} container className={(0, clsx_1.default)(classes === null || classes === void 0 ? void 0 : classes.root, previewGridClasses === null || previewGridClasses === void 0 ? void 0 : previewGridClasses.container)}>
      {fileObjects.map((fileObject, i) => {
            return (<Grid_1.default xs={4} {...previewGridProps === null || previewGridProps === void 0 ? void 0 : previewGridProps.item} item={true} key={i} className={(0, clsx_1.default)(classes === null || classes === void 0 ? void 0 : classes.imageContainer, previewGridClasses === null || previewGridClasses === void 0 ? void 0 : previewGridClasses.item)}>
            {getPreviewIcon(fileObject, classes)}

            {showFileNames ? (<Typography_1.default component="p">{fileObject.file.name}</Typography_1.default>) : null}

            <Fab_1.default onClick={handleRemove(i)} aria-label="Delete" className={classes === null || classes === void 0 ? void 0 : classes.removeButton}>
              <Delete_1.default />
            </Fab_1.default>
          </Grid_1.default>);
        })}
    </Grid_1.default>);
}
PreviewList.propTypes = {
    classes: prop_types_1.default.object.isRequired,
    fileObjects: prop_types_1.default.arrayOf(prop_types_1.default.object).isRequired,
    getPreviewIcon: prop_types_1.default.func.isRequired,
    handleRemove: prop_types_1.default.func.isRequired,
    previewChipProps: prop_types_1.default.object,
    previewGridClasses: prop_types_1.default.object,
    previewGridProps: prop_types_1.default.object,
    showFileNames: prop_types_1.default.bool,
    useChipsForPreview: prop_types_1.default.bool,
};
const StyledPreviewList = (0, system_1.styled)(PreviewList, {
    name: "MuiDropzonePreviewList",
})((combinedProps) => {
    const { theme: { palette, shape, spacing }, } = combinedProps;
    return {
        root: {},
        imageContainer: {
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            "&:hover $image": {
                opacity: 0.3,
            },
            "&:hover $removeButton": {
                opacity: 1,
            },
        },
        image: {
            height: 100,
            width: "initial",
            maxWidth: "100%",
            color: palette.text.primary,
            transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
            boxSizing: "border-box",
            boxShadow: "rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px",
            borderRadius: shape.borderRadius,
            zIndex: 5,
            opacity: 1,
        },
        removeButton: {
            transition: ".5s ease",
            position: "absolute",
            opacity: 0,
            top: spacing(-1),
            right: spacing(-1),
            width: 40,
            height: 40,
            "&:focus": {
                opacity: 1,
            },
        },
    };
});
exports.default = StyledPreviewList;
//# sourceMappingURL=PreviewList.jsx.map