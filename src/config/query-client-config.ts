import { QueryClient, QueryClientConfig } from "react-query";

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      // refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
};

export const queryClient = new QueryClient(queryClientConfig);
