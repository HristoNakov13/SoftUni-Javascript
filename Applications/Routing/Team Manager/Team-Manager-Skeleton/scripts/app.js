import { requester } from "/http-requests.js";

//No idea if user should be still able to edit teams he created and is no longer member of

//WORKING URL - ${YOUR_LIVE_SERVER}/Team-Manager-Skeleton/#/




//AVERT YOUR EYES

(() => {
    const APP_KEY = "kid_rJFdvRinH";
    const ROOT_URL = "https://baas.kinvey.com";
    const REGISTER_USER_URL = `${ROOT_URL}/user/${APP_KEY}`;
    const LOGIN_URL = `${ROOT_URL}/user/${APP_KEY}/login`;
    const TEAMS_URL = `${ROOT_URL}/appdata/${APP_KEY}/Teams`;
    const GET_USERS_URL = `${ROOT_URL}/user/${APP_KEY}`;

    const partials = {
        header: "templates/common/header.hbs",
        footer: "templates/common/footer.hbs",
    }

    const app = Sammy("#main", function () {
        this.use("Handlebars", "hbs");

        this.get("/index.html", function (ctx) {
            setSessionInfo(ctx);
            this.loadPartials(partials)
                .then(function () {
                    this.partial("templates/home/home.hbs");
                });
        });

        this.get("#/", function (ctx) {
            setSessionInfo(ctx);
            this.loadPartials(partials)
                .then(function () {
                    this.partial("templates/home/home.hbs");
                });
        });

        this.get("#/login", function (ctx) {
            partials["loginForm"] = "templates/login/loginForm.hbs";
            this.loadPartials(partials)
                .then(function () {
                    this.partial("templates/login/loginPage.hbs");
                });
        });

        this.get("#/register", function (ctx) {
            partials["registerForm"] = "templates/register/registerForm.hbs";
            this.loadPartials(partials)
                .then(function () {
                    this.partial("templates/register/registerPage.hbs");
                });
        });

        this.get("#/about", function (ctx) {
            setSessionInfo(ctx);
            this.loadPartials(partials)
                .then(function () {
                    this.partial("templates/about/about.hbs");
                });
        });

        this.get("#/home", function (ctx) {
            setSessionInfo(ctx);
            this.loadPartials(partials)
                .then(function () {
                    this.partial("templates/home/home.hbs");
                });
        });

        this.post("#/register", function (ctx) {
            const { username, password, repeatPassword } = ctx.params;

            if (!username || !password || password !== repeatPassword) {
                alert("Username and Password must be atleast 1 character long.\nPassword field must match with Repeat Password.")
                return;
            }

            const teamID = "";

            requester.post(REGISTER_USER_URL, { username, password, teamID }, "Basic")
                .then(() => {
                    ctx.redirect("#/login");
                }).catch(error => {
                    if (error.message === "Conflict") {
                        alert("User with that name already registered.")
                    }
                });
        });

        this.post("#/login", function (ctx) {
            const { username, password } = ctx.params;

            requester.post(LOGIN_URL, { username, password }, "Basic")
                .then(userInfo => {
                    sessionStorage.setItem("authtoken", userInfo._kmd.authtoken);
                    sessionStorage.setItem("username", userInfo.username);
                    sessionStorage.setItem("userID", userInfo._id);
                    sessionStorage.setItem("teamID", userInfo.teamID);
                    ctx.redirect("#/");
                }).catch(error => {
                    if (error.message === "Unauthorized") {
                        alert("Wrong username or password.");
                    }
                });
        });

        this.get("#/logout", function (ctx) {
            if (confirm("Are you sure you want to logout?")) {
                sessionStorage.clear();
                ctx.redirect("#/");
            } else {
                history.back();
            }
        });

        this.get("#/catalog", function (ctx) {
            setSessionInfo(ctx);
            requester.get(TEAMS_URL, "Kinvey")
                .then(teams => {
                    ctx.teams = teams;
                    partials["team"] = "templates/catalog/team.hbs";
                    this.loadPartials(partials)
                        .then(function () {
                            this.partial("templates/catalog/teamCatalog.hbs");
                        });

                }).catch(console.error);
        });

        this.get("#/create", function (ctx) {
            setSessionInfo(ctx);
            partials["createForm"] = "templates/create/createForm.hbs";
            this.loadPartials(partials)
                .then(function () {
                    this.partial("templates/create/createPage.hbs");
                });
        });

        this.post("#/create", function (ctx) {
            setSessionInfo(ctx);

            const { name, description } = ctx.params;

            if (name.length === 0) {
                alert("Team name must be atleast 1 character long.");
                return;
            }

            const team = {
                name,
                description,
                memberIDs: [sessionStorage.getItem("userID")],
                memberUsernames: [sessionStorage.getItem("username")],
                author: sessionStorage.getItem("userID"),
            };

            requester.post(TEAMS_URL, team, "Kinvey")
                .then(teamData => {
                    sessionStorage.setItem("teamID", teamData._id);
                    ctx.redirect("#/catalog");
                    requester.get(`${GET_USERS_URL}/${sessionStorage.getItem("userID")}`, "Kinvey")
                        .then(userInfo => {
                            userInfo.teamID = teamData._id;
                            requester.put(`${GET_USERS_URL}/${sessionStorage.getItem("userID")}`, userInfo, "Kinvey")
                                .then(newInfo => {
                                });
                        });
                });
        });

        this.get("#/join/:visitedTeamID", function (ctx) {
            setSessionInfo(ctx);
            if (sessionStorage.getItem("teamID") !== "") {
                alert("You are already a member of another team.");
                history.back();
                return;
            }

            if (!confirm("Are you sure you want to join this team?")) {
                history.back();
                return;
            }


            const id = ctx.params.visitedTeamID;

            let teamURL = `https://baas.kinvey.com/appdata/${APP_KEY}/Teams/${id}`;

            requester.get(teamURL, "Kinvey")
                .then(teamData => {
                    teamData.memberUsernames.push(sessionStorage.getItem("username"));
                    teamData.memberIDs.push(sessionStorage.getItem("userID"));


                    requester.put(teamURL, teamData, "Kinvey").then(res => {

                        requester.get(`${GET_USERS_URL}/${sessionStorage.getItem("userID")}`, "Kinvey")
                            .then(userInfo => {
                                userInfo.teamID = teamData._id;
                                sessionStorage.setItem("teamID", teamData._id);
                                requester.put(`${GET_USERS_URL}/${sessionStorage.getItem("userID")}`, userInfo, "Kinvey")
                                    .then(res => {
                                        ctx.redirect(`#/catalog/${id}`);
                                    });
                            });
                    });

                });



        });

        this.get("#/edit/:visitedTeamID", function (ctx) {
            setSessionInfo(ctx);
            const id = ctx.params.visitedTeamID;
            partials["editForm"] = "templates/edit/editForm.hbs";

            requester.get(`${TEAMS_URL}/${id}`, "Kinvey").then(teamData => {
                ctx.loadPartials(partials)
                    .then(function () {
                        ctx.name = teamData.name;
                        ctx.description = teamData.description;
                        ctx.teamId = id;
                        this.partial("templates/edit/editPage.hbs");
                    });
            });
        });

        this.post("#/edit/:teamID", function (ctx) {
            if (ctx.params.name === "") {
                alert("Team name must be atleast 1 character long.");
                return;
            }

            if (!confirm("Edit team with new values?")) {
                return;
            }

            const id = ctx.params.teamID;

            requester.get(`${TEAMS_URL}/${id}`, "Kinvey")
                .then(teamData => {
                    teamData.name = ctx.params.name;
                    teamData.description = ctx.params.description;

                    requester.put(`${TEAMS_URL}/${id}`, teamData, "Kinvey")
                        .then(res => {
                            ctx.redirect(`#/catalog/${id}`);
                        });
                });
        });

        this.get("#/leave", function (ctx) {
            setSessionInfo(ctx);
            if (!confirm("Are you certain you want to leave your team?")) {
                history.back();
                return;
            }

            const userID = sessionStorage.getItem("userID");

            requester.get(`${GET_USERS_URL}/${userID}`, "Kinvey")
                .then(userInfo => {
                    const teamID = userInfo.teamID;
                    userInfo.teamID = "";
                    requester.put(`${GET_USERS_URL}/${userID}`, userInfo, "Kinvey")
                        .then(res => {
                            requester.get(`${TEAMS_URL}/${teamID}`, "Kinvey")
                                .then(teamData => {
                                    teamData.memberIDs = teamData.memberIDs.filter(id => id !== userInfo._id);
                                    teamData.memberUsernames = teamData.memberUsernames.filter(id => id !== userInfo.username);
                                    requester.put(`${TEAMS_URL}/${teamID}`, teamData, "Kinvey")
                                        .then(res => {
                                            sessionStorage.setItem("teamID", "");
                                            ctx.redirect("#/catalog");
                                        });
                                });
                        });
                });
        });

        this.get("#/catalog/:visitedTeamID", function (ctx) {
            setSessionInfo(ctx);
            const id = ctx.params.visitedTeamID;
            ctx.teamId = id;
            ctx.hasNoTeam = sessionStorage.getItem("teamID") !== "";

            partials["teamControls"] = "templates/catalog/teamControls.hbs";

            requester.get(`${TEAMS_URL}/${id}`, "Kinvey")
                .then(teamData => {
                    const userID = sessionStorage.getItem("userID");

                    if (userID === teamData.author) {
                        ctx.isAuthor = true;
                    }

                    if (teamData.memberIDs.find(memberID => memberID === userID)) {
                        ctx.isOnTeam = true;
                    }

                    ctx.name = teamData.name;
                    ctx.description = teamData.description;
                    ctx.members = teamData.memberUsernames;

                    ctx.loadPartials(partials)
                        .then(function () {
                            this.partial("templates/catalog/details.hbs");
                        });
                });
        });
    });



    function setSessionInfo(ctx) {
        ctx.loggedIn = sessionStorage.getItem("authtoken") !== null;
        ctx.username = sessionStorage.getItem("username");
        ctx.teamID = sessionStorage.getItem("teamID");
        ctx.hasTeam = sessionStorage.getItem("teamID") !== "";
        ctx.hasNoTeam = sessionStorage.getItem("teamID") === "";
        ctx.teamId = ctx.teamID;
    }

    app.run();
})();