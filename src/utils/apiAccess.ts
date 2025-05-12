import type { Post, PostData } from "../types/Post";

const API_URL = "https://dev.codeleap.co.uk/careers/";

export const api = {
  async updatePost(postId: number, data: Partial<Post>): Promise<Post> {
    try {
      const response = await fetch(`${API_URL}${postId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMessage = `Failed to update post ${postId}: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }

      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async deletePost(postId: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}${postId}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorMessage = `Failed to delete post ${postId}: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async createPost(postData: PostData): Promise<Post> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    return await response.json();
  },

  async getPosts(): Promise<Post[]> {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorMessage = `Failed to fetch posts: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
