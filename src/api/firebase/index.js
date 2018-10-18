import {firebaseApp, FIREBASE_DATABASE_REF, FIREBASE_UPLOAD_REF} from "../../api/firebase/config";
import geocodeWrapper from '../google-geocode';

class firebaseWrapper {
    constructor() {
        this.storageRef = firebaseApp.storage().ref();
    }

    getStorageRef = () => {
        return (this.storageRef);
    };

    saveGalleryToDatabase(formData) {
        return new Promise((resolve, reject) => {
            geocodeWrapper.getCoord(formData.location).then((result) => {
                resolve(firebaseApp.database().ref('Galleries').push({
                    name: formData.name,
                    location: result,
                    images: []
                }));
            }).catch((error) => reject(error));
        });
    };

    saveImageToDatabase(file, imageKey, GalleryKey) {
        return new Promise((resolve, reject) => {
            return (this.storageRef.child(FIREBASE_UPLOAD_REF).child(imageKey).getDownloadURL().then(url => {
                firebaseApp.database().ref(FIREBASE_DATABASE_REF).child(GalleryKey).child('images').push({
                    name: file.name,
                    url: url
                }).then(() => resolve('success'))
                    .catch(error => reject(error));
            }));
        });
    };

    getGalleries() {
        let back = [];
        let tmp;

        return new Promise((resolve, reject) => {
            firebaseApp.database().ref('Galleries').once("value", (snapshot) => {
                snapshot.forEach(function (child) {
                    tmp = {...child.val()};
                    tmp.key = child.key;
                    back.push(tmp);
                });
                resolve(back);
            }).catch(error => reject(error));
        });
    }
}

export default firebaseWrapper;