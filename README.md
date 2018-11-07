# React firebase gallery

React firebase gallery is a project to create photo galleries based on where they were taken.

# Features
  - Create a new gallery
  - Automatically display all the existing galleries as markers on a map
  - Display the galleries seperately with an image viewer

### Tech

React firebase gallery uses a number of open source projects to work properly:

* [ReactJS](https://reactjs.org/)
* [Material UI](https://material-ui.com)
* [Google-map-react](https://github.com/google-map-react/google-map-react)

### External APIs used
* [Google Maps] - display the galleries on a map
* [Google Geocode] - calculate the coordinates of the galleries' location
* [Cloudinary] - store and access the uploaded photos
* [Google Drive] - select images from your personal drive account
* [Google Firebase] - Handle the backend logic:
    - Store galleries' data
    - Handle resizing and uploading onto cloudinary


### Configuration

React firebase gallery requires [Node.js](https://nodejs.org/) v4+ to run.

##### Firebase configuration
- Create a firebase account
- Activate the blaze plan
- Create a new database
- Create a new bucket
- Deploy the functions configuration onto your firebase account
    ```sh
    $ cd functions
    $ firebase deploy --only functions
    ```
- Env variables : 
    - REACT_APP_API_KEY_FIREBASE=*KEY*
    - REACT_APP_FIREBASE_AUTH_DOMAIN=*KEY*.firebaseapp.com
    - REACT_APP_FIREBASE_DATABASE_URL=*KEY*.firebaseio.com
    - REACT_APP_FIREBASE_BUCKET=*KEY*
##### Google Drive configuration
- Env variables : 
    - REACT_APP_GOOGLE_DRIVE_CLIENT_ID=*KEY*
    - REACT_APP_GOOGLE_DRIVE_API_KEY=*KEY*
##### Google Maps configuration
- Env variables : 
    - REACT_APP_GOOGLE_MAPS_API_KEY=*KEY*

### Configuration
Install the dependencies to start the server.
```sh
$ cd react-firebase-gallery
$ npm install
$ npm start
```

### Deployment
Build the react project and deploy it onto the firebase which will host the project on a generated url
```sh
$ npm run-script build
$ firebase deploy
```

### Todos
 - Implement drive onto the firebase functions
 - Change maps wrapper
 - Complete the dashboard
 - Add an authentication

License
----

MIT
