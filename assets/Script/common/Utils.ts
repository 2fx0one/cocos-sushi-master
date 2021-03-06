import GameUserSaveData from "../entity/GameUserSaveData";
import GlobalConstant from "./GlobalConstant";

export default class Utils {
    public static getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
    }

    static saveGameUserData(userData: GameUserSaveData): GameUserSaveData {
        cc.sys.localStorage.setItem(GlobalConstant.userDataKey, JSON.stringify(userData))
        return userData
    }

    static loadGameUserData(): GameUserSaveData {
        return JSON.parse(cc.sys.localStorage.getItem(GlobalConstant.userDataKey));
    }

    static loadResImage(path: string, cb: (err, spriteFrame: cc.SpriteFrame) => void) {
        cc.loader.loadRes(path, cc.SpriteFrame, (err, spriteFrame: cc.SpriteFrame) => {
            try {
                cb(err, spriteFrame)
            }catch (e) {
                console.error('loadResImage', e)
            }
        })
    }
}