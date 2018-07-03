import "../styles/ToDoList.css";
import React, {Component} from "react";
import GalleryUpload from './GalleryUpload';

class Gallery extends Component {

    /*state = {
        addForm: {
            title: "",
            description: "",
            visible: false
        },
        pictures: []
    };

    onDrop = (pictureFiles, pictureDataURLs) => {
        let newPictures = [];
        for (let i = 0; i < pictureDataURLs.length; i++) {
            newPictures.push({
                title: "",
                description: "",
                url: pictureDataURLs[i],
                picture: pictureFiles[i]
            });
        }
        this.setState({pictures: newPictures});
    };

    handleInputChange = event => {
        this.setState({addForm: event.target.value});
    };

    handleFormSubmit = event => {
        const {addForm} = this.state;
        const {addToDo} = this.props;
        event.preventDefault();
        addToDo({title: addForm.title, info: addForm.info});
        let newForm = Object.assign({}, addForm);
        newForm.title = "";
        this.setState({addForm: newForm});
    };

    renderAddForm = () => {
        const {addForm} = this.state;
        if (addForm.visible) {
            return (
                <div id="todo-add-form" className="col s10 offset-s1">
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="input-field">
                            <i className="material-icons prefix">add</i>
                            <input
                                value={addForm.title}
                                onChange={this.handleInputChange}
                                id="toDoNext"
                                type="text"
                            />
                            <label htmlFor="toDoNext">What To Do Next</label>
                        </div>
                    </form>
                </div>
            );
        }
    };*/

    /*renderToDos() {
        const {data} = this.props;
        const toDos = _.map(data, (value, key) => {
            return <ToDoListItem key={key} todoId={key} todo={value}/>;
        });
        if (!_.isEmpty(toDos)) {
            return toDos;
        }
        return (
            <div className="col s10 offset-s1 center-align">
                <img
                    alt="Nothing was found"
                    id="nothing-was-found"
                    src="/img/nothing.png"
                />
                <h4>You have completed all the tasks</h4>
                <p>Start by clicking add button in the bottom of the screen</p>
            </div>
        );
    }

    componentWillMount() {
        this.props.fetchToDos();
    }

    addFormAppearance = () => {
        const {addForm} = this.state;
        let newForm = Object.assign({}, addForm);
        newForm.visible = !newForm.visible;
        this.setState({addForm: newForm});
    };*/

    render() {
        return (
            <div className="to-do-list-container">
                <div className="row">
                    <GalleryUpload></GalleryUpload>
                </div>
                <div className="fixed-action-btn">
                    <button
                        onClick={this.addFormAppearance}
                        className="btn-floating btn-large teal darken-4"
                    >

                        <i className="large material-icons">add</i>
                    </button>
                </div>
            </div>
        );
    }
}

/*const mapStateToProps = ({data}) => {
    return {
        data
    };
};

export default connect(mapStateToProps, actions)(Gallery);*/
export default Gallery;