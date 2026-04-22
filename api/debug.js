export default function handler(req, res) {
  const hasKey = !!process.env.ANTHROPIC_API_KEY;
  const keyLength = process.env.ANTHROPIC_API_KEY ? process.env.ANTHROPIC_API_KEY.length : 0;
  const envKeys = Object.keys(process.env).filter(k => k.includes('ANTHROPIC'));
  res.status(200).json({ hasKey, keyLength, envKeys });
}
