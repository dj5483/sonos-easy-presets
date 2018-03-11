import { Player } from '../player/player';

export class Group {
    id: number;
    name: string;
    players: {player: Player, volume: number}[];
}
