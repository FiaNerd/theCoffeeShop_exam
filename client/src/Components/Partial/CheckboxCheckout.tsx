import { UseControllerProps, useController } from "react-hook-form";

interface IProps extends UseControllerProps {
    label: string;
    disabled: boolean;
}

const CheckboxCheckout = (props: IProps) => {
    const { field } = useController({ ...props, defaultValue: false });

    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                {...field}
                id={field.name}
                checked={field.value}
                className="form-checkbox h-5 w-5 text-secondary focus:ring-secondary border-gray-300 rounded"
                disabled={props.disabled}
            />
            <label htmlFor={field.name} className="ml-2 text-gray-700">
                {props.label}
            </label>
        </div>
    );
};

export default CheckboxCheckout;
