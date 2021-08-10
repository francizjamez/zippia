import create from "zustand";

// the store in which where we will store the states relevant to filtering the jobs
const useJobFilterStore = create((set) => ({
  company: "",
  setCompany: (payload) => set({ company: payload }),
  recent: false,
  setRecent: (payload) => set({ recent: payload }),
  isFilterShowing: true,
  setIsFilterShowing: (payload) => set({ isFilterShowing: payload }),
}));

export default useJobFilterStore;
