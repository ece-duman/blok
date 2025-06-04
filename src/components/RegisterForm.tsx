"use client";

import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useDispatch } from "react-redux";
import { login } from "@/redux/authSlice";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation"; // ✅ yönlendirme için

interface RegisterFormProps {
  onClose?: () => void;
}

export default function RegisterForm({ onClose }: RegisterFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter(); // ✅ router nesnesi
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      dispatch(login({ id: user.uid, username: user.email || "unknown" }));
      alert("Kayıt başarılı!");
      onClose?.();
      router.push("/"); // ✅ anasayfaya yönlendir
    } catch (error: any) {
      alert("Kayıt başarısız: " + error.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleRegister}
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
      <Button variant="contained" type="submit" color="secondary">
        Kayıt Ol
      </Button>
    </Box>
  );
}
