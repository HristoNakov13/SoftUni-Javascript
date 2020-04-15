import React, { ReactChildren, Fragment } from "react";

interface Props {
    name: string,
    type: string,
    value?: any,
    placeholder?: string,
    onChange: any,
    labelClassName?: string,
    className?: string,
    children?: ReactChildren,
    label: string
}

const InputElement: React.FC<Props> = ({
    name,
    type,
    value,
    placeholder,
    onChange,
    children,
    label,
    className,
    labelClassName,
    ...props
}) => {
    return (
        <Fragment>
            <label 
            htmlFor={name}
            className={labelClassName ? labelClassName : ""}
            >{label}</label>
            <input
            id={name}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder ? placeholder : ""}
            className={className ? className : ""}
            onChange={onChange}
            />
        </Fragment>
    )
}

export default InputElement;