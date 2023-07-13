"use client"
import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '@/Firebase/Firebase.config';



const auth = getAuth(app)
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    //creating user 
    const createUser = (email, password) => {
        console.log(email,password)
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //sign with email pass
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
  
    //auth state
    useEffect(() => {
        const subscription = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser)
            setUser(currentUser)
            setLoading(false)
        })
        return () => subscription()
    }, [])

    const authInfo = { user, createUser, loading, setLoading,signIn }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;