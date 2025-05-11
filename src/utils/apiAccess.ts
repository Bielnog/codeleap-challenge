const API_URL = "https://dev.codeleap.co.uk/careers/";

interface Post {
  id: string;
  username: string;
  title: string;
  content: string;
  created_datetime: string;
}
interface PostData {
  username: string;
  title: string;
  content: string;
}

export const api = {
  async createPost(post: PostData): Promise<Post> {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        const errorMessage = `Failed to create post: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }

      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async getPosts(): Promise<Post[]> {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        const errorMessage = `Failed to fetch posts: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async updatePost(id: string, post: Partial<PostData>): Promise<Post> {
    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        const errorMessage = `Failed to update post ${id}: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }

      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async deletePost(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorMessage = `Failed to delete post ${id}: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
