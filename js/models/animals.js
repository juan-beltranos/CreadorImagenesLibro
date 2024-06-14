const allAnimals = [
    "Dog", "Cat", "Elephant", "Lion", "Tiger", "Giraffe", "Zebra", "Rhinoceros", "Hippopotamus", "Bear",
    "Wolf", "Fox", "Coyote", "Hare", "Rabbit", "Wild Boar", "Deer", "Eagle", "Owl", "Hummingbird",
    "Duck", "Goose", "Swan", "Pelican", "Penguin", "Shark", "Whale", "Dolphin", "Fish", "Orca",
    "Kangaroo", "Koala", "Panda", "Meerkat", "Ant", "Bee", "Spider", "Butterfly", "Firefly", "Cricket",
    "Lizard", "Snake", "Crocodile", "Turtle", "Camel", "Dromedary", "Gorilla", "Chimpanzee", "Orangutan",
    "Falcon", "Great Horned Owl", "Condor", "Bat", "Weasel", "Otter", "Beaver", "Armadillo", "Porcupine",
    "Goat", "Sheep", "Cow", "Horse", "Donkey", "Camels", "Yak", "Alpaca", "Llama",
    "Lobster", "Crab", "Octopus", "Squid", "Snail", "Oyster", "Clam", "Flea", "Mosquito"
];


const marineAnimals = [
    "Shark", "Whale", "Dolphin", "Orca", "Swordfish", "Manta Ray", "Octopus", "Squid", "Jellyfish", "Sea Urchin",
    "Seahorse", "Starfish", "Lobster", "Crab", "Shrimp", "Sea Anemone", "Clam", "Oyster",
    "Sea Snail", "Coral", "Sea Cucumber", "Tuna", "Cod", "Salmon", "Sardine", "Eel", "Ray", "Grouper",
    "Barracuda", "Lionfish", "Pufferfish", "Clownfish", "Angelfish", "Surgeonfish", "Parrotfish", "Butterflyfish",
    "Triggerfish", "Stonefish", "Moray Eel", "Nudibranch", "Sea Turtle", "Seal", "Sea Lion", "Walrus",
    "Narwhal", "Manatee", "Dugong", "Beluga Whale", "Hammerhead Shark", "Great White Shark", "Tiger Shark", "Bull Shark",
    "Blue Shark", "Reef Shark", "Krill", "Plankton", "Herring", "Sardine", "Mackerel", "Bream",
    "Lamprey", "Snapper", "Bass", "Mackerel", "Sea Bass", "Mullet", "Pomfret", "Pygmy Seahorse", "Gorgonian",
    "Hippocampus", "Anglerfish", "Monkfish", "Witchfish", "Conger Eel", "Sawfish", "Thorny Fish", "Moonfish"
];


const aerialAnimals = [
    "Eagle", "Owl", "Falcon", "Condor", "Albatross", "Seagull", "Plover", "Stork", "Heron", "Cormorant",
    "Hummingbird", "Bumblebee", "Butterfly", "Dragonfly", "Fly", "Mosquito", "Moth", "Wasp", "Crane",
    "Pelican", "Flamingo", "Toucan", "Raven", "Swallow", "Swift", "Duck", "Goose", "Swan", "Kingfisher",
    "Woodpecker", "Partridge", "Quail", "Pigeon", "Peacock", "Turkey", "Sparrow", "Goldfinch", "Canary",
    "Parrot", "Parakeet", "Parakeet", "Parrot", "Hen", "Rooster", "Mallard", "Cuckoo", "Owl",
    "Starling", "Thrush", "Blackbird", "Great Horned Owl", "Robin", "Sparrow", "Jay", "Duck", "Water Thrush",
    "Goldfinch Siskin", "Coal Tit", "Redstart", "Dunnock", "Sparrow Miller", "Thrush", "Magpie", "Sparrow", "Common Plane",
    "Pitohui", "Becard", "Flycatcher", "Canastero", "Hawk", "Egret", "Swift Real", "Nightingale", "Dove",
    "Climber", "Hawk", "Wagtail", "Wood Pigeon", "Warbler", "Reed Warbler", "Solitary Rocker", "Nightjar"
];


const amphibianAnimals = [
    "Frog", "Toad", "Salamander", "Axolotl", "Newt", "Glass Frog", "Tree Frog", "Leopard Frog",
    "Poison Dart Frog", "Horned Toad", "Common Toad", "Bufo Toad", "Spadefoot Toad", "Yellow-bellied Toad",
    "Midwife Toad", "Cane Toad", "Surinam Toad", "Fire-bellied Toad", "Madagascar Toad",
    "Surinam Toad", "Cane Toad", "Surinam Toad", "African Bullfrog", "Fire-bellied Toad", "Madagascar Toad",
    "Surinam Toad", "Cane Toad", "Surinam Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    " Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    "  Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    " Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    " Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    " Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    " Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    " Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    " Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    " Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    "  Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    "   Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    " Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    "   Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    " Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    " Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
    "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad", "Cane Toad", "Surinam Toad",
];



const mammalAnimals = [
    "Dog", "Cat", "Elephant", "Lion", "Tiger", "Giraffe", "Zebra", "Rhinoceros", "Hippopotamus", "Bear",
    "Wolf", "Fox", "Coyote", "Hare", "Rabbit", "Wild Boar", "Deer", "Eagle", "Owl", "Hummingbird",
    "Duck", "Goose", "Swan", "Pelican", "Penguin", "Shark", "Whale", "Dolphin", "Fish", "Orca",
    "Kangaroo", "Koala", "Panda", "Meerkat", "Ant", "Bee", "Spider", "Butterfly", "Firefly", "Cricket",
    "Lizard", "Snake", "Crocodile", "Turtle", "Camel", "Dromedary", "Gorilla", "Chimpanzee", "Orangutan",
    "Falcon", "Great Horned Owl", "Condor", "Bat", "Weasel", "Otter", "Beaver", "Armadillo", "Porcupine",
    "Goat", "Sheep", "Cow", "Horse", "Donkey", "Camels", "Yak", "Alpaca", "Llama",
    "Lobster", "Crab", "Octopus", "Squid", "Snail", "Oyster", "Clam", "Flea", "Mosquito"
];




