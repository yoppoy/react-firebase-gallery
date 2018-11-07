import React, {Fragment} from 'react';
import firebaseWrapper from '../../api/firebase/index';
import ImageViewer from './imageViewer';
import Typography from "@material-ui/core/Typography";
import Loading from "../Shared/loading";
import CollectionIcon from "@material-ui/icons/Collections";


const styles = {
    loadingIcon: {
        fontSize: 100,
    },
    title: {
        textAlign: 'center',
        paddingTop: 40,
        marginBottom: 40
    },
    image: {
        height: '300px',
        marginLeft: 13,
        marginTop: 6,
        cursor: 'pointer'
    }
};

export default class Gallery extends React.Component {
    constructor(props) {
        super(props);

        this.firebase = new firebaseWrapper();
        this.imageViewer = React.createRef();
        this.state = {
            gallery: {},
            images: [],
            list: {},
            loading: true
        }
    }

    loadImage = (url) => {
        const hdLoaderImg = new Image();

        hdLoaderImg.src = url;
        return (hdLoaderImg);
    };

    componentDidMount() {
        let images = [];

        this.firebase.getGallery(this.props.match.params.id).then(gallery => {
            gallery.buffer = [];
            for (let key in gallery.images) {
                images.push({src: gallery.images[key].url});
                gallery.buffer.push(this.loadImage(gallery.images[key].lightbox));
            }
            this.setState({gallery, images, loading: false});
        });
    }


    onImageClick = index => {
        this.imageViewer.current.openLightbox(index);
    };

    render() {
        return (
            <div className="container">
                {this.state.gallery.hasOwnProperty('name') &&
                <Fragment>
                    <Typography variant={"h2"} color={"primary"} style={styles.title}>
                        {this.state.gallery.name}
                    </Typography>
                    <div>
                        {Object.keys(this.state.gallery.images).map((item, i) => (
                            <img key={i} alt={item} onClick={() => this.onImageClick(i)}
                                 src={this.state.gallery.images[item].lightbox}
                                 style={styles.image}/>
                        ))}
                    </div>
                </Fragment>}
                {this.state.loading &&
                <Loading icon={<CollectionIcon color={"primary"} style={styles.loadingIcon}/>}/>}
                <ImageViewer ref={this.imageViewer} images={this.state.images}/>
            </div>
        )
    }
}
