import React from 'react';

const InputField = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  ...rest
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={`mt-1 block w-full px-4 py-2 bg-gray-700 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 ${
          error ? 'border-red-500' : 'border-gray-600'
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
