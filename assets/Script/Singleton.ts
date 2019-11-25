import Game from "./Game";
import SushiCurtain from "./SushiCurtain";

export default class Singleton {
    public static readonly Instance: Singleton = new Singleton();
    private constructor() {}

    public game: Game = null
    public curtain: SushiCurtain = null
    // public sushiCurtain: string[] = []
}