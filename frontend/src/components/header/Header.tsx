import clsx from "clsx";
import * as React from "react";
import styles from "./Header.module.css";

export function Header() {
  return (
    <div className="w-screen flex flex-row pt-5">
      <div className={styles.headerImageContainer}>
        <img
          className={clsx("rounded-full m-2", styles.image)}
          src="https://www.w3schools.com/howto/img_avatar2.png"
          alt="avatar"
        />
      </div>
    </div>
  );
}
