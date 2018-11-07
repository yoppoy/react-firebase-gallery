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
import Upload from "../index";

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

class UploadView extends React.Component {

    constructor(props) {
        super(props);

        this.ref = React.createRef();
        this.state = {
            open: this.props.open ? this.props.open : false,
            ref: React.createRef()
        };
    }

    openDialog = () => {
        this.setState({open: true});
    };

    handleClickOpen = () => {
        this.openDialog();
    };

    handleClose = () => {
        if (this.props.onClose)
            this.props.onClose();
        this.setState({open: false});
        this.ref.current.reset();
    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Dialog
                    id="createNewGallery"
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted={false}
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
                    <Upload ref={this.ref} close={this.handleClose}/>
                </Dialog>
            </div>
        );
    }
}


UploadView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadView);
