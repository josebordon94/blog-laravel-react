import { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import api from '../services/api';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    try {
      const response = await api.post('/ai/generate', { prompt: aiPrompt });
      setContent((prev) => (prev ? prev + '\n\n' : '') + response.data.content);
      setAiPrompt('');
    } catch (err: any) {
      setError('Error generating AI content. Please try again.');
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      await api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/feed');
    } catch (err: any) {
      setError('Error creating post. Please check the fields and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Create New Post
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              margin="normal"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              fullWidth
              label="Content"
              margin="normal"
              required
              multiline
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            
            <Box sx={{ mt: 1, mb: 2, display: 'flex', gap: 1, alignItems: 'flex-start' }}>
              <TextField
                fullWidth
                label="Describe the topic to generate AI content"
                size="small"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleAiGenerate();
                  }
                }}
                disabled={aiLoading}
              />
              <Button
                variant="outlined"
                onClick={handleAiGenerate}
                disabled={aiLoading || !aiPrompt.trim()}
                startIcon={aiLoading ? <CircularProgress size={16} /> : <AutoAwesomeIcon />}
                sx={{ whiteSpace: 'nowrap', minWidth: 'auto', px: 2, height: '40px', mt: '2px' }}
              >
                {aiLoading ? 'Generating...' : 'Generate with AI'}
              </Button>
            </Box>
            
            <Box sx={{ mt: 2, mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="raised-button-file">
                <Button variant="outlined" component="span" startIcon={<PhotoCamera />}>
                  Upload Image
                </Button>
              </label>
              
              {preview && (
                <Box sx={{ mt: 2, width: '100%', textAlign: 'center' }}>
                  <img 
                    src={preview} 
                    alt="Preview" 
                    style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} 
                  />
                </Box>
              )}
            </Box>

            {error && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? 'Publishing...' : 'Publish Post'}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default CreatePost;
