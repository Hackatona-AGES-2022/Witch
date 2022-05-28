import clsx from "clsx";
import styles from "./Post.module.css";

export function Post() {
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
        <p className={styles.title}>Gabriela Azevedo</p>
      </div>
      <div className="mt-1">
        <p>
          Me culpava de um assédio q eu sofri do meu namorado, ele controlava as
          roupas q eu usava e me manipulava pra fazer sexo com ele quando ele
          queria. Flertou com outra na minha cara e dps falou q eu era paranoica
          insegura me viu abraçando uma criança e disse q se me visse abraçando
          outro cara me arrebentava.
        </p>
      </div>
    </div>
  );
}
