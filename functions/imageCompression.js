require('dotenv').config();

const os = require('os');
const uuid = require('uuid');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const axios = require('axios');


const getExtension = (url) => {
    // Remove everything to the last slash in URL
    url = url.substr(1 + url.lastIndexOf("/"));

    // Break URL at ? and take first part (file name, extension)
    url = url.split('?')[0];

    // Sometimes URL doesn't have ? but #, so we should aslo do the same for #
    url = url.split('#')[0];

    // Now we have only extension
    return url.split('.').pop();
};

const compressImage = (url, maxWidth, maxHeight, quality = 77, type = "normal") => {
    return new Promise((resolve, reject) => {
        let fileType = getExtension(url);
        let compressedImageUrl = path.join(os.tmpdir(), uuid.v4()) + '-' + type + '.' + fileType;

        if (fileType === 'jpg' || fileType === 'jpeg')
            sharp(url)
                .resize({width: maxWidth, height: maxHeight, fit: 'inside'})
                /*.jpeg({
                    quality: quality,
                    chromaSubsampling: '4:4:4'
                })*/
                .toFile(compressedImageUrl, (err, info) => {
                    if (err)
                        reject(err);
                    resolve(compressedImageUrl);
                });
        else if (fileType === 'png')
            sharp(url)
                .resize({width: maxWidth, height: maxHeight, fit: 'inside'})
                .png()
                .toFile(compressedImageUrl, (err, info) => {
                    if (err)
                        reject(err);
                    resolve(compressedImageUrl);
                });
        else
            reject('Error unsupported file type');
    });
};

function downloadImage(url, extension = ".jpg") {
    let file = path.join(os.tmpdir(), uuid.v4() + extension);

    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: url,
            responseType: 'stream'
        }).then((response) => {
            console.log(response);
            response.data.pipe(fs.createWriteStream(file));
            response.data.on('end', () => {
                resolve(file);
            });
            response.data.on('error', (error) => {
                reject(error);
            })
        });
    })
}

module.exports = (fileUrl) => {

    return new Promise((resolve, reject) => {
        downloadImage(fileUrl).then((url) => {
                compressImage(url, 1500, 1500, 77).then((Image) => {
                    resolve(Image);
                }).catch((err) => {
                    console.log(err);
                });
            }
        )
        ;
    });
};

/*createCompress('https://firebasestorage.googleapis.com/v0/b/anonygrapher-53ceb/o/Galleries%2F04d5d2a2-da5d-4a20-add5-aa11f654fa84.jpg?alt=media&token=05afc62f-92b0-4b83-8481-77b52e3da796').then((url) => {
    console.log(url);
});

function createCompress(fileUrl) {
    return new Promise((resolve, reject) => {
        downloadImage(fileUrl).then((url) => {
                compressImage(url, 1500, 1500, 77).then((Image) => {
                    resolve(Image);
                }).catch((err) => {
                    console.log(err);
                });
            }
        )
        ;
    });
}*/
