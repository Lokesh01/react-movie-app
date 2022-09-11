import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { img_300, noPicture } from "../../config/config";
import "./Carousel.css";
import { settings } from "./setting";

export default function Carousel({ media_type, id }) {
  const [credits, setCredits] = useState([]);

  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&language=en-US`
    );

    setCredits(data.cast);
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  return (
    <div className="carouselItem">
      <Slider {...settings}>
        {credits &&
          credits.map((c) => (
            <div key={c.id} className="card">
              <img
                src={
                  c.profile_path ? `${img_300}/${c.profile_path}` : noPicture
                }
                alt={c && c.name}
              />
              <b className="carouselItem__txt">{c && c.name}</b>
            </div>
          ))}
      </Slider>
    </div>
  );
}
