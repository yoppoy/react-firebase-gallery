import React from "react";
import Map from "../index";
import firebaseWrapper from '../../../api/firebase';

class MapView extends React.PureComponent {
    constructor(props) {
        super (props);
        this.state = {
            galleries: [],
            isMarkerShown: false,
        };
        this.firebase = new firebaseWrapper();
        this.firebase.getGalleries().then(galleries => {
            this.setState({galleries});
        })
    }

    componentDidMount() {
        this.delayedShowMarker()
    }

    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({isMarkerShown: true})
        }, 3000)
    };

    handleMarkerClick = () => {
        this.setState({isMarkerShown: false});
        this.delayedShowMarker()
    };

    render() {
        return (
            <Map galleries={this.state.galleries} />
        )
    }
}

export default MapView;