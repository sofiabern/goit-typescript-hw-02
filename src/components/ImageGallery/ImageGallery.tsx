import ImageCard from "../ImageCard/ImageCard";

import css from "./ImageGallery.module.css";

import { Photo } from "../../types";

import { ImageGalleryProps } from "../../types";

function ImageGallery({ images, onImageClicked }: ImageGalleryProps) {
  return (
    <ul className={css.list}>
      {images.map((image) => (
        <li key={image.id} onClick={() => {onImageClicked(image.id)}}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
}

export default ImageGallery;
