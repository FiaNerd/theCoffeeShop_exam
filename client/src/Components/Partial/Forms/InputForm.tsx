import { UseControllerProps, useController } from "react-hook-form";

interface InputProps extends UseControllerProps {
  label: string
  placeholder?: string
  multiline?: boolean
  rows?: number
  type?: "number"
}

const InputForm = ({ label, placeholder, multiline, rows,type, ...props }: InputProps) => {
  const { fieldState, field } = useController({ ...props, defaultValue: '' });

  return (
    <div className="mb-4">
      <label htmlFor={props.name} className="block text-deep-brown uppercase text-sm font-bold mb-2">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={props.name}
          {...field}
          rows={rows}
          placeholder={placeholder}
          className={`w-full px-5 py-2 text-gray-700 bg-slate-200 border border-deep-brown rounded focus:outline-none focus:bg-slate-100  ${fieldState?.error ? 'border-red-500' : 'border-deep-brown'}`}
        />
      ) : (
        <input
          id={props.name}
          {...field}
          type={type}
          placeholder={placeholder}
          className={`w-full px-5 py-2 text-gray-700 bg-slate-200 border border-deep-brown rounded focus:outline-none focus:bg-slate-100  ${fieldState?.error ? 'border-red-500' : 'border-deep-brown'}`}
        />
      )}
      {fieldState?.error && (
        <p className="text-red-500 text-xs italic mt-2">{fieldState.error.message}</p>
      )}
    </div>
  );
};

export default InputForm;
