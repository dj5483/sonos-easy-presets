import { Group } from './group';
import { PLAYERS } from '../player/mock-players';

export const PREDEFINED_GROUPS: Group[] = [
    {
        id: 11,
        name: 'Downstairs',
        players: [
            {player: PLAYERS.find(p => p.name === 'Kitchen'), volume: 15},
            {player: PLAYERS.find(p => p.name === 'Family Room'), volume: 30},
            {player: PLAYERS.find(p => p.name === 'Living Room'), volume: 25}
        ]
    },
    {
        id: 12,
        name: 'Everywhere',
        players: [
            {player: PLAYERS.find(p => p.name === 'Kitchen'), volume: 15},
            {player: PLAYERS.find(p => p.name === 'Family Room'), volume: 30},
            {player: PLAYERS.find(p => p.name === 'Living Room'), volume: 25},
            {player: PLAYERS.find(p => p.name === 'Bedroom'), volume: 25}
        ]
    },
    {
        id: 13,
        name: 'Living Room',
        players: [
            {player: PLAYERS.find(p => p.name === 'Living Room'), volume: 25}
        ]
    },
    {
        id: 14,
        name: 'Kitchen',
        players: [
            {player: PLAYERS.find(p => p.name === 'Kitchen'), volume: 15}
        ]
    },
    {
        id: 15,
        name: 'Ungroup All',
        players: []
    }
  ];
