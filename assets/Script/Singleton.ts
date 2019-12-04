import GameManager from "./GameManager";
import Curtain from "./Curtain";
import Conveyor from "./Conveyor";
import SushiChef from "./SushiChef";
import FoodContainer from "./FoodContainer";
import SushiMenu from "./SushiMenu";

export default class Singleton {
    public static readonly Instance: Singleton = new Singleton();
    private constructor() {}

    public game: GameManager = null
    public foodContainer: FoodContainer = null
    // public curtain: Curtain = null
    public conveyor: Conveyor = null
    // public sushichef: SushiChef = null
    // public sushiMenu: SushiMenu = null
    // public sushiCurtain: string[] = []
}