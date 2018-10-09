import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Image from '../../lib/image-resizer/index';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});

class PhotoGridList extends React.Component {

    renderTile = (tile) => {
        const {classes} = this.props;
        const {removeItem} = this.props;

        console.log("rendering" + tile.id);
        return (
            <GridListTile key={tile.id}>
                {tile.img &&
                <Image src={tile.img} alt={tile.name} width={246} height={180}/>
                }
                <GridListTileBar
                    title={tile.name}
                    subtitle={<span>Date: {tile.date}</span>}
                    actionIcon={
                        <IconButton className={classes.icon} onClick={() => removeItem(tile.id)}>
                            <DeleteIcon/>
                        </IconButton>
                    }
                />
            </GridListTile>);
    };

    render() {
        const {classes} = this.props;
        const {tileData} = this.props;

        return (
            <div className={classes.root}>
                {Object.keys(tileData).length > 0 &&
                <GridList cellHeight={180} className={classes.gridList}>
                    {Object.keys(tileData).map((key) => {
                        return this.renderTile(tileData[key]);
                    })}
                </GridList>
                }
            </div>
        );
    }

}

PhotoGridList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PhotoGridList);