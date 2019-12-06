import GameUserData from "../entity/GameUserData";
import GlobalConstant from "./GlobalConstant";

export default class Utils {
    public static getRandomInt(min: number, max: number) : number{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
    }

    static saveGameUserData(userData: GameUserData): GameUserData{
        cc.sys.localStorage.setItem(GlobalConstant.userDataKey, JSON.stringify(userData))
        return userData
    }

    static loadGameUserData(): GameUserData{
        return JSON.parse(cc.sys.localStorage.getItem(GlobalConstant.userDataKey));
    }

}