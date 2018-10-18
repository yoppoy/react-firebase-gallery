import React, { Component } from "react";
import UploadView from './Upload/views/index';
import MapView from './Map/views';
import '../styles/index.css'

class Index extends Component {
    render() {
        return (
            <div className="container">
                <UploadView/>
                <MapView/>
            </div>
        );
    }
}

export default Index;