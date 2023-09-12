import { useGetClient } from "../client/getClient";

export const useTags = () => {
  const { responseData } = useGetClient("/api/tags/");
  return responseData;
};
