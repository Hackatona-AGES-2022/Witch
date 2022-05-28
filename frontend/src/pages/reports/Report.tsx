import { Button, TextField } from "@mui/material";
import clsx from "clsx";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Navbar } from "../../components/navbar/Navbar";
import { useApi } from "../../hooks/useApi";
import styles from "./Report.module.css";
import CloseIcon from '@mui/icons-material/Close';

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
      <div className={clsx("flex flex-col p-8 ", styles.page)}>
        <div>
          <div className="flex flex-col items-center justify-around  h-screen">
          <div className={styles.aligntext}>
          <h1 className={styles.title}>Adicione relato</h1> 
          {/* <CloseIcon></CloseIcon> */}
          </div>
            <form
              onSubmit={formik.handleSubmit}
              className={clsx(styles.form, "flex flex-col gap-5 w-full")}
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
                  className={clsx(styles.textArea, styles.area)}
                  variant="outlined"
                  onChange={formik.handleChange}
                  multiline={true}
                  rows={5}
                />
                  <div className={styles.mtop50}>
                 <TextField
                  fullWidth
                  name="triggerWarning"
                  label="Conteúdo sensível"
                  required={false}
                  value={formik.values.triggerWarning}
                  className={styles.custom}
                  variant="outlined"
                  onChange={formik.handleChange}
                />

                <p className={clsx(styles.mtop5, styles.text)}>
                  <span className={styles.textPrimary}>Conteúdo sensível:</span> se o seu relato aborda temas que podem ser
                  sensíveis para outras pessoas (como por exemplo estupro, abuso
                  psicológico, entre outros) é importante que você indique na
                  caixa de texto abaixo
                </p>
                </div>
               
              </div>
              <div className={styles.buttons}>
                <Button
                 style={{
                  borderRadius: 50,
                  height: 50,
                }}
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
