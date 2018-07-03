import React, { Component } from "react";
import FirebaseUpload from "./components/firebaseUpload";

class App extends Component {
    render() {
        return (
            <div className="container">
                <FirebaseUpload />
            </div>
        );
    }
}

export default App;