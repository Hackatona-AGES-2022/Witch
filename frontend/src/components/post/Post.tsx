import clsx from "clsx";
import { FeedPost } from "../../types/post";
import styles from "./Post.module.css";

interface PostProps {
  post: FeedPost;
}

export function Post({ post }: PostProps) {
  return (
    <div className="flex flex-col p-6">
      <div className="flex items-center gap-2">
        <div className="flex">
          <img
            className={clsx("rounded-full m-2", styles.image)}
            src="https://www.w3schools.com/howto/img_avatar2.png"
            alt="avatar"
          />
        </div>
        <p className={styles.title}>{post.user.name}</p>
      </div>
      <div className="mt-1">
        <p>{post.content}</p>
      </div>
    </div>
  );
}
