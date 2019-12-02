export const partials = {
    header: "./view/common/header.hbs",
    footer: "./view/common/footer.hbs",
};

export function setSessionData(ctx) {
    ctx.username = sessionStorage.getItem("username");
    ctx.isLogged = ctx.username !== null;
    ctx.userID = sessionStorage.getItem("userID");
}