function sortUserNames(usernames) {
    usernames.sort((user1, user2) => {
        let sort = user1.length - user2.length;
        if (sort === 0) {
            sort = user1.localeCompare(user2);
        }
        return sort;
    });
    let uniqueUsers = {};
    for (const username of usernames) {
        uniqueUsers[username] = "lol";
    }

    for (const username in uniqueUsers) {
        console.log(username);
    }
}

sortUserNames(['Ashton',
    'Kutcher',
    'Ariel',
    'Lilly',
    'Keyden',
    'Aizen',
    'Billy',
    'Braston']
);