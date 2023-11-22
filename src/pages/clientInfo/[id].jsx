import React from 'react'
import { useRouter } from 'next/router';
import CardTab from '@/components/flowbite/cardTabs';
import InfoClientTab from '@/components/views/editInfoClient/editInfoClient';


const idClient = () => {
    const router = useRouter()
    const clientId = router.query.id;

    const tabData = [
        {
            title: 'Tab 1',
            content: "contenido" /* <ExpedienteCliente id={clientId}/> */
        },
        {
            title: 'Información personal',
            content: <InfoClientTab id={clientId} />
        }
    ]

    return (
        <>
            <CardTab tabs={tabData} />
        </>
    )
}

export default idClient