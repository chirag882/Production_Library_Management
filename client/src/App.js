import Header from "./components/header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Explore from "./pages/explore/Explore"
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute.js";
import "./App.css";
import { CartProvider } from "./components/ContextReducer";
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        {/* <Main /> */}
        <Routes>
          {/* <Route path="*" element={<Main />} /> */}
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Header />
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore/fiction"
            element={
              <ProtectedRoute>
                <Explore type={"Fiction"}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore/romance"
            element={
              <ProtectedRoute>
                <Explore type={"Romance"}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore/comic"
            element={
              <ProtectedRoute>
                <Explore type={"Comics"}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore/crime"
            element={
              <ProtectedRoute>
                <Explore type={"Crime"}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore/textbook"
            element={
              <ProtectedRoute>
                <Explore type={"Textbook"}/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
export default App;
