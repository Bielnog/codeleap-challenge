import PostForm from "./Post/PostForm/PostForm";
import "../../styles/Form.scss";
import Post from "./Post/Post";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../utils/apiAccess";
import { MdOutlineLogout } from "react-icons/md";
import { useAuth } from "../../utils/AuthContext";

interface PostData {
  id: string;
  title: string;
  content: string;
  username: string;
  created_datetime: string;
}

export default function MainForm() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/codeleap-challenge/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const [author, setAuthor] = useState("");
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const fetchUsername = async () => {
      const username = await AsyncStorage.getItem("username");
      if (username) {
        setAuthor(username);
      }
    };
    fetchUsername();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await api.getPosts();
        const sortedPosts = posts.sort(
          (a, b) =>
            new Date(b.created_datetime).getTime() -
            new Date(a.created_datetime).getTime()
        );
        const formattedPosts = sortedPosts.map((post) => ({
          id: post.id.toString(),
          title: post.title,
          content: post.content,
          username: post.username,
          created_datetime: post.created_datetime,
        }));
        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostSubmit = async (title: string, content: string) => {
    try {
      const newPost = await api.createPost({
        username: author,
        title,
        content,
      });

      setPosts((prevPosts) => [
        {
          ...newPost,
          id: newPost.id.toString(),
        },
        ...prevPosts,
      ]);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const refreshPosts = async () => {
    try {
      const updatedPosts = await api.getPosts();
      setPosts(
        updatedPosts.map((post) => ({
          ...post,
          id: post.id.toString(),
        }))
      );
    } catch (error) {
      console.error("Error refreshing posts:", error);
    }
  };

  return (
    <div className="main-form-container">
      <div className="main-form-header">
        <span className="title">CodeLeap Network</span>
        {author && (
          <MdOutlineLogout onClick={handleLogout} className="logout-button" />
        )}
      </div>

      <div className="form-content">
        <PostForm onCreatePost={handlePostSubmit} username={author} />
        <br />
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            author={post.username}
            timestamp={post.created_datetime}
            onEdit={refreshPosts}
            onDelete={refreshPosts}
            currentUser={author}
          />
        ))}
      </div>
    </div>
  );
}
