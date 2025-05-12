import PostForm from "./Post/PostForm/PostForm";
import "../../styles/Form.scss";
import Post from "./Post/Post";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../../hooks/usePosts";
import { MdOutlineLogout } from "react-icons/md";
import { useAuth } from "../../utils/AuthContext";
import { api } from "../../utils/apiAccess";
import type { PostData } from "../../types/Post";

export default function MainForm() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { posts, refreshPosts } = usePosts();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/codeleap-challenge/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handlePostSubmit = async (title: string, content: string) => {
    if (!user) return;

    try {
      const postData: PostData = {
        title,
        content,
        username: user.displayName || "Anonymous",
      };

      await api.createPost(postData);
      await refreshPosts();
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };
  const handlePostUpdate = async () => {
    await refreshPosts();
  };

  return (
    <div className="main-form-container">
      <div className="main-form-header">
        <span className="title">CodeLeap Network</span>
        {user && (
          <MdOutlineLogout
            onClick={handleLogout}
            className="logout-button"
            title="Logout"
          />
        )}
      </div>

      <div className="form-content">
        <PostForm
          onCreatePost={handlePostSubmit}
          username={user?.displayName || ""}
        />
        <br />
        <div className="posts-list">
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              author={post.username}
              timestamp={post.created_datetime}
              username={user?.displayName || ""}
              onEdit={handlePostUpdate}
              onDelete={handlePostUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
