// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Utils from "../common/Utils";
import GameUserSaveData from "../entity/GameUserSaveData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    private userData: GameUserSaveData = null;

    onLoad () {
        this.userData = Utils.loadGameUserData()
    }

    // start () {
    //
    // }

    // update (dt) {}

    exitGame() {
        cc.director.loadScene('main')
    }

    //下一关
    nextStageGame() {
        console.log(this.userData)
        this.userData.selectLevel = Number(this.userData.selectLevel) + 1
        Utils.saveGameUserData(this.userData)
        cc.director.loadScene('restaurant')
    }
}
