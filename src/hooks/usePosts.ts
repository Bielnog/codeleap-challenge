import { useState, useEffect, useCallback } from "react";
import { api } from "../utils/apiAccess";
import type { Post } from "../types/Post";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = useCallback(async () => {
    try {
      const postsData = await api.getPosts();
      setPosts(postsData);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, refreshPosts: fetchPosts };
}
