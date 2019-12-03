export const partials = {
    header: "./view/common/header.hbs",
    footer: "./view/common/footer.hbs",
};

export function setSessionData(ctx) {
    ctx.isLogged = sessionStorage.getItem("authtoken") !== null;
    ctx.username = sessionStorage.getItem("username");
    ctx.userID = sessionStorage.getItem("userID");
}