import React, {Component} from "react";
import MapView from '../Map/index';
import '../../styles/index.css'

class Index extends Component {
    render() {
        return (
            <div className="container">
                <MapView/>
            </div>
        );
    }
}

export default Index;

