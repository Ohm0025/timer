import { create } from "zustand";

export const useListTime = create((set) => ({
  listTime: [],

  setListTime: (value) =>
    set((prev) => {
      return { listTime: [...prev, value] };
    }),
}));
