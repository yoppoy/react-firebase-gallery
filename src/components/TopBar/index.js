import React from 'react';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CollectionsIcon from '@material-ui/icons/Collections';
import MapIcon from "@material-ui/icons/Map";
import AddIcon from "@material-ui/icons/AddPhotoAlternate";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    logo: {
        marginTop: 6,
        height: 42
    },
    button: {
        color: 'white',
        marginRight: 15,
        border: '2px solid white'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    marginButton: {
        marginLeft: 10
    },
    whiteButton: {
        color: '#3f51b5',
        backgroundColor: 'white',
        '&:hover': {
            backgroundColor: "#fff",
        },
        border: '2px solid white'
    },
    icon: {
        color: 'white'
    },
    anonygrapherIcon: {
        marginBottom: -5
    },
    collectionIcon: {
        marginLeft: 5,
        fontSize: 20
    }
});

class TopBar extends React.PureComponent {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root + ' noGrow'}>
                <AppBar position="static">
                    <Toolbar>
                        <Link to="/">
                            <Typography variant={"h6"} className={classes.icon}><MapIcon
                                className={classes.anonygrapherIcon}/> Anonygrapher</Typography>
                        </Link>
                        <div className={classes.grow}></div>
                        <Link to="/admin/">
                            <Button className={classes.button}>manage Gallery<CollectionsIcon
                                className={classes.collectionIcon}/></Button>
                        </Link>
                        <Link to="/admin/new-gallery">
                            <Button className={classes.whiteButton}>New Gallery<AddIcon
                                className={classes.collectionIcon}/></Button>
                        </Link>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(TopBar);
