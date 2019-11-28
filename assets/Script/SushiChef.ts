import Singleton from "./Singleton";

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

@ccclass
export default class SushiChef extends cc.Component {


    private recipes: {[key: string]: string} = {
        "1_1_2": "112普通寿司"
    }

    onLoad() {
        Singleton.Instance.sushichef = this
    }

    makeSushi(foodInCurtain: string[]) {
        const foods = foodInCurtain.sort()
        console.log(this.recipes[foods.join('_')])
    }

}
