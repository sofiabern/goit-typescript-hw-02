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

export interface ErrorMessageProps {
  message: string
}

export interface ImageCardProps {
  image: {
    urls: {
      small: string;
    };
    alt_description: string;
  };
}

export interface ImageGalleryProps{
  images: Photo[];
  onImageClicked: (imageId: string) => void
}

export interface ImageModalProps {
  images: Photo[];
  selectedImageId: string | null;
  isOpen: boolean;
  onRequestClose: () => void;
}

export interface LoadMoreBtnProps{
  onClick: () => void;
}

export interface SearchBarProps {
  onSearch: (value: string) => void;
}

