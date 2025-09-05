import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { nombre, email, empresa, mensaje } = await request.json();

        const API_URL = "http://192.168.1.65:465/SignUp/v1/NewProspect";

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre: nombre,
                email: email,
                empresa: empresa || "", // Enviar cadena vacía si es undefined/null
                mensaje: mensaje
            }),
        });

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    }
    catch (error) {
        console.error("Error al obtener respuesta de la API", error);

        const backupResponses = [
            "En este momento no puedo conectarme con el servidor. Por favor, verifica que el servicio esté ejecutándose.",
            "Parece que hay un problema de conexión. ¿Podrías intentarlo de nuevo en unos momentos?",
            "Error de conexión con el servidor API. Verifica que el servidor esté ejecutándose.",
            "Lo siento, estoy teniendo problemas técnicos. Por favor, intenta nuevamente más tarde.",
            "Error de conexión: El servidor no está respondiendo. Contacta al administrador."
        ];

        const errorResponse = backupResponses[Math.floor(Math.random() * backupResponses.length)];

        return NextResponse.json({ 
            message: errorResponse,
            error: true 
        }, { status: 500 });
    }
}