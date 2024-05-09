import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../service";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async () => {
    const response = await service.get("/api/user");
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default userSlice.reducer;