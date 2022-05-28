import { Button, TextField } from "@mui/material";
import clsx from "clsx";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Navbar } from "../../components/navbar/Navbar";
import { useApi } from "../../hooks/useApi";
import styles from "./Report.module.css";

const validationSchema = yup.object({
  content: yup.string().required("Campo obrigatório"),
});

export function Report() {
  const { post } = useApi("posts");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      content: "",
      title: "",
      triggerWarning: "",
    },
    validationSchema: validationSchema,
    onSubmit: ({ content, title, triggerWarning }) => {
      post("", { content, title, triggerWarning }).then((response) => {
        navigate("/home");
      });
    },
  });

  return (
    <>
      <div className={clsx("flex flex-col p-8", styles.page)}>
        <div>
          <h1 className={styles.title}>Adicione relato</h1>

          <div className="flex flex-col items-center h-screen">
            <form
              onSubmit={formik.handleSubmit}
              className={clsx(styles.form, "flex flex-col gap-5 mt-10 w-full")}
            >
              <div className={styles.inputs}>
                <TextField
                  fullWidth
                  name="title"
                  label="Título (opcional)"
                  required={false}
                  value={formik.values.title}
                  className={styles.custom}
                  variant="outlined"
                  onChange={formik.handleChange}
                />
                <TextField
                  fullWidth
                  name="content"
                  label="Relato"
                  required={true}
                  value={formik.values.content}
                  className={styles.textArea}
                  variant="outlined"
                  onChange={formik.handleChange}
                  multiline={true}
                  rows={5}
                />
                <p>
                  Conteúdo sensível: se o seu relato aborda temas que podem ser
                  sensíveis para outras pessoas (como por exemplo estupro, abuso
                  psicológico, entre outros) é importante que você indique na
                  caixa de texto abaixo
                </p>
                <TextField
                  fullWidth
                  name="triggerWarning"
                  label="Conteúdo sensível"
                  required={false}
                  value={formik.values.triggerWarning}
                  variant="outlined"
                  onChange={formik.handleChange}
                />
              </div>
              <div className={styles.buttons}>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Adicionar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
}
