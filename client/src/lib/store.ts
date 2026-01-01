import { create } from 'zustand';

export interface Mission {
  id: string;
  title: string;
  partner: string;
  reward: number;
  type: 'pontos' | 'xp';
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
  pointsExpiring: number;
  expiringDate: string;
  
  // Actions
  login: () => void;
  checkIn: () => void;
  completeMission: (id: string) => void;
  claimReward: (id: string) => void;
  placeBet: (marketId: string, optionId: string, amount: number) => void;
}

// Mock Data
const INITIAL_MISSIONS: Mission[] = [
  { id: '1', title: 'Ouça "Neon Nights"', partner: 'MusicPlayce', reward: 50, type: 'pontos', status: 'pending', description: 'Ouça o novo hit no MusicPlayce.' },
  { id: '2', title: 'Conectar Carteira', partner: 'Rhapsody', reward: 100, type: 'xp', status: 'pending', description: 'Vincule sua carteira Web3 ao seu perfil.' },
  { id: '3', title: 'Enquete Diária', partner: 'Rhapsody', reward: 20, type: 'pontos', status: 'pending', description: 'Vote na enquete diária da comunidade.' },
  { id: '4', title: 'Compartilhe sua previsão', partner: 'Rhapsody', reward: 10, type: 'xp', status: 'pending', description: 'Compartilhe sua previsão no X/Twitter.' },
];

const INITIAL_MARKETS: PredictionMarket[] = [
  { 
    id: 'm1', 
    title: 'Top Artista da Semana', 
    category: 'Música', 
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
    title: 'Vencedor de Melhor Filme 2026', 
    category: 'Entretenimento', 
    status: 'open', 
    pool: 50000,
    options: [
      { id: 'o1', label: 'Oppenheimer II', odds: 1.8 },
      { id: 'o2', label: 'Barbie Returns', odds: 2.5 }
    ]
  },
  { 
    id: 'm3', 
    title: 'Próxima ATH do Bitcoin', 
    category: 'Crypto', 
    status: 'open', 
    pool: 120000,
    options: [
      { id: 'o1', label: 'Antes do Q3', odds: 2.2 },
      { id: 'o2', label: 'Depois do Q3', odds: 1.6 }
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
  pointsExpiring: 150,
  expiringDate: '30/06/2026',

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
      points: state.points + (mission.type === 'pontos' ? mission.reward : 0),
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
