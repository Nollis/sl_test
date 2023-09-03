import React, { useState } from 'react';

type CapexFormProps = {
  setCapexData: React.Dispatch<React.SetStateAction<any>>;  // or use the actual type instead of 'any'
  setIsLoadingCapex: React.Dispatch<React.SetStateAction<boolean>>;
};


const CapexForm: React.FC<CapexFormProps> = ({ setCapexData, setIsLoadingCapex }) => {
  const [formData, setFormData] = useState({
    sizeMw: 100,
    hardwareCostPerMw: 800,
    installationCostPerMw: 200,
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
    const { sizeMw, hardwareCostPerMw, installationCostPerMw } = formData;

    try {
      setIsLoadingCapex(true);
      const res = await fetch('../api/capex', {
        method: 'POST',
        body: JSON.stringify({ sizeMw, hardwareCostPerMw, installationCostPerMw }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      setCapexData(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoadingCapex(false);  // Set loading to false when fetching ends
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
  <h1 className="text-2xl mb-4 text-black">Capex Data</h1>
  <form className="space-y-4" onSubmit={handleSubmit}>
    <div className="flex flex-col">
      <label htmlFor="sizeMw" className="text-lg mb-2 text-black">Size in MW</label>
      <input 
        type="number" 
        id="sizeMw"
        name="sizeMw" 
        className="p-2 border rounded text-black" 
        required
        value={formData.sizeMw} 
        onChange={handleChange} 
        placeholder="Size in MW"
      />
    </div>
    <div className="flex flex-col">
      <label htmlFor="hardwareCostPerMw" className="text-lg mb-2 text-black">Hardware Cost per MW</label>
      <input 
        type="number" 
        id="hardwareCostPerMw"
        name="hardwareCostPerMw" 
        className="p-2 border rounded text-black" 
        required
        value={formData.hardwareCostPerMw} 
        onChange={handleChange} 
        placeholder="Hardware Cost per MW"
      />
    </div>
    <div className="flex flex-col">
      <label htmlFor="installationCostPerMw" className="text-lg mb-2 text-black">Installation Cost per MW</label>
      <input 
        type="number" 
        id="installationCostPerMw"
        name="installationCostPerMw" 
        className="p-2 border rounded text-black" 
        required
        value={formData.installationCostPerMw} 
        onChange={handleChange} 
        placeholder="Installation Cost per MW"
      />
    </div>
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
      Calculate
    </button>
  </form>
</div>

  );
};

export default CapexForm;
