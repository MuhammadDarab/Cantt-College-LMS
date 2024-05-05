import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../service";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    console.log("fetchwdawdawdawd");
    const response = await service.get("/students");
    return response.data;
  }
);

export const updateStudentById = createAsyncThunk(
  "students/updateStudentById",
  async (payload) => {
    const response = await service.post("/students/update-student", payload);
    return response.data;
  }
);

function injectUpdatedStudent(students, id, newStudentData) {
  return students.map((student) => {
    if (student._id === id)
    return newStudentData;
    return student;
  });
}

export const studentsSlice = createSlice({
  name: "students",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(updateStudentById.fulfilled, (state, action) => {
      return injectUpdatedStudent(state, action.payload._id, action.payload);
    });
  },
});

export default studentsSlice.reducer;