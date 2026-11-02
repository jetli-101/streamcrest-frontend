import React, { ChangeEventHandler } from "react";

interface FileUploadProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  accept?: string;
  disabled?: boolean;
  required?: boolean;
  multiple?: boolean;
  className?: string;
  name?: string;
  id?: string;
  label?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onChange = () => {},
  accept = "",
  disabled = false,
  required = false,
  multiple = false,
  className = "",
  name = "",
  id = "",
  label = "",
}) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={id || name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type="file"
        onChange={onChange}
        accept={accept}
        disabled={disabled}
        required={required}
        multiple={multiple}
        className={`block w-full text-sm text-gray-700 file:rounded-md file:border file:border-gray-300 file:bg-gray-100 file:px-4 file:py-2 file:text-gray-700 hover:file:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600 ${className}`}
        name={name}
        id={id || name}
      />
    </div>
  );
};

export default FileUpload;
