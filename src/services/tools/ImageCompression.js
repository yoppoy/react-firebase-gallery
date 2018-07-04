export default function compressImage (url, newHeight, quality = 0.5) {
    const img = new Image();
    let canvas;
    let ctx;
    let newDataUrl;

    img.src = url;
    console.log("1");
    return new Promise((resolve, reject) => {
        img.onload = () => {
            console.log("2");
            canvas = document.createElement("canvas");
            canvas.width = Math.floor(img.width / img.height * newHeight);
            canvas.height = newHeight;
            ctx = canvas.getContext("2d");
            console.log(img.width + " - " + img.height + " -> " + canvas.width + " - " + canvas.height);
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
            console.log("3");
            newDataUrl = canvas.toDataURL("image/jpeg", quality);
            resolve(newDataUrl);
        };
    });
};