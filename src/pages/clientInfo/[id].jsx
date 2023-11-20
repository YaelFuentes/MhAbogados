import React from 'react'
import { useRouter } from 'next/router';
import CardTab from '@/components/flowbite/cardTabs'

const idClient = () => {
    const router = useRouter()
    const clientId = router.query.id;

    const tabData = [
        {
            title:'Tab 1',
            content : "contenido" /* <ExpedienteCliente id={clientId}/> */
        },
        {
            title: 'Tab 2',
            content : "contenido 2"/* <EditInfoClient id={clientId}/> */
        }
    ]

    return(
        <>
        <CardTab tabs={tabData} />
        </>
    )
}

export default idClient