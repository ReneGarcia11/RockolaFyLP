import { NextResponse } from 'next/server';

export const config = {
  matcher: '/api/proxy/:path*', // Captura todas las rutas bajo /api/proxy/
};

export default async function middleware(request) {
  // 1. Extrae el path de la URL
  const path = request.nextUrl.pathname.replace('/api/proxy/', '');
  
  // 2. Construye la URL de destino
  const apiUrl = new URL(`http://rockolafy.mx/api-proxy/${path}`);
  
  // 3. Copia los query parameters si existen
  if (request.nextUrl.search) {
    apiUrl.search = request.nextUrl.search;
  }

  // 4. Prepara los headers (opcional: puedes modificarlos)
  const headers = new Headers(request.headers);
  
  // 5. Realiza la solicitud a la API HTTP
  try {
    const response = await fetch(apiUrl, {
      method: request.method,
      headers: headers,
      body: request.body,
      redirect: 'follow',
    });

    // 6. Devuelve la respuesta al cliente
    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    // Manejo de errores
    console.error('Middleware proxy error:', error);
    return new NextResponse(JSON.stringify({ error: 'Proxy error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}