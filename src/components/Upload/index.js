import React, {Component} from 'react';
import FileUploader from 'react-firebase-file-uploader';
import idGenerator from 'react-id-generator';
import firebaseApp from "../../config/firebase/index";
import UploadDialog from "./views/dialog"

var storageRef = firebaseApp.storage().ref();

class Upload extends Component {
    state = {
        isUploading: false,
        progress: 0,
        galleryData: {
            name: "New gallery",
            location: "",
            tags: []
        },
        files: {}
    };

    handleUploadStart = () => this.setState({isUploading: true, progress: 0});

    handleProgress = (progress) => this.setState({progress});

    handleUploadError = (error) => {
        this.setState({isUploading: false});
        console.error(error);
    };

    handleUploadSuccess = (filename) => {
        //URL.revokeObjectURL()
        storageRef.child("galleries").child(filename).getDownloadURL().then(url => console.log(url));
        //storageRef.child("galleries").child('28e6a980-f440-491e-8937-4c60aef97468.jpg').delete().then(() => console.log("hello"));
        console.log("uploaded : " + filename);
    };

    readFile = (file, id) => {
        let files;
        let reader;

        reader = new FileReader();
        console.log("-> " + id);
        reader.onload = (e) => {
            console.log("-> + " + id);
            files = {...this.state.files};
            files[id].img = e.target.result;
            this.setState({files});
        };
        reader.readAsDataURL(file);
    };

    readFiles = (newFiles, index = 0, reader) => {
        let updatedFiles;
        let files;
        let newId = idGenerator();

        if (index >= newFiles.length)
            return;
        files = {...this.state.files};
        files[newId] = {
            id: newId,
            img: null,
            name: newFiles[index].name,
            date: newFiles[index].lastModifiedDate.getDate(),
            file: newFiles[index],
            state: {
                loading: false,
                uploaded: true
            }
        };
        this.setState({files}, () => {
            files = {...this.state.files};
            files[newId].img = URL.createObjectURL(newFiles[index]);
            this.setState({files}, () => {
                this.readFiles(newFiles, index + 1)
            });
        });
        /*this.readFile(newFiles[index], newId);
        this.setState({files}, () => {
            this.readFiles(newFiles, index + 1)
        });*/
    };

    handleChange = (event) => {
        this.readFiles([...event.target.files]);
    };

    upload = () => {
        const {files} = this.state;

        Object.keys(files).map(key => (
            this.fileUploader.startUpload(files[key].file)
        ));
    };

    removeFile = (id) => {
        let files = {...this.state.files};

        if (files[id]) {
            URL.revokeObjectURL(files[id].img);
            files[id] = undefined;
            this.setState({files});
            console.log(this.state.files);
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
                    storageRef={storageRef.child("galleries")}
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
                <UploadDialog galleryData={this.state.gallery}
                              files={this.state.files}
                              functions={{
                                  upload: this.upload,
                                  removeFile: this.removeFile
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