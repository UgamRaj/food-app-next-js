import axios from "axios";
import { toast } from "react-toastify";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  restroData: JSON.parse(localStorage.getItem("foodData")) || [],
  isLoading: false,
  foodItems: [],
};

//! Get food data list
export const getAllFoodList = createAsyncThunk(
  "getAllFoodList",
  async (_, { rejectWithValue }) => {
    const restroData = JSON.parse(localStorage.getItem("foodData"));

    if (!restroData) {
      toast.warn("Please Login First");
      return rejectWithValue("Please Login First");
    }

    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/restaurant/foods/${restroData._id}`
      );
      if (data.success) {
        return data.result;
      }
    } catch (error) {
      console.log("🚀 ~ getAllFoodList ~ error:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

//! Add New Food Items
export const addFoodHandler = createAsyncThunk(
  "addFoodHandler",
  async (formData, { getState, rejectWithValue }) => {
    const state = getState();
    const restroData = state.restroData.restroData;
    // console.log("🚀 ~ formData:", formData);
    // console.log("restroData slice", restroData);
    // return true;
    // const restroData = JSON.parse(localStorage.getItem("foodData"));
    let restoId;
    if (restroData) {
      restoId = restroData._id;
    }
    const body = JSON.stringify({ ...formData, restoId });

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/restaurant/foods",
        body
      );

      console.log("🚀 ~ data:", data);

      if (data.success) {
        toast.success("food item added");
        return data.result;
      }
    } catch (error) {
      console.error("🚀 ~ onAddFoodHandler ~ error:", error);
      toast.error("Something went wrong");
      return rejectWithValue(error.response.data);
    }
    //   //   if (data.success) {
    //   //     // setLoading(false);
    //   //     // console.log("food item added");
    //   //     toast.success("food item added");
    //   //     // setAddItem(false);
    //   //   }
    //   // } catch (error) {
    //   //   console.log("🚀 ~ onAddFoodHandler ~ error:", error);
    //   //   // setLoading(false);
    //   //   toast.error("Something went wrong");
    //   // }
  }
);

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
    builder.addCase(addFoodHandler.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addFoodHandler.fulfilled, (state, { payload }) => {
      // console.log("🚀 ~ builder.addCase ~ action:", payload);
      state.isLoading = false;
      // state.user = payload;
    });
    builder.addCase(addFoodHandler.rejected, (state, { error }) => {
      state.isLoading = false;
      console.error("addFoodHandler  failed:", error.message);
    });
    //! Get Food
    builder.addCase(getAllFoodList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllFoodList.fulfilled, (state, { payload }) => {
      // console.log("🚀 ~ builder.addCase ~ action:", payload);
      state.isLoading = false;
      state.foodItems = payload;
    });
    builder.addCase(getAllFoodList.rejected, (state, { error }) => {
      state.isLoading = false;
      console.error("getAllFoodList  failed:", error.message);
    });
  },
});

export const { addUser } = Slice.actions;
export default Slice.reducer;
