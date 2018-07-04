import React, {Component} from 'react';
import _ from "lodash";
import FileUploader from 'react-firebase-file-uploader';
import {Modal, Button} from 'react-materialize';

import firebaseApp from "../config/firebase";
import Preview from "./Preview";
import compressImage from '../services/tools/ImageCompression';
import '../styles/flexImagelayout.css';

var storageRef = firebaseApp.storage().ref();

class FirebaseUpload extends Component {
    state = {
        isUploading: false,
        progress: 0,
        files: []
    };

    uploadToFirebase = () => {
        const {files} = this.state;

        files.forEach(file => {
            this.fileUploader.startUpload(file.post);
        });
    };

    removeFile = (key) => {
        let updatedFiles;
        let index;

        switch (this.files.keyProp) {
            case key:
                updatedFiles = [...this.state.people]; // make a separate copy of the array
                index = updatedFiles.indexOf(key);
                updatedFiles.splice(index, 1);
                this.setState({files: updatedFiles});
                break;
            default:
                return;
        }
    };

    compressImage = (url, newHeight, quality = 0.5) => {
        const img = new Image();
        let canvas;
        let ctx;
        let newDataUrl;

        img.src = url;
        console.log("Loading img...");
        return new Promise((resolve, reject) => {
            console.log("Compressing image");
            img.onload = () => {
                console.log("Image loaded");
                canvas = document.createElement("canvas");
                canvas.width = Math.floor(img.width / img.height * newHeight);
                canvas.height = newHeight;
                ctx = canvas.getContext("2d");
                console.log(img.width + " - " + img.height + " -> " + canvas.width + " - " + canvas.height);
                ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
                newDataUrl = canvas.toDataURL("image/jpeg", quality);
                console.log("Image compressed");
                resolve(newDataUrl);
            };
        });
    };

    createPreviewFiles = (files, index = 0) => {
        let reader;
        let pos;
        let updatedFiles;

        if (index >= files.length)
            return;
        reader = new FileReader();
        console.log("Loading reader...");
        reader.onload = (e) => {
            pos = this.state.files.length;
            console.log("Adding item : " + pos);
            /*this.setState(prevState => ({
                    files: [...prevState.files, {
                        preview: e.target.result,
                        post: files[index]
                    }]
                }),
                () => {
                    /*console.log("new state");
                    this.compressImage(e.target.result, 400).then((preview) => {
                        console.log("--> Image Compressed");
                        updatedFiles = this.state.files.slice();
                        updatedFiles[index].preview = preview;
                        console.log(updatedFiles);
                        this.setState({files: updatedFiles},
                            () => {
                                console.log("--> Updated preview");
                                console.log(this.state.files[pos]);
                                this.createPreviewFiles(files, index + 1);
                            }
                        );
                    });
                }
            );*/
            this.compressImage(e.target.result, 400).then((preview) => {
                this.setState(prevState => ({
                        files: [...prevState.files, {
                            preview: preview,
                            post: files[index]
                        }]
                    }),
                    () => {
                        console.log("--> Updated preview");
                        console.log(this.state.files[pos]);
                        this.createPreviewFiles(files, index + 1);
                    }
                );
            });
        };
        reader.readAsDataURL(files[index]);
    };

    handleChange = (event) => {
        this.createPreviewFiles([...event.target.files]);
    };

    handleUploadStart = () => this.setState({isUploading: true, progress: 0});

    handleProgress = (progress) => this.setState({progress});

    handleUploadError = (error) => {
        this.setState({isUploading: false});
        console.error(error);
    };

    handleUploadSuccess = (filename) => {
        storageRef.child("galleries").child(filename).getDownloadURL().then(url => console.log(url));
        console.log("uploaded : " + filename);
    };


    renderPreview = () => {
        const {files} = this.state;
        const generated = _.map(files, (value, key) => {
            /*return (
                <Preview file={value} key={key}/>
            )*/
            if (value.preview)
                return (
                    <img src={value.preview} key={key}/>
                );
            else
                return;
        });
        return (generated);
    };

    render() {
        return (
            <div>
                <form>
                    {this.state.isUploading &&
                    <p>Progress: {this.state.progress}</p>
                    }
                    <Modal
                        header='Upload images'
                        trigger={<Button>Upload Gallery</Button>}>
                        <div>
                            <FileUploader
                                accept="image/*"
                                name="uploader"
                                randomizeFilename
                                storageRef={storageRef.child("galleries")}
                                onUploadStart={this.handleUploadStart}
                                onUploadError={this.handleUploadError}
                                onUploadSuccess={this.handleUploadSuccess}
                                onProgress={this.handleProgress}
                                onChange={this.handleChange}
                                ref={instance => {
                                    this.fileUploader = instance;
                                }}
                                multiple required
                            />
                            <div className='imageGrid'>
                                {this.renderPreview()}
                            </div>
                            <Button onClick={this.uploadToFirebase()}>Upload</Button>
                        </div>
                    </Modal>
                </form>
            </div>
        );
    }
}

export default FirebaseUpload;