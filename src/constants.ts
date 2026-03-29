import { FlowScenario } from './types';

export const SCENARIOS: FlowScenario[] = [
  {
    id: 'gup-tup',
    title: 'GUP / TUP',
    subtitle: 'Alur Proses Pencairan SPJ',
    steps: [
      { id: 'start', label: 'Dokumen SPJ UP/TUP', role: 'Subject Matter (SM)', type: 'start', next: ['input-spby'] },
      { id: 'input-spby', label: 'Input SPBY', role: 'Bendahara', type: 'process', next: ['validasi-spby'] },
      { id: 'validasi-spby', label: 'Validasi SPBY', role: 'Bendahara', type: 'process', next: ['input-spp'] },
      { id: 'input-spp', label: 'Input SPP', role: 'Bendahara', type: 'process', next: ['cetak-spp'] },
      { id: 'cetak-spp', label: 'Cetak SPP', role: 'Bendahara', type: 'process', next: ['upload-pendukung'] },
      { id: 'upload-pendukung', label: 'Upload dokumen pendukung', role: 'Bendahara', type: 'process', next: ['approval-spp'] },
      { id: 'approval-spp', label: 'Approval & Validasi SPP', role: 'PPK', type: 'process', next: ['adk-spp'] },
      { id: 'adk-spp', label: 'ADK SPP', role: 'PPK', type: 'process', next: ['cetak-spm'] },
      { id: 'cetak-spm', label: 'Cetak SPM', role: 'PPSPM', type: 'process', next: ['approval-spm'] },
      { id: 'approval-spm', label: 'Approval & Validasi SPM', role: 'PPSPM', type: 'process', next: ['adk-spm'] },
      { id: 'adk-spm', label: 'ADK SPM', role: 'PPSPM', type: 'process', next: ['proses-kppn'] },
      { id: 'proses-kppn', label: 'Proses KPPN', role: 'KPPN', type: 'process', next: ['decision-kppn'] },
      { id: 'decision-kppn', label: 'Keputusan KPPN', role: 'KPPN', type: 'decision', next: ['terbit-sp2d', 'adk-spm'] },
      { id: 'terbit-sp2d', label: 'Terbit SP2D', role: 'KPPN', type: 'process', next: ['dana-cair'] },
      { id: 'dana-cair', label: 'Dana cair ke rekening bendahara', role: 'Bendahara', type: 'end' },
    ]
  },
  {
    id: 'ls-bendahara',
    title: 'LS BENDAHARA',
    subtitle: 'Alur Proses Pencairan SPJ',
    steps: [
      { id: 'start', label: 'Dokumen SPJ', role: 'Subject Matter (SM)', type: 'start', next: ['input-spp'] },
      { id: 'input-spp', label: 'Input SPP', role: 'Operator Anggaran', type: 'process', next: ['cetak-spp'] },
      { id: 'cetak-spp', label: 'Cetak SPP', role: 'Operator Anggaran', type: 'process', next: ['approval-spp'] },
      { id: 'approval-spp', label: 'Approval & Validasi SPP', role: 'PPK', type: 'process', next: ['adk-spp'] },
      { id: 'adk-spp', label: 'ADK SPP', role: 'PPK', type: 'process', next: ['upload-pendukung'] },
      { id: 'upload-pendukung', label: 'Upload dokumen pendukung', role: 'Operator Anggaran', type: 'process', next: ['cetak-spm'] },
      { id: 'cetak-spm', label: 'Cetak SPM', role: 'PPSPM', type: 'process', next: ['approval-spm'] },
      { id: 'approval-spm', label: 'Approval & Validasi SPM', role: 'PPSPM', type: 'process', next: ['adk-spm'] },
      { id: 'adk-spm', label: 'ADK SPM', role: 'PPSPM', type: 'process', next: ['proses-kppn'] },
      { id: 'proses-kppn', label: 'Proses KPPN', role: 'KPPN', type: 'process', next: ['decision-kppn'] },
      { id: 'decision-kppn', label: 'Keputusan KPPN', role: 'KPPN', type: 'decision', next: ['terbit-sp2d', 'adk-spm'] },
      { id: 'terbit-sp2d', label: 'Terbit SP2D', role: 'KPPN', type: 'process', next: ['dana-cair-bendahara'] },
      { id: 'dana-cair-bendahara', label: 'Dana cair ke rekening bendahara', role: 'Operator Anggaran', type: 'process', next: ['cms-penerima'] },
      { id: 'cms-penerima', label: 'CMS ke penerima', role: 'Operator Anggaran', type: 'end' },
      { id: 'dana-cair-final', label: 'Dana cair', role: 'Subject Matter (SM)', type: 'end' },
    ]
  },
  {
    id: 'ls-pihak-ketiga',
    title: 'LS PIHAK KETIGA',
    subtitle: 'Alur Proses Pencairan SPJ',
    steps: [
      { id: 'start', label: 'Dokumen SPJ', role: 'Subject Matter (SM)', type: 'start', next: ['input-spp'] },
      { id: 'input-spp', label: 'Input SPP', role: 'Operator Anggaran', type: 'process', next: ['cetak-spp'] },
      { id: 'cetak-spp', label: 'Cetak SPP', role: 'Operator Anggaran', type: 'process', next: ['approval-spp'] },
      { id: 'approval-spp', label: 'Approval & Validasi SPP', role: 'PPK', type: 'process', next: ['adk-spp'] },
      { id: 'adk-spp', label: 'ADK SPP', role: 'PPK', type: 'process', next: ['upload-pendukung'] },
      { id: 'upload-pendukung', label: 'Upload dokumen pendukung', role: 'Operator Anggaran', type: 'process', next: ['cetak-spm'] },
      { id: 'cetak-spm', label: 'Cetak SPM', role: 'PPSPM', type: 'process', next: ['approval-spm'] },
      { id: 'approval-spm', label: 'Approval & Validasi SPM', role: 'PPSPM', type: 'process', next: ['adk-spm'] },
      { id: 'adk-spm', label: 'ADK SPM', role: 'PPSPM', type: 'process', next: ['proses-kppn'] },
      { id: 'proses-kppn', label: 'Proses KPPN', role: 'KPPN', type: 'process', next: ['decision-kppn'] },
      { id: 'decision-kppn', label: 'Keputusan KPPN', role: 'KPPN', type: 'decision', next: ['terbit-sp2d', 'adk-spm'] },
      { id: 'terbit-sp2d', label: 'Terbit SP2D', role: 'KPPN', type: 'process', next: ['catat-sp2d'] },
      { id: 'catat-sp2d', label: 'Catat SP2D', role: 'Operator Anggaran', type: 'process', next: ['informasi-dana-cair'] },
      { id: 'informasi-dana-cair', label: 'Informasi dana cair', role: 'Subject Matter (SM)', type: 'end' },
    ]
  }
];

export const ROLES: { name: string; color: string }[] = [
  { name: 'Subject Matter (SM)', color: 'bg-orange-50' },
  { name: 'Bendahara', color: 'bg-orange-100' },
  { name: 'Operator Anggaran', color: 'bg-orange-100' },
  { name: 'PPK', color: 'bg-orange-50' },
  { name: 'PPSPM', color: 'bg-orange-100' },
  { name: 'KPPN', color: 'bg-orange-50' },
];
