import { Navbar } from "../../components/navbar/Navbar";
import styles from "./Home.module.css";

export function Home() {
  return (
    <div>
      <div className={styles.page}>
        <h1 className="text-3xl font-bold underline">Hi</h1>
      </div>
      <Navbar />
    </div>
  );
}
