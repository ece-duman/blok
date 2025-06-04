import { notFound } from "next/navigation";
import { fetchPostById } from "@/lib/api";
import type { Post } from "@/slices/postsSlice";

type Props = {
  params: {
    id: string;
  };
};

export default async function BlogDetailPage(props: Props) {
  const { id } = props.params; // ✅ önce destructure
  const post = await fetchPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{post.title}</h1>
      <img
        src={post.image}
        alt={post.title}
        style={{ width: "100%", maxWidth: "700px", borderRadius: "10px" }}
      />
      <p style={{ marginTop: "1.5rem", fontSize: "1.2rem" }}>{post.body}</p>
    </main>
  );
}
