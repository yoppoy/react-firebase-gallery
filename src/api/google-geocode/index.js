const API_URL = "https://maps.googleapis.com/maps/api/geocode/xml?key=" + process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default (address) => {
    return new Promise((resolve, reject) => {
        if (address) {
            fetch(API_URL + "&address=" + address).then(response => response.text())
                .then(str => {
                    let parser = new DOMParser();
                    return (parser.parseFromString(str, "text/xml"));
                })
                .then(data => {
                    let result = {
                        lat: parseFloat(data.getElementsByTagName("location")[0].getElementsByTagName("lat")[0].childNodes[0].data),
                        lng: parseFloat(data.getElementsByTagName("location")[0].getElementsByTagName("lng")[0].childNodes[0].data)
                    };
                    resolve(result);
                })
                .catch(error => {
                    reject('Request failed : ' + error);
                });
        }
        else
            reject('Undefined parameter');
    });
};
