export const dynamic = 'force-dynamic'; // Esto es crucial

export async function POST(request) {
  const { pathname } = new URL(request.url);
  const path = pathname.replace('/api/proxy/', '');
  const apiUrl = `http://rockolafy.mx/api-proxy/${path}`;
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: Object.fromEntries(request.headers),
      body: await request.text(),
    });

    return new Response(response.body, {
      status: response.status,
      headers: Object.fromEntries(response.headers),
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}