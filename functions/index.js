require('dotenv').config();

const functions = require("firebase-functions");
const gcs = require('@google-cloud/storage');
const os = require('os');
const path = require('path');
const cloudinary = require('cloudinary');
const admin = require('firebase-admin');
const compressor = require('./imageCompression');
const spawn = require('child-process-promise').spawn;

/*
 * Initialising web services
 */
admin.initializeApp(functions.config().firebase);
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

/*
* Initialising web services variables
* */
var db = admin.database();
var ref = db.ref(process.env.FIREBASE_DATABASE_REF);

function uploadToCloudinary(url) {
    console.log("uploading to cloudinary ", url);
    return (new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(url, {
                eager: [
                    {width: 1500, height: 1000, crop: "fit"},
                    {width: 900, height: 600, crop: "fit"},
                    {width: 300, height: 200, crop: "fit"}]
            },
            (error, result) => {
                console.log(result);
                if (!error)
                    resolve(result);
                reject(error);
            });
    }));
}


function deleteFromStorage() {
    return (new Promise((resolve, reject) => {
            resolve('ok');
        }
    ));
}

/**
 * Saving new url to firebase and deleting from the storage the tmp uploaded one
 * @param galleryId
 * @param imageId
 * @param newUrl
 * @returns {Promise<any>}
 */
function saveToFirebase(galleryId, imageId, data) {
    console.log("Saving to firebase");
    return (new Promise((resolve, reject) => {
            ref.child(galleryId).child('images').child(imageId).update(data).then(result => {
                deleteFromStorage().then(result => {
                    console.log(result);
                    resolve(result);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        }
    ));
}

/**
 * Generates 3 compressed images :
 * - Compressed full size
 * - Lighbox size
 * - Thumbnail size
 * Then uploads one by one the images on cloudinary
 * @param url
 * @param galleryId
 * @param imageId
 * @returns {Promise<any>}
 */
function uploadImage(url, galleryId, imageId) {
    return (new Promise((resolve, reject) => {

            uploadToCloudinary(compressed[key]).then(result => {
                object[key] = result.url;
                saveToFirebase(galleryId, imageId, object).then(result => {
                    resolve(result);
                }).catch(error => {
                    reject(error);
                });
            }).catch(error => {
                reject(error);
            });
        }
    ));
}

function extractUrl(val) {
    let url = val.url;

    return (new Promise((resolve, reject) => {
            if (val.hasOwnProperty('token')) {
                reject("Not implemented");
                /*getFileFromDrive(url, val.token).then(url => {
                    resolve(url);
                }).catch((err) => {
                    reject(err);
                });*/
            }
            else
                resolve(url);
        }
    ));
}

function exportImage(snapshot, context) {
    const galleryId = context.params.galleryId;
    const imageId = context.params.imageId;

    console.log("VALUE: ", snapshot);
    return (new Promise((resolve, reject) => {
        extractUrl(snapshot).then(imageUrl => {
            compressor(imageUrl).then((imageUrl) => {
                uploadToCloudinary(imageUrl).then(result => {
                    saveToFirebase(galleryId, imageId, {
                        url: result.eager[0].url,
                        lightbox: result.eager[1].url,
                        thumbnail: result.eager[2].url
                    }).then(result => {
                        resolve(result);
                    }).catch(error => {
                        reject(error);
                    });
                }).catch(error => {
                    reject(error);
                });
            });
        });
    }));
}

/**
 * Event triggered when a new image is saved in the database
 * (not when it is uploaded ! when its reference is saves on a gallery)
 * @type {CloudFunction<DataSnapshot>}
 */
exports.onFileUpload = functions.database.ref('/Galleries/{galleryId}/images/{imageId}')
    .onCreate((snapshot, context) => {
        console.log("Parsing a new image");
        return (exportImage(snapshot.val(), context));
    });

exports.onErrorUpload = functions.database.ref('/Galleries/{galleryId}/images/{imageId}')
    .onUpdate((snapshot, context) => {
        console.log("Reparsing image");
        return (exportImage(snapshot.after.val(), context));
    });
