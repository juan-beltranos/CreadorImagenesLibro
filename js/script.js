const apiKey = 'a8d5b58a-9020-43e3-a0b9-bd3dd8c6e65c';
let generationId = []

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
                characters = animalesDelMundo;
                break;
            case 'dinosaursBtn':
                characters = dinosaurios;
                break;
            case 'vehiclesBtn':
                characters = transportes;
                break;
            case 'fantasyBtn':
                characters = fantasíaYCriaturasMágicas;
                break;
            case 'natureBtn':
                characters = naturalezaYFlores;
                break;
            case 'superheroesBtn':
                characters = superheroesYCómics;
                break;
            case 'foodBtn':
                characters = alimentosYDulces;
                break;
            case 'spaceBtn':
                characters = espacioYPlanetas;
                break;
            case 'sportsBtn':
                characters = deportesYActividadesAlAireLibre;
                break;
            case 'seasonsBtn':
                characters = estacionesDelAño;
                break;
            case 'professionsBtn':
                characters = profesionesYOficios;
                break;
            case 'fairytalesBtn':
                characters = cuentosClásicosYMitología;
                break;
            case 'constructionBtn':
                characters = vehículosDeConstrucción;
                break;
            case 'musicBtn':
                characters = músicaEInstrumentos;
                break;
            case 'abstractBtn':
                characters = arteAbstractoYPatrones;
                break;
            default:
                return;
        }

        await mostrarPersonajes(characters, series);
    });
});

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchLeonardoIa(personaje, serie) {
    const url = 'https://cloud.leonardo.ai/api/rest/v1/generations';

    const data = {
        alchemy: false,
        height: 1024,
        modelId: '16e7060a-803e-4df3-97ee-edcfa5dc9cc8', // SDXL_1_0
        num_images: 1,
        presetStyle: 'CINEMATIC',
        prompt: `Chibi-style drawing of ${personaje} from series ${serie}, cartoon-style with black outline for a coloring book.`,
        width: 1024,
        elements: [{ akUUID: 'd0ebdbf7-a570-4b93-8406-306bbb2a3469', weight: 1 }] // Coloring Book
    };

    // const data = {
    //     alchemy: false,
    //     height: 512,
    //     modelId: '6bef9f1b-29cb-40c7-b9df-32b51c1f67d3',
    //     num_images: 1,
    //     presetStyle: 'CINEMATIC',
    //     prompt: `Chibi-style drawing of ${personaje} from series ${serie}, cartoon-style with black outline for a coloring book.`,
    //     width: 512,
    // };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
            Accept: 'application/json',
        },
        body: JSON.stringify(data)
    };


    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonResponse = await response.json();
        const idImage = jsonResponse.sdGenerationJob.generationId;

        // Esperar 12.5 minutos para permitir la generación de 50 imágenes
        await sleep(750000);

        // Esperar 7 seg para permitir la generación de 50 imágenes
        //await sleep(7000);

        return idImage;

    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        return null;
    }
}

async function fetchImageUrls(generationIds) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${apiKey}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    const imageUrls = [];

    for (const id of generationIds) {
        try {
            const response = await fetch(`https://cloud.leonardo.ai/api/rest/v1/generations/${id}`, requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const dataRes = await response.json();

            if (!dataRes || !dataRes.generations_by_pk || !dataRes.generations_by_pk.generated_images || dataRes.generations_by_pk.generated_images.length === 0) {
                throw new Error('No se encontraron imágenes generadas');
            }

            const imageUrl = dataRes.generations_by_pk.generated_images[0].url;
            console.log(imageUrl);

            imageUrls.push(imageUrl);

        } catch (error) {
            console.error('Error al obtener la imagen:', error);
        }
    }

    return imageUrls;
}

async function downloadImagesAsZip(imageUrls, personajes) {
    const zip = new JSZip();

    const imagePromises = imageUrls.map(async (imageUrl, index) => {
        const imageBlob = await fetch(imageUrl).then(r => r.blob());
        const fileName = `${personajes[index]}.jpg`;
        zip.file(fileName, imageBlob);
    });

    await Promise.all(imagePromises);

    // Generar el archivo zip y descargarlo
    zip.generateAsync({ type: 'blob' })
        .then(content => {
            saveAs(content, 'personajes.zip');
        });
}

async function mostrarPersonajes(personajes, serie) {

    const loadingOverlay = document.querySelector('.loading-overlay');
    const spinner = document.querySelector('.spinner');
    loadingOverlay.style.display = 'block'; // Mostrar el spinner
    spinner.style.display = 'block'; // Mostrar el spinner

    try {
        const generationIds = await Promise.all(personajes.map(personaje => fetchLeonardoIa(personaje, serie)));

        // Filtrar los IDs nulos en caso de error en fetchLeonardoIa
        const validGenerationIds = generationIds.filter(id => id !== null);

        const imageUrls = await fetchImageUrls(validGenerationIds);
        await downloadImagesAsZip(imageUrls, personajes);
    } catch (error) {
        console.error('Error al mostrar personajes:', error);
    } finally {
        loadingOverlay.style.display = 'none'; // Ocultar el spinner
        spinner.style.display = 'none'; // Ocultar el spinner
    }
}

function saveAs(blob, filename) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}