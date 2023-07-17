import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isError: false,
  isAuthenticated: false,
  token: "AowhcxMxFzwjrUV7nHpBcahKasozheYUmL6izefZds6ibz1XlmY6TsOWRBeOXqJY",
  email: "azvyae@example.app",
  password: "example2048",
  data: {
    data: {
      foods: [
        {
                "name": "Rendang",
                "price": 20000
            },
            {
                "name": "Ayam Goreng",
                "price": 15000
            },
            {
                "name": "Nasi Uduk",
                "price": 10000
            }
      ],
    },
  },
};

export const authenticateUser = createAsyncThunk(
  "auth/authenticateUser",
  async (credentials) => {
    try {
      const response = await axios.post(
        "https://next-backend-example.vercel.app/auth",
        credentials
      );
      return response.data.token;
    } catch (error) {
      console.error("Error during authentication:", error);
      throw new Error("Email or password is incorrect"); // Menambahkan throw new Error() untuk menghasilkan pesan kesalahan
    }
  }
);

export const fetchFoods = createAsyncThunk("auth/fetchFoods", async () => {
  try {
    const response = await axios.get(
      "https://next-backend-example.vercel.app/foods"
    );
    return response.data;
  } catch (error) {
    console.error("Error during fetching foods:", error);
    throw new Error("Failed to fetch foods"); // Menambahkan throw new Error() untuk menghasilkan pesan kesalahan
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.email = "";
      state.password = "";
    },
    islogin(state) {
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload;
        state.isError = false; // Mengatur isError kembali ke false saat berhasil autentikasi
      })
      .addCase(authenticateUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.isError = true;
      })
      .addCase(fetchFoods.fulfilled, (state, action) => {
        state.data.data.foods = action.payload;
      })
      .addCase(fetchFoods.rejected, (state) => {
        state.isError = true;
      });
  },
});

export const { logout, islogin } = authSlice.actions;
export default authSlice.reducer;
