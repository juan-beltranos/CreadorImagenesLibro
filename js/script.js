const buttonContainer = document.querySelector('.button-container');
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalResponse = document.getElementById("modalResponse");

const selectedIdioma = document.getElementById("selectedIdioma");
const apiKeyLeonardo = document.getElementById("apikeyleo");
const cantidad = document.getElementById("cantidad");

let oneImg = 10000


// const apiKeyLeonardo = '6ded92cf-1f66-4e0a-aabe-da3a61f6ba40';

let generationId = []
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyC0FughrHQw1xrGS0cFmfef_R_M3vVROHk";
const genAI = new GoogleGenerativeAI(API_KEY);


document.addEventListener('DOMContentLoaded', () => {

    // Seleccionar tema del libro

    buttonContainer.addEventListener('click', async (event) => {
        const button = event.target.closest('.button');
        if (!button) return;
        if (!selectedIdioma.value) return alert("DEBE SELECCIONAR UN IDIOMA");
        if (!apiKeyLeonardo.value) return alert("LA LLAVE ES OBLIGATORIA PARA PODER GENERAR LAS IMAGENES DE SUS LIBROS");
        if (!cantidad.value) return alert("DEBE SELECCIONAR LA CANTIDAD DE IMAGENES PARA SU LIBRO");
        if (cantidad.value < 1 || cantidad.value > 100) return alert("SOLLO PUEDE SELECCIONAR LA CANTIDAD DE IMAGENES EN EL RANGO DE 1 A 100 IMAGENES");

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

        // Validar la cantidad de imágenes a descargar
        let cantidadImagenes = parseInt(cantidad.value, 10);
        characters = cantidadImg(characters, cantidadImagenes);

        const minutos = oneImg * characters.length / 60000;
        const mensaje = "El tiempo en crear las imágenes es de: " + minutos.toFixed(2) + " minutos";

        if (confirm(mensaje)) {
            // await mostrarPersonajes(characters, series);
            await gemeniIA(series, selectedIdioma.value, characters.length);
        }

    });

    closeModal()

});

// Generar imagenes y descargarlas en ZIP

async function mostrarPersonajes(personajes, serie) {

    const loadingOverlay = document.querySelector('.loading-overlay');
    const spinner = document.querySelector('.spinner');
    loadingOverlay.style.display = 'block'; // Mostrar el spinner
    spinner.style.display = 'block'; // Mostrar el spinner

    try {
        const generationIds = await Promise.all(personajes.map(personaje => fetchLeonardoIa(personaje, serie, personajes)));

        // Filtrar los IDs nulos en caso de error en fetchLeonardoIa
        const validGenerationIds = generationIds.filter(id => id !== null);

        console.log(validGenerationIds);

        const imageUrls = await fetchImageUrls(validGenerationIds);
        await downloadImagesAsZip(imageUrls, personajes);
    } catch (error) {
        console.error('Error al mostrar personajes:', error);
    } finally {
        loadingOverlay.style.display = 'none'; // Ocultar el spinner
        spinner.style.display = 'none'; // Ocultar el spinner
    }
}

async function fetchLeonardoIa(personaje, serie, cantImg) {
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

        // Esperar N segundos para permitir la generación de N imágenes, cada imagen con 10000 ms
        await sleep(oneImg * cantImg.length);

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
    myHeaders.append("Authorization", `Bearer ${apiKeyLeonardo.value}`);

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

async function gemeniIA(serie, idioma, cantImg) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


    const instruccionesComunes = (idioma) => `
        <div style="font-family: Arial, sans-serif; margin: 20px; line-height: 1.6;">
            <p>${idioma === "Español" ? "Incluye 100 páginas de personajes de" : "Featuring 100 pages of"} ${serie} ${idioma === "Español" ? "en diferentes escenarios." : "characters in different scenarios."}</p>
            <h1 style="font-size: 1.5em;">✨ ${idioma === "Español" ? "¡Sumérgete en una Aventura Mágica para Colorear!" : "Dive into a Magical Coloring Adventure!"}</h1>
            <p>${idioma === "Español" ? "¡Embárcate en un viaje encantador con este vibrante libro para colorear! Diseñado para niños de 2 a 10 años, este cautivador libro presenta 50 páginas llenas de personajes de" : "Embark on an enchanting journey with this vibrant coloring book! Designed for children aged 2 to 10, this captivating book features 50 pages brimming with"} ${serie} ${idioma === "Español" ? "que esperan cobrar vida con colores vibrantes. Cada página no solo despierta la creatividad, sino que también introduce a las mentes jóvenes a un mundo de magia y fantasía." : "characters waiting to be brought to life with vibrant colors. Each page not only sparks creativity but also introduces young minds to a world of magic and fantasy."}</p>
            <h2 style="font-size: 1.5em;">🎨 ${idioma === "Español" ? "Lo que te Espera en Este Libro Mágico:" : "What Awaits You in This Magical Book:"}</h2>
            <ul style="list-style-type: none; padding: 0;">
                <li style="margin: 10px 0;">🎨 <span style="font-weight: bold;">${idioma === "Español" ? "50 Ilustraciones:" : "50 Illustrations:"}</span> ${idioma === "Español" ? "De" : "From"} ${serie}, ${idioma === "Español" ? "cada página invita a los niños a explorar y colorear diversos personajes de" : "every page invites children to explore and color diverse"} ${serie}.</li>
                <li style="margin: 10px 0;">🎨 <span style="font-weight: bold;">${idioma === "Español" ? "Impresión a una Cara:" : "Single-Sided Printing:"}</span> ${idioma === "Español" ? "Cada ilustración está impresa en un lado de papel de alta calidad para evitar el traspaso, permitiendo que cada obra maestra se pueda exhibir con orgullo." : "Each illustration is printed on one side of high-quality paper to prevent bleed-through, allowing every masterpiece to be proudly displayed."}</li>
                <li style="margin: 10px 0;">🎨 <span style="font-weight: bold;">${idioma === "Español" ? "Diseño Amigable para Niños:" : "Kid-Friendly Design:"}</span> ${idioma === "Español" ? "Elaborado con cuidado, este libro de 8.5\"x11\" cuenta con una cubierta brillante y páginas resistentes adecuadas para manos pequeñas, asegurando una experiencia de coloreo encantadora." : "Crafted with care, this 8.5\"x11\" book boasts a glossy cover and sturdy pages suitable for little hands, ensuring a delightful coloring experience."}</li>
                <li style="margin: 10px 0;">🎨 <span style="font-weight: bold;">${idioma === "Español" ? "Diversión Educativa para Todas las Edades:" : "Educational Fun for All Ages:"}</span> ${idioma === "Español" ? "Ya sea descubriendo" : "Whether discovering"} ${serie} ${idioma === "Español" ? "por primera vez o profundizando su amor por estos personajes, este libro hace que colorear sea educativo y divertido para todos." : "for the first time or deepening their love for these characters, this book makes coloring educational and enjoyable for everyone."}</li>
            </ul>
            <h2 style="font-size: 1.5em;">🎁 ${idioma === "Español" ? "El Regalo Perfecto para Pequeños Soñadores:" : "The Perfect Gift for Little Dreamers:"}</h2>
            <p>${idioma === "Español" ? "Ideal para cumpleaños, vacaciones o cualquier ocasión, este libro para colorear es un regalo que inspira creatividad, curiosidad y una apreciación de por vida por el mundo mágico de" : "Ideal for birthdays, holidays, or any occasion, this coloring book is a gift that inspires creativity, curiosity, and a lifelong appreciation for the magical world of"} ${serie}.</p>
            <h2 style="font-size: 1.5em;">🚀 ${idioma === "Español" ? "¿Por Qué Elegir Esta Aventura Mágica?" : "Why Choose This Magical Adventure?"}</h2>
            <ul style="list-style-type: none; padding: 0;">
                <li style="margin: 10px 0;">🎨 <span style="font-weight: bold;">${idioma === "Español" ? "Estimula la Creatividad:" : "Stimulates Creativity:"}</span> ${idioma === "Español" ? "Fomenta la expresión artística y el juego imaginativo a través del coloreo." : "Encourages artistic expression and imaginative play through coloring."}</li>
                <li style="margin: 10px 0;">🎨 <span style="font-weight: bold;">${idioma === "Español" ? "Valor Educativo:" : "Educational Value:"}</span> ${idioma === "Español" ? "Introduce a los personajes de" : "Introduces"} ${serie} ${idioma === "Español" ? "y sus mundos fantásticos de una manera divertida y atractiva." : "characters and their whimsical worlds in a fun and engaging way."}</li>
                <li style="margin: 10px 0;">🎨 <span style="font-weight: bold;">${idioma === "Español" ? "Promueve las Habilidades Motoras Finas:" : "Promotes Fine Motor Skills:"}</span> ${idioma === "Español" ? "Mejora la coordinación mano-ojo y el desarrollo de habilidades motoras finas." : "Enhances hand-eye coordination and fine motor skills development."}</li>
            </ul>
            <p style="font-size: 1.5em;"><b>🌈 ${idioma === "Español" ? "¡Únete a la Aventura Mágica!" : "Join the Magical Adventure!"}</b> ${idioma === "Español" ? "Prepara a tu joven artista para un viaje por el encantador mundo de" : "Prepare your young artist for a journey through the enchanting world of"} ${serie}. ${idioma === "Español" ? "Este libro para colorear promete horas de exploración creativa y aprendizaje, ¡siendo el compañero perfecto para cada artista en ciernes y entusiasta de" : "This coloring book promises hours of creative exploration and learning, making it the perfect companion for every budding artist and"} ${serie}!</p>
        </div>
    `;

    const instrucciones = idioma === "Español" ? `
        1. Crea un título para mi libro de colorear para niños de ${serie}, dame la respuesta en HTML y genera un título que diga "Titulo del libro: ".
        2. Genera un subtítulo que incluya palabras clave relevantes, dame la respuesta en HTML y genera un título que diga "Subtitulo del libro: ".
        3. Crea 7 palabras clave para mi libro de colorear para niños de ${serie} y genera un título que diga "Palabras clave para publicar en Amazon: ", dame la respuesta en HTML.
        4. Además, proporciona una descripción completa del libro en el siguiente formato HTML y agrega o elimina lo que creas conveniente y que tenga un título que diga "Descripcion General: ":
        ${instruccionesComunes("Español")}
        No incluyas sugerencias adicionales, solo proporciona el título, subtítulo y descripción.
    ` : `
        1. Create a title for my children's coloring book of ${serie}, give me the response in HTML and generate a title that says "Book Title: ".
        2. Generate a subtitle that includes relevant keywords, give me the response in HTML and generate a title that says "Book Subtitle: ".
        3. Create 7 keywords for my children's coloring book of ${serie} and generate a title that says "Keywords for Amazon Publishing: ", give me the response in HTML.
        4. Additionally, provide a complete description of the book in the following HTML format, adding or removing what you deem appropriate, and generate a title that says "General Description: ":
        ${instruccionesComunes("English")}
        Do not include additional suggestions, just provide the title, subtitle, and description.
    `;

    try {
        modal.style.display = "flex";
        modalResponse.textContent = "Creando información para publicar en Amazon KDP...";

        const result = await model.generateContent(instrucciones);
        const response = await result.response;
        const text = await response.text();

        modalResponse.innerHTML = text.replace(/```html|```/g, '');
        // downloadPDF();
        return text;
    } catch (error) {
        modalResponse.textContent = "Error generating content.";
        console.error("Error generating content:", error);
        return null;
    }
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

function cantidadImg(characters, cantidadImagenes) {
    let elementosAEliminar = characters.length - cantidadImagenes;
    if (elementosAEliminar > 0) characters.splice(-elementosAEliminar)
    return characters
}

function closeModal() {

    // Cerrar Modal

    closeModalBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}



