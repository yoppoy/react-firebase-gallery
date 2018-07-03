import React, { Component } from "react";
import { completeToDo } from "../actions";

class GalleryUploadItem extends Component {
    render() {
        const { picture } = this.props;
        const { deleteItem } = this.props;
        return (
            <div key={picture.url} className="col s10 offset-s1">
                <i className="material-icons prefix" onClick={() => {deleteItem(picture)}}>close</i>
                <div className="input-field">
                    <input
                        value={picture.title}
                        onChange={this.handleInputChange}
                        id="toDoNext"
                        type="text"
                    />
                    <label htmlFor="toDoNext">Title</label>
                </div>
                <div className="input-field">
                    <input
                        value={picture.description}
                        onChange={this.handleInputChange}
                        id="toDoNext"
                        type="text"
                    />
                    <label htmlFor="toDoNext">Description</label>
                </div>
            </div>
        );
    }
}

export default GalleryUploadItem;
