import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import clsx from "clsx";
import * as React from "react";
import { useCallback, useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useApi } from "../../hooks/useApi";
import styles from "./Header.module.css";
// import SearchIcon from '@mui/icons-material/Search';

export function Header() {
  const { user, setUser } = useContext(GlobalContext);
  const { get } = useApi("users");

  const fetchProfile = useCallback(async () => {
    const response = await get("/me");
    setUser(response?.data ?? {});
  }, [get, setUser]);

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="w-screen flex flex-row justify-between align-center pt-5">
      <div className={styles.headerImageContainer}>
        <img
          className={clsx("rounded-full m-2", styles.image)}
          src={
            user?.avatar ?? "https://www.w3schools.com/howto/img_avatar2.png"
          }
          alt="avatar"
        />
      </div>
      <div className={styles.name}>
        <p className={styles.title}>Oi, <span className={styles.weight}>{user?.name}!</span></p>
      </div>
      <IconButton color="primary" aria-label="Serch">
          <SearchIcon className={styles.primary}/>
        </IconButton>
    </div>
  );
}
