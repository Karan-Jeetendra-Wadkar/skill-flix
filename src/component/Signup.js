import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import app from "./firebase/Firebase";
import { usersRef } from "./firebase/Firebase";
import { addDoc } from "firebase/firestore";
import swal from 'sweetalert'
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs'

const auth = getAuth(app);
const Signup = () => {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [otpSent, setOtpSent] = useState(false);

  const [OTP, setOTP] = useState("");

  const generateRecaptha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    }, auth);
  }

  const requestOtp = () => {
      setLoading(true);
      generateRecaptha();
      let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
        .then(confirmationResult => {
          window.confirmationResult = confirmationResult;
          swal({
            text: "OTP Sent",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          setOtpSent(true);
          setLoading(false);
        }).catch((error) => {
          console.log(error)
        })
  }

  const verifyOTP = () =>{

    try {
      setLoading(true);
      window.confirmationResult.confirm(OTP).then((result)=> {
        uploadData();
        swal({
          text: "Successfully Registered",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        navigate('/login')
        setLoading(false);
        
      })
      
    } catch (error) {
      console.log(error)
    }
  }

  const uploadData = async () =>{
try{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(form.password, salt)
    await addDoc(usersRef,{
      name: form.name,
      password: hash,
      mobile: form.mobile
    });
  } catch(err) {
    console.log(err);
  }

  }

  return (
    <>
      <div className="w-full flex mt-4 flex-col items-center">
        {otpSent ? (
          <>
            <h1 className="text-xl font-bold">SignUp</h1>

            <div class="p-2 w-full md:w-1/3">
              <div class="relative">
                <label for="email" className="  leading-7 text-sm text-white">
                  Mobile Number
                </label>
                <input
                  id="email"
                  name="email"
                  value={OTP}
                  onChange={(e) => setOTP(e.target.value)}
                  class="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <button onClick={verifyOTP} class="flex mx-auto mt-4 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-500 rounded text-lg">
                {loading ? (
                  <TailSpin height={25} color="white" />
                ) : (
                  "Confirm OTP"
                )}
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold"><img height={70} width={150} src="https://png.pngtree.com/png-vector/20231124/ourmid/pngtree-sign-up-blue-glossy-web-icon-sign-up-png-image_10696347.png"/></h1>

            <div class="p-2 w-full md:w-1/3">
              <div class="relative">
                <label for="email" className="  leading-7 text-sm text-white">
                  Name
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  class="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            <div class="p-2 w-full md:w-1/3">
              <div class="relative">
                <label for="email" className="  leading-7 text-sm text-white">
                  Mobile Number
                </label>
                <input
                  type="number"
                  id="email"
                  name="email"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  class="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            <div class="p-2 w-full md:w-1/3">
              <div class="relative">
                <label for="email" className="  leading-7 text-sm text-white">
                  Password
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  class="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            <button
            onClick={requestOtp}
             class="flex mx-auto mt-4 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-500 rounded text-lg">
              {loading ? <TailSpin height={25} color="white" /> : "Request OTP"}
            </button>
          </>
        )}
      </div>

      <div className="flex justify-center mt-6 py-4">
        <p>
          ALREADY HAVE AN ACCOUNT
          <Link to={"/login"}>
            <span className=" ml-2 text-blue-500">Login</span>
          </Link>
        </p>
        <div id="recaptcha-container"></div>
              </div>
    </>
  );
};

export default Signup;
