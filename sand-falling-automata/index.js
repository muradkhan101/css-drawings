const fps = 30;
const pixelWidth = 4;

function isEmpty(pixel) {
    return pixel[pixelWidth - 1] === 0;
}

function getPixelBelow(pixelIndex, imgWidth) {
    return pixelIndex + imgWidth * pixelWidth;
}

function getPixelBottomLeft(pixelIndex, imgWidth) {
    return getPixelBelow(pixelIndex, imgWidth) - pixelWidth;
}

function getPixelBottomRight(pixelIndex, imgWidth) {
    return getPixelBelow(pixelIndex, imgWidth) + pixelWidth;
}

function slicePixel(imgData, pixelIndex) {
    return imgData.slice(pixelIndex, pixelIndex + 4);
}

function copyPixel(imgData, pixelCopyToStart, pixelCopyFromStart) {
    for (let i = 0; i < pixelWidth - 1; i++) {
        imgData[pixelCopyToStart + i] = imgData[pixelCopyFromStart + i];
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const img = document.getElementById('image');
    img.crossOrigin = "";

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let loaded = false;
    img.onload = () => {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        loaded = true;
    };


    
    window.setInterval(() => {
        if (!loaded) return;
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = canvas.width * 4 * canvas.height - 4; i >= 0 ; i -= pixelWidth) {
            const pixel = slicePixel(imgData, i);
            if (isEmpty(getPixelBelow(i))) {
                copyPixel(imgData, getPixelBelow(i), i);
                continue;
            }
            const bottomLeftRightPixels = [getPixelBottomLeft(i), getPixelBottomRight(i)];
            bottomLeftRightPixels = bottomLeftRightPixels.filter(p => !isEmpty(p));
            if (!bottomLeftRightPixels.length) continue;
            if (bottomLeftRightPixels.length === 1) {
                copyPixel(imgData, bottomLeftRightPixels[0], i);
            } else {
                copyPixel(imgData, bottomLeftRightPixels[Math.floor(Math.random() + 0.5)], i);
            }
        }
        ctx.putImageData(imgData, 0, 0);
    }, 1000/fps);
});