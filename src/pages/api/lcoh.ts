// api/lcoh.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const lcoh = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { capex, yearlyH2Production } = req.body;
    const response = await fetch('https://test-api-sl.vercel.app/api/lcoh', {
      method: 'POST',
      body: JSON.stringify({
        capex,
        yearlyH2Production
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    res.status(200).json(data);
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default lcoh;