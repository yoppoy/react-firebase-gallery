import React, {Component, Fragment} from "react";
import CustomMap from "../index";
import Loading from "../../Shared/views/loading";
import MapIcon from "@material-ui/icons/Map";

const styles = {
    loading: {
        fontSize: 100,
    }
};
export default class MapView extends Component {
    state = {
        loading: true
    };

    displayMap = () => {
        this.setState({loading: false});
    };

    render() {
        return (
            <Fragment>
                {this.state.loading && <Loading icon={<MapIcon color={"primary"} style={styles.loading}/>}/>}
                <CustomMap onLoad={this.displayMap}/>
            </Fragment>
        );
    }
}
