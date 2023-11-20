import React, { useState, useEffect } from 'react';
import Tabs from '@/components/flowbite/tabs';

const Consultas = ({ user }) => {

    const tabsData = [
        { label: 'Clientes', link: '/clientes', className: '...', isActive: false },
        { label: 'Decretos', link: '/decretos', className: '...', isActive: false },
        { label: 'Expedientes', link: '/expedientes', className: '...', isActive: false },
        { label: 'Consultas', link: '#consultas', className: '...', isActive: false },
        { label: 'Honorarios', link: '/honorarios', className: '...', isActive: false },
    ];

    return (
        <>
            <div>
                <Tabs tabs={tabsData} />
            </div>
        </>
    );
}

export default Consultas;