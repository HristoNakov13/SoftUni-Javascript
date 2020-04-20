import hasKey from "./has-key";

const getFirstError = (fieldName: string, errors: any): string => {
    return hasKey(errors, fieldName)
        ? errors[fieldName][0]
        : "";
};

export default getFirstError;