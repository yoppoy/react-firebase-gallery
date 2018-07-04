import React, { Component } from "react";
import FirebaseUpload from "./components/FirebaseUpload";

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