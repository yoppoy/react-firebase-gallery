import React, {Component} from "react";
import UploadView from '../Upload/views/index';
import MapView from '../Map/views/index';
import '../../styles/index.css'

class Index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <MapView/>
            </div>
        );
    }
}

export default Index;

