import React, {Fragment} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
    container: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        background: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        zIndex: '10',
        textAlign: 'center',
    },
    grid: {
        minWidth: 300
    },
    loading: {
        fontSize: 100,
    },
    text: {
        fontSize: 30
    },
    loader: {
        height: 3,
        marginTop: 30,
        marginBottom: 2
    }
};

const Loading = (props) => {
    return (
        <div
            style={styles.container}>
            <Grid style={styles.grid} item>
                {props.icon}<br/>
                <LinearProgress style={styles.loader}/>
            </Grid>
        </div>
    );
};

/*
<Typography style={styles.text} variant="h2" gutterBottom>
    Loading maps...
</Typography><br/>
 */

export default Loading;
