export interface PostData {
  title: string;
  content: string;
  username: string;
}

export interface Post extends PostData {
  id: number;
  created_datetime: string;
}