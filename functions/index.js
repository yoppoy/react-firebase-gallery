require('dotenv').config();

const functions = require("firebase-functions");
const gcs = require('@google-cloud/storage');
const os = require('os');
const path = require('path');
const cloudinary = require('cloudinary');
const admin = require('firebase-admin');

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


/*
* Get request to obtain the image from google drive (id from file picker api)
* */
function getFromDrive(fileId) {
    var url = "not implemented";
    return (url);
}

function uploadToCloudinary(url) {
    console.log("uploading to cloudinary ", url);
    return (new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(url, (error, result) => {
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

/*
* Saving new url to firebase and deleting from the storage the tmp uploaded one
* */
function saveToFirebase(GalleryId, imageId, newUrl) {
    console.log("Saving to firebase");
    return (new Promise((resolve, reject) => {
            ref.child(GalleryId).child('images').child(imageId).update({url: newUrl}).then(result => {
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

function resizeImage(url, name) {
    const tmpFilePath = path.join(os.tmpdir(), path.basename(name));
    let newUrl = url;

    return (new Promise((resolve, reject) => {
            resolve(url);
        }
    ));
}

/*
 * Event triggered when a new image is saved in the database
 * (not when it is uploaded ! when its reference is saves on a gallery)
 */
exports.onFileUpload = functions.database.ref('/Galleries/{galleryId}/images/{imageId}')
    .onCreate((snapshot, context) => {
        const GalleryId = context.params.galleryId;
        const ImageId = context.params.imageId;

        console.log("VALUE: ", snapshot.val());
        return (new Promise((resolve, reject) => {
            resizeImage(snapshot.val().url, snapshot.val().name).then(tmpDir => {
                uploadToCloudinary(tmpDir).then(result => {
                    console.log("Received : ", result);
                    saveToFirebase(GalleryId, ImageId, result.url).then(result => {
                        resolve (result);
                    }).catch(error => {
                        reject (error);
                    });
                }).catch(error => {
                    reject (error);
                });
            }).catch(error => {
                reject (error);
            });
        }));
    });
