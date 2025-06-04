"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchPosts, Post } from "@/slices/postsSlice";
import BlogCard from "./BlogCard";
import AddPostForm from "./AddPostForm";
import { Button } from "@mui/material";

interface CategoryPageProps {
  categoryName: string;
}

export default function CategoryPage({ categoryName }: CategoryPageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const posts = useSelector((state: RootState) => state.posts.list);
  const loading = useSelector((state: RootState) => state.posts.loading);
  const error = useSelector((state: RootState) => state.posts.error);
  const user = useSelector((state: RootState) => state.auth.user);

  const filteredPosts = posts.filter(
    (post) => post.category?.toLowerCase() === categoryName.toLowerCase()
  );

  useEffect(() => {
    dispatch(fetchPosts()); // Redux ile API'den gönderileri çek
  }, [dispatch]);

  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    if (!user) {
      router.push("/login"); // Giriş yoksa login sayfasına yönlendir
    } else {
      setShowForm(!showForm); // Giriş varsa formu aç/kapa
    }
  };

  return (
    <main className="px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">{categoryName} Kategorisi</h1>

      <Button
        variant="contained"
        onClick={handleButtonClick}
        sx={{
          mb: 4,
          backgroundColor: "#ff69b4",
          color: "white",
          "&:hover": { backgroundColor: "#e0488c" },
          textTransform: "none",
        }}
      >
        {showForm
          ? "Formu Gizle"
          : user
            ? "📝 Gönderi Ekle"
            : "Giriş Yap ve Gönderini Paylaş"}
      </Button>

      {showForm && <AddPostForm category={categoryName} />}

      {loading && <p>Yükleniyor...</p>}
      {error && <p className="text-red-600">Hata: {error}</p>}

      <div className="flex flex-wrap gap-6 justify-start">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post: Post) => (
            <BlogCard key={post.id} post={post} />
          ))
        ) : (
          <p>Bu kategoride henüz gönderi bulunmamaktadır.</p>
        )}
      </div>
    </main>
  );
}
