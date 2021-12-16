import { SnackbarContentProps } from "@mui/material/SnackbarContent";
import { AlertType } from "../types";
export interface SnackbarContentWrapperProps extends Omit<SnackbarContentProps, "variant"> {
    classes?: {
        closeButton?: string;
        icon?: string;
        message?: string;
    } & Partial<Record<AlertType, string>>;
    onClose?: () => void;
    variant: AlertType;
}
declare const StyledSnackbarContentWrapper: StyledComponent<ComponentProps, SpecificComponentProps, JSXProps>;
export default StyledSnackbarContentWrapper;
//# sourceMappingURL=SnackbarContentWrapper.d.ts.map