"use client";

import {
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import Link from "next/link";

const categories = [
  {
    name: "Moda",
    description: "Trendleri takip edin, stilinizi keşfedin.",
    image:
      "https://th.bing.com/th/id/OIP.akNzX6A9kRtHNJJR-6tlLgHaFm?rs=1&pid=ImgDetMain",
    href: "/kategori/moda",
  },
  {
    name: "Yaşam",
    description: "Sağlık, mutluluk ve yaşam önerileri.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    href: "/kategori/yasam",
  },
  {
    name: "Kombin",
    description: "Günlük stil ve kombin önerileri.",
    image:
      "https://th.bing.com/th/id/R.c95c6cd8a7c8873311623b6d00389ee2?rik=7ByKiUBliK4Ugg&pid=ImgRaw&r=0",
    href: "/kategori/kombin",
  },
];

export default function HomePage() {
  return (
    <Box
      sx={{
        px: 6,
        py: 8,
        backgroundColor: "#fff0f5",
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
        gap: 4,
      }}
    >
      <Box gridColumn="1 / -1">
        <Typography variant="h4" fontWeight="bold" mb={4} color="#d81b60">
          🧥 Moda & 💫 Yaşam Blogu
        </Typography>

        <Typography variant="body1" mb={4}>
          Hoş geldiniz! Moda & Yaşam Blogu, stil ve yaşam kalitenizi artırmak
          için tasarlanmış özel bir platformdur.
          <br />
          <br />
          <strong>Moda kategorimiz</strong> ile en güncel trendleri, stil
          ipuçlarını ve kombin önerilerini keşfedebilirsiniz. Gardırobunuza
          yenilik katmak ve kendi tarzınızı yaratmak isteyenler için ilham dolu
          içerikler sunuyoruz.
          <br />
          <br />
          <strong>Yaşam kategorimiz</strong> ise sağlıklı yaşam, mutluluk ve
          kişisel gelişim gibi konularda rehberlik eder. Günlük hayata pozitif
          dokunuşlar yapmak ve daha dengeli bir yaşam sürmek isteyenler için
          pratik öneriler paylaşıyoruz.
          <br />
          <br />
          <strong>Kombin kategorimiz</strong> ile mevsimlere uygun, pratik ve
          şık kombin fikirleri sunuyoruz. Günlük stilinizi tamamlayacak, özgün
          ve kolay uygulanabilir önerilerle tarzınızı daha da
          güçlendirebilirsiniz.
          <br />
          <br />
          Siz de kendi stilinizi ve yaşam deneyimlerinizi paylaşmak isterseniz,
          hemen giriş yaparak gönderilerinizi ekleyebilir, topluluğumuzun aktif
          bir parçası olabilirsiniz.
          <br />
          <br />
          Moda ve yaşamı buluşturan blogumuzda keyifli okumalar!
        </Typography>

        <Button
          component={Link}
          href="/login"
          variant="contained"
          sx={{
            mb: 6,
            backgroundColor: "#ff69b4",
            "&:hover": { backgroundColor: "#e0488c" },
            textTransform: "none",
          }}
        >
          Giriş Yap ve Gönderini Paylaş
        </Button>
      </Box>

      {categories.map((cat) => (
        <Card
          key={cat.name}
          sx={{
            boxShadow: 3,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardMedia
            component="img"
            height="180"
            image={cat.image}
            alt={cat.name}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {cat.name}
            </Typography>
            <Typography variant="body2" mb={2}>
              {cat.description}
            </Typography>
            <Button
              component={Link}
              href={cat.href}
              variant="outlined"
              sx={{ textTransform: "none" }}
            >
              Kategoriye Git
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
