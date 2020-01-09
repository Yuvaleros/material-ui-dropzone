export function isImage(file) {
    const fileName = file.name || file.path;
    const suffix = fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();
    if (suffix === 'jpg' || suffix === 'jpeg' || suffix === 'bmp' || suffix === 'png') {
        return true;
    }
}
export function convertBytesToMbsOrKbs(filesize){
  var size = '';
  // I know, not technically correct...
  if(filesize >= 1000000){
    size = (filesize / 1000000) + ' megabytes';
  }else if(filesize >= 1000){
    size = (filesize / 1000) + ' kilobytes';
  }else{
    size = filesize + ' bytes' 
  }
  return size
}

export async function createFileFromUrl (url) {
  const response = await fetch(url);
  const data = await response.blob();
  const metadata = { type: data.type };
  const filename = url.replace(/\?.+/, '').split('/').pop();
  const ext = data.type.split('/').pop();
  return new File([data], `${filename}.${ext}`, metadata);
}