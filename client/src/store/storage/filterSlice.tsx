import { createSlice } from "@reduxjs/toolkit";
import { ProductQueryParams } from "../api/userProduct";

export interface IinitialStateFilter {
  filter: ProductQueryParams;
}

const initialState: IinitialStateFilter = {
  filter: {
    page: 1,
    size: 12,
    sort: "createdAt",
    order: "desc",
    search: "",
    category: "",
    state: "",
    from: 0,
    to: 1000000,
    topSold: false,
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterData: (state, action) => {
      state.filter = action.payload;
    },
    inputSearch: (state, action) => {
      state.filter.search = action.payload.search;
    },
  },
});

export const { filterData, inputSearch } = filterSlice.actions;

export default filterSlice.reducer;
