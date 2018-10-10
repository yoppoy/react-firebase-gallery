import React from 'react';
import ReactDOM from 'react-dom';
import m from './utils';

export default class Image extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            isNoImage: false,
        };
    }

    resizeImage = () => {
        console.log(this.props.height);
        const target = ReactDOM.findDOMNode(this.refs.image);
        if (target === null) {
            return;
        }
        const originalWidth = target instanceof HTMLImageElement ? target.naturalWidth : 0;
        const originalHeight = target instanceof HTMLImageElement ? target.naturalHeight : 0;
        const widthRatio = (this.props.width === undefined ? 1 : this.props.width) / originalWidth;
        const heightRatio = (this.props.height === undefined ? 1 : this.props.height) / originalHeight;
        if (widthRatio < heightRatio) {
            this.setState({
                width: originalWidth * widthRatio,
                height: originalHeight * widthRatio,
            });
        } else {
            this.setState({
                width: originalWidth * heightRatio,
                height: originalHeight * heightRatio,
            });
        }
    };

    showNoImage = () => {
        if (this.props.noImageSrc === undefined) {
            return;
        }
        this.setState({
            isNoImage: true,
        });
    };

    render() {
        const style = {
                wrapper: {
                    position: 'relative',
                    width: this.props.width,
                    height: this.props.height,
                    minWidth: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
                },
                image: {
                    position: 'absolute',
                    display: 'block',
                    flexShrink: 0,
                    minWidth: '100%',
                    minHeight: '100%',
                    maxWidth: '100%'
                },
            }
        ;
        const wrapperStyle = this.props.style ? m(this.props.style, style.wrapper) : style.wrapper;
        if (this.state.isNoImage) {
            return (
                <div style={wrapperStyle}>
                    <img
                        ref="image" src={this.props.noImageSrc} alt={this.props.noImageAlt || 'noimage'}
                        style={style.image}
                        onLoad={this.resizeImage}
                    />
                </div>
            );
        } else {
            return (
                <div style={wrapperStyle}>
                    <img
                        ref="image" src={this.props.src} alt={this.props.alt} style={style.image}
                        onLoad={this.resizeImage}
                        onError={this.showNoImage}
                    />
                </div>
            );
        }
    }
}
