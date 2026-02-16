export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://prayer-lock.com');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, platform } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const API_KEY = process.env.EMAIL_OCTOPUS_API_KEY;
    const LIST_ID = process.env.EMAIL_OCTOPUS_LIST_ID;

    const response = await fetch(`https://emailoctopus.com/api/1.6/lists/${LIST_ID}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            api_key: API_KEY,
            email_address: email,
            tags: [platform === 'ios' ? 'iOS' : 'Android']
        })
    });

    const data = await response.json();

    if (response.ok || data.error?.code === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
        return res.status(200).json({ success: true });
    }

    return res.status(400).json({ error: data.error?.message || 'Failed to subscribe' });
}
