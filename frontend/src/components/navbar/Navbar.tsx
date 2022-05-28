import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN_NAME, useAuth } from "../../hooks/useAuth";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import document from "./Document.svg";
import styles from "./Navbar.module.css";
import home from "./Home.svg";
import infoSquare from "./Info Square.svg";
import profile from "./Profile.svg";

export function Navbar() {
  const isAuthenticated = useAuth();
  const localStorage = useLocalStorage();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_NAME);
    navigate("/login");
  };

  return (
    <footer
      className={clsx(
        "w-full flex items-center divide-x shadow-sm",
        styles.container
      )}
    >
      <div
        className={styles.buttonContainer}
        onClick={() => navigate("/relato")}
      >
        <span>+</span>
      </div>

      <div className={clsx("flex flex-1", styles.iconContainer)}>
        <ul className="flex gap-9 m-2 text-white">
          <li className="cursor-pointer">
            <img src={home} />
          </li>
          <li className="cursor-pointer">
            <img src={document} />
          </li>
        </ul>
        <ul className="flex gap-9 m-2 text-white">
          <li className="cursor-pointer">
            <img src={profile} />
          </li>
          <li className="cursor-pointer">
            <img src={infoSquare} />
          </li>
        </ul>
      </div>
      {/* {isAuthenticated && (
        <span onClick={logout} className="text-white p-3 cursor-pointer">
          SAIR
        </span>
      )} */}
    </footer>
  );
}
