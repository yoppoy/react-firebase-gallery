import React, {Component} from 'react';
import FileUploader from '../../lib/react-firebase-file-uploader';
import {v4 as generateRandomID} from 'uuid';
import firebaseApp from "../../config/firebase/index";
import UploadDialog from "./views/dialog";

var storageRef = firebaseApp.storage().ref();

class Upload extends Component {
    state = {
        isUploading: false,
        progress: 0,
        files: {},
        fireBaseKey: null
    };

    handleUploadStart = () => this.setState({isUploading: true, progress: 0});

    handleProgress = (progress) => this.setState({progress});

    handleUploadError = (error) => {
        this.setState({isUploading: false});
        console.error(error);
    };

    handleUploadSuccess = (filename) => {
        let key = filename.replace(/\.[^/.]+$/, "");
        let updated = {...this.state.files};

        updated[key].state.isLoading = false;
        updated[key].state.isUploaded = true;
        this.setState({files: updated});
        if (this.state.fireBaseKey)
            storageRef.child("Galleries").child(filename).getDownloadURL().then(url => {
                console.log("Adding image : ", this.state.files[key]);
                firebaseApp.database().ref('Galleries').child(this.state.fireBaseKey).child('images').push({
                    name: this.state.files[key].name,
                    url: url
                }, () => console.log('pushed'));
            });
        else
            console.log("Error firebase key not loaded");
    };

    addFiles = (newFiles, index = 0, reader) => {
        let updatedFiles;
        let files;
        let newId = generateRandomID();

        if (index >= newFiles.length)
            return;
        files = {...this.state.files};
        files[newId] = {
            id: newId,
            type: "TARGET_FILE",
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

    addDriveFiles = (newFiles) => {
        let files;

        files = {...this.state.files};
        newFiles.forEach(file => {
            files[file.id] = {
                id: file.id,
                type: "DRIVE_FILE",
                img: "https://drive.google.com/thumbnail?id=" + file.id,
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
    };

    handleChange = (event) => {
        this.addFiles([...event.target.files]);
    };

    upload = (formData) => {
        const {files} = this.state;
        let updated = {...this.state.files};

        firebaseApp.database().ref('Galleries').push({
            name: formData.name,
            location: formData.location,
            images: []
        }).then((data) => {
            this.setState({fireBaseKey: data.key}, () => {
                Object.keys(files).map(key => {
                    if (files[key].type === "TARGET_FILE") {
                        updated[key].state.isLoading = true;
                        this.setState({files: updated});
                        this.fileUploader.startUpload(files[key].file, files[key].id);
                    }
                });
            });
        }).catch((error) => {
            console.log('error ', error)
        });
    };

    removeFile = (id) => {
        let files = {...this.state.files};

        if (files[id]) {
            URL.revokeObjectURL(files[id].img);
            delete files[id];
            this.setState({files}, () => {
                console.log(this.state.files);
            });
        }
    };

    render() {
        return (
            <div>
                <FileUploader
                    hidden
                    id="uploader"
                    name="uploader"
                    accept="image/*"
                    storageRef={storageRef.child("Galleries")}
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
                <UploadDialog files={this.state.files}
                              functions={{
                                  addFiles: this.addFiles,
                                  addDriveFiles: this.addDriveFiles,
                                  removeFile: this.removeFile,
                                  upload: this.upload
                              }}/>
            </div>
        );
    }
}

/*
*                 <div>
                    <PhotoGridList tileData={this.state.files} removeItem={this.removeFile}/>
                </div>
                <Button onClick={this.uploadToFirebase}>Upload</Button>

* */
export default Upload;