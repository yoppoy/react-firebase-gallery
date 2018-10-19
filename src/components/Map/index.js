import React from "react"
import {compose, withProps, withStateHandlers} from "recompose"
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps"

const Map = compose(
    withStateHandlers(() => ({
        isOpen: false,
    }), {
        onToggleOpen: ({isOpen}) => () => ({
            isOpen: !isOpen,
        })
    }),
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=" + process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `100%`}}/>,
        mapElement: <div style={{height: `100%`}}/>,
        defaultZoom: 4,
        defaultLat: 50,
        defaultLng: 3,
    }),
    withScriptjs,
    withGoogleMap,
)((props) =>
    <GoogleMap
        defaultZoom={props.defaultZoom}
        defaultCenter={{lat: props.defaultLat, lng: props.defaultLng}}
    >
        {props.galleries.map((gallery, index) => {
            return <Marker key={index} position={{lat: gallery.location.lat, lng: gallery.location.lng}}
                           onClick={props.onToggleOpen}>
            </Marker>;
        })}
        <InfoWindow position={{lat: props.defaultLat, lng: props.defaultLng}}>
            <div>
                HELLO
            </div>
        </InfoWindow>}
    </GoogleMap>
);

export default Map;