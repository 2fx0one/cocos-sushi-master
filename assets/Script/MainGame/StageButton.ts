// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import MainGame from "./MainGame";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StageButton extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;


    @property
    text: string = 'hello';

    private mainGame: MainGame = null
    private stageLevel:string = null

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    }

    start() {

    }

    // update (dt) {}
    init(mainGame: MainGame, no) {
        this.mainGame = mainGame
        this.stageLevel = no
        this.label.string = 'day ' + no
    }

    clickStage() {
        console.log(this.stageLevel)
        this.mainGame.clickStage(this.stageLevel)
    }
}
