// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import Game from "./Game";
import Singleton from "./Singleton";

const {ccclass, property} = cc._decorator;


@ccclass
export default class Food extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;



    // @property
    // text: string = 'hello';

    private game: Game = null
    private typeName: string = ''
    // LIFE-CYCLE CALLBACKS:

    public init(game: Game, typeName: string){
        this.game = game
        this.typeName = typeName
    }

    onclick(event, data) {
        console.log(this.typeName)
        console.log(this.game)
        console.log(event)
        console.log(data)
        console.log(Singleton.Instance.a)

    }

    // onLoad () {

    // }

    // start () {

    // }

    // update (dt) {}
}
