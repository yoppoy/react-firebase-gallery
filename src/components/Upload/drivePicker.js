import React from 'react';
import GooglePicker from 'react-google-picker';

class DrivePicker extends React.Component {

    handleChange = (data) => {
        switch (data.action) {
            case "picked" :
                this.props.addDriveFiles(data.docs);
                break;
            default :
                break;
        }
    };

    render() {
        return (

            <GooglePicker clientId={process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID}
                          developerKey={process.env.REACT_APP_GOOGLE_DRIVE_API_KEY}
                          scope={['https://www.googleapis.com/auth/drive.readonly']}
                          onChange={this.handleChange}
                          onAuthenticate={token => console.log('oauth token:', token)}
                          multiselect={true}
                          navHidden={true}
                          authImmediate={false}
                          mimeTypes={['image/png', 'image/jpeg', 'image/jpg']}
                          viewId={'DOCS'}
                          style={{display: 'inline'}}>
                {this.props.button}
            </GooglePicker>
        );
    }
}

export default DrivePicker;