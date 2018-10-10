import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Image from '../../../lib/image-resizer/index';
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.8)',
        marginRight: '10px'
    },
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
                                    tile.state.loading === true &&
                                    <CircularProgress className={classes.progress} thickness={3}/>
                                }
                                {
                                    tile.state.loading === false &&
                                    <DeleteIcon/>
                                }
                            </IconButton>
                        }
                    />
                </GridListTile>);
        return (null);
    };

    render() {
        const {classes} = this.props;
        const {tileData} = this.props;

        return (
            <div className={classes.root}>
                {Object.keys(tileData).length > 0 &&
                <GridList id="imageGrid" cellHeight={180} cols={5} spacing={10}>
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