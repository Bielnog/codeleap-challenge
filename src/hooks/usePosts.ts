import { useState, useEffect } from "react";
import { api } from "../utils/apiAccess";
import type { Post } from "../types/Post";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await api.getPosts();
        setPosts(postsData);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return { posts };
}
