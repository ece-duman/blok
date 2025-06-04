import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Firestore bağlantısı

export type Post = {
  id: string;
  title: string;
  body: string;
  image: string;
  category?: string;  // Kategori alanı opsiyonel olarak eklendi
};

// ✅ Artık Firestore'dan gerçek postları çekiyoruz
export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchPosts',
  async () => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    const posts = snapshot.docs.map((doc) => {
      const data = doc.data() as Omit<Post, "id">;
      return {
        ...data,
        id: doc.id, // burada ID çakışması olmaz
        category: data.category || "",  // category alanı boşsa "" olarak ayarla
      };
    });

    return posts;
  }
);

type PostsState = {
  list: Post[];
  loading: boolean;
  error: string | null;
};

const initialState: PostsState = {
  list: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.list.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Bir hata oluştu';
      });
  },
});

export const { addPost } = postsSlice.actions;
export default postsSlice.reducer;




