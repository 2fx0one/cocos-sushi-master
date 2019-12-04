import Food from "./Food";

const {ccclass, property} = cc._decorator;

import Singleton from './Singleton'
import SpriteFrame = cc.SpriteFrame;
import Curtain from "./Curtain";
import CustomerManager from "./CustomerManager";
import SushiMenu from "./SushiMenu";
import SushiChef from "./SushiChef";


@ccclass
export default class GameManager extends cc.Component {


    @property(Curtain)
    curtain: Curtain = null
    
    @property(CustomerManager)
    customerManager: CustomerManager = null
    
    @property(SushiMenu)
    sushiMenu: SushiMenu = null
    
    @property(SushiChef)
    sushichef: SushiChef = null

    onLoad() {
        cc.director.getCollisionManager().enabled = true
        cc.director.getCollisionManager().enabledDebugDraw = true

        Singleton.Instance.game = this


        this.init()
    }

    init() {
        this.curtain.init(2)
        this.sushiMenu.init()
        this.customerManager.init(this.sushiMenu)
    }

    clickFood(food: Food) {
        // 点击食物，首先帘子需要有空位，且帘子卷的动画已经结束才行。
        // console.log('Singleton.Instance.curtain.foodIndex', Singleton.Instance.curtain.foodsAmount())

        if (this.curtain.isCanAddFood()) {
            //从格子里面拿食物 拿成功了 返回food 放到帘子上
            this.curtain.addFood(food.tackFood())
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
        let recipe = this.sushiMenu.getRecipe(foodInCurtain)
        let sushiNode: cc.Node = this.sushichef.makeSushi(recipe);

        Singleton.Instance.conveyor.addSushi(sushiNode)

    }
}
