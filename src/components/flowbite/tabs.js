import React from 'react';

const Tabs = ({ tabs }) => {
    return (
        <div className="flex items-center justify-center text-sm font-medium text-white bg-black border-b border-black dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
                {tabs.map((tab, index) => (
                    <li key={index} className="me-2">
                        <a
                            href={tab.link}
                            className={`inline-block p-4 ${tab.className}`}
                            aria-current={tab.isActive ? 'page' : undefined}
                        >
                            {tab.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tabs;