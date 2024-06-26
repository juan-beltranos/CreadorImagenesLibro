const buttonContainer = document.querySelector('.button-container');
const openModalBtn = document.getElementById("openModalBtn");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalResponse = document.getElementById("modalResponse");
const apiKeyLeonardo = document.getElementById("apikeyleo");

// const apiKeyLeonardo = 'a8d5b58a-9020-43e3-a0b9-bd3dd8c6e65c';

let generationId = []
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyC0FughrHQw1xrGS0cFmfef_R_M3vVROHk";
const genAI = new GoogleGenerativeAI(API_KEY);


document.addEventListener('DOMContentLoaded', () => {

    // Seleccionar tema del libro

    buttonContainer.addEventListener('click', async (event) => {
        const button = event.target.closest('.button');
        if (!button) return;
        if (!apiKeyLeonardo.value) return alert("LA LLAVE ES OBLIGATORIA PARA PODER GENERAR LAS IMAGENES DE SUS LIBROS");

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
            case 'modernBtn':
                characters = modernElements;
                break;
            default:
                return;
        }

        await mostrarPersonajes(characters, series);
        await gemeniIA(series)

    });


    // Cerrar Modal

    closeModalBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

});



// Generar imagenes y descargarlas en ZIP

async function fetchLeonardoIa(personaje, serie) {
    const url = 'https://cloud.leonardo.ai/api/rest/v1/generations';

    // const data = {
    //     alchemy: false,
    //     height: 1024,
    //     // modelId: '16e7060a-803e-4df3-97ee-edcfa5dc9cc8', // SDXL_1_0
    //     modelId: 'aa77f04e-3eec-4034-9c07-d0f619684628', // Leonardo Kino XL
    //     num_images: 1,
    //     presetStyle: 'CINEMATIC',
    //     prompt: `Chibi-style drawing of ${personaje} from ${serie}, cartoon-style with black outline for a coloring book.`,
    //     //  prompt: `Chibi-style drawing of ${personaje} from series ${serie}, cartoon-style with black outline for a coloring book.`,
    //     width: 1024,
    //     elements: [{ akUUID: 'd0ebdbf7-a570-4b93-8406-306bbb2a3469', weight: 1 }] // Coloring Book
    // };

    const data = {
        alchemy: false,
        height: 512,
        modelId: '6bef9f1b-29cb-40c7-b9df-32b51c1f67d3',
        num_images: 1,
        presetStyle: 'CINEMATIC',
        prompt: `Chibi-style drawing of ${personaje} from series ${serie}, cartoon-style with black outline for a coloring book.`,
        width: 512,
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKeyLeonardo.value}`,
            Accept: 'application/json',
        },
        body: JSON.stringify(data)
    };

    return

    try {
        const response = await fetch(url, options);

        if (!response.ok) return alert("LLAVE INCORRECTA, PUEDE CREAR UNA LLAVE EN : https://app.leonardo.ai/api-access")

        const jsonResponse = await response.json();
        const idImage = jsonResponse.sdGenerationJob.generationId;

        // Esperar 15 minutos para permitir la generación de 50 imágenes
        await sleep(900000);

        return idImage;

    } catch (error) {
        //console.error('Error al hacer la solicitud:', error);
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
            imageUrls.push(imageUrl);

        } catch (error) {
            console.error('Error al obtener la imagen:', error);
        }
    }

    return imageUrls;
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
            saveAs(content, 'book.zip');
        });
}


// Consultar propiedades para publicar el libro en Amazon KDP

async function gemeniIA(serie) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const instruction = `
    1.Crea un título para mi libro de colorear para niños de ${serie} ,dame la respuesta en html y genera un título que diga "Titulo del libro : ". 
    2.Genera un subtítulo que incluya palabras clave relevantes, dame la respuesta en html y genera un título que diga "subtitulo del libro : ". 
    3.Crea 7 palabras clave para mi libro de colorear para niños de ${serie} y genera un título que diga "Palabras clave para publicar en Amazon : ",dame la respuesta en html.
    4.Además, proporciona una descripción completa del libro en el siguiente formato HTML y agrega o elimina lo que creas conveniente y que tenga un titulo que diga "Descripcion General : ":
  
    <div style="font-family: Arial, sans-serif; margin: 20px; line-height: 1.6;">
  
      <p>Featuring 100 pages of ${serie} characters in different scenarios.</p>
  
      <h1 style="font-size: 1.5em;">✨ Dive into a Magical Coloring Adventure!</h1>
      <p>Embark on an enchanting journey with this vibrant coloring book! Designed for children aged 2 to 10, this captivating book features 50 pages brimming with ${serie} characters waiting to be brought to life with vibrant colors. Each page not only sparks creativity but also introduces young minds to a world of magic and fantasy.</p>
  
      <h2 style="font-size: 1.5em;">🎨 What Awaits You in This Magical Book:</h2>
      <ul style="list-style-type: none; padding: 0;">
          <li style="margin: 10px 0;">🎨 <span style="font-weight: bold;">50 Illustrations:</span> From ${serie}, every page invites children to explore and color diverse ${serie} characters.</li>
          <li style="margin: 10px 0;">🎨 <span style="font-weight: bold;">Single-Sided Printing:</span> Each illustration is printed on one side of high-quality paper to prevent bleed-through, allowing every masterpiece to be proudly displayed.</li>
          <li style="margin: 10px 0;">🎨 <span style="font-weight: bold;">Kid-Friendly Design:</span> Crafted with care, this 8.5"x11" book boasts a glossy cover and sturdy pages suitable for little hands, ensuring a delightful coloring experience.</li>
          <li style="margin: 10px 0;">🎨 <span style="font-weight: bold;">Educational Fun for All Ages:</span> Whether discovering ${serie} for the first time or deepening their love for these characters, this book makes coloring educational and enjoyable for everyone.</li>
      </ul>
  
      <h2 style="font-size: 1.5em;">🎁 The Perfect Gift for Little Dreamers:</h2>
      <p>Ideal for birthdays, holidays, or any occasion, this coloring book is a gift that inspires creativity, curiosity, and a lifelong appreciation for the magical world of ${serie}.</p>
  
      <h2 style="font-size: 1.5em;">🚀 Why Choose This Magical Adventure?</h2>
      <ul style="list-style-type: none; padding: 0;">
          <li style="margin: 10px 0;">🎨 <span style="font-weight: bold;">Stimulates Creativity:</span> Encourages artistic expression and imaginative play through coloring.</li>
          <li style="margin: 10px 0;">🎨 <span style="font-weight: bold;">Educational Value:</span> Introduces ${serie} characters and their whimsical worlds in a fun and engaging way.</li>
          <li style="margin: 10px 0;">🎨 <span style="font-weight: bold;">Promotes Fine Motor Skills:</span> Enhances hand-eye coordination and fine motor skills development.</li>
      </ul>
  
      <p style="font-size: 1.5em;"><b>🌈 Join the Magical Adventure!</b> Prepare your young artist for a journey through the enchanting world of ${serie}. This coloring book promises hours of creative exploration and learning, making it the perfect companion for every budding artist and ${serie} enthusiast!</p>
    </div>
  
    No incluyas sugerencias adicionales, solo proporciona el título, subtítulo y descripción todo en ingles, no agregues.
  `;

    modal.style.display = "flex";
    modalResponse.textContent = "Loading...";

    const result = await model.generateContent(instruction);
    const response = await result.response;
    const text = await response.text();
    modalResponse.innerHTML = text;
    modalResponse.innerHTML = modalResponse.innerHTML.replace(/```html|```/g, '');
    downloadPDF()
    return text;
}


// Helpers

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

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function downloadPDF() {
    const modalContent = document.querySelector('#modalResponse');

    // Opciones para html2pdf
    const opt = {
        margin: 1,
        filename: 'info-amazon.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Generar el PDF
    html2pdf().set(opt).from(modalContent).save();
}

// TODOS

// Funcion para crear caratula del libro parte delantera y trasera
