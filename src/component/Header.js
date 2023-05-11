import React, { useContext } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Appstate } from "../App";


const Header = () => {

  const useAppstate = useContext(Appstate);

  return( 
  <div className="header sticky z-10 top-0 bg-black text-2xl flex justify-between items-center text-red-500 font-bold p-3 border-b-4 border-gray-500">
    
  <Link to={"/"}><span className="flex"> SKILL<span className="text-white"> FLIX </span><img height={25} width={30} src="https://th.bing.com/th/id/R.0ced544ff961aa7ae639a984a3147f53?rik=%2fhfb2QpnVhq4OA&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_318978.png&ehk=bDDjgrV97dGlfOgd6jLvYbf2WFqj6sL9cdusaKt6R8I%3d&risl=&pid=ImgRaw&r=0"/></span></Link>
    
    {useAppstate.login ?
      <Link to={"/addmovie"}><h1 className="text-lg cursor-pointer flex items-center">
      <Button><AddIcon className="mr-1" color="secondary" /><span className="font-bold text-black text-lg">ADD NEW</span></Button>
      </h1></Link>
      :
      <Link to={"/login"}><h1 className="text-lg bg-green-400 cursor-pointer flex items-center ">
      <Button><span className="text-black font-medium">Login</span></Button>
      </h1></Link>
      }
    </div>

)};

export default Header;
