import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../firebase/firebase.config';
import axios from 'axios';


export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {

    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    // console.log(user);
    


    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
      }

      const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
      }
    
      const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
      }
    
      const logOut = async () => {
        setLoading(true)
        return signOut(auth)
      }
    
      const updateUserProfile = updatedData => {
        return updateProfile(auth.currentUser, updatedData);
      }

      useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser=>{
          setUser(currentUser);
          console.log('state captures',currentUser?.email);

          if(currentUser?.email){
              const user = {email: currentUser.email};

          axios.post('https://volunteer-management-server-inky.vercel.app/jwt', user,{withCredentials:true})
          .then(res=>{
            console.log('login token',res.data);
            setLoading(false);
            
          })
          }

          else{
              axios.post('https://volunteer-management-server-inky.vercel.app/logout', {}, { withCredentials:true})
              .then(res=> {
                  console.log('logout', res.data);
                  setLoading(false);
              })
          }

        })
        return  ()=>{
            unsubscribe();
        }
    },[])

    


      const authInfo={
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        signIn,
        signInWithGoogle,
        logOut,
        updateUserProfile
      }



    return (
       <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;