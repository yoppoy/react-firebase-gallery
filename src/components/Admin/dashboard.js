import React from 'react';
import firebaseWrapper from '../../api/firebase/index';
import {withStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import CollectionIcon from '@material-ui/icons/Collections';
import ImageIcon from '@material-ui/icons/Image';
import ErrorIcon from '@material-ui/icons/Error';
import Avatar from '@material-ui/core/Avatar';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 1000,
        margin: 'auto',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    progress: {
        margin: 10
    },
});

class AdminDashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            galleries: [],
            open: true,
            loading: true
        };
        this.firebaseWrapper = new firebaseWrapper();

    }

    handleClick = (i) => {
        if (this.state.open === i)
            this.setState({open: -1});
        else
            this.setState({open: i});
    };


    componentDidMount() {
        this.firebaseWrapper.getGalleries().then((galleries) => {
            console.log(galleries);
            this.setState({galleries: galleries, loading: false});
        });
    }

    render() {
        const {classes} = this.props;
        const {galleries} = this.state;

        console.log(galleries);
        return (
            <List
                component="nav"
                subheader={<ListSubheader component="div">Galleries</ListSubheader>}
                className={classes.root}
            >
                {this.state.loading && <CircularProgress className={classes.progress}/>}
                {Object.keys(galleries).map((index, i) => {
                    let gallery = this.state.galleries[index];
                    return (
                        <React.Fragment key={i}>
                            <ListItem button onClick={() => this.handleClick(i)}>
                                <ListItemIcon>
                                    <a href={"/galleries/" + gallery.key}>
                                    <Avatar>
                                        <CollectionIcon/>
                                    </Avatar>
                                    </a>
                                </ListItemIcon>
                                <ListItemText inset primary={gallery.name}/>
                                {this.state.open === i ? <ExpandLess/> : <ExpandMore/>}
                            </ListItem>
                            <Collapse in={this.state.open === i} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {!gallery.images &&
                                    <ListItem className={classes.nested}>
                                        <ListItemIcon>
                                            <ErrorIcon/>
                                        </ListItemIcon>
                                        <ListItemText inset primary="Upload failed"/>
                                    </ListItem>
                                    }
                                    {gallery.images && Object.keys(gallery.images).map((imageIndex, j) => (
                                        <ListItem key={j} className={classes.nested}>
                                            <ListItemIcon>
                                                <ImageIcon/>
                                            </ListItemIcon>
                                            <ListItemText inset primary={gallery.images[imageIndex].name}/>
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        </React.Fragment>
                    )
                })}


            </List>
        );
    }
}

export default withStyles(styles)(AdminDashboard);
