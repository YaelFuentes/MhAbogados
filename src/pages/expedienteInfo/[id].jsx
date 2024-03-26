import React from 'react';
import { useRouter } from 'next/router';
import NewMovementExp from '@/components/fragments/newMovementExpedient';

const idExpediente = () => {
  const router = useRouter();
  const expedienteId = router.query.id

  if (!expedienteId) {
    return <p>Cargando...</p>;
  }

  return (
    <>
    <div className='p-2 m-2 text-center'>
      <div className='font-bold text-2xl'>
        Agregar Movimientos directos al expediente
      </div>
      <div className='mt-4 mb-4 '>
        Advertencia: Al cargar un movimineto directo al expediente se veran reflejado en todos los clientes que esten
        asociados ah ese expediente.
      </div>
      <NewMovementExp id={expedienteId}/>
    </div>
    </>
  )
}
export default idExpediente;