import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import ImageGrid from "./imageGrid";
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import "./index.css";

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    buttonUpload: {
        width: '100%',
    }
});

class GalleryForm extends React.Component {
    state = {
        name: ''
    };

    render() {
        const {classes} = this.props;

        return (
            <FormControl className={classes.formControl} variant="filled">
                <Button className={classes.buttonUpload}>Upload</Button>
                <TextField
                    required
                    id="filled-required"
                    label="Name"
                    defaultValue="Hello World"
                    className={classes.textField}
                    margin="normal"
                    variant="filled"
                />
            </FormControl>
        );
    }
}


GalleryForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GalleryForm);