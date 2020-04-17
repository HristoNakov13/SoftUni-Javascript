import * as yup from "yup";
import userService from "../../services/user-service";

const USERNAME_LENGTH = "Username must be between 2 and 20 symbols long";

const PASSWORD_MIN_LENGTH = "Password must be atleast 3 symbols long";
const PASSWORD_MAX_LENGTH = "Password cannot be more than 255 symbols"

const registerValidationSchema = yup.object().shape({
    username: yup.string()
        .required("Username is required")
        .min(2, USERNAME_LENGTH)
        .max(20, USERNAME_LENGTH)
        .test('checkDuplUsername', 'Username already exists', function (username) {
            if (!username) {
                return false;
            }

            return new Promise((resolve, reject) => {
                userService.isUniqueUsername(username)
                    .then(() => {
                        resolve(true);
                    }).catch(() => {
                        resolve(false);
                    });
            });
        }),

    password: yup.string()
        .required("Password is required")
        .min(3, PASSWORD_MIN_LENGTH)
        .max(255, PASSWORD_MAX_LENGTH),

    confirmPassword: yup.string()
        .required("Confirm password is required")
        .min(3, PASSWORD_MIN_LENGTH)
        .max(255, PASSWORD_MAX_LENGTH)
        .oneOf([yup.ref("password")], "Passwords must match"),
});

export default registerValidationSchema;