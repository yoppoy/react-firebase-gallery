import React from 'react';
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Dropzone from 'react-dropzone';
import Grid from '@material-ui/core/Grid';
import {withStyles} from "@material-ui/core/styles";
import ImageGrid from "./imageGrid";
import "./index.css";
import GalleryForm from "./galleryForm";

const styles = theme => ({
        flexCenter: {
            justifyContent: 'center',
            alignItems: 'center'
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
            padding: '15px 10px',
            maxHeight: '100%',
            overflow: 'auto'
        },
        dropzone: {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            boxSizing: 'border-box',
            zIndex: '3'
        },
        dropzoneBackground: {
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '2',
            width: '100%',
            height: '100%',
            backgroundColor: theme.palette.primary.main,
            pointerEvents: 'none'
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
                              className={classes.dropzone + ' ' + (Object.keys(this.props.files).length === 0 ? classes.flexCenter : '')}>
                        <Grid item className={Object.keys(this.props.files).length > 0 ? classes.fullWidth : ''}>
                            {Object.keys(this.props.files).length === 0 &&
                            <label
                                className={"MuiButtonBase-root-30 MuiButton-root-4 MuiButton-text-6 MuiButton-flat-9"}
                                htmlFor={'uploader'}>
                                Upload media
                            </label>}
                            <ImageGrid tileData={this.props.files}
                                       removeFile={this.props.functions.removeFile}/>

                        </Grid>
                    </Dropzone>
                    <Fade in={this.state.dragging}>
                        <div className={classes.dropzoneBackground}>DROP
                            IT
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