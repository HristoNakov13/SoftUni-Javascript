import * as yup from "yup";

const validationSchema = yup.object().shape({
    name: yup.string()
        .required("Name is required.")
        .min(3, "Name should be between 3 and 10 symbols.")
        .max(10, "Name should be between 3 and 10 symbols."),

    description: yup.string()
        .required("Description is required.")
        .min(3, "Description should be between 5 and 50 symbols.")
        .max(50, "Description should be between 5 and 50 symbols."),

    sideEffects: yup.string()
        .max(50, "Side effects cannot be more than 50 symbols."),

    creator: yup.string()
        .matches(/^[Cc]orp$/, "Creator can be: Corp or corp"),

    mutation: yup.string()
        .required("Mutation is required."),

    turnoverRate: yup.number()
        .min(0, "Turnover rate should be between 0 and 100")
        .max(100, "Turnover rate should be between 0 and 100"),

    hoursUntilTurn: yup.number()
        .min(1, "Hours until turn should be between 1 and 24")
        .max(24, "Hours until turn should be between 1 and 24"),

    magnitude: yup.string()
        .required("Magnitude is required."),

    releasedOn: yup.date()
        .max(new Date(), "Date cannot be in the present.")
});

export default validationSchema;