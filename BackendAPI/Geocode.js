import {auth} from '../firebase';

const getLatLng = async () => {

    const address = "800 N State College Blvd, Fullerton, CA 92831";    //replace with users location

    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBGZ3oSQ3YgTwNfkJ62Q-5GaRZw9ReR1yY`)
    const jsonResponse = await response.json();

    return [jsonResponse.results[0].geometry.location.lat, jsonResponse.results[0].geometry.location.lng];
}


export {getLatLng};