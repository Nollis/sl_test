import React from 'react';
import LoadingSpinner from './LoadingSpinner';


interface LCOHData {
  LCOH: number;
  installationCostProportion: number;
  hardwareCostProportion: number;
}

// Define the Props interface
interface LCOHPageProps {
  lcohData: LCOHData | null;
  isLoadingLcoh: boolean;
}


const LCOHPage: React.FC<LCOHPageProps> = ({ lcohData, isLoadingLcoh }) => {
  return (
    <div className="p-8 rounded-lg shadow-lg bg-white text-black mb-8">
      <h1 className="text-2xl mb-4 text-black">LCOH and Cost Proportions</h1>
      {isLoadingLcoh ? (
        <LoadingSpinner />
      ) : lcohData ? (
        <div>
          <p><span className="font-bold">LCOH:</span> {lcohData.LCOH.toFixed(2)} USD/kg</p>
          <p className="flex items-center">
          <span className="h-4 w-4 bg-[#FF6384] mr-2"></span>
          <span className="font-bold">Installation Cost Proportion:</span> {" "}
            {(lcohData.installationCostProportion * 100).toFixed(2)} %
          </p>
          <p className="flex items-center">
          <span className="h-4 w-4 bg-[#36A2EB] mr-2"></span>
          <span className="font-bold">Hardware Cost Proportion:</span> {" "}
            {(lcohData.hardwareCostProportion * 100).toFixed(2)} %
          </p>
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default LCOHPage;
