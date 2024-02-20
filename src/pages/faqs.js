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
                        <Typography>¿Quien determina el monto a cobrar en virtud de sentencia firme?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Las liquidaciones que se presentan en la causa con motivo de sentencia firme son confeccionadas en la gran mayoria de los casos por los Organismos liquidadores de cada Fuerza: Instituto de Ayuda Financiera para el pago de Retiros y Pensiones Militares, Direccion de Finanzas de la Gendarmería Nacional, Contaduría General del Ejército y Direccion de Finanzas de la Fuerza Aérea, entre otros organismos.
                            <br />
                            La función de nuestro estudio es controlar que dichas liquidaciones cumplan con los parámetros establecidos por la sentencia firme (Decretos liquidados, período de liquidación y Tasa de interes aplicable, entre otros) y es el Juez de la causa quien aprueba judicialmente estas liquidaciones.
                            <br />
                            El estudio presenta impugnaciones respecto de todas aquellas liquidaciones que no se ajusten a los parámetros establecidos en la sentencia y en tal caso, se inicia un nuevo proceso que puede derivar en la designación de un perito contador o del requerimiento a la Fuerza de acompañar los recibos de haberes de los actores para que nosotros realicemos la liquidación.
                            <br />
                            Esta etapa insume mucho tiempo porque parte del hecho que la Fuerza NO ha presentado una liquidación correcta y el hecho de dar intervención a peritos contadores o inclusive de establecer que sea este estudio el que realice la liquidación lleva tiempo y abre nuevas etapas en el proceso.
                            <br />
                            Solo cuando el Juez de la causa aprueba judicialmente la liquidación existe monto definitivo a cobrar y se abre una nueva etapa que es la de cobro, que involucra el cumplimiento de procedimientos adminsitrativos y tiempo.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>¿Que ocurre si el cliente fallece?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            En caso que el cliente fallezca, los herederos se encuentran habilitados para continuar la causa en su nombre.
                            <br />
                            Para ello, deben ponerse en contacto con el estudio y acompañar Declaratoria de Herederos, Acta de designación del administrador de la sucesión y CBU de la cuenta judicial del sucesorio.
                            <br />
                            Los montos percibidos en concepto de medida cautelar quedarán firmes para su beneficiario, en la medida que exista una sentencia defintiva favorable en la causa principal.
                            <br />
                            El pago de honorarios a este estudio se mantiene y continúa la obligación de pago por parte de los herederos, ya que el monto que cobrarán en el sucesorio es el resultado del proceso judicial llevado a cabo por este estudio. Si el estudio no hubiese obtenido sentencia favorable, no hubiese intimado a liquidar y no hubiese exigido el pago de los montos aprobados judicialmente, no existirían montos a cobrar en la sucesión, por lo cual estos honorarios se encuentran devengados desde dicho momento y necesariamente deben cancelarse. Estos honorarios NO SE VINCULAN con los honorarios que correspondan al letrado que inició la sucesión, ya que se trata de procesos distintos aunque estén vinculados.
                            <br />
                            En caso que los herederos NO CANCELEN los honorarios correspondientes, se inicia el proceso de ejecución en el expediente de la sucesión.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>¿Que sucede si el cliente revoca poder?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Todo cliente se encuentra habilitado a revocar poder a cualquier abogado en una causa judicial y a partir de dicho momento el letrado no continúa la causa en su nombre.
                            <br />
                            En caso que la revocación se produzca una vez que se obtuvo sentencia definitiva e incluso cuando el expediente se encuentra en etapa de cobro, los honorarios deben cancelarse EN SU TOTALIDAD a este estudio, ya que la revocación se produce cuando la causa se encuentra finalizada y solo hay que esperar el cobro.
                            <br />
                            Recomendamos que previo a tomar la decisión de revocar poder, consulte en que etapa judicial se encuentra el expediente, a efectos de evitar asumir los costos adicionales que implica dar intervención a otros abogados, cuando la causa ya se encuentra finalizada.
                            <br />
                            En caso de revocación cuando la causa ya se encuentra finalizada, y aun cuando se hubiese designado a otro abogado, el estudio reclamará el pago de los honorarios correspondientes y/o iniciará la ejecución judicial de su monto contra el cliente.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>¿Por que tardan tanto las causas iniciadas?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Hay que tener en cuenta que estas causas se inician contra el Estado Nacional y que involucran un procedimiento que cuenta con varias etapas procesales que hay que transitar a medida que se avanza en el proceso.
                            <br />
                            Cada expediente depende de las cuestiones procesales que se presenten y cada expediente tiene su tiempo procesal.
                            <br />
                            Muchas veces algunas Secretarías e inclusive Juzgados, son mas rapidos que otros y todo depende del tiempo de resolución que insuma cada tema y de los planteos que se formulen en la causa.
                            <br />
                            Los tiempos procesales NO dependen del abogado de la causa, ya que necesariamente dependen de los planteos en la causa, del tiempo de resolución en la causa e incluso del tiempo que insume a los organismos liquidadores cumplir con los requerimientos de la causa.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>¿Pueden variar los montos de liquidación entre personas con mismo grado?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Si. Los montos de cada liquidación pueden variar de acuerdo con la situación de revista, cantidad de hijos y destinos durante el período de liquidación.
                            <br />
                            A ello se agrega que en caso que en la causa se hubieren otorgado medidas cautelares, en virtud de las cuales el cliente fue cobrando ajustado a derecho durante el proceso, dichos montos se descontarán luego de los montos que se liquiden.
                            <br />
                            Ninguna liquidación o estado procesal es igual entre los clientes y siempre depende de cada caso en particular. Es el estudio el que justamente revise que esa liquidación sea acorde a lo ordenado a la sentencia y a la situación de cada actor en el período de liquidación.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>¿Cuanto tiempo insume el pago de las sumas que me corresponden conforme a sentencia?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            En caso que exista aprobación judicial de la liquidación, el monto aprobado judicialmennte a favor de cada actor es un crédito a su favor que debe cancelar el Estado Nacional.
                            <br />
                            El proceso de pago involucra varias etapas para la demandada y comienza con el acto administrativo de previsión presupuestaria, que es un requisito previo por parte de cada Fuerza para que la Tesorería de la Nación remita los fondos que deben abonarse.
                            <br />
                            En general este proceso implica que una vez comunicado el crédito a pagar, se incluyen estos montos en el presupuesto de cada Fuerza, para su pago en el próximo ejercicio.
                            <br />
                            Es decir que una vez comunicada la aprobación judicial de los montos, el pago podria producirse en el siguiente año, siempre que existan fondos para concretarlo, ya que de acuerdo con el presupuesto con que se cuente, la Fuerza puede llegar a prorrogar el pago hasta dos años despues de la comunicación de la aprobacion judicial.
                            <br />
                            Estos tiempos NO DEPENDEN ni del abogado de la causa ni del Juzgado. Dependen exclusivamente de cada Fuerza y de los fondos con que cuente en su presupeusto.
                            <br />
                            No representa una sentencia definitiva, ni implica la obtención de un resultado definitivo, sino que se caracteriza por la necesidad de preservar el resultado final de la sentencia mientras se transita su proceso.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>

        </div >
    )
}
export default PreguntasFrecuentes