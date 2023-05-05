import { db, auth } from "../firebase";
import { collection, getDocs, addDoc, Timestamp, query, where, orderBy, getDoc, setDoc, doc } from "firebase/firestore"


const currentUser = auth.currentUser;

/** @returns {Promise<Array of Documents>} - Get all orders for current user filtered by uid */
async function getOrders(uid){
    const orders = [];

    const userOrderRef = collection(db, "User Orders");
    const userOrders = query(userOrderRef, where("uid", "==", uid), orderBy("Order_Date", "desc"));  //replace User ID with currentUser.uid once auth set up
    const querySnapshot = await getDocs(userOrders);
    querySnapshot.forEach((doc) => {
      orders.push(doc.data());
    });
    return orders;
}


/**
 * @param {object} orders - Object with food items as keys and price of as values
 * @param {string} restaurant - Restaurant name
 * @param {number} total_price - Total price of all food items
 * @returns {void} - return nothing, saves order to database
 */

async function saveOrder(orders, restaurant, total_price, orderCompletion, uid){

try {
  const docRef = await addDoc(collection(db, "User Orders"), {
    Order_Date: Timestamp.now(),
    Orders: orders,
    Restaurant: restaurant,
    Total_Price: total_price,
    uid: uid,   //replace with currentUser.uid once auth set up
    // deliveryID: deliveryID,
    orderCompleted: orderCompletion
  });

  console.log("Document written with ID: ", docRef.id);

} catch(error) {
  console.log(error)
};

};


async function saveUser(name, address, postal_code, phone, city, country, state, uid){

  const refUser = collection(db, "Users");
  try {
      const docRef = await setDoc(doc(refUser, uid), {
      name: name,
      address: address,
      postal_code: postal_code,
      phone: phone,
      city: city,
      state: state,
      country: country,
    });
  
    console.log("Document written with ID: ", docRef.id);
  
  } catch(error) {
    console.log(error)
  };
  
  };

async function getUser(){

  const userDataRef = doc(db, "Users", auth.currentUser.uid);
  const userDocSnap = await getDoc(userDataRef);

  if ((userDocSnap).exists()){ return userDocSnap.data(); }
  else {console.log('No such document.'); }

};

async function saveReservation(date, time, name, location){

try{
  const docRef = addDoc(collection(db, "Reservations"), {
    uid: auth.currentUser.uid,
    date: date,
    time: time,
    restaurantName: name,
    location: location
  });
  console.log("Doc written with id: ", docRef.id);
}
catch(error){
  console.log(error);
}

};

async function getReservations(uid){
  const reservations = [];

  // const reservationsRef = collection(db, "Reservations");
  const q = query(collection(db, "Reservations"), where("uid", "==", uid));

  // const userReservations = query(reservationsRef, where("uid", "==", uid));  //replace User ID with currentUser.uid once auth set up
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
      reservations.push(doc.data());
  });
  console.log(reservations)
  return reservations;

};

  
export {getOrders, saveOrder, saveUser, getUser, saveReservation, getReservations };


// Create new order on purchase button
// User orders saves auth.currentuser.uid and order id from DD