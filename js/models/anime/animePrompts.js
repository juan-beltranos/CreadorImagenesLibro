const pokemonPrompts = [
    "Chibi-style drawing of CHARACTER from the series SERIES, battling in a Pokémon arena, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, playing with a Poké Ball, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, sleeping under a tree, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, exploring a lush forest, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, surrounded by other Pokémon friends, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, swimming in a river, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, flying in the sky, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, battling another Pokémon, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, evolving into a new form, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, playing in a meadow, cartoon style with black outline for a coloring book."
];

const narutoPrompts = [
    "Chibi-style drawing of CHARACTER from the series SERIES, practicing ninjutsu, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, running through the Hidden Leaf Village, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, eating ramen at Ichiraku Ramen, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, training with their sensei, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, fighting in the Chunin Exams, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, performing a summoning jutsu, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, hanging out with friends, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, meditating under a waterfall, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, battling an enemy, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, celebrating a festival in the village, cartoon style with black outline for a coloring book."
];

const dragonBallPrompts = [
    "Chibi-style drawing of CHARACTER from the series SERIES, powering up for a Kamehameha, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, flying on a Nimbus cloud, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, eating a large feast, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, training in the Hyperbolic Time Chamber, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, fighting in a martial arts tournament, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, summoning Shenron, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, hanging out with friends, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, meditating on a mountain, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, battling an enemy, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, celebrating a festival in the village, cartoon style with black outline for a coloring book."
];

const digimonPrompts = [
    "Chibi-style drawing of CHARACTER from the series SERIES, digivolving to their ultimate form, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, battling another Digimon, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, exploring the Digital World, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, resting in a digital forest, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, playing with other Digimon friends, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, training their digivolving skills, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, discovering a new digivice, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, protecting their human partner, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, evolving through different forms, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, celebrating victory in a digital city, cartoon style with black outline for a coloring book."
];

const demonSlayerPrompts = [
    "Chibi-style drawing of CHARACTER from the series SERIES, wielding their Nichirin Blade, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, performing their breathing technique, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, training with their comrades, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, battling a demon, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, carrying out their mission, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, exploring a mystical forest, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, resting at the Butterfly Mansion, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, meditating under a waterfall, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, bonding with their demon slayer corps, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, celebrating after a victorious battle, cartoon style with black outline for a coloring book."
];

const rickAndMortyPrompts = [
    "Chibi-style drawing of CHARACTER from the series SERIES, traveling through different dimensions, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, experimenting with alien technology, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, battling intergalactic creatures, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, exploring bizarre planets, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, encountering alternate versions of themselves, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, embarking on a space adventure, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, attending an alien council meeting, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, escaping from a galactic prison, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, using portal gun to travel, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, celebrating a bizarre holiday, cartoon style with black outline for a coloring book."
];

const barbiePrompts = [
    "Chibi-style drawing of CHARACTER from the series SERIES, preparing for a fashion show, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, riding a horse in a royal parade, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, exploring a magical castle, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, having a picnic with friends, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, attending a glamorous ball, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, performing in a ballet recital, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, enjoying a beach day, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, helping animals at a wildlife sanctuary, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, exploring an underwater kingdom, cartoon style with black outline for a coloring book.",
    "Chibi-style drawing of CHARACTER from the series SERIES, celebrating a birthday party, cartoon style with black outline for a coloring book."
];
