document.addEventListener('DOMContentLoaded', () => {
    const buttonContainer = document.querySelector('.button-container');

    buttonContainer.addEventListener('click', async (event) => {
        const button = event.target.closest('.button');
        if (!button) return;

        const series = button.querySelector('.button-text').textContent.toUpperCase();
        let characters;

        switch (button.id) {
            case 'pokemonBtn':
                characters = pokemonCharacters;
                break;
            case 'narutoBtn':
                characters = narutoCharacters;
                break;
            case 'dragonBallBtn':
                characters = dragonBallCharacters;
                break;
            case 'digimonBtn':
                characters = digimonCharacters;
                break;
            case 'demonSlayerBtn':
                characters = demonSlayerCharacters;
                break;
            case 'marvelBtn':
                characters = marvelCharacters;
                break;
            case 'rickyAndMortyBtn':
                characters = rickAndMortyCharacters;
                break;
            case 'barbieBtn':
                characters = barbieCharacters;
                break;
            case 'mamiferosBtn':
                characters = mammalAnimals;
                break;
            case 'anfibiosBtn':
                characters = amphibianAnimals;
                break;
            case 'aererosBtn':
                characters = aerialAnimals;
                break;
            case 'marinosBtn':
                characters = marineAnimals;
                break;
            case 'allAnimalsBtn':
                characters = allAnimals;
                break;
            default:
                return;
        }

        await mostrarPersonajes(characters, series);
    });
});

function mostrarPersonajes(personajes, serie) {
    personajes.forEach(personaje => { fetchLeonardoIa(personaje, serie) })
}

async function fetchLeonardoIa(personaje, serie) {
    const zip = new JSZip();

    const url = 'https://cloud.leonardo.ai/api/rest/v1/generations';
    const apiKey = 'ffffffffffffffffffff';

    const data = {
        alchemy: true,
        height: 1024,
        modelId: '16e7060a-803e-4df3-97ee-edcfa5dc9cc8',
        num_images: 1,
        presetStyle: 'CINEMATIC',
        prompt: `Chibi-style drawing of ${personaje} from serie of ${serie}, cartoon-style with black outline for a coloring book.`,
        width: 1024,
        elements: [{ akUUID: 'dsdsd' }]
    };
    
    console.log(data);
    return

    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) { throw new Error(`HTTP error! Status: ${response.status}`) }

        const jsonResponse = await response.json();
        console.log(jsonResponse);

    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
    }
}



function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Failed to load image from ' + url));
        img.src = url;
    });
}



