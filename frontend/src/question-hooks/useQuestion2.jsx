import { useGetClient } from "../client/getClient";

export const useQuestion2 = () => {
  const { responseData, reload } = useGetClient("/api/QuestionTwo/");
  return { data: responseData, reload };
};
