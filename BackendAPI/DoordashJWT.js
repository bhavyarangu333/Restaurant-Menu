import JWT from 'expo-jwt';



const createToken = () => {

    
    const accessKey = {
        "developer_id": "f6e9bd3c-d2cc-4ed1-beea-3506ed86a11c",
        "key_id": "c0b96a26-07f7-4ab9-9131-1f20c9db8d93",
        "signing_secret": "knVWXdDqcWuMj6s4Iq7Ct4kjp09YwzX3pizPmGS_SYE"
      }

    const data = {
        aud: 'doordash',
        iss: accessKey.developer_id,
        kid: accessKey.key_id,
        exp: Math.floor(Date.now() + 1800),
        iat: Math.floor(Date.now() / 1000)
    }

    //const headers = { algorithm: 'HS256', header: { 'dd-ver': 'DD-JWT-V1' } }

    let token = JWT.encode(data, accessKey.signing_secret, { algorithm:'HS256' })

    console.log(token)

};

export { createToken };