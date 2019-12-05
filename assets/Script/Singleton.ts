import GameManager from "./GameManager";
import Utils from "./Utils";

export default class Singleton {
    public static readonly Instance: Singleton = new Singleton();
    private constructor() {}

    public game: GameManager = null
    public utils: Utils = new Utils()



}