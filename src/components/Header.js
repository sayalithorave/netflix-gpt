import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../utills/firebase';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utills/userSlice'
import { LOGO } from '../utills/constant';

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)
  const navigate = useNavigate()

  const handleSignOut = () =>{
    signOut(auth).then(() => {
      }).catch((error) => {
      // An error happened.
      navigate("/error")
    });
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const {uid, email, displayName, photoURL} = user;
          dispatch(addUser(
            {
             uid:uid, 
             email:email,
             displayName:displayName,
             photoURL:photoURL
            }
            ));
            navigate("/browse")
          // ...
        } else {
          // User is signed out
          dispatch(removeUser())
          navigate("/")
        }
      });
      // this will be called unsubscribe when component unmounts
      return () => unsubscribe();
}, [])

  return (
    <div className='absolute flex justify-between w-screen px-8 py-2 bg-gradient-to-b from-black z-10'>
        <img className='w-44' 
        src={LOGO} 
        alt='logo' />
        {
          user && <div className='flex p-2'>
          <img 
           className="w-12 h-12"
           alt="usericon"
          //  src="https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e"
           src={user?.photoURL}
          />
          <button onClick={handleSignOut} className="font-bold text-white pl-2">(Sign Out)</button>
        </div>
        }
    </div>
  )
}

export default Header