/*import React, { Component } from 'react';
import { render } from 'react-dom';
import FileUploader from 'react-firebase-file-uploader';


class FirebaseUpload extends Component {
    handleChangeImage = (e) => {
        const image = e.target.files[0];
        if (image) {
            this.setState({image});
        }
    };
    handleUploadSuccess = (filename) => {
        // Do something with the name of the uploaded file and possibly the rest of the form
        firebase.database().ref('images').push({filename});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.uploader && this.state.image) {
            this.uploader.startUpload(this.state.image);
        }
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Image:</label>
                    <FileUploader
                        ref={c => { this.uploader = c; }}
                        accept="image/*"
                        randomizeFilename
                        storageRef={firebase.storage().ref('images')}
                        onChange={this.handleChangeImage}
                        onUploadSuccess={this.handleUploadSuccess}
                        multiple
                    />
                    <button type="submit" />
                </form>
            </div>
        );
    }
}
*/

import React, {Component} from 'react';
import firebaseApp from "../config/firebase";
import FileUploader from 'react-firebase-file-uploader';
import compressImage from '../services/tools/ImageCompression';
import Preview from './Preview';
import {Modal, Button} from 'react-materialize';
import 'materialize-css';
import '../styles/flexImagelayout.css';
import _ from "lodash";

var storageRef = firebaseApp.storage().ref();

class FirebaseUpload extends Component {
    state = {
        isUploading: false,
        progress: 0,
        files: []
    };

    handleUploadStart = () => this.setState({isUploading: true, progress: 0});

    handleProgress = (progress) => this.setState({progress});

    handleUploadError = (error) => {
        this.setState({isUploading: false});
        console.error(error);
    };

    handleUploadSuccess = (filename) => {
        storageRef.child("galleries").child(filename).getDownloadURL().then(url => console.log(url));
        //storageRef.child("galleries").child('28e6a980-f440-491e-8937-4c60aef97468.jpg').delete().then(() => console.log("hello"));
        console.log("uploaded : " + filename);
    };

    readFiles = (files, index = 0) => {
        let reader;
        let pos;
        let updatedFiles;

        if (index >= files.length)
            return;
        pos = this.state.files.length;
        this.setState(prevState => ({
                files: [...prevState.files, {
                    preview: null,
                    post: files[index]
                }]
            }),
            () => {
                window.loadImage(
                    files[index],
                    (img) => {
                        updatedFiles = this.state.files.slice();
                        updatedFiles[pos].preview = img.src;
                        updatedFiles[pos].post = files[index];
                        this.setState({files: updatedFiles}, () =>
                            this.readFiles(files, index + 1));
                    },
                    {maxWidth: 300} // Options
                );
            });
    };

    handleChange = (event) => {
        this.readFiles([...event.target.files]);
    };

    uploadToFirebase = () => {
        const {files} = this.state;

        console.log("uploading to firebase");
        files.forEach(file => {
            this.fileUploader.startUpload(file.post)
        });
    };

    renderPreview = (height) => {
        const {files} = this.state;
        const generated = _.map(files, (value, key) => {
            return (
                <Preview file={value} key={key}/>
            )
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
                                {this.renderPreview(100)}
                            </div>
                            <Button onClick={this.uploadToFirebase}>Upload</Button>
                        </div>
                    </Modal>
                </form>
            </div>
        );
    }
}

export default FirebaseUpload;