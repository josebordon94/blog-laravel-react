import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  Box,
  Fab,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import api from "../services/api";
import type { Post } from "../types/index";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get("/posts");
      setPosts(response.data);
    } catch (err) {
      console.error("Error fetching posts", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (post: Post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
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
            <Card
              sx={{
                width: "100%",
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.01)" },
              }}
              onClick={() => handleOpenModal(post)}
            >
              {post.image_path && (
                <Box
                  sx={{
                    backgroundColor: "black",
                    width: "100%",
                    height: "400px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={`http://localhost:8000/storage/${post.image_path}`}
                    alt={post.title}
                    sx={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              )}
              <CardContent>
                <Typography variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Por: {post.user?.name} -{" "}
                  {new Date(post.created_at).toLocaleDateString()}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {post.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 32, right: 32 }}
        component={RouterLink}
        to="/create-post"
      >
        <AddIcon />
      </Fab>

      {/* Modal de Pantalla Completa */}
      <Dialog
        fullScreen
        open={!!selectedPost}
        onClose={handleCloseModal}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseModal}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {selectedPost?.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {selectedPost?.image_path && (
            <Box sx={{ width: "100%", maxWidth: "1000px", textAlign: "center", mb: 4 }}>
              <img
                src={`http://localhost:8000/storage/${selectedPost.image_path}`}
                alt={selectedPost.title}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            </Box>
          )}
          <Container maxWidth="md">
            <Typography variant="h3" gutterBottom>
              {selectedPost?.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Publicado por {selectedPost?.user?.name} el{" "}
              {selectedPost
                ? new Date(selectedPost.created_at).toLocaleDateString()
                : ""}
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ whiteSpace: "pre-wrap", mt: 2 }}
            >
              {selectedPost?.content}
            </Typography>
          </Container>
        </Box>
      </Dialog>
    </Container>
  );
};

export default Feed;
