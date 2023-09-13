import { useGetClient } from "../client/getClient";

export const useQuestion3 = () => {
  const { responseData, reload } = useGetClient("/api/QuestionThree/");
  return { data: responseData, reload };
};
