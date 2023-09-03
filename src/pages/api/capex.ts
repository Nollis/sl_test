import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const a = async (req: NextApiRequest, res: NextApiResponse) => {
  const { sizeMw, hardwareCostPerMw, installationCostPerMw } = req.body;

  try {
    const response = await fetch('https://test-api-sl.vercel.app/api/capex', {
      method: 'POST',
      body: JSON.stringify({
        sizeMw,
        hardwareCostPerMw,
        installationCostPerMw,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
};

export default a;