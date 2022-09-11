const useGenres = (selectedGenre) => {
  if (selectedGenre.length < 1) return "";

  const genreIds = selectedGenre.map((gen) => gen.id);
  return genreIds.reduce((acc, curr) => acc + "," + curr);
};

export default useGenres;
