import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import Image from '../../../lib/image-resizer/index';
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "../../../../node_modules/@material-ui/core/Grid/Grid";


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.8)',
        marginRight: '10px'
    },
    progress: {
        margin: theme.spacing.unit,
    },
    done: {
      fontSize: 60,
      color: 'white'
    },
    overlay: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        display: 'flex',
        flexWrap: 'wrap',
        boxSizing: 'border-box',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgb(0,0,0,0.5)'
    }
});

class ImageGrid extends React.Component {

    renderTile = (tile) => {
        const {classes} = this.props;
        const {removeFile} = this.props;

        if (tile)
            return (
                <GridListTile key={tile.id}>
                    {tile.img &&
                    <Image src={tile.img} alt={tile.name} width={280} height={180}/>
                    }
                    <GridListTileBar
                        title={tile.name}
                        subtitle={<span>Date: {tile.date}</span>}
                        className={'imageTile'}
                        actionIcon={
                            <IconButton className={classes.icon} onClick={() => removeFile(tile.id)}>
                                {
                                    tile.state.isLoading === false &&
                                    <DeleteIcon/>
                                }
                            </IconButton>
                        }
                    />
                    {(tile.state.isLoading || tile.state.isUploaded) &&
                    <div className={classes.overlay}>
                        <Grid item>
                            {tile.state.isLoading &&
                            <CircularProgress className={classes.progress}/>
                            }
                            {tile.state.isUploaded &&
                            <DoneIcon className={classes.done}/>
                            }
                        </Grid>
                    </div>
                    }
                </GridListTile>);
        return (null);
    };

    render() {
        const {classes} = this.props;
        const {tileData} = this.props;

        return (
            <div className={classes.root}>
                {Object.keys(tileData).length > 0 &&
                <GridList className="imageGrid" cellHeight={180} spacing={10}>
                    {Object.keys(tileData).map((key) => {
                        return this.renderTile(tileData[key]);
                    })}
                </GridList>
                }
            </div>
        );
    }

}

ImageGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageGrid);