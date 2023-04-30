import { db, auth } from "../firebase";
import { collection, getDocs, addDoc, Timestamp, query, where, orderBy, getDoc, setDoc, doc } from "firebase/firestore"


const currentUser = auth.currentUser;

/** @returns {Promise<Array of Documents>} - Get all orders for current user filtered by uid */
async function getOrders(){
    const orders = [];

    const userOrderRef = collection(db, "User Orders");
    const userOrders = query(userOrderRef, where("uid", "==", "User ID"), orderBy("Order_Date", "desc"));  //replace User ID with currentUser.uid once auth set up
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

async function saveOrder(orders, restaurant, total_price, deliveryID, orderCompletion){

try {
  const docRef = await addDoc(collection(db, "User Orders"), {
    Order_Date: Timestamp.now(),
    Orders: orders,
    Restaurant: restaurant,
    Total_Price: total_price,
    uid: auth.currentUser.uid,   //replace with currentUser.uid once auth set up
    deliveryID: deliveryID,
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


  
export {getOrders, saveOrder, saveUser, getUser };


// Create new order on purchase button
// User orders saves auth.currentuser.uid and order id from DD