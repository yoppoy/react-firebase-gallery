import React, {Component} from 'react';


class Preview extends Component {

    render() {
        return (
            <div>
                {this.props.file.preview ?
                    <img height={100} src={this.props.file.preview}/> :
                    <p><i className="material-icons">
                        image
                    </i></p>
                }
            </div>
        );
    }
}

export default Preview;