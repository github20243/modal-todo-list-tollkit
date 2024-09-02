import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice/todoSlice";

const store = configureStore({
    reducer: {
        [todoSlice.name]: todoSlice.reducer
    }
})

export default store