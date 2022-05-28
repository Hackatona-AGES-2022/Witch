import { Header } from "../../components/header/Header";
import { Navbar } from "../../components/navbar/Navbar";
import styles from "./Info.module.css";
import ReportIcon from "@mui/icons-material/Report";
import clsx from "clsx";

export function Info() {
  return (
    <>
      <Header />
      <div className={styles.page}>
        <div className="flex items-center justify-evenly pt-5 text-lg">
          <div className="flex flex-col">
            <span className={styles.title}>87</span>
            <p>Casos</p>
          </div>
          <div className="flex flex-col">
            <span>Foram denunciados</span>
            <span className={clsx("flex items-center", styles.primary)}>
              <ReportIcon />
              <span>Denuncie</span>
            </span>
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
}
