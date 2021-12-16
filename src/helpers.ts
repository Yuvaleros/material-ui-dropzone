export function isImage(file: File) {
  if (file.type.split("/")[0] === "image") {
    return true;
  }
}

const bytesInKiloB = 1024 as const; // 2 ** 10;
const bytesInMegaB = 1048576 as const; // bytesInKiloB ** 2;

export function convertBytesToMbsOrKbs(filesize: number) {
  let size = "";
  if (filesize >= bytesInMegaB) {
    size = filesize / bytesInMegaB + " megabytes";
  } else if (filesize >= bytesInKiloB) {
    size = filesize / bytesInKiloB + " kilobytes";
  } else {
    size = filesize + " bytes";
  }
  return size;
}

export async function createFileFromUrl(url: string) {
  const response = await fetch(url);
  const data = await response?.blob();
  const metadata = { type: data.type };
  const filename = url.replace(/\?.+/, "").split("/").pop();
  return new File([data], filename!, metadata);
}

export function readFile(file: File) {
  return new Promise(
    (
      resolve: (value: string | ArrayBuffer | null | undefined) => void,
      reject: (reason?: ProgressEvent<FileReader>) => void
    ) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event?.target?.result);
      };
      reader.onerror = (event) => {
        reader.abort();
        reject(event);
      };
      reader.readAsDataURL(file);
    }
  );
}
