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

const makeDelivery = async (address) => {
    const { token, delivery_id } = await fetchToken();

    const body = JSON.stringify({
        external_delivery_id: delivery_id,
        // pickup_address: '11745 Whittier Blvd, Whittier',
        pickup_address: address,
        pickup_business_name: 'China Wok Express',
        pickup_phone_number: '+16505555555',
        pickup_instructions: 'Enter gate code 1234 on the callbox.',
        dropoff_address: '800 N State College Blvd, Fullerton, CA 92831',
        dropoff_business_name: 'Cal State Fullerton',
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