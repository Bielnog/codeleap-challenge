import PostForm from "./Post/PostForm/PostForm";
import "../../styles/Form.scss";
import Post from "./Post/Post";

export default function MainForm() {
  return (
    <div className="main-form-container">
      <div className="main-form-header">
        <span className="title">CodeLeap Network</span>
      </div>

      <div className="form-content">
        <PostForm />
        <br />
        <Post
          title="My First Post"
          content="This is the content of my first post."
          author="JohnDoe"
          timestamp={`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`}
        />
      </div>
    </div>
  );
}
