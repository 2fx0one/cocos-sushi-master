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
import FoodContainer from "./FoodContainer";
import Curtain from "./Curtain";


@ccclass
export default class Game extends cc.Component {


    // @property(cc.Prefab)
    // foodPreFab: cc.Prefab = null


    // @property([cc.Node])
    // foodContain: cc.Node[] = []

    // @property(cc.Node)
    // foodContainer: cc.Node = null

    // @property(cc.Node)
    // curtain: cc.Node = null

    //拥有的所有食物 放在容器里面
    // private foodsInContainMap: { [key: string]: Food } = {}

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
        // console.log(this.foodContainer.children)
        // this.foodContainer.children.forEach((v, i)=> {
        //     console.log(v.name)
        // })

        this.init()
    }


    init() {


    }

    clickFood(food: Food) {
        // 点击食物，首先帘子需要有空位，且帘子卷的动画已经结束才行。
        // console.log('Singleton.Instance.curtain.foodIndex', Singleton.Instance.curtain.foodsAmount())

        if (Singleton.Instance.curtain.isCanAddFood()) {
            //从格子里面拿食物 拿成功了 返回food 放到帘子上
            Singleton.Instance.curtain.addFood(food.tackFood())
        }
    }

    backFood(food: Food) {
        if (food) {
            food.backFood()
        }
        // console.log('game.backFood')
        // if (Singleton.Instance.curtain.foodsAmount() > 0) {
            // Singleton.Instance.curtain.backFood().backFood()
        // }
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
