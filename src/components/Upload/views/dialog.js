import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import "./index.css";
import UploadInterface from "./interface";

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    fullHeight: {
        height: '100%'
    }
});

class UploadDialog extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    create = () => {
        this.props.functions.upload();
        this.handleClose();
    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Button onClick={this.handleClickOpen}>Create a new gallery</Button>
                <Dialog
                    id="createNewGallery"
                    open={true} /*{this.state.open}*/
                    TransitionComponent={Transition}
                    keepMounted
                    fullScreen
                    onClose={this.handleClose}
                    aria-labelledby="create-a-new-gallery"
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                                Create a new gallery
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <UploadInterface galleryData={this.props.galleryData}
                                     files={this.props.files}
                                     functions={this.props.functions}/>
                </Dialog>
            </div>
        );
    }
}


UploadDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadDialog);