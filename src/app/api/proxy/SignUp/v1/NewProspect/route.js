export const dynamic = 'force-dynamic'; // Necesario para evitar caching

export async function POST(request) {
  const targetUrl = 'http://rockolafy.mx/api-proxy/SignUp/v1/NewProspect';
  
  try {
    // Obtener datos del cuerpo de la solicitud
    const requestData = await request.json();
    
    // Validación básica
    if (!requestData.nombre || !requestData.email) {
      return Response.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      );
    }

    // Enviar solicitud al API real
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    // Si la respuesta no es exitosa
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return Response.json(
        { error: errorData.message || 'Error al enviar el formulario' },
        { status: response.status }
      );
    }

    // Devolver respuesta exitosa
    const responseData = await response.json();
    return Response.json(responseData, { status: 200 });

  } catch (error) {
    console.error('Proxy error:', error);
    return Response.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    );
  }
}