import { InputAdornment, TextField } from "@mui/material";
import clsx from "clsx";
import * as React from "react";
import styles from "./Header.module.css";
import SearchIcon from "@mui/icons-material/Search";

export function Header() {
  return (
    <div className="w-screen flex flex-row justify-between align-center pt-5">
      <div className={styles.headerImageContainer}>
        <img
          className={clsx("rounded-full m-2", styles.image)}
          src="https://www.w3schools.com/howto/img_avatar2.png"
          alt="avatar"
        />
      </div>

      <TextField
        className={styles.input}
        name="search"
        placeholder="O que você está procurando?"
        value={""}
        variant="filled"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
