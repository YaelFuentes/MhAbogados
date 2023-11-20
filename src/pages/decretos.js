import React, { useState, useEffect } from 'react';
import Tabs from '@/components/flowbite/tabs';

const Decretos = ({ user }) => {

    const tabsData = [
        { label: 'Clientes', link: '/Home', className: '...', isActive: false },
        { label: 'Decretos', link: '#decretos', className: '...', isActive: false },
        { label: 'Expedientes', link: '/expedientes', className: '...', isActive: false },
        { label: 'Consultas', link: '/consultas', className: '...', isActive: false },
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

export default Decretos;