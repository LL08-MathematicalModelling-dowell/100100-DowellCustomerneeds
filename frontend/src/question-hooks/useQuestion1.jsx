import { useGetClient } from "../client/getClient";

export const useQuestion1 = () => {
  const { responseData, reload } = useGetClient("/api/QuestionOne/");
  return { data: responseData, reload };
};
