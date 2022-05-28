import { Button, TextField } from "@mui/material";
import clsx from "clsx";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Logo } from "../../components/logo/Logo";
import { useApi } from "../../hooks/useApi";
import styles from "./Register.module.css";

const validationSchema = yup.object({
  name: yup
    .string()
    .min(8, "Informe seu nome real")
    .required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  password: yup
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .required("Campo obrigatório"),
});

export function Register() {
  const { post } = useApi("users");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: ({ email, password, name }) => {
      post("/", { email, password, name }).then(
        (response) => response && navigate("/login")
      );
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Logo className="w-60" />
      <p className="text-lg">
        Bem vindo! Por favor informe seus dados para realizar o cadastro
      </p>

      <form
        onSubmit={formik.handleSubmit}
        className={clsx(styles.form, "flex flex-col gap-5 mt-10")}
      >
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Nome"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
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
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
