const fps = 5;
const pixelWidth = 4;
const imgUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAACACAYAAAB9V9ELAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFGmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0MzUyLCAyMDIwLzAxLzMwLTE1OjUwOjM4ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjAtMTItMzFUMjA6MDI6MDEtMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIwLTEyLTMxVDIwOjA2OjI1LTA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTEyLTMxVDIwOjA2OjI1LTA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmY0NWFmNTczLTEyZjgt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';
let lastImageData = null;

function isEmpty(imgData, pixel) {
    return imgData[pixel + pixelWidth - 1] === 0;
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

function getRandomElement(array) {
    const ind = Math.floor(array.length * Math.random());
    return array[ind];
}

function copyPixelAndClearIt(imgData, pixelCopyToStart, pixelCopyFromStart) {
    for (let i = 0; i < pixelWidth; i++) {
        imgData[pixelCopyToStart + i] = imgData[pixelCopyFromStart + i];
        imgData[pixelCopyFromStart + i] = 0;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const img = document.getElementById('image');
    img.src = imgUrl;

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let loaded = false;
    img.onload = () => {
        console.log(`Loaded image with size: ${img.width}x${img.height}`);
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        loaded = true;
    };


    
    window.setInterval(() => {
        if (!loaded) {
            return console.log('Image not loaded');
        }
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = canvas.width * 4 * canvas.height - 4; i >= 0 ; i -= pixelWidth) {
            if (isEmpty(imgData.data, getPixelBelow(i, canvas.width))) {
                copyPixelAndClearIt(imgData.data, getPixelBelow(i, canvas.width), i);
                continue;
            }
            const bottomLeftRightPixels = [
                getPixelBottomLeft(i, canvas.width),
                getPixelBottomRight(i, canvas.width)
            ].filter(p => isEmpty(imgData.data, p));

            if (!bottomLeftRightPixels.length) {
                continue;
            };
            if (bottomLeftRightPixels.length === 1) {
                copyPixelAndClearIt(imgData.data, bottomLeftRightPixels[0], i);
            } else {
                copyPixelAndClearIt(imgData.data, getRandomElement(bottomLeftRightPixels), i);
            }
        }
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(imgData, 0, 0);
        lastImageData = imgData;
    }, 1000/fps);
});