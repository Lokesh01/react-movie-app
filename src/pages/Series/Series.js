import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleCard from "../../components/content/SingleCard";
import Genre from "../../components/Genre";
import CustomPagination from "../../components/pagination/CustomPagination";
import useGenres from "../../hooks/useGenres";

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState();
  const [genre, setGenre] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreforUrl = useGenres(selectedGenres);

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforUrl}`
    );

    // console.log(data);
    setContent(data.results);
    setNumberOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSeries();
    // eslint-disable-next-line
  }, [page,genreforUrl]);

  return (
    <div>
      <span className="pageTitle">Series</span>
      <Genre
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genre={genre}
        setGenre={setGenre}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((mov) => (
            <SingleCard
              key={mov.id}
              id={mov.id}
              poster={mov.poster_path}
              title={mov.title || mov.name}
              date={mov.first_air_date || mov.release_date}
              media_type="tv"
              vote_average={mov.vote_average}
            />
          ))}
      </div>
      {numberOfPages > 1 && (
        <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />
      )}
    </div>
  );
};

export default Series;
