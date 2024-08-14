import axios from "axios";

const { createSlice, nanoid, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  user:
    (localStorage.getItem("foodData") &&
      JSON.parse(localStorage.getItem("foodData"))) ||
    [],
  isLoading: false,
  isUserAuthenticated:
    localStorage.getItem("foodData") &&
    JSON.parse(localStorage.getItem("foodData"))
      ? true
      : false,
};

//! Login user
export const loginUser = createAsyncThunk("loginUser", async (formData) => {
  try {
    const body = JSON.stringify({ ...formData, login: true });

    const { data } = await axios.post(
      "http://localhost:3000/api/restaurant",
      body
    );

    if (data.success) {
      // setLoading(false);
      const { result } = data;
      delete result.password;
      localStorage.setItem("foodData", JSON.stringify(result));
      // router.push("/restaurant/dashboard");
    }
    return data.success;
  } catch (error) {
    console.error("🚀 ~ loginUser ~ error:", error);
    // setLoading(false);
    throw error;
  }
});

//! Sign up user
export const signUpUser = createAsyncThunk("signUpUser", async (formData) => {
  // console.log("🚀 ~ signUpUser ~ formData:", formData);
  const body = JSON.stringify(formData);
  try {
    const { data } = await axios.post(
      "http://localhost:3000/api/restaurant",
      body
    );

    if (data.success) {
      //  setLoading(false);
      const { result } = data;

      delete result.password;
      localStorage.setItem("foodData", JSON.stringify(result));
    }
    return data.success;
  } catch (error) {
    console.error("🚀 ~ signUpUser ~ error:", error);
    //  setLoading(false);
    throw error;
  }
});

//! Add Food Item

//! -----

const Slice = createSlice({
  name: "restroSlice",
  initialState,
  reducers: {
    addUser: (state, action) => {
      console.log("🚀 ~ action:", action);
      //   const data = {
      //     id: nanoid(),
      //     name: action.name,
      //   };
      //   state.user.push(data);
    },
  },
  //!Api
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUpUser.fulfilled, (state, { payload }) => {
      // console.log("🚀 ~ builder.addCase ~ payload:", payload);

      state.isLoading = false;
      state.isUserAuthenticated = payload;
    });
    builder.addCase(signUpUser.rejected, (state, { error }) => {
      state.isLoading = false;
      console.error("Sign up failed:", error.message);
    });
    //! Login
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      // console.log("🚀 ~ builder login.addCase ~ payload:", payload);

      state.isLoading = false;
      state.isUserAuthenticated = payload;
    });
    builder.addCase(loginUser.rejected, (state, { error }) => {
      state.isLoading = false;
      console.error("loginUser  failed:", error.message);
    });
  },
});

export const { addUser } = Slice.actions;
export default Slice.reducer;
