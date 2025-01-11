import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../service";

export const fetchActivities = createAsyncThunk(
  "activity/get-all-activity",
  async () => {
    const response = await service.get("/activity/get-all-activity");
    return response.data;
  }
);

export const activitiesSlice = createSlice({
  name: "activities",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchActivities.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default activitiesSlice.reducer;
