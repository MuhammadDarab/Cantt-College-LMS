import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../service";

export const fetchCategories = createAsyncThunk(
  "subjects/fetchCategories",
  async () => {
    const response = await service.get("/subjects/get-all-categories");
    return response.data;
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default categoriesSlice.reducer;