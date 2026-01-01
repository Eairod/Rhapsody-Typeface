import { create } from 'zustand';

export interface Mission {
  id: string;
  title: string;
  partner: string;
  reward: number;
  type: 'points' | 'xp';
  status: 'pending' | 'completed' | 'claimed';
  description: string;
}

export interface PredictionMarket {
  id: string;
  title: string;
  category: string;
  status: 'open' | 'closed' | 'resolved';
  pool: number;
  options: { id: string; label: string; odds: number }[];
}

export interface UserState {
  isAuthenticated: boolean;
  points: number;
  xp: number;
  streak: number;
  lastCheckIn: string | null;
  missions: Mission[];
  markets: PredictionMarket[];
  
  // Actions
  login: () => void;
  checkIn: () => void;
  completeMission: (id: string) => void;
  claimReward: (id: string) => void;
  placeBet: (marketId: string, optionId: string, amount: number) => void;
}

// Mock Data
const INITIAL_MISSIONS: Mission[] = [
  { id: '1', title: 'Listen to "Neon Nights"', partner: 'MusicPlayce', reward: 50, type: 'points', status: 'pending', description: 'Stream the new hit single on MusicPlayce.' },
  { id: '2', title: 'Connect Wallet', partner: 'Rhapsody', reward: 100, type: 'xp', status: 'pending', description: 'Link your Web3 wallet to your profile.' },
  { id: '3', title: 'Daily Poll', partner: 'Rhapsody', reward: 20, type: 'points', status: 'pending', description: 'Vote in the daily community poll.' },
  { id: '4', title: 'Share your prediction', partner: 'Rhapsody', reward: 10, type: 'xp', status: 'pending', description: 'Share your prediction on X/Twitter.' },
];

const INITIAL_MARKETS: PredictionMarket[] = [
  { 
    id: 'm1', 
    title: 'Top Artist of the Week', 
    category: 'Music', 
    status: 'open', 
    pool: 15000,
    options: [
      { id: 'o1', label: 'Taylor Swift', odds: 1.5 },
      { id: 'o2', label: 'The Weeknd', odds: 2.1 },
      { id: 'o3', label: 'Drake', odds: 3.0 }
    ]
  },
  { 
    id: 'm2', 
    title: 'Best Picture Winner 2026', 
    category: 'Entertainment', 
    status: 'open', 
    pool: 50000,
    options: [
      { id: 'o1', label: 'Oppenheimer II', odds: 1.8 },
      { id: 'o2', label: 'Barbie Returns', odds: 2.5 }
    ]
  },
  { 
    id: 'm3', 
    title: 'Next Bitcoin ATH', 
    category: 'Crypto', 
    status: 'open', 
    pool: 120000,
    options: [
      { id: 'o1', label: 'Before Q3', odds: 2.2 },
      { id: 'o2', label: 'After Q3', odds: 1.6 }
    ]
  }
];

export const useStore = create<UserState>((set) => ({
  isAuthenticated: false,
  points: 1250,
  xp: 450,
  streak: 3,
  lastCheckIn: null, 
  missions: INITIAL_MISSIONS,
  markets: INITIAL_MARKETS,

  login: () => set({ isAuthenticated: true }),

  checkIn: () => set((state) => {
    if (state.lastCheckIn === new Date().toDateString()) return state;
    return {
      points: state.points + 50,
      streak: state.streak + 1,
      lastCheckIn: new Date().toDateString()
    };
  }),

  completeMission: (id) => set((state) => ({
    missions: state.missions.map(m => 
      m.id === id ? { ...m, status: 'completed' } : m
    )
  })),

  claimReward: (id) => set((state) => {
    const mission = state.missions.find(m => m.id === id);
    if (!mission || mission.status !== 'completed') return state;
    
    return {
      points: state.points + (mission.type === 'points' ? mission.reward : 0),
      xp: state.xp + (mission.type === 'xp' ? mission.reward : 0),
      missions: state.missions.map(m => 
        m.id === id ? { ...m, status: 'claimed' } : m
      )
    };
  }),

  placeBet: (marketId, optionId, amount) => set((state) => ({
    points: state.points - amount,
  }))
}));
