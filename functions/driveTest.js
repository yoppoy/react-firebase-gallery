require('dotenv').config();
const os = require('os');
const path = require('path');
const cloudinary = require('cloudinary');

/*
 * Initialising web services
 */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

/*
* Initialising web services variables
* */
function uploadToCloudinary(url) {
    console.log("uploading to cloudinary ", url);
    return (new Promise((resolve, reject) => {
            cloudinary.v2.uploader.upload(url,
                {width: 1500, height: 1000, crop: "fit"},
                (error, result) => {
                    console.log(result);
                    if (!error)
                        resolve(result);
                    reject(error);
                });
        }
    ))
        ;
}

uploadToCloudinary('./1.jpg').then ((result) => console.log(result), (error) => console.log(error));
/*const {google} = require('googleapis');
const fs = require('fs');

const os = require('os');
const uuid = require('uuid');
const path = require('path');
const key = require('./config/key.json');
const readline = require('readline');

let jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.readonly.metadata']
);

jwtClient.authorize(function (err, tokens) {
    if (err) {
        console.log(err);
        return;
    } else {
        runSample('1QLyxl8c4xQ7_KWjBZSA-LipmYbvfmxL5').then(result => {
            console.log(result);
        });
    }
});

function runSample(fileId) {
    return new Promise(async (resolve, reject) => {
        const filePath = path.join(os.tmpdir(), uuid.v4());
        console.log(`writing to ${filePath}`);
        const dest = fs.createWriteStream(filePath);
        let progress = 0;
        let drive = google.drive('v3');
        drive.files.get(
            {
                auth: jwtClient,
                fileId: fileId,
                alt: 'media'
            }).on('end', function () {
            console.log('Done');
        })
            .on('error', function (err) {
                console.log('Error during download', err);
            })
            .pipe(dest);
    });
}
*/

/**
 * Get request to obtain the image from google drive (id from file picker api)
 * @param fileId
 * @returns {string}
 */
/**function getFileFromDrive(fileId, token) {
    return (new Promise((resolve, reject) => {
            const filename = uuid.v4();

            // writing to the Firebase log https://firebase.google.com/docs/functions/writing-and-viewing-logs
            console.log(filename);

            // handling auth to write file to Drive
            var auth = new googleAuth();
            var oauth2Client = new auth.OAuth2();
            oauth2Client.setCredentials({
                access_token: token
            });

            // setting Drive access
            var drive = google.drive('v3');

            var media = {
                body: request('http://bucket.trending.com/trending/twitter/2017-08-21/copenhagen-denmark-looks-incredible-anonygrapher.jpg')  //stream!
            };

            // create file on Drive
            drive.files.create({
                resource: {'name': filename},
                media: media,
                fields: 'id',
                auth: oauth2Client
            }, function (err, file) {
                if (err) {
                    // Handle error
                    console.log(err);
                    res.send(err);
                } else {
                    res.send(JSON.stringify({
                        id: file.id
                    }));
                }
            });
        }
    ));
}*/
