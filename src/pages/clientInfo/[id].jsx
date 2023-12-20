import React from 'react'
import { useRouter } from 'next/router';
import CardTab from '@/components/flowbite/cardTabs';
import InfoClientTab from '@/components/views/editInfoClient/editInfoClient';
import ExpedienteCliente from '@/components/views/expedienteClient/expedienteClient';
import HonorariosCliente from '@/components/views/honorarioClient/honorarioClient';

const idClient = () => {
  const router = useRouter()
  const clientId = router.query.id;

  if (!clientId) {
    return <p>Cargando...</p>;
  }

  const tabData = [
    {
      title: 'Expedientes',
      content: <ExpedienteCliente id={clientId} />
    },
    {
      title: 'Honorarios',
      content: <HonorariosCliente id={clientId} />
    },
    {
      title: 'Información personal',
      content: <InfoClientTab id={clientId} />
    }
  ]

  return (
    <>
      <CardTab tabs={tabData}/>
    </>
  )
}

export default idClient