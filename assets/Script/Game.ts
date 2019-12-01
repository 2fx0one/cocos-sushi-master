// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import Food from "./Food";

const { ccclass, property } = cc._decorator;

import Singleton from './Singleton'
import SpriteFrame = cc.SpriteFrame;
import Sushi from "./Sushi";


@ccclass
export default class Game extends cc.Component {


    @property(cc.Prefab)
    foodPreFab: cc.Prefab = null

    // @property(cc.Node)
    // curtain: cc.Node = null

    //拥有的所有食物 放在容器里面
    private foodsInContainMap: { [key: string]: Food } = {}

    //板子上的食物
    // private foodInCurtain: string[] = []
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getCollisionManager().enabled = true
        cc.director.getCollisionManager().enabledDebugDraw = true

        Singleton.Instance.game = this

        let data = [
            { x: 265, y: 260, foodDisPlayName: "rice", foodId: "1" },
            { x: 265, y: 160, foodDisPlayName: "2", foodId: "2" },
            { x: 265, y: 60, foodDisPlayName: "3", foodId: "3" },

            { x: 165, y: 260, foodDisPlayName: "4", foodId: "4" },
            { x: 165, y: 160, foodDisPlayName: "5", foodId: "5" },
            { x: 165, y: 60, foodDisPlayName: "6", foodId: "6" },

            { x: 65, y: 260, foodDisPlayName: "7", foodId: "7" },
            { x: 65, y: 160, foodDisPlayName: "8", foodId: "8" },
            { x: 65, y: 60, foodDisPlayName: "9", foodId: "9" }
        ]


        this.init(data)
    }

    init(data) {

        data.forEach((v, i) => {
            this.foodsInContainMap[v.foodId] = this.createFood(v.x, v.y, v.foodId, v.foodName)
        })
    }

    createFood(x: number, y: number, foodId: string, foodName: string): Food {
        const foodNode = cc.instantiate(this.foodPreFab)
        foodNode.setPosition(this.getPosition(x, y))
        this.node.addChild(foodNode)

        return foodNode.getComponent(Food).init(this, foodId, foodName, 10)
    }

    getPosition(x: number, y: number) {
        return cc.v2(x, y);
    }

    clickFood(foodId: string) {
        // 点击食物，首先帘子需要有空位，且帘子卷的动画已经结束才行。
        // console.log('Singleton.Instance.curtain.foodIndex', Singleton.Instance.curtain.foodsAmount())

        if (Singleton.Instance.curtain.isCanAddFood()) {
            //从格子里面拿食物 拿成功了 返回foodId
            if (foodId == this.foodsInContainMap[foodId].tackFood()) {
                //放到帘子上
                Singleton.Instance.curtain.addFood(foodId)
            }
        }

    }

    backFood() {
        // console.log('game.backFood')
        if (Singleton.Instance.curtain.foodsAmount() > 0) {
            let name = Singleton.Instance.curtain.backFood()
            this.foodsInContainMap[name].backFood()
        }
    }

    sushiScrollCompleted(foodInCurtain: string[]) {
        // console.log('sushi complete food Curtain => ', foods)
        let sushiNode: cc.Node = Singleton.Instance.sushichef.makeSushi(this, foodInCurtain);

        Singleton.Instance.conveyor.addSushi(sushiNode)

        // let sushiNode:cc.Node = sushi.node.parent;
        // sushiNode.setPosition(cc.v2(200, 200))
        // this.node.addChild(sushiNode)
    }
}
