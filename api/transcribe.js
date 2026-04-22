// Vercel Serverless Function — proxies requests to Anthropic API
// Your ANTHROPIC_API_KEY is set as an environment variable in Vercel dashboard

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: { message: 'API key not configured' } });
  }

  try {
    const { model, max_tokens, messages, mcp_servers } = req.body;

    // Build request body
    const body = { model, max_tokens, messages };
    if (mcp_servers) body.mcp_servers = mcp_servers;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // Forward the response as-is
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: { message: err.message || 'Internal server error' } });
  }
}
