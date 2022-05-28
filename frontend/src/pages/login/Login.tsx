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
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-lg">
        Bem vinda, Witch!
      </p>

      <form
        onSubmit={formik.handleSubmit}
        className={clsx(styles.form, "flex flex-col gap-5 mt-10")}
      >
        <TextField
          fullWidth
          id="email"
          name="email"
          label="E-mail"
          value={formik.values.email}
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
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <p className="text-lg"> 
          Esqueci a senha 
        </p>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Entrar
        </Button>
        <p className="text-lg"> 
          Cadastrar
        </p>
      </form>
    </div>
  );
}
