import css from "./ImageCard.module.css";

import { ImageCardProps } from "../../types";

function ImageCard({image}: ImageCardProps) {
  return (
    <div>
          <img src={image.urls.small} alt={image.alt_description} width="300px" height="250px" className={css.image} loading="lazy"/>
    </div>
  );
}

export default ImageCard;
