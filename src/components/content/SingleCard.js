import React from "react";
import Badge from "@mui/material/Badge";
import { img_300, unavailable } from "../../config/config";
import ContentModal from "../contentModal/ContentModal";
import "./SingleCard.css";

const SingleCard = ({ id, poster, title, date, media_type, vote_average }) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge
        badgeContent={
          Number.isInteger(vote_average)
            ? vote_average
            : vote_average.toFixed(1)
        }
        color={vote_average > 6 ? "primary" : "secondary"}
      />
      <img
        src={poster ? `${img_300}${poster}` : unavailable}
        alt={title}
        className="poster"
      />
      <b className="title">{title}</b>
      <span className="subtitle">
        {media_type === "movie" ? "Movie" : "TV Series"}
        <span className="subtitle">{date}</span>
      </span>
    </ContentModal>
  );
};

export default SingleCard;
