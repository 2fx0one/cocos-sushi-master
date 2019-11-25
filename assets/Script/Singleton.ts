import Game from "./Game";

export default class Singleton {
    public static readonly Instance: Singleton = new Singleton();
    private constructor() {}

    public game: Game = null
    // public sushiCurtain: string[] = []
}