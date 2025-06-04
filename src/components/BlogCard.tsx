"use client";
import styled from "styled-components";
import Link from "next/link";
import type { Post } from "@/slices/postsSlice";
import { memo } from "react";

const Card = styled.div`
  background-color: var(--card-bg); /* 🔄 DÜZENLENDİ */
  color: var(--foreground);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1rem;
  max-width: 300px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background-color 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.03);
  }

  img {
    border-radius: 8px;
    width: 100%;
  }

  h3 {
    margin-top: 0.5rem;
    font-size: 1.2rem;
  }

  p {
    font-size: 0.95rem;
    opacity: 0.85;
  }
`;
// Post verisini alır ve gösterir
function BlogCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.id}`} // 🔧 template literal düzeltildi
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card>
        <img src={post.image} alt={post.title} loading="lazy" />
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </Card>
    </Link>
  );
}
// memo ile sarmalanmış, yani BlogCard sadece "post" propsu değişince yeniden render olur
export default memo(BlogCard);
