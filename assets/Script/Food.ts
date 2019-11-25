// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import Game from "./Game";

@ccclass
export default class Food extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;



    // @property
    // text: string = 'hello';

    private game: Game = null
    public typeName: string = ''
    private amount: number = 9
    // LIFE-CYCLE CALLBACKS:

    public init(game: Game, typeName: string, amount: number){
        this.game = game
        this.typeName = typeName
        this.amount = amount
        this.label.string = '' + this.amount
    }

    onclick(event, data) {
        console.log(this.typeName)
        // console.log(this.game)
        // console.log(event)
        console.log(data)
        this.game.clickFood(this)


    }

    // onLoad () {

    // }

    // start () {

    // }

    // update (dt) {}
}
