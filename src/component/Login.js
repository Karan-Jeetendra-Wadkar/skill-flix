import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import swal from "sweetalert";
import { Query,where, addDocs, query, getDocs, doc } from "firebase/firestore";
import { usersRef } from "./firebase/Firebase";
import bcrypt from 'bcryptjs'
import { Appstate } from '../App';

const Login = () => {

  const useAppstate = useContext(Appstate);
  
  const navigate = useNavigate();

    const [form, setForm] = useState({
        mobile:"",
        password:""

    })

    const [loading, setloading] = useState(false);

    const login = async () =>{

      setloading(true);
      try {

        const quer = query(usersRef, where('mobile', '==', form.mobile))

        const queryShots = await getDocs(quer);

        queryShots.forEach((doc) => {
          const _data = doc.data();

          const isUser = bcrypt.compareSync(form.password, _data.password);
          
          if(isUser) {
            useAppstate.setLogin(true);
            useAppstate.setUserName(_data.name);
            navigate('/');
            swal({
              title: "Logged In",
              icon: "success",
              buttons: false,
              timer: 3000,
            });

          }else{

            swal({
              title: "Invalid Credentials",
              icon: "error",
              buttons: false,
              timer: 3000,
            });

          }

        })        
      } catch (error) {
        
        swal({
          title: "error",
          icon: "error",
          buttons: false,
          timer: 3000,
        });
        
      }
      setloading(false);

    }


  return (<>
    <div className="w-full flex mt-4 flex-col items-center">
      <h1 className="text-xl font-bold"><img height={70} width={150} src="https://th.bing.com/th/id/R.b2256959e02a834bbe0991487394a5b4?rik=2%2bU1GwxW%2f1IUtA&riu=http%3a%2f%2fc001af38d1d46a976912-b99970780ce78ebdd694d83e551ef810.r48.cf1.rackcdn.com%2forgheaders%2f2815%2flogin-button2(1).png&ehk=kEm0zXy8lPP8zzVA8O8zwh9%2bOJrvUAJI6jUoqkX2t8Y%3d&risl=&pid=ImgRaw&r=0"/></h1>
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
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    class="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <button
              onClick={login}
                  class="flex mx-auto mt-4 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-500 rounded text-lg"
                >
                  {loading ? <TailSpin height={25} color="white" /> : "Login"}
                </button>

              </div>
              <div className="flex justify-center mt-6 py-4">
                <p>DO NOT HAVE AN ACCOUNT?<Link to={"/signup"}><span className=" ml-2 text-blue-500">Sign Up</span></Link></p>
              </div>


    </>
  );
};

export default Login;
