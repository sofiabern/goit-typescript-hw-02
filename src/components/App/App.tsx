import { useState, useEffect } from "react";

import "./App.css";

import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";

import { getPhotos } from "../../images-api";

export interface Photo {
  id: string;
  alt_description: string;
  likes: number;
  urls: {
    small: string;
    regular: string;
  };
  user: {
    name: string;
    portfolio_url: string;
    links: {
      html: string;
    }
  };
}

interface GetPhotosResponse {
  results: Photo[];
  total_pages: number;
}


function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [isUniqueQuery, setIsUniqueQuery] = useState<boolean>(false);

  // Modal
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modalIsOpen]);
  //

  useEffect(() => {
    if (!searchQuery.trim()) {
      return;
    }

    async function showPhotos() {
      try {
        setIsLoading(true);
        setIsError(false);

        const data: GetPhotosResponse = await getPhotos(searchQuery, page);
        const results = data.results;

        setPhotos((prevState) => [...prevState, ...results]);
        setTotal(data.total_pages);

        if (!results.length) setIsUniqueQuery(true);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    showPhotos();
  }, [page, searchQuery]);

  const handleSearch = async (value: string) => {
    setSearchQuery(value);
    setPage(1);
    setIsUniqueQuery(false);
    setPhotos([]);
  };

  const handleLoadMore = async () => {
    setPage(page + 1);
  };

  const getImageId = (imageId: string) => {
    setSelectedImageId(imageId);
    openModal();
  };

  const isPhotos = page === total;
  return (
    <>
      <SearchBar onSearch={handleSearch} />

      {isError && (
        <ErrorMessage message={"Oops! There was an error! Try again!"} />
      )}

      {isUniqueQuery && <ErrorMessage message={"Your query is too unique. Try another one."} />}

      {photos.length > 0 && (
        <ImageGallery images={photos} onImageClicked={getImageId} />
      )}

      {isLoading && <Loader />}

      {photos.length > 0 && !isLoading && !isPhotos && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}


      <ImageModal
        images={photos}
        selectedImageId={selectedImageId}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      />

    </>
  );
}

export default App;
