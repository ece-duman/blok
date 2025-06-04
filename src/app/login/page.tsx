"use client";

import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: 400, margin: "0 auto" }}>
      <h2
        style={{
          fontSize: "1.5rem",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        Giriş Yap
      </h2>
      <LoginForm />
    </div>
  );
}
