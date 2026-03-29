import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ArrowDown, 
  CheckCircle2, 
  XCircle, 
  Info, 
  FileText, 
  Settings, 
  User, 
  Building2, 
  CreditCard,
  ArrowRight
} from 'lucide-react';
import { SCENARIOS, ROLES } from './constants';
import { FlowScenario, FlowStep } from './types';

export default function App() {
  const [activeScenarioId, setActiveScenarioId] = useState(SCENARIOS[0].id);
  const [selectedStep, setSelectedStep] = useState<FlowStep | null>(null);

  const activeScenario = SCENARIOS.find(s => s.id === activeScenarioId)!;

  // Group steps by role for visualization
  const rolesInScenario = Array.from(new Set(activeScenario.steps.map(s => s.role)));

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-bottom border-line px-8 py-6 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink flex items-center gap-2">
            <Building2 className="text-accent" />
            Sistem Alur Pencairan SPJ
          </h1>
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mt-1">
            Kementerian Keuangan RI
          </p>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-xl">
          {SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => {
                setActiveScenarioId(scenario.id);
                setSelectedStep(null);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeScenarioId === scenario.id 
                  ? 'bg-white text-accent shadow-sm' 
                  : 'text-gray-500 hover:text-ink'
              }`}
            >
              {scenario.title}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 p-8 overflow-x-auto">
        <div className="max-w-7xl mx-auto">
          {/* Legend / Title */}
          <div className="mb-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={activeScenarioId}
            >
              <h2 className="text-4xl font-black text-ink uppercase mb-2">
                {activeScenario.subtitle}
              </h2>
              <div className="inline-block px-6 py-2 bg-accent text-white font-bold rounded-full text-lg">
                {activeScenario.title}
              </div>
            </motion.div>
          </div>

          {/* Flow Container */}
          <div className="relative">
            {/* Role Headers */}
            <div className="grid grid-cols-5 gap-0 border-b border-line mb-8">
              {['Subject Matter (SM)', 'Bendahara / Operator', 'PPK', 'PPSPM', 'KPPN'].map((role, idx) => (
                <div key={idx} className="p-4 text-center border-r border-line last:border-r-0">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    {role}
                  </span>
                </div>
              ))}
            </div>

            {/* Flow Steps Rendering */}
            <div className="grid grid-cols-5 gap-0 min-h-[600px] relative">
              {/* Vertical Lines */}
              <div className="absolute inset-0 grid grid-cols-5 pointer-events-none">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="border-r border-line h-full last:border-r-0" />
                ))}
              </div>

              {/* Steps */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeScenarioId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-5 relative"
                >
                  {activeScenario.steps.map((step, index) => {
                    const roleIndex = getRoleIndex(step.role);
                    return (
                      <div 
                        key={step.id}
                        className="absolute w-1/5 flex justify-center"
                        style={{ 
                          top: `${index * 80}px`, 
                          left: `${roleIndex * 20}%`,
                          zIndex: 10
                        }}
                      >
                        <StepCard 
                          step={step} 
                          isActive={selectedStep?.id === step.id}
                          onClick={() => setSelectedStep(step)}
                        />
                        
                        {/* Connection Arrows */}
                        {step.next && step.next.length > 0 && (
                          <div className="absolute top-full h-[40px] flex flex-col items-center justify-center pointer-events-none">
                            {step.next.map(nextId => {
                              const nextStep = activeScenario.steps.find(s => s.id === nextId);
                              if (!nextStep) return null;
                              
                              const nextRoleIndex = getRoleIndex(nextStep.role);
                              const isHorizontal = nextRoleIndex !== roleIndex;
                              
                              if (isHorizontal) {
                                return (
                                  <div 
                                    key={nextId}
                                    className="absolute top-[-20px] h-[2px] bg-accent/30"
                                    style={{
                                      width: `${Math.abs(nextRoleIndex - roleIndex) * 20}vw`,
                                      left: nextRoleIndex > roleIndex ? '50%' : 'auto',
                                      right: nextRoleIndex < roleIndex ? '50%' : 'auto',
                                    }}
                                  >
                                    <div className={`absolute top-[-4px] ${nextRoleIndex > roleIndex ? 'right-0' : 'left-0'}`}>
                                      <ArrowRight className={`w-3 h-3 text-accent/50 ${nextRoleIndex < roleIndex ? 'rotate-180' : ''}`} />
                                    </div>
                                  </div>
                                );
                              }
                              
                              return <ArrowDown key={nextId} className="text-accent/30 w-4 h-4 mt-2" />;
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      {/* Detail Sidebar / Modal */}
      <AnimatePresence>
        {selectedStep && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-[100] border-l border-line p-8"
          >
            <button 
              onClick={() => setSelectedStep(null)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <XCircle className="text-gray-400" />
            </button>

            <div className="mt-8">
              <div className="flex items-center gap-2 text-accent mb-4">
                <Info size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">Detail Langkah</span>
              </div>
              
              <h3 className="text-2xl font-bold text-ink mb-2">{selectedStep.label}</h3>
              <div className="inline-block px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-600 mb-6">
                Role: {selectedStep.role}
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <h4 className="text-sm font-bold text-orange-800 mb-2 flex items-center gap-2">
                    <FileText size={16} />
                    Deskripsi Proses
                  </h4>
                  <p className="text-sm text-orange-700 leading-relaxed">
                    Langkah ini merupakan bagian krusial dalam alur pencairan SPJ. 
                    {selectedStep.role} bertanggung jawab untuk memastikan data yang diinput 
                    sesuai dengan dokumen fisik yang ada.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Dokumen Terkait</h4>
                  <div className="flex items-center gap-3 p-3 border border-line rounded-lg hover:border-accent transition-colors cursor-pointer group">
                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-orange-50">
                      <FileText size={18} className="text-gray-400 group-hover:text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">Formulir {selectedStep.label}</p>
                      <p className="text-xs text-gray-500">PDF • 2.4 MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-ink text-white/50 p-6 text-center text-xs tracking-widest uppercase font-medium">
        &copy; 2026 Direktorat Jenderal Perbendaharaan • All Rights Reserved
      </footer>
    </div>
  );
}

function StepCard({ step, isActive, onClick }: { step: FlowStep; isActive: boolean; onClick: () => void }) {
  const getIcon = () => {
    switch (step.type) {
      case 'start': return <FileText size={16} />;
      case 'decision': return <Settings size={16} />;
      case 'end': return <CheckCircle2 size={16} />;
      default: return <ChevronRight size={16} />;
    }
  };

  const baseClasses = "relative px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer flex items-center gap-3 shadow-sm border-2";
  const activeClasses = isActive 
    ? "bg-accent text-white border-accent scale-105 shadow-lg" 
    : "bg-white text-ink border-line hover:border-accent/50 hover:shadow-md";

  const shapeClasses = step.type === 'decision' 
    ? "rounded-none rotate-45" 
    : step.type === 'start' || step.type === 'end'
    ? "rounded-full px-6"
    : "rounded-xl";

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${baseClasses} ${activeClasses} ${shapeClasses}`}
    >
      <div className={step.type === 'decision' ? '-rotate-45' : ''}>
        {getIcon()}
      </div>
      <span className={step.type === 'decision' ? '-rotate-45' : ''}>
        {step.label}
      </span>
    </motion.div>
  );
}

function getRoleIndex(role: string): number {
  if (role.includes('SM')) return 0;
  if (role.includes('Bendahara') || role.includes('Operator')) return 1;
  if (role.includes('PPK')) return 2;
  if (role.includes('PPSPM')) return 3;
  if (role.includes('KPPN')) return 4;
  return 0;
}

