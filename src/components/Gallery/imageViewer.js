import React from 'react';
import Lightbox from 'react-images';

export default class imageViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentImage: 0};
        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
    }

    openLightbox(index) {
        this.setState({
            currentImage: index,
            LightboxOpened: true,
        });
    }

    closeLightbox() {
        this.setState({
            currentImage: 0,
            LightboxOpened: false,
        });
    }

    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }

    gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }

    render() {
        return (
            <div>
                <Lightbox images={this.props.images}
                          onClose={this.closeLightbox}
                          onClickPrev={this.gotoPrevious}
                          onClickNext={this.gotoNext}
                          currentImage={this.state.currentImage}
                          isOpen={this.state.LightboxOpened}
                />
            </div>
        )
    }
}
