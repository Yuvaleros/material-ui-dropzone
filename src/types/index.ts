export interface FileObject {
  readonly file: File;
  readonly data: string | ArrayBuffer | null | undefined;
}

export type AlertType = "error" | "info" | "success" | "warning";
