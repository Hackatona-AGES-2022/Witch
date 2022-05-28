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
        <div className="flex items-center justify-evenly pt-8 text-lg">
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

        <div className={styles.container}>Leis Importantes</div>
        <div className="mt-2 p-5">
          <span className={styles.primary}>
            <span className="font-bold">
              Lei Maria da Penha - Lei n. 14.310
            </span>{" "}
            de 08 de março de 2022
          </span>{" "}
          alterou a Lei Maria da Penha para determinar o registro imediato, pela
          autoridade judicial, das medidas protetivas de urgência deferidas em
          favor da mulher em situação de violência doméstica e familiar, ou de
          seus dependentes.
        </div>
        <div className="mt-1 p-5 pt-2">
          <span className={styles.primary}>
            <span className="font-bold"> Lei Carolina Dieckmann</span>
            (Lei nº 12.737/2012).
          </span>{" "}
          definiu crimes cibernéticos no Brasil. Ela recebeu este nome, pois na
          época que o projeto tramitava a atriz teve o computador invadido e
          fotos pessoais divulgadas sem autorização por hackers. A legislação
          classifica como crime justamente casos como estes: invasão de
          computadores, tablets, smartphones, conectados ou não à internet, que
          resulte na obtenção, adulteração ou destruição dos dados e
          informações.{" "}
        </div>
      </div>
      <Navbar />
    </>
  );
}
