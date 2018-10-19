import React from "react";
import Map from "../index";
import firebaseWrapper from '../../../api/firebase';

class MapView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            galleries: [],
            isMarkerShown: false,
        };
        this.firebase = new firebaseWrapper();
        this.firebase.getGalleries().then(galleries => {
            galleries.forEach((gallery) => {
                gallery.status = {
                    open: false
                };
            });
            this.setState({galleries});
        });
    }

    openGallery(key) {
        let galleries = {...this.galleries};

        galleries[key].status.open = true;
        this.setState({galleries});
    }

    closeGallery(key) {
        let galleries = {...this.galleries};

        galleries[key].status.open = false;
        this.setState({galleries});
    }

    toggleGallery(key) {
        let galleries = {...this.galleries};

        galleries[key].status.open = !galleries[key].status.open;
        this.setState({galleries});
    }

    render() {
        return (
            <Map galleries={this.state.galleries}
                 handlers={{
                     open: this.openGallery,
                     close: this.closeGallery,
                     toggle: this.toggleGallery
                 }}/>
        )
    }
}

export default MapView;