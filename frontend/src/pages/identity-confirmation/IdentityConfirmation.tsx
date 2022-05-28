import { IconButton } from '@mui/material';
import clsx from 'clsx';
import React from "react";
import Webcam from "react-webcam";
import styles from "./IdentityConfirmation.module.css";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';



export function IdentityConfirmation() {
  const webcamRef = React.useRef(null);
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  
  const WebcamCapture = () => {
    const navigate = useNavigate()
    const webcamRef = React.useRef(null as any);
    const [imgSrc, setImgSrc] = React.useState(null);
  
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef!.current!.getScreenshot();
      setImgSrc(imageSrc);

      setTimeout(async () => {
        Swal.fire({
          title: 'Um momento',
          text: 'Estamos validando sua foto',
          showConfirmButton: false
        })
        Swal.showLoading()
        setTimeout(() => {
          Swal.hideLoading()
          Swal.fire({ title: 'Tudo certo!', text:'Estamos prontos para continuar', icon: 'success', confirmButtonColor: 'primary', allowEscapeKey: false, didClose: () => navigate('/home') })
        }, 3500)

        
      }, 1000)
      
    }, [webcamRef, setImgSrc]);
  
    return (
      <>
        {imgSrc ? <img
            src={imgSrc}
          /> :  <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />} 
        <IconButton className={styles.rounded} color="primary" aria-label="Tirar a foto" onClick={capture}>
          <CameraAltIcon className={styles.white}/>
        </IconButton>
      </>
    );
  };

  return (
    <div className={clsx('flex flex-col justify-center align-center h-screen', styles.back)}>
      <div className={styles.paragraph}>
        <p className={styles.witch}>
          Quase uma <span className={styles.textSecondary}>Witch!</span>
        </p>
        <p className={styles.text}>
          <span className={styles.textPrimary}>Precisamos apenas de uma confirmação de identidade,</span> alinhe sua carteira de identidade
          ao lado do seu rosto no quadrado abaixo e tire uma foto para validarmos que você está apta a ser uma <span className={styles.textSecondary}>Witch!</span>
        </p>
      </div>
    <div className={clsx(styles.background, 'flex flex-col justify-center align-center h-screen')}>
      <WebcamCapture />
    </div>
    <div className={styles.paragraph2}>
    <p className={styles.text}>
          <span className={styles.textPrimary}>A foto será utilizada apenas para a validação de usuário e não será postada em nenuhm lugar da plataforma ou ainfs.</span> 
        </p>
      </div>
    </div>
  );
}
