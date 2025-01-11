import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../service";

export const authorizeUserAsMember = createAsyncThunk(
  "members/authorize-user",
  async (payload) => {
    const response = await service.post("/members/authorize-user", payload);
    return response.data;
  }
);

export const fetchAuthorizedMembers = createAsyncThunk(
  "members/authorize-user",
  async () => {
    const response = await service.get("/members/get-all-members");
    return response.data;
  }
);

export const removeAuthorizedMembers = createAsyncThunk(
  "members/unauthorize-member",
  async (payload) => {
    const response = await service.post("/members/unauthorize-member", payload);
    return response.data;
  }
);

export const membersSlice = createSlice({
  name: "members",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuthorizedMembers.fulfilled, (state, action) => {
      console.log(state, action)
      return action.payload;
    });
  },
});

export default membersSlice.reducer;
