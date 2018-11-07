import React from 'react';
import firebaseWrapper from '../../api/firebase/index'
import {withStyles} from "@material-ui/core/styles";
import GalleryView from "./views/gallery";

const styles = theme => ({});

class AdminDashboard extends React.Component {

    constructor(props) {
        super(props);

        this.firebaseWrapper = new firebaseWrapper();
    }

    state = {
        galleries: []
    };

    componentDidMount() {
        this.firebaseWrapper.getGalleries().then((galleries) => {
            console.log(galleries);
            this.setState({galleries});
        });
    }

    render() {
        return (
            <div>
                Dashboard
            </div>
        );
    }
}

export default withStyles(styles)(AdminDashboard);
