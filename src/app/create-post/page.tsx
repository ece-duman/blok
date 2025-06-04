"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Typography, Box } from "@mui/material";
import AddPostForm from "@/components/AddPostForm";

export default function CreatePostPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  if (!user) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fff0f5", // Açık pembe arka plan
        py: 6,
        px: 2,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        sx={{ color: "hotpink", mb: 4 }}
      >
        Yeni Gönderi Ekle
      </Typography>

      <AddPostForm />
    </Box>
  );
}
