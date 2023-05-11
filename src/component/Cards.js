import React, { useState, useEffect } from "react";
import ReactStart from "react-stars";
import { ThreeCircles } from "react-loader-spinner";
import { getDocs } from "firebase/firestore";
import { moviesRef } from "./firebase/Firebase";
import { Link } from "react-router-dom";

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    async function getData() {
      setloading(true);

      const _data = await getDocs(moviesRef);

      _data.forEach((doc) => {
        setData((prv) => [...prv, { ...(doc.data()), id: doc.id }]);
      });

      setloading(false);
    }
    getData();
  }, []);

  return (
    <div className="flex flex-wrap justify-between px-3 mt-2">
      {loading ? (
        <div className="w-full flex justify-center items-center h-96">
          <ThreeCircles height={40} color="yellow" />
        </div>
      ) : (
        data.map((e, i) => {
          return (
            <Link to={`detail/${e.id}`}>
              <div
                key={i}
                className="card font-medium shadow-lg p-2 hover:translate-y-3 cursor-pointer mt-6 transition-all duration-500"
              >
                <img className="h-60 md:h-72" src={e.image} />
                <h1>
                  <span className="text-blue-500 flex">Name:</span> {e.title}
                </h1>
                <h1 className="flex items-center">
                  <span className="text-blue-500 mr-2">Rating:</span>
                  <ReactStart 
                  size={20} 
                  half={true} 
                  value={e.rating/e.rated}
                   edit={false} />
                </h1>
                <h1>
                  <span className="text-blue-500">Year:</span> {e.year}
                </h1>
            </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Cards;
