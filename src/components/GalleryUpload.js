import React, {Component} from "react";
import _ from "lodash";
import * as actions from "../actions";
import GalleryUploadItem from "./GalleryUploadItem";
import ImageUploader from 'react-images-upload';
import {CloudinaryContext, Image, Transformation} from 'cloudinary-react';

class GalleryUpload extends Component {

    imageContainer = React.createRef();

    state = {
        pictures: []
    };

    onDrop = (pictureFiles, pictureDataURLs) => {
        let newPictures = [];
        for (let i = 0; i < pictureDataURLs.length; i++) {
            newPictures.push({
                title: "",
                description: "",
                url: pictureDataURLs[i],
                picture: pictureFiles[i]
            });
        }
        this.setState({pictures: newPictures});
    };

    deleteImage = (picture) => {
        if (picture && this.imageContainer && this.imageContainer.current != null) {
            let removeIndex = this.imageContainer.current.state.pictures.findIndex(function (e) {
                return e === picture.url;
            });
            let filteredPictures = this.imageContainer.current.state.pictures.filter(function (e, index) {
                return index !== removeIndex;
            });
            let filteredFiles = this.imageContainer.current.state.files.filter(function (e, index) {
                return index !== removeIndex;
            });
            let filteredForm = this.state.pictures.filter(function (e, index) {
                return index !== removeIndex;
            });
            this.imageContainer.current.setState({pictures: filteredPictures, files: filteredFiles}, function () {
                this.props.onChange(this.state.files, this.state.pictures);
            });
        }
        //this.imageContainer.current.setState({pictures: filteredPictures});
        //this.setState({pictures: filteredForm});
    };

    renderImageForm = () => {
        const {pictures} = this.state;
        const generated = _.map(pictures, (value, key) => {
            return (
                <GalleryUploadItem key={key} picture={value} deleteItem={this.deleteImage}/>
            )
        });
        return (generated);
    };

    /*render() {
        return (
            <div className="upload-container">
                <div className="row">

                    <CloudinaryContext cloudName="anonygrapher">
                        <div className="main">
                            <h1>Galleria</h1>
                            <div className="upload">
                                <button onClick={this.uploadWidget.bind(this)} className="upload-button">
                                    Add Image
                                </button>
                            </div>
                        </div>
                    </CloudinaryContext>
                    <ImageUploader
                        ref={this.imageContainer}
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png']}
                        maxFileSize={115242880}
                        withPreview={true}
                    />
                    {this.renderImageForm()}
                </div>
            </div>
        );
    }*/


    uploadWidget = () => {
        window.cloudinary.openUploadWidget({cloud_name: 'anonygrapher', upload_preset:'t72bjqnk'},
            function (error, result) {
                console.log("FINISHED");
            });
    };

    render() {
        return (
            <div className="main">
                <h1>Galleria</h1>
                <div className="upload">
                    <button onClick={this.uploadWidget.bind(this)} className="upload-button">
                        Add Image
                    </button>
                </div>
            </div>

        );
    }
}

export default GalleryUpload;