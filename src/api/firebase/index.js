import {firebaseApp, FIREBASE_DATABASE_REF} from "../../config/firebase";
import getCoord from '../google-geocode';

class firebaseWrapper {
    constructor() {
        this.storageRef = firebaseApp.storage().ref();
        this.databaseRef = firebaseApp.database().ref(FIREBASE_DATABASE_REF);
    }

    getStorageRef = () => {
        return (this.storageRef);
    };

    /**
     * Saving new url to firebase and deleting from the storage the tmp uploaded one
     * @param galleryId
     * @param imageId
     * @param newUrl
     * @returns {Promise<any>}
     */
    updateImageToDatabase(galleryId, imageId, data) {
        return (new Promise((resolve, reject) => {
                firebaseApp.storage().ref().child(galleryId).child('images').child(imageId).update(data).then(result => {
                    console.log("sending");
                    console.log(result);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            }
        ));
    }

    saveGalleryToDatabase(formData) {
        return new Promise((resolve, reject) => {
            getCoord(formData.location).then((result) => {
                resolve(this.databaseRef.push({
                    name: formData.name,
                    location: result,
                    images: []
                }));
            }).catch((error) => reject(error));
        });
    };

    saveImageToDatabase(file, imageKey, GalleryKey) {
        return new Promise((resolve, reject) => {
            return (this.storageRef.child(FIREBASE_DATABASE_REF).child(imageKey).getDownloadURL().then(url => {
                this.databaseRef.child(GalleryKey).child('images').push({
                    name: file.name,
                    url: url
                }).then(() => resolve('success'))
                    .catch(error => reject(error));
            }));
        });
    };

    checkImages = (galleryId) => {
        let value;

        return new Promise((resolve, reject) => {
            this.databaseRef.child(galleryId).child("images").once("value", (snapshot) => {
                snapshot.forEach((image) => {
                    value = image.val();
                    if (!value.hasOwnProperty("thumbnail")) {
                        console.log("Error with ", image.key);
                        value['working'] = false;
                        this.databaseRef.child(galleryId).child('images').child(image.key).update({
                            name: value.name,
                            url: value.url,
                            recheck: true
                        }).then(result => {
                            console.log(result);
                            resolve(result);
                        }).catch(error => {
                            console.log(error);
                            reject(error);
                        });
                    }
                });
                resolve('ok');
            }).catch(error => reject(error));
        });
    };

    getGalleries() {
        let back = [];
        let tmp;

        return new Promise((resolve, reject) => {
            this.databaseRef.once("value", (snapshot) => {
                snapshot.forEach(function (child) {
                    tmp = {...child.val()};
                    tmp.key = child.key;
                    back.push(tmp);
                });
                resolve(back);
            }).catch(error => reject(error));
        });
    }

    getGallery(id) {
        return new Promise((resolve, reject) => {
            this.databaseRef.child(id).once("value", (snapshot) => {
                resolve(snapshot.val());
            }).catch(error => reject(error));
        });
    }
}

export default firebaseWrapper;
