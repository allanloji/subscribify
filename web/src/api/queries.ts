import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { api } from "./utils";

export const queries = createQueryKeyStore({
  stats: {
    all: {
      queryKey: null,
      queryFn: async () => {
        const response = await api.statistics.getStatistics();
        return response.data;
      },
    },
  },
  unsubscribes: {
    all: {
      queryKey: null,
      queryFn: async () => {
        const response = await api.unsubscribes.getUnsubscribes();
        return response.data;
      },
    },
  },
  newsletters: {
    all: {
      queryKey: null,
      queryFn: async () => {
        const response = await api.newsletters.findAll();
        return response.data;
      },
    },
    detail: (id: string) => ({
      queryKey: ["newsletters", id],
      queryFn: async () => {
        const response = await api.newsletters.findOne(id);
        return response.data;
      },
    }),
  },
});
