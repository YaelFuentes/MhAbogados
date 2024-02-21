import NavbarWeb from "./navbarWeb";
import Image from 'next/image';
import HomeImage from "../../public/img/logo/hoim.jpg";
import aboutUs from "../../public/img/logo/aboutUs.jpg";
import * as React from 'react';
import FooterWeb from './footerWeb'
import PreguntasFrecuentes from "./faqs";
import wppIcon from '../../public/img/logo/whatsapp.png'



const WebsiteHome = () => {
  const contenedorEstilo = {
    position: "relative",
    width: "100%",
    height: "96vh",
    display: "flex",
    justifyContent: "space-between",
  };

  const columnaEstilo = {
    width: "48%",
    padding: "0 10px",
  };

  const assetContent = {
    fontSize: "20px",
    color: "#282828",
    fontFamily: 'Raleway sans-serif',
    fontWeight: " 700",
    marginTop: "0",
    lineHeight: "30px"
  };

  const contenidoEstilo = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    color: "white",

  };

  const wppIconStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '50px',
    height: '50px',
    cursor: 'pointer',
    zIndex: '9999',
  };

  const wppLink = `https://wa.me/2612560300`;

  return (
    <>
      <NavbarWeb />
      <div style={contenedorEstilo}>
        <div style={columnaEstilo}>
          <Image
            src={HomeImage}
            alt="Imagen de fondo"
            layout="fill"
            quality={100}
            style={{ filter: "brightness(70%)" }}
          />
          <div style={contenidoEstilo}>
            <h1 className={` text-4xl font-bold mb-4`}>MH Abogados</h1>
            <h3>Estudio juridico especializado en el reajuste de haberes del personal de las Fuerzas Armadas y de Seguridad</h3>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 bg-[#284285] px-3.5 py-0.5">

        <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 flex items-center justify-center">
          <Image
            src={aboutUs}
            className="rounded-xl hidden md:block" 
            alt="About Us"
          />
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-6 p-4">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{
              float: 'right',
              fontSize: '60px',
              color: '#906902',
              fontFamily: 'Lora, serif',
              fontWeight: 'bold',
              position: 'relative',
              top: '-16px'
            }}>01.</span>
          </div>

          <p style={{
            fontFamily: 'Lora, sans-serif',
            fontSize: '15px',
            lineHeight: "24px",
            color: '#E7ECF8',
            fontWeight: "bold"
          }}>
            Nos especializamos en causas vinculadas al reajuste de haberes del personal de las Fuerzas Armadas y de Seguridad,
            ya sea en situación de retiro o en actividad, procurando el dictado de sentencia favorable y posterior cobro por parte del cliente de las sumas que deriven en virtud del dictado de sentencia firme.
          </p>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{
              float: 'right',
              fontSize: '60px',
              color: '#906902',
              fontFamily: 'Lora, serif',
              fontWeight: 'bold',
              position: 'relative',
              top: '-16px'
            }}>02.</span>
          </div>
          <p style={{
            fontFamily: 'Lora, sans-serif',
            fontSize: '15px',
            lineHeight: "24px",
            color: '#E7ECF8',
            fontWeight: "bold"
          }}>
            Nuesto objetivo siempre es en defensa del personal de las Fuerzas Armadas y de Seguridad, aún cuando en dicha defensa se insuma más tiempo o implique la apertura de nuevos procesos para lograr el cobro de lo que corresponde.
            <br />
            La comunicación del cliente con el estudio es preferentemente a través de esta página web y de los canales que ofrece (correo electrónico y whatsappa), ya que la totalidad de la información de cada expediente se encuentra volcada en este sitio y permite al cliente conocer los movimientos procesales que posee.
          </p>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{
              float: 'right',
              fontSize: '60px',
              color: '#906902',
              fontFamily: 'Lora, serif',
              fontWeight: 'bold',
              position: 'relative',
              top: '-16px'
            }}>03.</span>
          </div>
          <p style={{
            fontFamily: 'Lora, sans-serif',
            fontSize: '15px',
            lineHeight: "24px",
            color: '#E7ECF8',
            fontWeight: "bold"
          }}>
            Aspiramos a que ésta sea una herramienta útil para el cliente, en el sentido de poder conocer que sus causas se encuentran en mvimiento y siempre direccionadas al objetivo fianl que no es otro que percibir lo que les corresponde conforme a derechos.
          </p>
        </div>

      </div>

      <PreguntasFrecuentes />
      <a href={wppLink} target="_blank" rel="noopener noreferrer">
        <Image src={wppIcon} alt="WhatsApp" style={wppIconStyle} />
      </a>
      <FooterWeb />
    </>
  );
};

export default WebsiteHome;
