import React from 'react';
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Dropzone from 'react-dropzone';
import Grid from '@material-ui/core/Grid';
import {withStyles} from "@material-ui/core/styles";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGoogleDrive} from '@fortawesome/free-brands-svg-icons';
import ImageGrid from "./imageGrid";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Zoom from '@material-ui/core/Zoom';
import "./index.css";
import GalleryForm from "./galleryForm";
import Slide from "@material-ui/core/Slide";

const styles = theme => ({
        center: {
            textAlign: 'center'
        },
        flexCenter: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        clickable: {
            pointerEvents: 'auto'
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing.unit * 2,
            right: theme.spacing.unit * 2,
            zIndex: 4
        },
        fullHeight: {
            height: '100%'
        },
        fullWidth: {
            width: '100%'
        },
        appBar: {
            position: 'relative',
        },
        grid: {
            height: '100%',
            backgroundColor: 'inherit'
        },
        rightGridItem: {
            width: '300px',
            borderLeft: '1px solid #e8eaed',
            padding: '10px',
        },
        leftGridItem: {
            display: 'inline',
            flexGrow: 1,
            margin: '10px',
            padding: '15px 10px',
            borderStyle: 'dashed',
            borderColor: 'rgb(0,0,0,0.1)',
            maxHeight: '100%',
            overflow: 'auto'
        },
        dropzone: {
            position: 'relative',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            boxSizing: 'border-box',
            zIndex: '3'
        },
        fillBackground: {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            display: 'flex',
            flexWrap: 'wrap',
            boxSizing: 'border-box',
        },
        dropzoneBackground: {
            zIndex: '2',
            backgroundColor: theme.palette.primary.main,
        },
        dropzoneIcon: {
            color: 'rgb(255, 255, 255, 0.1)',
            fontSize: 150,
            zIndex: 8,
            pointerEvents: 'none'
        },
        backgroundIcon: {
            color: 'rgb(0, 0, 0, 0.1)',
            fontSize: 150
        },
        icon: {
            marginRight: 10,
            marginBottom: 4
        },
        driveIcon: {
            fontSize: 24
        },
        uploadButton: {
            background: theme.palette.primary.main,
            color: 'white',
            pointerEvents: 'auto'
        },
        uploadTypo: {
            color: 'rgb(0, 0, 0, 0.6)',
            marginTop: -18,
            marginBottom: 40
        }
    })
;

class UploadInterface extends React.Component {
    state = {
        dragging: false
    };

    onDrop = (files, rejected) => {
        console.log(rejected);
        this.setState({dragging: false});
        this.props.functions.addFiles(files);
    };

    onDragEnter = () => {
        this.setState({dragging: true});
    };

    onDragLeave = () => {
        console.log("Leaving");
        this.setState({dragging: false});
    };

    render() {
        const {classes} = this.props;
        this.inputElement = null;

        return (
            <Grid container
                  direction="row"
                  className={classes.grid}>
                <Grid item xs
                      className={classes.leftGridItem}>
                    <Dropzone disableClick
                              accept="image/jpeg, image/png"
                              onDrop={this.onDrop.bind(this)}
                              onDragEnter={this.onDragEnter.bind(this)}
                              onDragLeave={this.onDragLeave.bind(this)}
                              className={`${classes.dropzone} + ${(Object.keys(this.props.files).length === 0 ? classes.flexCenter : '')}`}>
                        <Zoom in={Object.keys(this.props.files).length > 0 && !this.state.dragging}>
                            <Button variant="fab" color={"inherit"} className={classes.fab}>
                                <AddIcon/>
                            </Button>
                        </Zoom>
                        <div className={`${classes.fillBackground} + ${classes.flexCenter}`}>
                            <Fade in={!this.state.dragging}>
                                <Grid item className={classes.center}>
                                    <CloudUploadIcon className={classes.backgroundIcon}/>
                                    <Typography variant="subheading" className={classes.uploadTypo}>
                                        Drag and drop photos anywhere on this page
                                    </Typography>
                                    {Object.keys(this.props.files).length === 0 &&
                                    <div>
                                        <label htmlFor={'uploader'}
                                               className={classes.uploadButton + " MuiButtonBase-root-30 MuiButton-root-4 MuiButton-text-6 MuiButton-flat-9 "}>
                                            <AddAPhotoIcon className={classes.icon}/>
                                            Choose photos
                                        </label>
                                        <Button color={"primary"} className={classes.clickable}>
                                            <FontAwesomeIcon icon={faGoogleDrive}
                                                             className={`${classes.icon} + ${classes.driveIcon}`}/>Choose
                                            from drive</Button>
                                    </div>}
                                </Grid>
                            </Fade>
                        </div>
                        <Grid item className={Object.keys(this.props.files).length > 0 ? classes.fullWidth : ''}>
                            <ImageGrid tileData={this.props.files}
                                       removeFile={this.props.functions.removeFile}/>

                        </Grid>
                    </Dropzone>
                    <Fade in={this.state.dragging}>
                        <div
                            className={`${classes.dropzoneBackground} + ${classes.flexCenter} + ${classes.fillBackground}`}>
                            <Grid item>
                                <AddAPhotoIcon className={classes.dropzoneIcon}/>
                            </Grid>
                        </div>
                    </Fade>
                </Grid>
                {Object.keys(this.props.files).length > 0 &&
                <Grid className={classes.rightGridItem}>
                    <GalleryForm/>
                </Grid>}
                <div>
                </div>
            </Grid>
        );
    }
}


UploadInterface.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadInterface);