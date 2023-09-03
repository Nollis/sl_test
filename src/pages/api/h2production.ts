import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const h2 = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { energyInput, SEC, degradationPerYear, years } = req.body;
    const response = await fetch('https://test-api-sl.vercel.app/api/h2production', {
      method: 'POST',
      body: JSON.stringify({
        energyInput,
        SEC,
        degradationPerYear,
        years
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

export default h2;