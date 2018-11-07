import React from 'react';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import CollectionsIcon from '@material-ui/icons/Collections';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ReplayIcon from "@material-ui/icons/Replay";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {withStyles} from "@material-ui/core/styles";
import "./index.css";
//import ChipInput from 'material-ui-chip-input';

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
        backgroundColor: green[600],
        color: 'white',
        '&:hover': {
            color: green[600]
        }
    },
    buttonUploadIcon: {
        marginLeft: theme.spacing.unit,
    },
    errorText: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        color: red[800]
    },
    progress: {
        color: 'white',
        marginLeft: theme.spacing.unit
    }
});

class GalleryForm extends React.Component {

    state = {
        formData: {
            name: '',
            location: '',
            coord: {}
        },
        status: {
            progress: 0,
            uploading: false,
            uploaded: false,
            errors: false,
        }
    };

    updateStatus(status) {
        this.setState({status});
    };

    handleChange = (event) => {
        const {formData} = this.state;

        formData[event.target.name] = event.target.value;
        this.setState({formData});
    };

    handleSubmit = () => {
        let status = {...this.state.status};

        if (!status.uploading) {
            status.uploading = true;
            this.setState({status});
            this.props.functions.upload(this.state.formData);

        }
    };

    render() {
        const {formData} = this.state;
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
                    {this.state.status.error &&
                    <Typography className={classes.errorText} variant="subtitle2">
                        {this.state.status.error}
                    </Typography>
                    }
                    <Button type="submit" className={classes.buttonUpload}>
                        Upload
                        {this.state.status.progress.uploading &&
                        <span>{this.state.status.progress} %</span>}
                        {(!this.state.status.uploading && !this.state.status.uploaded && !this.state.status.error) &&
                        <CloudUploadIcon className={classes.buttonUploadIcon}/>
                        }
                        {this.state.status.uploading &&
                        <CircularProgress id="formProgess" className={classes.progress} thickness={5}/>
                        }
                        {this.state.status.uploading &&
                        <span style={{marginLeft: 5}}>{this.state.status.progress}%</span>
                        }
                        {this.state.status.uploaded &&
                        <CheckCircleIcon className={classes.buttonUploadIcon}/>
                        }
                        {this.state.status.error &&
                        <ReplayIcon className={classes.buttonUploadIcon}/>
                        }
                    </Button>
                </FormControl>
            </ValidatorForm>
        );
    }
}

GalleryForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GalleryForm);
