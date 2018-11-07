import React, {Component} from 'react';
import FileUploader from '../../lib/react-firebase-file-uploader';
import {v4 as generateRandomID} from 'uuid';
import {FIREBASE_UPLOAD_REF} from "../../config/firebase";
import firebaseWrapper from "../../api/firebase";
import UploadInterface from "./views/interface";

const TARGET_FILE = "TARGET_FILE";
const DRIVE_FILE = "DRIVE_FILE";
const DRIVE_THUMBNAIL_URL = "https://drive.google.com/thumbnail?id=";


class Upload extends Component {
    constructor(props) {
        super(props);

        this.firebaseWrapper = new firebaseWrapper();
        this.state = {
            status: {
                progress: 0,
                uploading: false,
                uploaded: false,
                error: null
            },
            files: {},
            galleryKey: null,
            driveToken: null
        };
        this.interfaceRef = React.createRef();
    }

    handleUploadStart = () => {
        let status = {...this.state.status};

        status.uploading = true;
        this.setState({status});
        this.interfaceRef.current.updateFormStatus(status);
    };

    handleProgress = (progress) => {
        let status = {...this.state.status};

        status.progress = progress;
        this.setState({status});
        this.interfaceRef.current.updateFormStatus(status);
    };

    handleUploadError = (error) => {
        this.setState({isUploading: false});
        console.error(error);
    };

    /**
     * Saves the url of the uploaded image in the database
     * @param filename
     */
    handleUploadSuccess = (filename) => {
        let key = filename.replace(/\.[^/.]+$/, "");

        this.firebaseWrapper.saveImageToDatabase(this.state.files[key], filename, this.state.galleryKey).then(() => {
            this.validateFileUpload(key);
        })
    };

    handleChange = (event) => {
        this.addFiles([...event.target.files]);
    };

    /**
     * Resets the selected files
     */
    reset = () => {
        const files = {...this.state.files};

        if (files) {
            Object.keys(files).map(key => {
                this.removeFile(key);
                return (null);
            });
            this.setState({
                isUploading: false,
                progress: 0,
                files: {},
                galleryKey: null
            });
        }
    };

    /**
     * Creates the gallery in firebase
     * Uploads the images to storage
     * Links those image to the database
     * @param formData
     */
    upload = (formData) => {
        const {files} = this.state;
        let updated = {...this.state.files};
        let status;

        this.firebaseWrapper.saveGalleryToDatabase(formData).then((data) => {
            this.setState({galleryKey: data.key}, () => {
                Object.keys(files).map(key => {
                    if (files[key].type === TARGET_FILE) {
                        updated[key].state.isLoading = true;
                        this.setState({files: updated});
                        this.fileUploader.startUpload(files[key].file, files[key].id);
                    }
                    else {
                        this.firebaseWrapper.saveDriveImageToDatabase(files[key], this.state.galleryKey, this.state.driveToken).then(() => {
                            this.validateFileUpload(key);
                        });
                    }
                    return (null);
                });
            });
        }).catch((error) => {
            status = {...this.state.status};
            status.error = error;
            this.setState({status});
            this.interfaceRef.current.updateFormStatus(status);
        });
    };

    /**
     * Adds files selected from drive to the files state variable
     * @param newFiles
     */
    addDriveFiles = (newFiles, token) => {
        let files;

        files = {...this.state.files};
        newFiles.forEach(file => {
            files[file.id] = {
                id: file.id,
                type: DRIVE_FILE,
                img: DRIVE_THUMBNAIL_URL + file.id,
                name: file.name,
                date: file.lastEditedUtc,
                file: null,
                state: {
                    isLoading: false,
                    isUploaded: false
                }
            };
        });
        this.setState({files});
        this.setState({driveToken: token});
    };

    /**
     * Adds a list of files to the files state variable
     * @param newFiles
     * @param index
     * @param reader
     */
    addFiles = (newFiles, index = 0, reader) => {
        let files = {...this.state.files};
        let newId = generateRandomID();

        if (index >= newFiles.length)
            return;
        files[newId] = {
            id: newId,
            type: TARGET_FILE,
            img: null,
            name: newFiles[index].name,
            date: newFiles[index].lastModifiedDate.getDate(),
            file: newFiles[index],
            state: {
                isLoading: false,
                isUploaded: false
            }
        };
        this.setState({files}, () => {
            files = {...this.state.files};
            files[newId].img = URL.createObjectURL(newFiles[index]);
            this.setState({files}, () => {
                this.addFiles(newFiles, index + 1)
            });
        });
    };

    /**
     * Validates the upload of an image, this is the final step to update the ui when an image has been uploaded
     * Detects if there are any files left to upload, if yes state changes
     * @param key
     */
    validateFileUpload = (key) => {
        let updated = {...this.state.files};
        let completed;
        let status;

        updated[key].state = {
            isLoading: false,
            isUploaded: true
        };
        this.setState({files: updated}, () => {
            completed = Object.keys(this.state.files).every((key) => {
                return (this.state.files[key].state.isUploaded);
            });
            if (completed) {
                status = {...this.state.status};
                status.uploaded = true;
                status.uploading = false;
                this.interfaceRef.current.updateFormStatus(status);
                this.props.close();
            }
        });
    };

    /**
     * Removes a file from the files state variable
     * @param key
     */
    removeFile = (key) => {
        let files = {...this.state.files};
        let file = files[key];

        if (file) {
            if (file.type === TARGET_FILE)
                URL.revokeObjectURL(files[key].img);
            delete files[key];
            this.setState({files});
        }
    };

    render() {
        return (
            <div style={{display: 'inherit', height: '100%'}}>
                <FileUploader
                    hidden
                    id="uploader"
                    name="uploader"
                    accept=".jpg"
                    storageRef={this.firebaseWrapper.getStorageRef().child(FIREBASE_UPLOAD_REF)}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                    onChange={this.handleChange}
                    ref={instance => {
                        this.fileUploader = instance;
                    }}
                    multiple
                    required
                />
                <UploadInterface files={this.state.files}
                                 innerRef={this.interfaceRef}
                                 functions={{
                                     addFiles: this.addFiles,
                                     addDriveFiles: this.addDriveFiles,
                                     removeFile: this.removeFile,
                                     upload: this.upload,
                                     reset: this.reset
                                 }}/>
            </div>
        );
    }
}

export default Upload;
