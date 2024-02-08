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
            <h1 className={` text-4xl font-bold mb-4`}>MH Estudio Juridico</h1>
            <h3>Resguardando Derechos con Excelencia Legal: Especialistas en el Reajuste de Haberes para Personal de Fuerzas Armadas y Seguridad</h3>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 bg-[#284285] px-3.5 py-0.5">

        <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 flex items-center justify-center">
          <Image
            src={aboutUs}
            className="rounded-xl hidden md:block" // Oculta la imagen en tamaños pequeños (menos de 768px) y la muestra en tamaños medianos y grandes
            alt="About Us"
          />
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-6 p-4">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={assetContent}>
              <h2 className="text-left text-[#E7ECF8]">
                <strong>Excelencia</strong>
              </h2>

              <h2 className="text-left text-[#E7ECF8]">
                <strong>En el Resguardo de tus Derechos Financieros</strong>
              </h2>
            </div>
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
            En nuestra firma, nos especializamos en liderar causas vinculadas al reajuste de haberes del personal de las Fuerzas Armadas y de Seguridad, ya sea en situación de retiro o en actividad. Nos destacamos por desafiar de manera estratégica todos los Decretos y reglamentaciones que, de manera inconstitucional, afectan la remuneración de nuestro valioso personal.
          </p>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={assetContent}>
              <h2 className="text-left text-[#E7ECF8]"><strong>Nuestra Misión:</strong></h2>
              <h2 className="text-left text-[#E7ECF8]"><strong>Tu Tranquilidad Financiera</strong></h2>
            </div>
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
            Aspiramos a ser la opción más efectiva para proteger los derechos de cada individuo perteneciente a las Fuerzas Armadas y de Seguridad, asegurando una liquidación justa de sus haberes. Lo logramos mediante el uso experto de herramientas judiciales adaptadas a la perfección para su defensa dentro del marco normativo y constitucional actual.
          </p>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={assetContent}>
              <h2 className="text-left text-[#E7ECF8]"><strong>Comprometidos</strong></h2>
              <h2 className="text-left text-[#E7ECF8]"><strong>Con la Excelencia y Atención Personalizada</strong></h2>
            </div>
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
            En nuestro enfoque, destacamos la atención personalizada al cliente, la gestión comprometida y responsable, la defensa de principios y valores fundamentales, así como la comunicación constante sobre el estado judicial de cada caso y las últimas novedades jurisprudenciales en la Provincia de Mendoza, entre otros aspectos cruciales.
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
