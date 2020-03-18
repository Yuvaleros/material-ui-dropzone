export function isImage(file) {
    if (file.type.split('/')[0] === 'image') {
        return true;
    }
}
export function convertBytesToMbsOrKbs(filesize) {
    let size = '';
    // I know, not technically correct...
    if (filesize >= 1000000) {
        size = (filesize / 1000000) + ' megabytes';
    } else if (filesize >= 1000) {
        size = (filesize / 1000) + ' kilobytes';
    } else {
        size = filesize + ' bytes';
    }
    return size;
}

export async function createFileFromUrl(url) {
    const response = await fetch(url);
    const data = await response.blob();
    const metadata = {type: data.type};
    const filename = url.replace(/\?.+/, '').split('/').pop();
    const ext = data.type.split('/').pop();
    return new File([data], `${filename}.${ext}`, metadata);
}
