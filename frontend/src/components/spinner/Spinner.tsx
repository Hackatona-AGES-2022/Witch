import clsx from "clsx";
import React from "react";
import styles from "./Spinner.module.css";

interface LoadingSpinnerProps {
  loading: boolean;
}

export function LoadingSpinner({ loading }: LoadingSpinnerProps) {
  return (
    <div className={clsx(styles.spinnerContainer, !loading && "hidden")}>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
}
