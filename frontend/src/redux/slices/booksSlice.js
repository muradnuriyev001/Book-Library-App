import axios from "axios";
import createBooKWithID from "../../utils/createBookWithID";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setError } from "./errorSlice";

const initialState = {
  books: [],
  isLoadingViaApi: false,
};

export const fetchBook = createAsyncThunk(
  "books/fetchBook",
  async (url, thunkAPI) => {
    // console.log(thunkAPI) it has .dispatch property
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      //method1
      //thorw error
      
      //methor2
      return thunkAPI.rejectWithValue(error); //Promise fullfield => rejected
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    deleteBook: (state, action) => {
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    },
    toggleFavorite: (state, action) => {
      state.books.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
    },
  },

  //For Api request
  //1 method
  extraReducers: {
    [fetchBook.pending]: (state) => {
      state.isLoadingViaApi = true;
    },
    [fetchBook.fulfilled]: (state, action) => {
      state.isLoadingViaApi = false;
      if (action.payload.title && action.payload.author) {
        state.books.push(createBooKWithID(action.payload, "API"));
      }
    },
    [fetchBook.rejected]: (state) => {
      state.isLoadingViaApi = false;
    },
  },

  //2 method
  // extraReducers: (builder) => {
  //   builder.addCase(fetchBook.fulfilled, (state, action) => {
  //     if (action.payload.title && action.payload.author) {
  //       state.push(createBooKWithID(action.payload, "API"));
  //     }
  //   });
  // },
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export const selectBooks = (state) => state.books.books;
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaApi;

export default booksSlice.reducer;
