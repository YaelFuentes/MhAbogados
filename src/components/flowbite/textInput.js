import React from 'react';

const TextInput = ({ label, name, type, onChange, required, placeholder, darkMode }) => {
    return (
        <div>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {label}
            </label>
            <input
                name={name}
                type={type}
                onChange={onChange}
                required={required}
                className={`border-4 border-white bg-transparent text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                placeholder={placeholder}
            />
        </div>
    );
};

export default TextInput;