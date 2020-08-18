export function isImage(file) {
  if (file.type.split('/')[0] === 'image') {
    return true;
  }
  return false;
}

export function convertBytesToMbsOrKbs(filesize) {
  let size = '';
  // I know, not technically correct...
  if (filesize >= 1000000) {
    size = `${filesize / 1000000} megabytes`;
  } else if (filesize >= 1000) {
    size = `${filesize / 1000} kilobytes`;
  } else {
    size = `${filesize} bytes`;
  }
  return size;
}

export async function createFileFromUrl(url) {
  const response = await fetch(url);
  const data = await response.blob();
  const metadata = { type: data.type };
  const filename = url.replace(/\?.+/, '').split('/').pop();
  return new File([data], filename, metadata);
}

export function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event?.target?.result);
    };
    reader.onerror = (event) => {
      reader.abort();
      reject(event);
    };
    reader.readAsDataURL(file);
  });
}
