"use client";

import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useDispatch } from "react-redux";
import { login } from "@/redux/authSlice";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation"; // ✅ yönlendirme için

interface LoginFormProps {
  onClose?: () => void;
}

export default function LoginForm({ onClose }: LoginFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      dispatch(login({ id: user.uid, username: user.email || "unknown" }));
      alert("Giriş başarılı!");
      router.push("/"); // Girişten sonra ana sayfaya yönlendir
      onClose?.();
    } catch (error: any) {
      alert("Giriş başarısız: " + error.message);
    }
  };

  return (
    // Material UI Box bileşeni ile form oluşturuldu
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Şifre"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button variant="contained" type="submit" color="primary">
        Giriş Yap
      </Button>
    </Box>
  );
}
