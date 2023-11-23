import React from 'react'
import { useRouter } from 'next/router';
import CardTab from '@/components/flowbite/cardTabs'
import ExpedienteCliente from '@/components/views/expedienteClient/expedienteClient';

const idClient = () => {
    const router = useRouter()
    const clientId = router.query.id;

    const tabData = [
        {
            title: 'Expedientes',
            content: <ExpedienteCliente id={clientId} />
        },
        {
            title: 'Tab 2',
            content: "contenido 2"/* <EditInfoClient id={clientId}/> */
        }
    ]

    return (
        <>
            <CardTab tabs={tabData} />
        </>
    )
}

export default idClient