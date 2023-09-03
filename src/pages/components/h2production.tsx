import React, { useState } from 'react';

type HydrogenProps = {
  setH2ProductionData: React.Dispatch<React.SetStateAction<number[] | null>>;
  setIsLoadingH2: React.Dispatch<React.SetStateAction<boolean>>;
  h2ProductionData: number[] | null;
};


const H2Production: React.FC<HydrogenProps> = ({ setH2ProductionData, setIsLoadingH2 }) => {
  const [formData, setFormData] = useState({
    energyInput: 10000,
    SEC: 50,
    degradationPerYear: 0.02,
    years: 10,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoadingH2(true);  // Set loading to true when fetching begins
      const res = await fetch('../api/h2production', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      setH2ProductionData(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoadingH2(false);  // Set loading to false when fetching ends
    }
  };
  

  return (
    <div className="bg-white p-8 rounded shadow-lg">
      <h1 className="text-2xl mb-4 text-black">Hydrogen Production Data</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Input for Energy Input */}
        <div className="flex flex-col">
        <label htmlFor="energyInput" className="text-lg mb-2 text-black">Energy Input</label>
        <input 
          type="number" 
          id="energyInput" 
          name="energyInput"
          className="p-2 border rounded text-black"
          required 
          value={formData.energyInput} 
          onChange={handleChange}
        />
      </div>

        {/* Input for SEC */}
        <div className="flex flex-col">
          <label htmlFor="SEC" className="text-lg mb-2 text-black">SEC</label>
          <input 
            type="number"
            id="SEC"
            name="SEC"
            className="p-2 border rounded text-black"
            required
            value={formData.SEC}
            onChange={handleChange}
          />
        </div>

        {/* Input for Degradation Per Year */}
        <div className="flex flex-col">
          <label htmlFor="degradationPerYear" className="text-lg mb-2 text-black">Degradation Per Year</label>
          <input 
            type="number"
            id="degradationPerYear"
            name="degradationPerYear"
            className="p-2 border rounded text-black"
            required
            value={formData.degradationPerYear}
            onChange={handleChange}
          />
        </div>

        {/* Input for Years */}
        <div className="flex flex-col">
          <label htmlFor="years" className="text-lg mb-2 text-black">Years</label>
          <input 
            type="number"
            id="years"
            name="years"
            className="p-2 border rounded text-black"
            required
            value={formData.years}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Calculate
        </button>
      </form>
    </div>
  );
};

export default H2Production;
