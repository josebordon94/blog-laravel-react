import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  CircularProgress,
  Box,
  Fab,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Link as RouterLink } from "react-router-dom";
import api from "../services/api";
import type { Post } from "../types/index";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

const MyPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchMyPosts();
    }
  }, [user]);

  const fetchMyPosts = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await api.get("/posts");
      // Aseguramos la comparación de IDs (pueden venir como string o number)
      const myPosts = response.data.filter(
        (p: Post) => Number(p.user_id) === Number(user.id),
      );
      setPosts(myPosts);
    } catch (err) {
      console.error("Error fetching my posts", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este post?")) {
      try {
        await api.delete(`/posts/${id}`);
        // Volvemos a pedir la información para actualizar
        await fetchMyPosts();
      } catch (err) {
        console.error("Error deleting post", err);
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container
      maxWidth="md"
      sx={{ mt: 4, position: "relative", minHeight: "80vh", pb: 8 }}
    >
      {posts.length === 0 ? (
        <Typography align="center">
          No has publicado ningún post todavía.
        </Typography>
      ) : (
        <Grid
          container
          spacing={3}
          justifyContent="center"
          direction="column"
          alignItems="center"
        >
          {posts.map((post) => (
            <Grid
              item
              xs={12}
              key={post.id}
              sx={{ width: "100%", maxWidth: "700px" }}
            >
              <Card sx={{ width: "100%", display: "flex" }}>
                {post.image_path && (
                  <CardMedia
                    component="img"
                    sx={{ width: 140, height: 140, objectFit: "cover" }}
                    image={`http://localhost:8000/storage/${post.image_path}`}
                    alt={post.title}
                  />
                )}
                <CardContent
                  sx={{
                    flex: "1 0 auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="h6" component="div">
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Publicado el{" "}
                      {new Date(post.created_at).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1 }}>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(post.id)}
                    >
                      Eliminar
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 32, right: 32 }}
        component={RouterLink}
        to="/create-post"
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default MyPosts;
