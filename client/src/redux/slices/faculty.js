import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../service";

export const fetchFacultyMembers = createAsyncThunk(
  "faculty/fetchFacultyMembers",
  async () => {
    const response = await service.get("/faculty/get-complete-faculty");
    return response.data;
  }
);

export const updateFacultyMemberById = createAsyncThunk(
  "faculty/updateFacultyMemberById",
  async (payload) => {
    const response = await service.post("/faculty/update-faculty-member", payload);
    return response.data;
  }
);

export const admitFacultyMember = createAsyncThunk(
  "faculty/admitFacultyMember",
  async (payload) => {
    const response = await service.post("/faculty/admit-faculty-member", payload);
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