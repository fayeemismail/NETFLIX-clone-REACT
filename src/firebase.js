import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut}  from "firebase/auth"
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBndHsG8ERDJBIIKMpR4qmm2p63Za01xKA",
  authDomain: "netflix-clone-11b15.firebaseapp.com",
  projectId: "netflix-clone-11b15",
  storageBucket: "netflix-clone-11b15.firebasestorage.app",
  messagingSenderId: "257647044737",
  appId: "1:257647044737:web:36e46f5ad4971f311b0580"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const signup = async (name, email, password)=> {
    try {
        console.log(name, email)
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name, 
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error)
        toast(error.code.split('/')[1].split('-').join(' '))
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
        toast(error.code.split('/')[1].split('-').join(' '))
    }
}

const logout = () => {
    signOut(auth)
}

export { auth, db, login, signup, logout}