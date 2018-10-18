import React from "react"
import {compose, withProps} from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"

const Map = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=" + process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `100%`}}/>,
        mapElement: <div style={{height: `100%`}}/>,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={4}
        defaultCenter={{lat: -34.397, lng: 150.644}}
    >
        {props.galleries.map((gallery, index) => {
            return <Marker key={index} position={{lat: gallery.location.lat, lng: gallery.location.lng}}/>;
        })}
    </GoogleMap>
);

export default Map;