import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import faqs from "../../public/img/logo/faq.jpg";
import Image from 'next/image';


const PreguntasFrecuentes = () => {

    return (
        <div className="bg-[#284285]">
            <div style={{ position: 'relative', textAlign: 'center' }}>
                <Image
                    src={faqs}
                    alt="Imagen de fondo"
                    layout="fill"
                    quality={100}
                    style={{ position: 'absolute', objectFit: 'cover' }}
                />
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <h1 style={{
                        color: '#fff',
                        fontSize: '42px',
                        letterSpacing: '0.01em',
                        textTransform: 'uppercase',
                        paddingTop: '20px',
                    }}>Preguntas frecuentes</h1>
                    <br />
                    <h2
                        style={{
                            color: '#fff',
                            fontSize: '21px',
                            letterSpacing: '0.01em',
                            paddingBottom: '20px',
                        }}
                    >Encontrá aquí la información que necesitas de manera rápida y sencilla.</h2>
                </div>
            </div>


            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0 20px',
                maxWidth: '800px',
                margin: 'auto',
                paddingBottom: '40px'
            }}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>¿Por qué corresponde iniciar acciones por el Decreto 1305/12?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            El Decreto 1305/12, además de eliminar los Adicionales Transitorios creados por los Decretos 1104/05, 1095/06, 871/07, 1053/08 y 751/09 y los Suplementos y Compensaciones del Decreto 2769/93, dispuso la creación de dos Suplementos particulares -Suplemento por Responsabilidad Jerárquica y Suplemento por Manejo del Material- que poseen indudable naturaleza general en su cobro.
                            <br />
                            Al ser creados como Suplementos Particulares, los mismos son percibidos únicamente por el personal en actividad y "en negro", excluyéndose de su cobro a los retirados y pensionadas de las Fuerzas Armadas.
                            <br />
                            De esta forma, y conforme los lineamientos del art. 54 de la Ley 19.101, dada su generalidad en el cobro el mayor aumento que representan dichos Suplementos debería incluirse en el Haber Mensual del personal en actividad de las Fuerzas Armadas, extendiéndose de esta manera su cobro a los retirados y pensionadas.
                            <br />
                            Respecto del personal en actividad, el hecho de incorporar el mayor aumento en el haber mensual permite que dicho concepto aumente, repercutiendo como consecuencia de ello en los demás rubros que toman como base de cálculo el haber mensual. Respecto de los retirados y pensionadas, estos conceptos pasan a incorporarse dentro de su haber mensual.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>¿Prevé una medida cautelar?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            En el inicio de esta nueva acción se solicita el otorgamiento de una medida cautelar que tiene como objeto requerir al Juez que ordene al organismo liquidador la incorporación del mayor aumento dentro del haber mensual, mientras se define la causa principal.
                            <br />
                            Es de destacar que las medidas cautelares son provisorias, y se mantienen en la medida que se mantenga la cuasa principal y no sean revocadas por contrario imperio por el Juez de la causa o por la Cámara Federal en caso de ser apeladas.
                            <br />
                            Los montos percibidos en concepto de medida cautelar quedarán firmes para su beneficiario, en la medida que exista una sentencia defintiva favorable en la causa principal.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>¿Que sucede con las medidas cautelares otorgadas hasta el 31 de julio de 2012 y referidas a Adicionales Transitorios o Suplementos y Compensaciones?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Dada la eliminación de estos conceptos por el Decreto 1305/12, a partir del 1º de agosto de 2012 las medidas cautelares carecen de objetos y resultan de imposible aplicación, sin perjuicio de lo cual los montos percibidos en tal sentidos deberían considerarse como un pago a cuenta de lo que en definitiva resulte a partir del dictado de sentencia definitiva en las causas principales.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>¿Que documentación debo tener en cuenta para el inicio de acciones por el Decreto 1305/12?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Fotocopia del DNI, donde conste el último domicilio, que debe ser en Jurisdicción de Mendoza, San Rafael o San Juan.
                            <br />
                            Fotocopia de los dos último recibo de haberes percibido.
                            <br />
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>¿Es necesario un reclamo administrativo previo?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            No se requiere la presentación de reclamo administrativo previo, toda vez que resulta un dispendio innecesario de tiempo y no implicará ningun resultado favrable a los actores, ya que la autoridad militar se encuentra obligada a aplicar las normas que emite el Poder Ejecutivo.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>¿Que debo hacer si me encuentro en situación de pasar a retiro?.</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Esta acción debiera iniciarse por todo el personal -en actividad y retirado- con la salvedad que la persona que obtiene medida cautelar estando en actividad y luego pasa a retiro podría encontrarse frente al inconveniente que el IAF no cumplimente con la medida cautelar que se encontraba percibiendo, frente a lo cual la única posibilidad con la que se cuenta es con las intimaciones judiciales que pudiera ordenar el Juez de la causa.
                            <br />
                            1. ¿En que consiste la medida cautelar que se solicita con el inicio de acciones judiciales?
                            <br />
                            La medida cautelar se solicita conjuntamente con el inicio de una acción principal, con el fin de que el juez que entiende en la causa adelante los efectos prácticos de la sentencia para garantizar sus resultados, y con el fin de que dicho resultado no se frustre a través del largo proceso que se inicia para la obtención de sentencia definitiva.
                            <br />
                            Dicha medida surge del pleno convencimiento del juez, atendiendo a circunstancias tales como el peligro en la demora y el carácter alimentario de las remuneraciones, entre otros aspectos.
                            <br />
                            La medida cautelar tiene por efecto inmediato que el actor comience a cobrar las diferencias que resultan de la correcta aplicación de la ley y reglamentación vigentes, mientras espera el resultado final del juicio principal.
                            <br />
                            No representa una sentencia definitiva, ni implica la obtención de un resultado definitivo, sino que se caracteriza por la necesidad de preservar el resultado final de la sentencia mientras se transita su proceso.
                            <br />
                            Los montos que se obtienen en concepto de medida cautelar son provisorios hasta que se obtenga sentencia definitiva en la acción principal y se perciben en carácter de depósito judicial, debiendo para ello el actor suscribir una caución juratoria que lo compromete a responder por dichos montos en caso que la medida sea revocada o el juicio principal se pierda.
                            <br />
                            La medida cautelar subsiste en tanto exista un proceso principal en trámite y depende de su resultado final.
                            <br />
                            2. ¿Pueden requerirme los montos que fui cobrando en concepto de medida cautelar?
                            <br />
                            En caso que la medida cautelar sea revocada por el Superior -Cámara Federal de Apelaciones de Mendoza- o que el juicio principal se pierda, el efecto principal es que la medida cautelar desaparece, volviendo la remuneración a la misma conformación que tenía antes de su dictado. Además,  el organismo pagador podría requerir los montos que se fueron percibiendo por tal concepto.
                            <br />
                            No puede anticiparse cual sería el monto requerido o la forma en que el mismo se requeriría por parte de cada una de las Fuerzas, aunque en tal caso debería procederse de manera global, atendiendo a la cantidad de personas que a la fecha se encuentran percibiéndola.
                            <br />
                            3. ¿La medida cautelar es un amparo?
                            <br />
                            La medida cautelar se conoce en el medio como "amparo", pero dista de serlo.
                            <br />
                            El amparo es una acción principal como pueden serlo una acción contencioso administrativa o una acción declarativa de inconstitucionalidad.
                            <br />
                            La medida cautelar puede obtenerse en cualquiera de dichos procesos, con la salvedad que con respecto al amparo y a la acción declarativa de inconstitucionalidad, la medida cautelar, en la mayoría de los casos, resulta incompatible, atendiendo a la naturaleza de dichos procesos.
                            <br />
                            4. ¿Puedo iniciar acciones judiciales en cualquier jurisdicción?
                            <br />
                            No pueden iniciarse acciones en extraña jurisdicción.
                            <br />
                            La jurisdicción se rige por el domicilio del demandado, que en todos los casos es la Ciudad Autónoma de Buenos Aires, o, a elección del actor, donde se cumple la prestación.
                            <br />
                            Aquellas personas que inicien acciones en una jurisdicción extraña a la que corresponde la prestación de su servicio, podrían asumir costas -gastos del proceso- en caso que el demandado presente una excepción de falta de jurisdicción. En tal caso, además de las costas del proceso, la causa se remite al Juzgado Federal que resulta competente en virtud de la jurisdicción.
                            <br />
                            5. ¿Puedo iniciar una acción que ya he iniciado con otro abogado?
                            <br />
                            No pueden iniciarse dos o más acciones sobre un mismo tema con distintos abogados.
                            <br />
                            Esta situación se conoce como litis pendencia y en caso que el demandado la plantee en el proceso, podrían generarse costas.
                            <br />
                            Esta situación se conoce como litis pendencia y en caso que el demandado la plantee en el proceso, podrían generarse costas.
                            <br />
                            Por ello, lo mas conveniente es informar en la charla informativa al letrado qué juicios tramitan con otros abogados, a efectos que el profesional asesore acerca de continuar con dicho abogado o eventualmente -y en la medida que el proceso no se encuentre demasiado avanzado- revocar el poder al abogado.
                            <br />
                            Es de destacar que no resulta conveniente la revocación de poder o el desistimiento de acción cuando la misma se encuentra en avanzado proceso, puesto que no sólo deberán asumirse las costas del proceso por la actividad procesal desarrollada, sino que además todo el proceso trascurrido queda sin efecto, debiendo iniciarse de cero una nueva acción.
                            <br />
                            La decisión de revocar poder a otro profesional o de solicitarle el desistimiento de las acciones, es un tema personal entre el cliente y su abogado y que debe resolverse solo entre ambos luego de haber evaluado las condiciones del proceso y eventualmente los costos que deban asumirse.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>

        </div >
    )
}
export default PreguntasFrecuentes