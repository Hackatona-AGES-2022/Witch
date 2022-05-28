import { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import { Navbar } from "../../components/navbar/Navbar";
import { Post } from "../../components/post/Post";
import { useApi } from "../../hooks/useApi";
import { FeedPost } from "../../types/post";
import styles from "./Home.module.css";

export function Home() {
  const [feed, setFeed] = useState<FeedPost[]>([]);

  const { get } = useApi("posts");

  useEffect(() => {
    const fetchFeed = async () => {
      const response = await get("/feed");
      setFeed(response.data);
    };
    fetchFeed();
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.page}>
        {feed.map((feed) => (
          <Post key={feed.idPost} post={feed} />
        ))}
      </div>
      <Navbar />
    </div>
  );
}
