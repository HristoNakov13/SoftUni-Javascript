function hasKey<O>(obj: O, key: keyof any): key is keyof O {
    return key in obj
}

export default hasKey;