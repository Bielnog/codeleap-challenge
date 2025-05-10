const API_URL = "https://dev.codeleap.co.uk/careers/";

interface PostData {
  username: string;
  title: string;
  content: string;
}

export const api = {
  async createPost(post: PostData) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    return response.json();
  },

  async getPosts() {
    const response = await fetch(API_URL);
    return response.json();
  },

  async updatePost(id: string, post: Partial<PostData>) {
    const { title, content } = post;
    const response = await fetch(`${API_URL}${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });
    return response.json();
  },

  async deletePost(id: string) {
    await fetch(`${API_URL}${id}/`, {
      method: "DELETE",
    });
  },
};
