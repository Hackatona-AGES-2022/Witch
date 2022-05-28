import { Button, TextField } from "@mui/material";
import { AxiosResponse } from "axios";
import clsx from "clsx";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Logo } from "../../components/logo/Logo";
import { useApi } from "../../hooks/useApi";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import styles from "./Login.module.css";
import vector from "./vector.png";

const validationSchema = yup.object({
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  password: yup.string().required("Campo obrigatório"),
});

export function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: ({ email, password }) => {
      post("/login", { email, password })
        .then(loginSuccess)
        // error handled by Axios interceptor
        .catch(() => {});
    },
  });

  const loginSuccess = (response: AxiosResponse) => {
    setItem("TOKEN", response.data.accessToken);
    navigate("/home");
  };

  const { post } = useApi("auth");
  const { setItem } = useLocalStorage();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen">
      <div className={styles.img}>
      <img src={vector} className={styles.vector}/> 
      <p className={styles.witch}>
        Bem vinda, <span className={styles.textSecondary}>Witch!</span>
      </p>
      </div>

    <div className="flex flex-col items-center h-screen">
      <form
        onSubmit={formik.handleSubmit}
        className={clsx(styles.form, "flex flex-col gap-5 mt-10")}
        >
        <div className={styles.inputs}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="E-mail"
          value={formik.values.email}
          className={styles.custom}
          variant="outlined"
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Senha"
          type="password"
          className={styles.custom}
          value={formik.values.password}
          variant="outlined"
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          />
        <p className={clsx(styles.fontLeft, styles.grey)}> 
          Esqueci a senha 
        </p>
        </div>
        <div className={styles.buttons}>
        <Button  style={{
            borderRadius: 50,
            height: 50,
        }} color="primary" variant="contained" fullWidth type="submit">
          Entrar
        </Button>
        <p className={clsx(styles.fontcenter, styles.textPrimary)}> 
          Cadastrar
        </p>
        </div>
      </form>
      </div>
    </div>
  );
}
