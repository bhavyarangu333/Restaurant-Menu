

const getLatLng = async () => {

    let lat = 0;
    let lng = 0;
    const address = "800 N State College Blvd, Fullerton, CA 92831";

    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBGZ3oSQ3YgTwNfkJ62Q-5GaRZw9ReR1yY`)
    const jsonResponse = await response.json();

    
    
    // .then((response) => {
    //     return response.json();
    // }).then(jsonData => {
    //     //console.log(jsonData.results[0].geometry.location); // {lat: 45.425152, lng: -75.6998028}
    //     lat = jsonData.results[0].geometry.location.lat
    //     //lng = jsonData.results[0].geometry.location.lng
    //     console.log(jsonData.results[0].geometry.location.lng);
    //     console.log(jsonData.results[0].geometry.location.lat);
    // })
    // .catch(error => {
    //     console.log(error);
    // })

    return jsonResponse.results[0].geometry.location.lat;
}


export {getLatLng};