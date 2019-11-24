// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

import Singleton from './Singleton'
@ccclass
export default class Game extends cc.Component {

    @property(cc.Prefab)
    ricePreFab: cc.Prefab = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        Singleton.Instance.a = '123'
        this.init();

    }

    init() {
        // this.node.height
        this.createFood(265, 260, "1")
        this.createFood(265, 160, "2")
        this.createFood(265, 60, "3")

        this.createFood(165, 260, "4")
        this.createFood(165, 160, "5")
        this.createFood(165, 60, "6")

        this.createFood(65, 260, "7")
        this.createFood(65, 160, "8")
        this.createFood(65, 65, "9")
    }

    createFood(x: number, y: number, name: string) {
        let food = cc.instantiate(this.ricePreFab)

        // food.setPosition(cc.v2(x - this.node.width * 0.5, y - this.node.height * 0.5))
        food.setPosition(this.getPosition(x, y))

        food.getComponent('Food').init(this, name)

        this.node.addChild(food)

        return food;
    }

    getPosition(x: number, y: number) {
        return cc.v2(x, y);
    }

    start() {

    }

    // update (dt) {}
}
