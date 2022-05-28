import { Button, TextField } from "@mui/material";
import clsx from "clsx";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useApi } from "../../hooks/useApi";
import styles from "./Register.module.css";

const validationSchema = yup.object({
  name: yup
    .string()
    .min(8, "Informe seu nome real")
    .required("Campo obrigatório"),
  username: yup.string().required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  cpf: yup.string().required("Campo obrigatório"),
  password: yup
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .required("Campo obrigatório")
    .oneOf([yup.ref("confirmPassword"), null], "As senhas não conferem"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas não conferem"),
});

export function Register() {
  const { post } = useApi("users");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      cpf: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: ({ email, username, password, name, cpf }) => {
      post("/", { email, username, password, name, cpf }).then(
        (response) => response && navigate("/login")
      );
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className={styles.witch}>
        Venha se tornar uma <span className={styles.textSecondary}>Witch!</span>
      </p>

      <form
        onSubmit={formik.handleSubmit}
        className={clsx(styles.form, "flex flex-col gap-5 mt-10")}
      >
        <div className={styles.inputs}></div>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Nome"
          value={formik.values.name}
          className={styles.custom}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          fullWidth
          id="username"
          name="username"
          label="Username"
          value={formik.values.username}
          className={styles.custom}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="E-mail"
          value={formik.values.email}
          className={styles.custom}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="cpf"
          name="cpf"
          label="CPF"
          value={formik.values.cpf}
          className={styles.custom}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.cpf)}
          helperText={formik.touched.cpf && formik.errors.cpf}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Senha"
          type="password"
          value={formik.values.password}
          className={styles.custom}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label="Confirme a Senha"
          type="password"
          value={formik.values.confirmPassword}
          className={styles.custom}
          onChange={formik.handleChange}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
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
            Cadastrar
          </Button>
        </div>
        <p className={clsx(styles.fontcenter, styles.textPrimary)}>
          Já possui conta?{" "}
          <span onClick={() => navigate("/login")} className={styles.textLink}>
            Entre
          </span>
        </p>
      </form>
    </div>
  );
}
