

compressImage = (url, newHeight, quality = 0.5) => {
    const img = new Image();
    let canvas;
    let ctx;
    let newDataUrl;

    return new Promise((resolve, reject) => {
        img.src = url;
        img.onload = () => {
            canvas = document.createElement("canvas");
            canvas.width = Math.floor(img.width / img.height * newHeight);
            canvas.height = newHeight;
            ctx = canvas.getContext("2d");
            console.log(img.width + " - " + img.height + " -> " + canvas.width + " - " + canvas.height);
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
            newDataUrl = canvas.toDataURL("image/jpeg", quality);
            resolve(newDataUrl);
        };
    });
};

export default readFiles = (files, index = 0) => {
    let reader;
    let preview;

    if (index >= files.length)
        return;
    reader = new FileReader();
    reader.onload = (e) => {
        this.compressImage(e.target.result, 400).then((preview) => {
            console.log(preview);
            this.setState(prevState => ({
                    files: [...prevState.files, {
                        preview: preview,
                        post: files[index]
                    }]
                }),
                () => {
                    this.readFiles(files, index + 1);
                }
            );
        });
    };
    reader.readAsDataURL(files[index]);
};