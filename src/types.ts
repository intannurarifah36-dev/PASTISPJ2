export type Role = 'Subject Matter (SM)' | 'Bendahara' | 'Operator Anggaran' | 'PPK' | 'PPSPM' | 'KPPN';

export interface FlowStep {
  id: string;
  label: string;
  role: Role;
  type: 'process' | 'decision' | 'start' | 'end';
  next?: string[];
  description?: string;
}

export interface FlowScenario {
  id: string;
  title: string;
  subtitle: string;
  steps: FlowStep[];
}
