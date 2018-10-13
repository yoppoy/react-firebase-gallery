import React from 'react';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from "prop-types";
import CollectionsIcon from '@material-ui/icons/Collections';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import InputAdornment from '@material-ui/core/InputAdornment';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import ChipInput from 'material-ui-chip-input';
import {withStyles} from "@material-ui/core/styles";
import "./index.css";

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    formControl: {
        width: '100%'
    },
    buttonUpload: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        height: 50,
        backgroundColor: green[600],
        color: 'white',
        '&:hover': {
            color: green[600]
        }
    },
    buttonUploadIcon: {
        marginRight: theme.spacing.unit,
    }
});

class GalleryForm extends React.Component {

    state = {
        formData: {
            name: '',
            location: '',
        },
        submitted: false,
    };

    handleChange = (event) => {
        const {formData} = this.state;

        formData[event.target.name] = event.target.value;
        this.setState({formData});
    };

    handleSubmit = () => {
        this.setState({submitted: true}, () => {
            this.props.functions.upload(this.state.formData);
        });
    };


    render() {
        const {formData, submitted} = this.state;
        const {classes} = this.props;

        return (
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
            >
                <FormControl className={classes.formControl} onSubmit={this.handleSubmit} variant="filled">

                    <TextValidator
                        label="Name"
                        onChange={this.handleChange}
                        name="name"
                        value={formData.name}
                        validators={['required']}
                        errorMessages={['this field is required']}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <CollectionsIcon color={"primary"}/>
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextValidator
                        label="Location"
                        onChange={this.handleChange}
                        name="location"
                        value={formData.location}
                        validators={['required']}
                        errorMessages={['this field is required']}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <LocationOnIcon color={"primary"}/>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button type="submit" className={classes.buttonUpload} color={"primary"}>
                        <CloudUploadIcon className={classes.buttonUploadIcon}/> Upload
                    </Button>
                </FormControl>
            </ValidatorForm>
        );
    }
}

/*
    <ChipInput
        placeholder={'Tags'}
        dataSource={['Portrait', 'Nature', 'Stuff']}
    />
* */

GalleryForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GalleryForm);