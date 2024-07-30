const { createSlice, nanoid } = require("@reduxjs/toolkit");

const initialState = {
  user: [],
};

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
});

export const { addUser } = Slice.actions;
export default Slice.reducer;
