/// <reference types="react" />
import { ChipProps } from "@mui/material/Chip";
import { GridProps } from "@mui/material/Grid";
import { FileObject } from "../types";
export interface PreviewListProps {
    classes?: {
        image?: string;
        imageContainer?: string;
        removeButton?: string;
        root?: string;
    };
    fileObjects: FileObject[];
    getPreviewIcon: (fileObject: FileObject, classes: PreviewListProps["classes"]) => JSX.Element;
    handleRemove: (index: number) => ChipProps["onDelete"];
    previewChipProps?: ChipProps;
    previewGridClasses?: {
        container?: string;
        item?: string;
    };
    previewGridProps?: {
        container?: GridProps;
        item?: GridProps;
    };
    showFileNames?: boolean;
    useChipsForPreview?: boolean;
}
declare const StyledPreviewList: StyledComponent<ComponentProps, SpecificComponentProps, JSXProps>;
export default StyledPreviewList;
//# sourceMappingURL=PreviewList.d.ts.map