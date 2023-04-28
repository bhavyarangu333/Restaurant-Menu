import axios from 'axios';
import {auth} from '../firebase'



const API_URL = 'https://restaurante-api.vercel.app';

const fetchToken = async () => {

    const response = await fetch(`${API_URL}/create_token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        });

    const { token, delivery_id } = await response.json();

    return { token, delivery_id };
};

const makeDelivery = async () => {
    const { token, delivery_id } = await fetchToken();

    const body = JSON.stringify({
        external_delivery_id: delivery_id,
        pickup_address: '901 Market Street 6th Floor San Francisco, CA 94103',
        pickup_business_name: 'Wells Fargo SF Downtown',
        pickup_phone_number: '+16505555555',
        pickup_instructions: 'Enter gate code 1234 on the callbox.',
        dropoff_address: '901 Market Street 6th Floor San Francisco, CA 94103',
        dropoff_business_name: 'Wells Fargo SF Downtown',
        dropoff_phone_number: '+16505555555',
        dropoff_instructions: 'Enter gate code 1234 on the callbox.',
        order_value: 2000
    });

    const response = await axios.post('https://openapi.doordash.com/drive/v2/deliveries', body, {
        headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        },
    })

    return response.data;

};

export { makeDelivery };