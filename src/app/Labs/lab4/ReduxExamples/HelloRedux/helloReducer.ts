import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    message : "Hello World",
}
const helloslice = createSlice({
    name: "hello",
    initialState,
    reducers: {},
});
export default helloslice.reducer;
