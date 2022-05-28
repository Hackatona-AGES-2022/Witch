import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN_NAME, useAuth } from "../../hooks/useAuth";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Logo } from "../logo/Logo";

export function Header() {
  const isAuthenticated = useAuth();
  const localStorage = useLocalStorage();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_NAME);
    navigate("/login");
  };

  return (
    <header className="w-full h-10 bg-blue-900 flex items-center divide-x shadow-sm">
      <div className="flex items-center m-2">
        <Logo />
        <h2 className="text-white">App Name</h2>
      </div>
      <div className="flex flex-1 justify-center">
        <ul className="flex gap-8 m-2 text-white">
          <li className="cursor-pointer">Login</li>
          <li className="cursor-pointer">Cadastro</li>
        </ul>
      </div>
      {isAuthenticated && (
        <span onClick={logout} className="text-white p-3 cursor-pointer">
          SAIR
        </span>
      )}
    </header>
  );
}
