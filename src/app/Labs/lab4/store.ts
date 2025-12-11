"use client";
import  {configureStore} from "@reduxjs/toolkit";
import helloReducer from "../lab4/ReduxExamples/HelloRedux/helloReducer";
import counterReducer from "../lab4/ReduxExamples/CounterRedux/counterReducer";
import addReducer from "../lab4/ReduxExamples/AddRedux/addReducer";
import todosReducer from "../lab4/ReduxExamples/todos/todosReducer";
const store = configureStore({
    reducer :{
        hello: helloReducer,
        counter: counterReducer,
        add: addReducer,
        todo: todosReducer,
    },
})
export type RootState = ReturnType<typeof store.getState>;
export default store;