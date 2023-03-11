import { db } from "../firebase";
import { collection, getDocs, doc } from "firebase/firestore"


async function saveOrder(){

    const querySnapshot = await getDocs(collection(db, "User Orders"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });

}

export {saveOrder};