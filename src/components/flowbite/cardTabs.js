import React, { useState } from 'react'

const CardTab = ({ tabs }) => {

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="flex flex-col items-center mt-4 w-full bg-light">
      <div className="flex flex-wrap justify-center">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`px-6 py-3 text-sm font-medium rounded-md mb-4 mr-4 w-48 ${activeTab === index
              ? 'bg-primary-10 text-white'
              : 'text-primary-10 bg-white'
              }`}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="mt-4 ml-10 mr-10 p-4 bg-gray-100 ">
        {tabs[activeTab].content}
      </div>
    </div>
  );
}
export default CardTab