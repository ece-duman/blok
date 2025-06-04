import { collection, getDocs, query, orderBy, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { Post } from "@/slices/postsSlice";

// Tüm postları Firestore'dan çek
export async function fetchPostsFromAPI(): Promise<Post[]> {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  const posts = snapshot.docs.map((doc) => {
    const data = doc.data() as Omit<Post, "id">;
    return {
      ...data,
      id: doc.id,
    };
  });

  return posts;
}

// Belirli bir postu id ile çek
export async function fetchPostById(id: string): Promise<Post | null> {
  const ref = doc(db, "posts", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  const data = snap.data() as Omit<Post, "id">;
  return { ...data, id: snap.id };
}


