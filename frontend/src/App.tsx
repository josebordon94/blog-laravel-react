import { Routes, Route, Navigate, Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import MyPosts from "./pages/MyPosts";
import CreatePost from "./pages/CreatePost";

const App = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      {isAuthenticated && (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Blog Laravel+React
            </Typography>
            <Button color="inherit" component={RouterLink} to="/feed">
              Home
            </Button>
            <Button color="inherit" component={RouterLink} to="/my-posts">
              Mis Posts
            </Button>
            <Button color="inherit" onClick={logout}>
              Salir
            </Button>
          </Toolbar>
        </AppBar>
      )}

      <Routes>
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/feed" />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Navigate to="/feed" />}
        />

        <Route
          path="/feed"
          element={isAuthenticated ? <Feed /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-posts"
          element={isAuthenticated ? <MyPosts /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-post"
          element={isAuthenticated ? <CreatePost /> : <Navigate to="/login" />}
        />

        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/feed" : "/login"} />}
        />
      </Routes>
    </Box>
  );
};

export default App;
