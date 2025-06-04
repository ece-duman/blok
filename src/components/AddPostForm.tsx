"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Redux için
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchPosts } from "@/slices/postsSlice";

import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Box,
} from "@mui/material";

interface AddPostFormProps {
  category?: string; // Opsiyonel kategori prop'u
}

const AddPostForm = ({ category }: AddPostFormProps) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>(); // Redux dispatch

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "posts"), {
        title,
        body,
        image,
        category: category || "", // Burada kategori bilgisi eklendi
        createdAt: serverTimestamp(),
      });

      alert("Gönderi başarıyla eklendi!");

      // Redux store'u güncelle
      dispatch(fetchPosts());

      // Formu sıfırla
      setTitle("");
      setBody("");
      setImage("");
    } catch (error: any) {
      alert("Gönderi eklenirken hata oluştu: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 3,
          backgroundColor: "#fffafc",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{ color: "hotpink" }}
        >
          Yeni Gönderi Ekle
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="Başlık"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="İçerik"
            variant="outlined"
            multiline
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Görsel URL"
            variant="outlined"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Gönderiliyor..." : "Gönderiyi Ekle"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddPostForm;
