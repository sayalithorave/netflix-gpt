import React from 'react'
import Header from './Header'
import { useState, useRef } from 'react'
import { checkValidate } from "../utills/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth } from '../utills/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utills/userSlice';

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true)
  const [errorMessage, setErrorMessage] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm)
  }

  const handleButtonClick = () => {
    console.log(email.current.value)
    console.log(password.current.value)
    // const message = checkValidate(email.current.value, password.current.value)
    // console.log(message);
    // setErrorMessage(message)
    // if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e"
          })
          
          .then(() => {
            // Profile updated!
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL,
              })
            );
            navigate("/browse")
            // ...
          }).catch((error) => {
            // An error occurred
            setErrorMessage(error.message)
            // ...
          });
                  
          navigate("/browse")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage)
          // ..
        });
    }
    else {
      signInWithEmailAndPassword(auth,  email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          navigate("/browse")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  }
  return (
    <div>
      <Header />
      <div className='absolute'>
        {/* <img src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg" 
             alt='bg-img' /> */}
        <img src="https://wallpapers.com/images/hd/netflix-background-gs7hjuwvv2g0e9fj.jpg" alt='bg-img' />
      </div>
      <form onSubmit={(e) => e.preventDefault()}   //Stop the 
        className='absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        <h1 className="font-bold text-3xl py-4">{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
        {!isSignInForm &&
          <input
            ref={name}   //Give refrence of this i/p field
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700" />}
        <input
          type="text"
          ref={email}
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700" />
        <input
          ref={password}
          type="Password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700" />
        <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}> {isSignInForm ? 'New to Netflix? Sign Up Now' : 'Already registerd. Please Sign In'}</p>
      </form>
    </div>
  )
}

export default Login