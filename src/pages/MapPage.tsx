import React, { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { SindhMap } from '../components/map/SindhMap';
import { ResultPanel } from '../components/map/ResultPanel';
import { ExportCertificateModal } from '../components/common/ExportCertificateModal';

export const MapPage: React.FC = () => {
  const { setResultPanelOpen, selectedCoords } = useAppStore();

  useEffect(() => {
    // Only open result panel if a location has already been selected by the user
    if (selectedCoords) {
      setResultPanelOpen(true);
    } else {
      setResultPanelOpen(false);
    }
  }, [selectedCoords, setResultPanelOpen]);

  return (
    <main className="relative w-full h-[calc(100dvh-3.5rem)] sm:h-[calc(100dvh-3.75rem)] bg-[#020B18] overflow-hidden">
      {/* 1. Full Screen Interactive Map Engine */}
      <SindhMap />

      {/* 2. Glassmorphism Result Side Panel / Mobile Bottom Sheet */}
      <ResultPanel />

      {/* 3. Printable / Downloadable Water Intelligence Report Modal */}
      <ExportCertificateModal />
    </main>
  );
};
