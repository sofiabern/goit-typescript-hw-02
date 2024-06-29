import axios from "axios";

const KEY = "nofCwJJEIf_NmETCA57-Sn9Oe4FFy62g9hNr5Q6NX2E"

axios.defaults.baseURL = "https://api.unsplash.com";

import { Photo } from "./types";

interface ApiResponse {
  results: Photo[];
  total_pages: number;
}

export const getPhotos = async (value: string, currentPage: number): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>("/search/photos", {
    params: {
      query: value,
      page: currentPage,
      per_page: 8,
    },
    headers: {
        Authorization: `Client-ID ${KEY}`, 
      },
  });

  return response.data;
};
