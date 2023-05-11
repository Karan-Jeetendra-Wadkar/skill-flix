import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import { db, moviesRef } from "./firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { Bars, ThreeCircles, ThreeDots } from "react-loader-spinner";
import Reviews from "./Reviews";

const Detail = () => {
  const { id } = useParams();

  const [loading, setloading] = useState(false)

  const [data, setData] = useState({
    description: "",
    image: "",
    title: "",
    year: "",
    rating:0,
    rated:0
  });

  useEffect(() => {
    async function getData() {
      setloading(true);

      const _doc = doc(db, "movies", id);

      
      const _data = await getDoc(_doc);
      
      setData(_data.data());

      setloading(false);


    }
    getData();
  }, []);
  return (
    <div className="p-4 mt-4 flex flex-col md:flex-row items-center md:items-start w-full justify-center">
      {loading ? <div className="h-96 flex w-full justify-center items-center"><ThreeCircles  height={52} color="yellow"/></div> :
        <>
      <img className="h-96 block md:sticky top-24 " src={data.image} />
      <div className="md:ml-4 ml-0 w-full md:w-1/2">
        <h1 className="text-3xl font-bold">
          {data.title} <span className="text-2xl">({data.year})</span>
        </h1>
        <ReactStars size={20} half={true} value={data.rating/data.rated} edit={false} />
        <p className="mt-3">{data.description}</p>
      </div>
      <Reviews id={id} prevRating={data.rating} userRated={data.rated}/>
      </>
}
    </div>
  );
};

export default Detail;
