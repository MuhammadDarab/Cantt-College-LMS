import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../service";

export const fetchFacultyMembers = createAsyncThunk(
  "fetchFacultyMembers",
  async () => {
    const response = await service.get("/faculty/get-complete-faculty");
    return response.data;
  }
);

export const updateFacultyMemberById = createAsyncThunk(
  "updateFacultyMemberById",
  async (payload) => {
    const response = await service.post("/faculty/update-faculty-member", payload);
    return response.data;
  }
);

export const admitFacultyMember = createAsyncThunk(
  "admitFacultyMember",
  async (payload) => {
    const response = await service.post("/faculty/admit-faculty-member", payload);
    return response.data;
  }
);

export const archiveFacultyMember = createAsyncThunk(
  "archiveFacultyMember",
  async (payload) => {
    const response = await service.post("/faculty/archive-faculty-member", payload);
    return response.data;
  }
);

export const facultySlice = createSlice({
  name: "faculty",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFacultyMembers.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(updateFacultyMemberById.fulfilled, (state, action) => {
      return injectUpdatedFacultyMember(state, action.payload._id, action.payload);
    });
    builder.addCase(admitFacultyMember.fulfilled, (state, action) => {
      return [...state, action.payload];
    });
    builder.addCase(archiveFacultyMember.fulfilled, (state, action) => {
      return state.filter(item => action.payload._id != item._id);
    });
  },
});


function injectUpdatedFacultyMember(facultyMembers, id, newFacultyMemberData) {
  return facultyMembers.map((member) => {
    if (member._id === id)
    return newFacultyMemberData;
    return member;
  });
}

export default facultySlice.reducer;