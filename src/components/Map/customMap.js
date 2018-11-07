import React, {Component, Fragment} from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import firebaseWrapper from "../../api/firebase/index";
import Typography from "@material-ui/core/Typography";

export class CustomMap extends Component {
    constructor(props) {
        super(props);
        let bounds = new props.google.maps.LatLngBounds({lat: 46.2276, lng: 2.2137});
        this.imageViewer = React.createRef();
        this.state = {
            galleries: [],
            bounds: bounds,
            selected: {}
        };
        this.firebase = new firebaseWrapper();
    }

    componentDidMount() {
        this.updateGalleries();
    }

    updateGalleries = () => {
        this.firebase.getGalleries().then(galleries => {
            this.addGalleries(galleries);
            this.props.onLoad();
        });
    };

    loadImage = (url) => {
        const hdLoaderImg = new Image();

        hdLoaderImg.src = url;
        return (hdLoaderImg);
    };

    /**
     * Add Galleries to the state
     * It also stores a buffer of loaded images to load the thumbnails in the background
     * @param galleries
     */
    addGalleries = (galleries) => {
        let bounds = new this.props.google.maps.LatLngBounds();

        if (galleries) {
            for (let key in galleries) {
                galleries[key].buffer = [];
                galleries[key].imageViewerImages = [];
                if (galleries[key].images) {
                    Object.keys(galleries[key].images).map((item, i) => {
                        galleries[key].buffer.push(this.loadImage(galleries[key].images[item].thumbnail));
                        galleries[key].imageViewerImages.push({src: galleries[key].images[item].url});
                    });
                    bounds.extend(galleries[key].location);
                }
            }
            this.setState({galleries, bounds});
        }
    };

    getSelectedGallery = () => {
        return (this.state.galleries[this.state.selectedIndex]);
    };

    getImageKeys = () => {
        return (Object.keys(this.state.galleries[this.state.selectedIndex].images));
    };

    renderImages() {
        const selected = this.getSelectedGallery();
        return (<div>
            {Object.keys(selected.images).map((item, i) => (
                <img key={i} alt={item}
                     src={selected.images[item].thumbnail}
                     style={{height: '100px', marginLeft: 13, marginTop: 6}}/>
            ))}
        </div>);
    }


    onMarkerClick = index => (props, marker, e) => {
        if (marker === this.state.marker)
            this.setState({selected: {}});
        else {
            this.setState({
                selectedIndex: index,
                selected: marker
            });
        }
    };

    render() {
        const style = {
            width: '100%',
            height: '100%'
        };
        return (
            <Fragment>
                <Map google={this.props.google}
                     style={style}
                     initialCenter={{lat: 35, lng: 1}}
                     zoom={3}>
                    {this.state.galleries.map((gallery, index) => {
                        return <Marker key={index} position={gallery.location}
                                       onClick={this.onMarkerClick(index)}>
                        </Marker>;
                    })}
                    <InfoWindow marker={this.state.selected} visible={true}>
                        <div>
                            {this.state.selected.hasOwnProperty('name') &&
                            <Fragment>
                                <a href={"/galleries/" + this.getSelectedGallery().key}>
                                    <Typography variant={"h5"}
                                                style={{
                                                    textTransform: 'uppercase',
                                                    fontWeight: 'bold',
                                                    marginLeft: 13,
                                                    marginTop: 10
                                                }}
                                                color={"primary"}>{this.getSelectedGallery().name}</Typography>
                                </a>
                                <div style={{marginBottom: 10}}>
                                    {this.renderImages()}
                                </div>
                            </Fragment>
                            }
                        </div>
                    </InfoWindow>
                </Map>
            </Fragment>
        );
    }
}

export default GoogleApiWrapper({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    }
)
(CustomMap)
