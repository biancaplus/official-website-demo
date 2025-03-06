// 获取原始图片路径
export function getOriginalImage(imagePath, folder) {
    return new URL(`/src/assets/images/${folder}/${imagePath}`, import.meta.url).href;
}

// 获取WebP图片路径
export function getWebPImage(imagePath, folder) {
    return new URL(`/src/assets/webp/${folder}/${imagePath.replace(/\.(jpg|png)$/, '.webp')}`, import.meta.url).href;
}
