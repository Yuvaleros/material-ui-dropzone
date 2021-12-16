import { Theme, useTheme } from "@mui/material";
import React, { ComponentType, forwardRef } from "react";

type WithoutTheme<P> = Omit<P, "theme">;

function withTheme<P extends { theme?: Theme }>(Component: ComponentType<P>) {
  return forwardRef(function ComponentWithTheme(
    props: WithoutTheme<P>,
    ref: any
  ) {
    const theme = useTheme();
    const combinedProps = { ...props, theme } as P;

    return <Component ref={ref} {...combinedProps} />;
  });
}

export { withTheme };
