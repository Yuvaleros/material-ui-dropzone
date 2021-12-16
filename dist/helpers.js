"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = exports.createFileFromUrl = exports.convertBytesToMbsOrKbs = exports.isImage = void 0;
const tslib_1 = require("tslib");
function isImage(file) {
    if (file.type.split("/")[0] === "image") {
        return true;
    }
}
exports.isImage = isImage;
const bytesInKiloB = 1024; // 2 ** 10;
const bytesInMegaB = 1048576; // bytesInKiloB ** 2;
function convertBytesToMbsOrKbs(filesize) {
    let size = "";
    if (filesize >= bytesInMegaB) {
        size = filesize / bytesInMegaB + " megabytes";
    }
    else if (filesize >= bytesInKiloB) {
        size = filesize / bytesInKiloB + " kilobytes";
    }
    else {
        size = filesize + " bytes";
    }
    return size;
}
exports.convertBytesToMbsOrKbs = convertBytesToMbsOrKbs;
function createFileFromUrl(url) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        const data = yield (response === null || response === void 0 ? void 0 : response.blob());
        const metadata = { type: data.type };
        const filename = url.replace(/\?.+/, "").split("/").pop();
        return new File([data], filename, metadata);
    });
}
exports.createFileFromUrl = createFileFromUrl;
function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            var _a;
            resolve((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.result);
        };
        reader.onerror = (event) => {
            reader.abort();
            reject(event);
        };
        reader.readAsDataURL(file);
    });
}
exports.readFile = readFile;
//# sourceMappingURL=helpers.js.map