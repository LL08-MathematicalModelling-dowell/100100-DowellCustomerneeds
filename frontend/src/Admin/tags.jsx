import { useGetClient } from "../client/getClient";

export const useTags = () => {
  const { responseData, reload } = useGetClient("/api/tags/");
  return {tags: responseData, reloadTags: reload};
};
