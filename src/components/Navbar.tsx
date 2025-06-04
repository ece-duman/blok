"use client";

import { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Modal } from "@mui/material";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { logout } from "@/redux/authSlice";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Navbar() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      alert("Çıkış yaparken hata oluştu: " + (error as Error).message);
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#ff69b4" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Moda & Yaşam Blogu
          </Typography>

          {/* Kategori Butonları */}
          <Box sx={{ display: "flex", gap: 2, mr: 4, alignItems: "center" }}>
            <Button
              component={Link}
              href="/"
              sx={{ color: "inherit", textTransform: "none" }}
            >
              Anasayfa
            </Button>
            <Button
              component={Link}
              href="/kategori/moda"
              sx={{ color: "inherit", textTransform: "none" }}
            >
              Moda
            </Button>
            <Button
              component={Link}
              href="/kategori/yasam"
              sx={{ color: "inherit", textTransform: "none" }}
            >
              Yaşam
            </Button>
            <Button
              component={Link}
              href="/kategori/kombin"
              sx={{ color: "inherit", textTransform: "none" }}
            >
              Kombin
            </Button>

            {/* Tema Butonu */}
            <Box sx={{ ml: 2 }}>
              <ThemeToggle />
            </Box>
          </Box>

          {/* Giriş / Kayıt / Çıkış Butonları */}
          <Box>
            {user ? (
              <Button color="inherit" onClick={handleLogout}>
                Çıkış Yap
              </Button>
            ) : (
              <>
                <Button color="inherit" onClick={() => setOpenLogin(true)}>
                  Giriş Yap
                </Button>
                <Button color="inherit" onClick={() => setOpenRegister(true)}>
                  Kayıt Ol
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Modal open={openLogin} onClose={() => setOpenLogin(false)}>
        <Box sx={modalStyle}>
          <LoginForm onClose={() => setOpenLogin(false)} />
        </Box>
      </Modal>

      <Modal open={openRegister} onClose={() => setOpenRegister(false)}>
        <Box sx={modalStyle}>
          <RegisterForm onClose={() => setOpenRegister(false)} />
        </Box>
      </Modal>
    </>
  );
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
