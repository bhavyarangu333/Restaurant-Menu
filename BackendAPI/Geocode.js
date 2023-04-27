import {auth} from '../firebase';

const getLatLng = async () => {

    const address = "800 N State College Blvd, Fullerton, CA 92831";    //replace with users location

    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBw3frPN_CVAPu-n-NfK_oSohk26_XgU0A`)
    const jsonResponse = await response.json();

    return [jsonResponse.results[0].geometry.location.lat, jsonResponse.results[0].geometry.location.lng];
};

const fetchRestaurants = async () => {
    const response = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+toronto+canada&key=AIzaSyBw3frPN_CVAPu-n-NfK_oSohk26_XgU0A');
    //const restaurant = await fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=chinese&key=AIzaSyBw3frPN_CVAPu-n-NfK_oSohk26_XgU0A');
    //const restaurantData = await restaurant.json();
    //const photoRef = restaurantData.results[2];
    const responseData = await response.json();
    //const photoRef = responseData.results[1].photos[0].photo_reference;
    //const fetchPhoto = await fetch(`https://maps.googleapis.com/maps/api/place/photo?maxheight=400&maxwidth=400&photo_reference=${photoRef}&key=AIzaSyBw3frPN_CVAPu-n-NfK_oSohk26_XgU0A`);
    //const photo = await fetchPhoto.json();

    //const data = await response.json();
    //console.log(responseData);
    //console.log(responseData.results.length)
    //console.log(photo);
    //return photo;
    //console.log(data);
    return responseData;
};

const fetchPhotos = async () => {
    const restaurants = await fetchRestaurants();
    const photoRef = restaurants.results[0].photos[0].photo_reference;
    const fetchPhoto = await fetch(`https://maps.googleapis.com/maps/api/place/photo?maxheight=400&maxwidth=400&photo_reference=${photoRef}&key=AIzaSyBw3frPN_CVAPu-n-NfK_oSohk26_XgU0A`);
    //const photo = await fetchPhoto.json();
    console.log(photoRef)

    return fetchPhoto;

};




export {getLatLng, fetchRestaurants, fetchPhotos};