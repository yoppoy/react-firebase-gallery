import React from 'react';
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import {withStyles} from "@material-ui/core/styles";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Zoom from '@material-ui/core/Zoom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGoogleDrive} from '@fortawesome/free-brands-svg-icons';
import Dropzone from 'react-dropzone';
import "./index.css";

import GalleryForm from "./galleryForm";
import DrivePicker from "../drivePicker";
import ImageGrid from "./imageGrid";

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
        dropzoneContainer: {
            marginTop: -32
        },
        backgroundIcon: {
            color: 'rgb(0, 0, 0, 0.1)',
            fontSize:
                150
        }
        ,
        icon: {
            marginRight: theme.spacing.unit,
            marginBottom:
                theme.spacing.unit / 2,
        }
        ,
        driveIcon: {
            fontSize: 24
        }
        ,
        uploadButton: {
            background: theme.palette.primary.main,
            color:
                'white',
            pointerEvents:
                'auto'
        }
        ,
        uploadTypo: {
            color: 'rgb(0, 0, 0, 0.6)',
            marginTop:
                -18,
            marginBottom:
                40
        }
    })
;

class UploadInterface extends React.Component {
    constructor(props) {
        super(props);

        this.formRef = React.createRef();
        this.updateFormStatus = (status) => {
            this.formRef.current.updateStatus(status);
        };
        this.state = {
            dragging: false,
        };
    }

    onDrop = (files, rejected) => {
        this.setState({dragging: false});
        this.props.functions.addFiles(files);
    };

    onDragEnter = () => {
        this.setState({dragging: true});
    };

    onDragLeave = () => {
        this.setState({dragging: false});
    };

    render() {
        const props = this.props;
        const {classes} = this.props;

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
                              className={`${classes.dropzone} + ${(Object.keys(props.files).length === 0 ? classes.flexCenter : '')}`}>
                        <Zoom in={Object.keys(props.files).length > 0 && !this.state.dragging}>
                            <Button variant="fab" color={"inherit"} className={classes.fab}>
                                <AddIcon/>
                            </Button>
                        </Zoom>
                        <div className={`${classes.dropzoneContainer} + ${classes.fillBackground} + ${classes.flexCenter}`}>
                            <Fade in={!this.state.dragging}>
                                <Grid item className={classes.center}>
                                    <CloudUploadIcon className={classes.backgroundIcon}/>
                                    <Typography variant="subtitle1" className={classes.uploadTypo}>
                                        Drag and drop photos anywhere on this page
                                    </Typography>
                                    {Object.keys(props.files).length === 0 &&
                                    <div id="uploadButtonsContainer">
                                        <label id='uploadLabel' htmlFor={'uploader'}/>
                                        <Button onClick={() => document.getElementById('uploadLabel').click()}
                                                className={classes.uploadButton}>
                                            <AddAPhotoIcon className={classes.icon}/>
                                            Choose photos</Button>
                                        <DrivePicker addDriveFiles={props.functions.addDriveFiles}
                                                     button={<Button color={"primary"} className={classes.clickable}>
                                                         <FontAwesomeIcon icon={faGoogleDrive}
                                                                          className={`${classes.icon} + ${classes.driveIcon}`}/>
                                                         Choose from drive </Button>}/>
                                    </div>}
                                </Grid>
                            </Fade>
                        </div>
                        <Grid item className={Object.keys(props.files).length > 0 ? classes.fullWidth : ''}>
                            <ImageGrid tileData={props.files}
                                       removeFile={props.functions.removeFile}/>

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
                {Object.keys(props.files).length > 0 &&
                <Grid className={classes.rightGridItem}>
                    <GalleryForm functions={this.props.functions} innerRef={this.formRef}/>
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
