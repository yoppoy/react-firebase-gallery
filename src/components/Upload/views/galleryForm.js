import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import ImageGrid from "./imageGrid";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import "./index.css";

const styles = theme => ({
    buttonUpload: {
        width: '100%',

    }
});

class GalleryForm extends React.Component {
    render() {
        const {classes} = this.props;

        return (
            <div>
                <Button className={classes.buttonUpload}>Upload</Button>
            </div>

        );
    }
}


GalleryForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GalleryForm);