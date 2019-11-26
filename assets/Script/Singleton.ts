import Game from "./Game";
import SushiCurtain from "./SushiCurtain";
import Conveyor from "./Conveyor";

export default class Singleton {
    public static readonly Instance: Singleton = new Singleton();
    private constructor() {}

    public game: Game = null
    public curtain: SushiCurtain = null
    public conveyor: Conveyor = null
    // public sushiCurtain: string[] = []
}