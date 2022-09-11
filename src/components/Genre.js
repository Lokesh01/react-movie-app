import axios from "axios";
import React, { useEffect } from "react";
import Chip from "@mui/material/Chip";

const Genre = ({
  type,
  selectedGenres,
  setSelectedGenres,
  genre,
  setGenre,
  setPage,
}) => {
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&language=en-US`
    );
    // console.log(data);
    setGenre(data.genres);
  };

  const handleAdd = (gen) => {
    setSelectedGenres([...selectedGenres, gen]);
    //the left over or not selected genre will be pushed back to orig array
    setGenre(genre.filter((g) => g.id !== gen.id));
    setPage(1);
  };

  const handleRemove = (gen) => {
    //keeping the genre as it is and removing selected genre
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== gen.id)
    );

    //pushing the removed genre back to orignal array
    setGenre([...genre, gen]);
    setPage(1);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenre([]); // unmounting
    };
    // eslint-disable-next-line
  }, []);

  // console.log(genre);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((gen) => (
          <Chip
            label={gen.name}
            size="small"
            key={gen.id}
            color="primary"
            style={{ margin: 2 }}
            clickable
            onDelete={() => handleRemove(gen)}
          />
        ))}

      {genre &&
        genre.map((gen) => (
          <Chip
            label={gen.name}
            size="small"
            key={gen.id}
            style={{ margin: 2, background: "white",fontWeight:"bolder" }}
            clickable
            onClick={() => handleAdd(gen)}
          />
        ))}
    </div>
  );
};

export default Genre;
