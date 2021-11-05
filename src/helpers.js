export function isImage(file) {
    var reader = new FileReader();
    reader.onloadend = (event) => {
        var arr = (new Uint8Array(event.target.result)).subarray(0, 4);
        var header = "";
        for (var i = 0; i < arr.length; i++) {
            header += arr[i].toString(16);
        }

        switch (header) {
            case "47494638": // GIF
            case "52494646": // WEBP
            case "89504e47": // PNG
            case "ffd8ffe0": // JPEG
            case "ffd8ffe1": // JPEG
            case "ffd8ffe2": // JPEG
            case "ffd8ffe3": // JPEG
            case "ffd8ffe8": // JPEG
                return true;
            default:
                return false;
        }

    }
    fileReader.readAsArrayBuffer(file);
}

export function convertBytesToMbsOrKbs(filesize) {
    let size = '';
    if (filesize >= 1048576) {
        size = (filesize / 1048576) + ' megabytes';
    } else if (filesize >= 1024) {
        size = (filesize / 1024) + ' kilobytes';
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
