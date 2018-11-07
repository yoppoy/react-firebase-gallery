import React, {Component, Fragment} from "react";
import UploadView from '../Upload/views/index';
import AdminDashboard from './dashboard';
import AddIcon from "../../../node_modules/@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import {withRouter} from 'react-router';

const styles = {
    fab: {
        position: 'absolute',
        zIndex: 4,
        color: 'white',
        background: '#3f51b5',
        right: 0,
        bottom: 0,
        margin: 20
    }
};

class Index extends Component {
    constructor(props) {
        super(props);

        this.uploader = React.createRef();
    }

    openDialog = () => {
        const {history: {push}} = this.props;
        push('/admin/new-gallery')
    };

    closeDialog = () => {
        const {history: {push}} = this.props;
        push('/admin');
    };

    render() {
        return (
            <Fragment>
                <UploadView innerRef={this.uploader} open={this.props.dialogOpened}
                            onClose={() => this.closeDialog()}/>
                <AdminDashboard/>
                <Button variant="fab" color={"inherit"} style={styles.fab} onClick={() => this.openDialog()}>
                    <AddIcon/>
                </Button>
            </Fragment>
        );
    }
}

export default withRouter(Index);

