import Game from "./Game";
import Curtain from "./Curtain";
import Conveyor from "./Conveyor";
import SushiChef from "./SushiChef";

export default class Singleton {
    public static readonly Instance: Singleton = new Singleton();
    private constructor() {}

    public game: Game = null
    public curtain: Curtain = null
    public conveyor: Conveyor = null
    public sushichef: SushiChef = null
    // public sushiCurtain: string[] = []
}