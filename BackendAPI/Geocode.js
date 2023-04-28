import {auth} from '../firebase';

const API_URL = 'https://restaurante-api.vercel.app';

const getNearbyRegion = async () => {

    const regions = await fetch(`${API_URL}/getRegion`);
    const regionData = await regions.json();

    return regionData;
};

const fetchRestaurants = async () => {

    const restaurant = await fetch(`${API_URL}/fetchNearbyRestaurants`);
    const responseData = await restaurant.json();
    
    return responseData;
};

const fetchPhotos = async () => {
    const restaurants = await fetchRestaurants();
    const photoRef = restaurants.results[0].photos[0].photo_reference;
    const fetchPhoto = await fetch(`https://maps.googleapis.com/maps/api/place/photo?maxheight=400&maxwidth=400&photo_reference=${photoRef}&key=AIzaSyBw3frPN_CVAPu-n-NfK_oSohk26_XgU0A`);
    console.log(photoRef)

    return fetchPhoto;

};

const useEndpoint = async () => {

    const msg = await fetch('https://restaurante-api-git-main-angyb00.vercel.app/foo');
    const res = await msg.json();

    return res; 
};




export {getNearbyRegion, fetchRestaurants, fetchPhotos, useEndpoint};