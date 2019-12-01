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

    
    @property([cc.Node])
    foodContain: cc.Node[] = []

    @property(cc.Node)
    foodContainer: cc.Node = null

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

        // this.foodContainer.getChildByName
        // console.log(this.foodContainer.getChildByName('0').y)

        let data = [
            { x: 450, y: 250, foodDisPlayName: "1", foodId: "13" },
            { x: 350, y: 250, foodDisPlayName: "1", foodId: "1" },
            { x: 350, y: 150, foodDisPlayName: "2", foodId: "2" },
            { x: 350, y: 50, foodDisPlayName: "3", foodId: "3" },

            { x: 250, y: 250, foodDisPlayName: "1", foodId: "4" },
            { x: 250, y: 150, foodDisPlayName: "2", foodId: "5" },
            { x: 250, y: 50, foodDisPlayName: "3", foodId: "6" },

            { x: 150, y: 250, foodDisPlayName: "4", foodId: "7" },
            { x: 150, y: 150, foodDisPlayName: "5", foodId: "8" },
            { x: 150, y: 50, foodDisPlayName: "6", foodId: "9" },

            { x: 50, y: 250, foodDisPlayName: "7", foodId: "10" },
            { x: 50, y: 150, foodDisPlayName: "8", foodId: '11' },
            { x: 50, y: 50, foodDisPlayName: "9", foodId: "12" }
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
        this.foodContainer.addChild(foodNode)

        return foodNode.getComponent(Food).init(this, foodId, foodName, 10)
    }

    getPosition(x: number, y: number) {
        return cc.v2(x, y);
    }

    clickFood(food: Food) {
        // 点击食物，首先帘子需要有空位，且帘子卷的动画已经结束才行。
        // console.log('Singleton.Instance.curtain.foodIndex', Singleton.Instance.curtain.foodsAmount())

        if (Singleton.Instance.curtain.isCanAddFood()) {
            //从格子里面拿食物 拿成功了 返回foodId
            if (food.foodId == food.tackFood()) {
                //放到帘子上
                Singleton.Instance.curtain.addFood(food.foodId)
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
