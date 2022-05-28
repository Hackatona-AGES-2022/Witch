import clsx from "clsx";
import { FeedPost } from "../../types/post";
import styles from "./Post.module.css";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useState } from "react";
import chat from "./chat.svg";
import save from "./save.svg";
import support from "./support.svg";

interface PostProps {
  post: FeedPost;
}

export function Post({ post }: PostProps) {
  const hasWarning = Boolean(post.triggerWarning);
  const [showPost, setShowPost] = useState(!hasWarning);

  return (
    <div className="flex flex-col p-6">
      <div className="flex items-center gap-2">
        <div className="flex">
          <img
            className={clsx("rounded-full m-2", styles.image)}
            src={
              post.user.avatar ??
              "https://www.w3schools.com/howto/img_avatar2.png"
            }
            alt="avatar"
          />
        </div>
        <p className={styles.title}>{post.user.name}</p>
      </div>
      <div className={clsx("mt-1 relative")}>
        <p className={clsx(!showPost && styles.hide)}>{post.content}</p>
        {!showPost && (
          <p
            onClick={() => setShowPost(true)}
            className={clsx("absolute w-fit drop-shadow-sm", styles.view)}
          >
            Visualizar mesmo assim
          </p>
        )}
      </div>
      {hasWarning && (
        <span className="flex items-center gap-3 mt-3">
          <WarningAmberIcon color="primary" />
          <p className={styles.warning}>
            {"Alerta de gatilho: "}
            {post.triggerWarning}
          </p>
        </span>
      )}

      <span className="flex justify-end gap-2">
        <img src={chat} />
        <img src={support} />
        <img src={save} />
      </span>
    </div>
  );
}
