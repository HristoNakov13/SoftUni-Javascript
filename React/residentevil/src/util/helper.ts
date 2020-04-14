import { object } from "yup"

function hasKey<O>(obj: O, key: keyof any): key is keyof O {
    return key in obj
}

const helper = {
    hasKey
}

export default helper;