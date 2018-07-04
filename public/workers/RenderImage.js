function renderImage(data) {
    console.log(data);
    const img = data.img;
    let newHeight = data.newHeight;
    let quality = data.quality ? data.quality : 0.5;
    let canvas;
    let ctx;
    let newDataUrl;

    return new Promise(resolve => {
        canvas = data.canvas;
        canvas.width = Math.floor(img.width / img.height * newHeight);
        canvas.height = newHeight;
        ctx = data.ctx;
        console.log(img.width + " - " + img.height + " -> " + canvas.width + " - " + canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        newDataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(newDataUrl);
    });
};

function getUrl(data) {
    let reader;

    return new Promise(resolve => {
        reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onload = (e) => {
            resolve(e.target.result);
        };
    });
}

self.addEventListener("message", function (e) {
    let result;

    switch (e.data.type) {
        case 'GET_URL' :
            getUrl(e.data.content).then(result => {
                self.postMessage({type: 'GET_URL', content: result})
            });
            break;
        case 'RENDER_IMAGE' :
            renderImage(JSON.parse(e.data.content)).then(result => {
                self.postMessage({type: 'RENDER_IMAGE', content: result})
            });
            break;
        default:
            self.postMessage("Invalid Command")
    }
});