import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";



// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     return true;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(errorMessage);
//     return false
//     // ..
//   });

//   export {createUserWithEmailAndPassword};