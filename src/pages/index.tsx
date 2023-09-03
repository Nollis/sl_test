import React, { useState, useEffect } from 'react';
import CapexForm from './components/capex';
import H2Production from './components/h2production';
import LCOHPage from './components/lcoh';
import LoadingSpinner from './components/LoadingSpinner';
import LineChart from './components/LineChart';

interface CapexData {
    installation: number;
    hardware: number;
  }

interface LCOHData {
LCOH: number;
installationCostProportion: number;
hardwareCostProportion: number;
}

interface H2ProductionData extends Array<number> {}


  const HomePage: React.FC = () => {
    const [capexData, setCapexData] = useState<CapexData | null>(null);
    const [h2ProductionData, setH2ProductionData] = useState<H2ProductionData | null>(null);
    const [lcohData, setLcohData] = useState<LCOHData | null>(null);
    const [isLoadingCapex, setIsLoadingCapex] = useState(false);
    const [isLoadingH2, setIsLoadingH2] = useState(false);
    const [isLoadingLcoh, setIsLoadingLcoh] = useState(false);
  
    useEffect(() => {
      const fetchLcohData = async () => {
        if (capexData && h2ProductionData) {
          console.log("Using capexData:", capexData); // Debugging line
      console.log("Using h2ProductionData:", h2ProductionData);
          setIsLoadingLcoh(true);
          try {
            const res = await fetch('/api/lcoh', {
              method: 'POST',
              body: JSON.stringify({
                capex: capexData,
                yearlyH2Production: h2ProductionData,
              }),
              headers: { 'Content-Type': 'application/json' },
            });
    
            if (!res.ok) {
              throw new Error(`Network request failed with status ${res.status}`);
            }
    
            const data = await res.json();
            console.log("Received data:", data);  // For debugging
            
            if (data && typeof data.data.LCOH === 'number') {
              setLcohData(data.data);
            } else {
              console.error('Invalid LCOH data:', data);
              // Consider setting an error state here
            }
    
          } catch (error) {
            console.error('Error fetching LCOH data:', error);
            // Consider setting an error state here
          } finally {
            setIsLoadingLcoh(false);
          }
        }
      };
    
      fetchLcohData();
    }, [capexData, h2ProductionData]);    

    const chartData = {
      labels: Array.from({ length: h2ProductionData?.length ?? 0 }, (_, i) => i + 1),
      datasets: [
        {
          label: 'H2 Production',
          data: h2ProductionData,
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
          fill: false,
        },
      ],
    };
    
    const chartOptions = {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Year'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Production (kg)'
          }
        }
      }
    };    
  
    return (
      <div style={{ padding: "20px" }}>
        <h1 className="text-center text-4xl mb-8">Calculations Dashboard</h1>
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
        <div className="md:flex-1 md:space-y-8">
        <section className="md:flex-1 md:mb-4">
          <div className="bg-slate-300 p-8 rounded-lg shadow-lg">
            <div className="flex justify-between">
              {/* Form component on the left */}
              <div className="flex-1">
                <CapexForm setCapexData={setCapexData} setIsLoadingCapex={setIsLoadingCapex} />
              </div>

              {/* Results on the right */}
              <div className="flex-1 p-8 text-black">
                {isLoadingCapex ? (
                  <LoadingSpinner />
                ) : capexData ? (
                  <div>
                    <p><span className="font-bold">Installation:</span> {capexData.installation} USD</p>
                    <p><span className="font-bold">Hardware:</span> {capexData.hardware} USD</p>
                  </div>
                ) : (
                  <p>No data available.</p>
                )}
              </div>
            </div>
          </div>
        </section>


        <section className="md:flex-1 md:mb-4">
          <div className="p-8 rounded-lg shadow-lg bg-slate-300">
            <div className="flex justify-between">
              {/* H2Production component on the left */}
              <div className="flex-1">
                <H2Production
                  setH2ProductionData={setH2ProductionData}
                  setIsLoadingH2={setIsLoadingH2}
                  h2ProductionData={h2ProductionData}
                />
              </div>

              {/* Results on the right */}
              <div className="flex-1 text-black p-8">
                {isLoadingH2 ? (
                  <LoadingSpinner />
                ) : h2ProductionData ? (
                  <LineChart 
                    data={h2ProductionData} 
                    labels={Array.from({ length: h2ProductionData?.length ?? 0 }, (_, i) => i + 1).map(String)} 
                    backgroundColor='purple' 
                    label='H2 Production'
                    xAxisLabel='Time Period'
                    yAxisLabel='Production (kg)'
                    chartType='line' // or 'bar', 'radar', 'doughnut'
                  />
                ) : (
                  <p>No data available.</p>
                )}
              </div>
            </div>
          </div>
        </section>
        </div>

        <section className="md:flex-1 md:mb-4">
        <div className="p-8 rounded-lg shadow-lg bg-slate-300">
        <LCOHPage lcohData={lcohData} isLoadingLcoh={isLoadingLcoh} />
        <div className="flex justify-center items-center h-full w-full">
        <LineChart 
          data={[lcohData?.installationCostProportion ?? 0, lcohData?.hardwareCostProportion ?? 0]} 
          labels={['Installation Cost Proportion', 'Hardware Cost Proportion']} 
          backgroundColor={['#FF6384', '#36A2EB']} 
          chartType='doughnut' 
          options={{ scales: { x: { display: false }, y: { display: false } } }}
        />
        </div>
        </div>
        </section>
        </div>
      </div>
    );
      
  };
  
  export default HomePage;
