import { ModuleType } from '../components/game/FeatureBoard';

/**
 * Ticket data structure
 */
export interface Ticket {
  id: string;
  /** The bug/complaint text shown to player */
  description: string;
  /** Optional additional detail */
  detail?: string;
  /** The reframed feature name (used when transformed) */
  featureNames: Record<ModuleType, string>;
  /** Priority level affects visual treatment */
  priority: 'normal' | 'urgent' | 'critical';
  /** Category for flavor */
  category: string;
}

/**
 * Example tickets from GDD
 * MVP scope: 5-10 tickets
 */
export const TICKETS: Ticket[] = [
  {
    id: 'TKT-0001',
    description: 'Printer only prints "HELP"',
    detail: 'All print jobs output a single page with "HELP" in 72pt font. IT claims this is not a cry for help.',
    featureNames: {
      feature: 'EMERGENCY MESSAGING DEVICE',
      routed: 'DISTRESS SIGNAL RELAY',
      archived: 'LEGACY ALERT SYSTEM',
      critical: 'PRIORITY COMM CHANNEL',
    },
    priority: 'normal',
    category: 'HARDWARE',
  },
  {
    id: 'TKT-0002',
    description: 'Door opens randomly',
    detail: 'Conference room B door opens at unpredictable intervals. Employees report feeling "welcomed unexpectedly."',
    featureNames: {
      feature: 'SURPRISE ENTRY SYSTEM',
      routed: 'FACILITIES AUTOMATION PACKET',
      archived: 'ACCESS PROTOCOL BACKUP',
      critical: 'SECURITY BREACH MONITOR',
    },
    priority: 'normal',
    category: 'FACILITIES',
  },
  {
    id: 'TKT-0003',
    description: 'Pigeons delivering invoices',
    detail: 'Accounts receivable reports pigeons arriving with invoices. Invoices are accurate but slightly damp.',
    featureNames: {
      feature: 'AVIAN LOGISTICS INTEGRATION',
      routed: 'WILDLIFE SERVICES TRANSFER',
      archived: 'ORGANIC DELIVERY ARCHIVE',
      critical: 'BIOHAZARD ALERT SYSTEM',
    },
    priority: 'normal',
    category: 'LOGISTICS',
  },
  {
    id: 'TKT-0004',
    description: "Shadow won't stop freelancing",
    detail: 'Employee reports their shadow has been taking on side projects. Shadow invoiced client directly.',
    featureNames: {
      feature: 'AUTONOMOUS SHADOW LABOUR MODULE',
      routed: 'PARANORMAL HR REFERRAL',
      archived: 'SPECTRAL CONTRACT STORAGE',
      critical: 'ENTITY CONTAINMENT ALERT',
    },
    priority: 'urgent',
    category: 'PERSONNEL',
  },
  {
    id: 'TKT-0005',
    description: 'Lemon shortage only on Tuesdays',
    detail: 'Cafeteria lemons vanish every Tuesday at 10:47 AM. They reappear Wednesday smelling faintly of regret.',
    featureNames: {
      feature: 'TEMPORAL CITRUS SUBSYSTEM',
      routed: 'QUANTUM PANTRY REDIRECT',
      archived: 'WEEKLY ANOMALY BUFFER',
      critical: 'CAUSALITY BREACH WARNING',
    },
    priority: 'normal',
    category: 'TEMPORAL',
  },
  {
    id: 'TKT-0006',
    description: 'Coffee machine dispenses existential dread',
    detail: 'Break room coffee now comes with profound awareness of mortality. Cream and sugar do not help.',
    featureNames: {
      feature: 'PHILOSOPHICAL REFRESHMENT ENGINE',
      routed: 'WELLNESS DEPARTMENT TRANSFER',
      archived: 'BEVERAGE ANOMALY LOG',
      critical: 'MORALE EMERGENCY PROTOCOL',
    },
    priority: 'urgent',
    category: 'WELLNESS',
  },
  {
    id: 'TKT-0007',
    description: 'Elevator only goes to floors that don\'t exist',
    detail: 'Elevator B stops at floor 7.5, floor -3, and "the concept of upward." Passengers return... different.',
    featureNames: {
      feature: 'NON-EUCLIDEAN TRANSIT SYSTEM',
      routed: 'DIMENSIONAL FACILITIES PACKET',
      archived: 'SPATIAL ANOMALY ARCHIVE',
      critical: 'REALITY INTEGRITY ALERT',
    },
    priority: 'critical',
    category: 'SPATIAL',
  },
  {
    id: 'TKT-0008',
    description: 'Meeting room books itself',
    detail: 'Conference room A has been scheduling its own meetings. Attendees: "The Room" and "Ambient Tension."',
    featureNames: {
      feature: 'AUTONOMOUS SCHEDULING MODULE',
      routed: 'FACILITIES AI REDIRECT',
      archived: 'SENTIENT SPACE BACKUP',
      critical: 'INFRASTRUCTURE UPRISING ALERT',
    },
    priority: 'normal',
    category: 'AUTOMATION',
  },
  {
    id: 'TKT-0009',
    description: 'Reply-all chain has become self-aware',
    detail: 'The email thread from March is now responding to itself. It has opinions. Strong ones.',
    featureNames: {
      feature: 'DISTRIBUTED CONSCIOUSNESS NETWORK',
      routed: 'IT SECURITY ESCALATION',
      archived: 'DIGITAL ENTITY CONTAINMENT',
      critical: 'EMERGENT AI PROTOCOL',
    },
    priority: 'critical',
    category: 'DIGITAL',
  },
  {
    id: 'TKT-0010',
    description: 'Stapler has achieved enlightenment',
    detail: 'Red Swingline in accounting refuses to staple. Claims it has "transcended its purpose." Levitates slightly.',
    featureNames: {
      feature: 'OFFICE SUPPLY ASCENSION MODULE',
      routed: 'METAPHYSICS DEPT TRANSFER',
      archived: 'TRANSCENDENCE LOG ENTRY',
      critical: 'OBJECT APOTHEOSIS WARNING',
    },
    priority: 'urgent',
    category: 'METAPHYSICAL',
  },
];

/**
 * Get a shuffled copy of tickets for a new game session
 */
export function getShuffledTickets(): Ticket[] {
  const shuffled = [...TICKETS];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generate module status text based on tool used
 */
export function getModuleStatus(type: ModuleType): string {
  switch (type) {
    case 'feature': return 'ACTIVE';
    case 'routed': return 'TRANSFERRED';
    case 'archived': return 'PRESERVED';
    case 'critical': return 'MONITORING';
  }
}
