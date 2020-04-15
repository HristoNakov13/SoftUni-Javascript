import React, { Fragment } from "react";

interface Props {
    name: string,
    textContent?: string,
    rows: number,
    className?: string,
    label: string,
    labelClassName?: string,
    onChange: any,
}

const TextAreaElement: React.FC<Props> = ({
    name,
    textContent,
    rows,
    className,
    label,
    labelClassName,
    onChange
}) => {
    return <Fragment>
        <label
            htmlFor={name}
            className={labelClassName}
        >
            {label}
        </label>

        <textarea
            id={name}
            name={name}
            className={className}
            onChange={onChange}
            rows={rows}
            value={textContent}
        />
    </Fragment>
};

export default TextAreaElement;