import axios from "axios";
import React, { useState, useEffect } from "react";
import SingleCard from "../../components/content/SingleCard";
import CustomPagination from "../../components/pagination/CustomPagination";
import "./Trending.css";

const Trending = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&page=${page}`
    );

    // console.log(data);
    setContent(data.results);
  };

  useEffect(() => {
    window.scroll(0,0);
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {content &&
          content.map((mov) => (
            <SingleCard
              key={mov.id}
              id={mov.id}
              poster={mov.poster_path}
              title={mov.title || mov.name}
              date={mov.first_air_date || mov.release_date}
              media_type={mov.media_type}
              vote_average={mov.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;
