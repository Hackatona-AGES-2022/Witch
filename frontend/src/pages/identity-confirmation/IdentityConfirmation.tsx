import { IconButton } from '@mui/material';
import clsx from 'clsx';
import React from "react";
import Webcam from "react-webcam";
import styles from "./IdentityConfirmation.module.css";
import CameraAltIcon from '@mui/icons-material/CameraAlt';



export function IdentityConfirmation() {
  const webcamRef = React.useRef(null);
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  
  const WebcamCapture = () => {
    const webcamRef = React.useRef(null as any);
    const [imgSrc, setImgSrc] = React.useState(null);
  
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef!.current!.getScreenshot();
      setImgSrc(imageSrc);
      
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
