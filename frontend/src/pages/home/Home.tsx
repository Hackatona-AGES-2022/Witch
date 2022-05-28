import { Header } from "../../components/header/Header";
import { Navbar } from "../../components/navbar/Navbar";
import { Post } from "../../components/post/Post";
import styles from "./Home.module.css";

export function Home() {
  return (
    <div>
      <Header />
      <div className={styles.page}>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
      <Navbar />
    </div>
  );
}
