export function isImage(file) {
    const fileName = file.name || file.path;
    const suffix = fileName.substr(fileName.indexOf('.') + 1).toLowerCase();
    if (suffix === 'jpg' || suffix === 'jpeg' || suffix === 'bmp' || suffix === 'png') {
        return true;
    }
}
