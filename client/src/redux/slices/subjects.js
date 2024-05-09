import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../service";

export const fetchSubjects = createAsyncThunk(
  "students/fetchSubjects",
  async () => {
    const response = await service.get("/subjects/get-all-subjects");
    return response.data;
  }
);

export const subjectsSlice = createSlice({
  name: "subjects",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSubjects.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default subjectsSlice.reducer;