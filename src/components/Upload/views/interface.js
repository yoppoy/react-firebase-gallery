import React from 'react';
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {withStyles} from "@material-ui/core/styles";
import ImageGrid from "./imageGrid";
import "./index.css";
import GalleryForm from "./galleryForm";

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    fullHeight: {
        height: '100%'
    },
    grid: {
        height: '100%',
    },
    rightGridItem: {
        width: '300px',
        borderLeft: '1px solid #e8eaed',
        padding: '10px'
    },
    leftGridItem: {
        display: 'inline',
        flexGrow: 1,
        padding: '15px 10px'
    }
});

class UploadInterface extends React.Component {
    render() {
        const {classes} = this.props;
        this.inputElement = null;

        if (Object.keys(this.props.files).length > 0)
            return (
                <Grid container
                      direction="row"
                      className={classes.grid}>
                    <Grid item xs className={classes.leftGridItem}>
                        <ImageGrid tileData={this.props.files}
                                   removeFile={this.props.functions.removeFile}/>
                    </Grid>
                    <Grid className={classes.rightGridItem}>
                        <GalleryForm/>
                    </Grid>
                </Grid>
            );
        else
            return (
                <Grid container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      className={classes.grid}>
                    <Grid item>
                        <label className={"MuiButtonBase-root-30 MuiButton-root-4 MuiButton-text-6 MuiButton-flat-9"}
                               htmlFor={'uploader'}>
                            Upload media
                        </label>
                    </Grid>
                </Grid>
            );
    }
}


UploadInterface.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadInterface);