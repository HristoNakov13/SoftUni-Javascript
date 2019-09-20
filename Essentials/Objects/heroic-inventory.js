function createHeroes(heroesData) {
    let heroes = [];

    for (const currentHero of heroesData) {
        let current = currentHero.split(" / ");

        let name = current[0];
        let level = current[1];
        let inventory = [];

        if (current[2]) {
            inventory = current[2].split(", ");
        }

        let hero = {};
        hero.name = name;
        hero.level = Number(level);
        hero.items = inventory;

        heroes.push(hero);
    }
    console.log(JSON.stringify(heroes));
}
