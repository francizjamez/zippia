import create from "zustand";

const useJobFilterStore = create((set) => ({
  company: "",
  setCompany: (payload) => set({ company: payload }),
  recent: false,
  setRecent: (payload) => set({ recent: payload }),
  isFilterShowing: true,
  setIsFilterShowing: (payload) => set({ isFilterShowing: payload }),
}));

export default useJobFilterStore;
