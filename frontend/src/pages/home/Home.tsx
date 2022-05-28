import { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import { Navbar } from "../../components/navbar/Navbar";
import { Post } from "../../components/post/Post";
import { useApi } from "../../hooks/useApi";
import styles from "./Home.module.css";

export function Home() {
  const [feed, setFeed] = useState([]);

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
          <Post />
        ))}
      </div>
      <Navbar />
    </div>
  );
}
