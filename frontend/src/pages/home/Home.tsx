import { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import { Navbar } from "../../components/navbar/Navbar";
import { Post } from "../../components/post/Post";
import { useApi } from "../../hooks/useApi";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { FeedPost } from "../../types/post";
import styles from "./Home.module.css";
import Swal from "sweetalert2";

export function Home() {
  const [feed, setFeed] = useState<FeedPost[]>([]);
  const { get } = useApi("posts");
  const { getItem, setItem } = useLocalStorage();

  useEffect(() => {
    const fetchFeed = async () => {
      const response = await get("/feed");
      setFeed(response.data);
    };
    fetchFeed();

    if (!getItem("FIRST_ACCESS")) {
      Swal.fire(
        "Bem-vinda!",
        "Aqui é um lugar onde se sentir confortável e segura é prioridade. Sinta-se à vontade para colaborar com algum relato e/ou apoiar outras mulheres. Respeito e acolhimento são fundamentais.",
        "success"
      );
      setItem("FIRST_ACCESS", true);
    }
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
