import Food from "./Food";

const {ccclass, property} = cc._decorator;

import Singleton from './Singleton'
import Curtain from "./Curtain";
import CustomerManager from "./CustomerManager";
import SushiMenu from "./SushiMenu";
import SushiChef from "./SushiChef";
import Conveyor from "./Conveyor";
import FoodContainer from "./FoodContainer";
import Sushi from "./Sushi";
import Customer from "./Customer";
import Recipe from "./Recipe";


@ccclass
export default class GameManager extends cc.Component {


    @property(Curtain)
    curtain: Curtain = null

    //顾客管理员
    @property(CustomerManager)
    customerManager: CustomerManager = null

    //菜单
    @property(SushiMenu)
    sushiMenu: SushiMenu = null

    //主厨
    @property(SushiChef)
    sushichef: SushiChef = null

    // 传送带
    @property(Conveyor)
    conveyor: Conveyor = null

    @property(FoodContainer)
    foodContainer: FoodContainer = null

    onLoad() {
        cc.director.getCollisionManager().enabled = true
        cc.director.getCollisionManager().enabledDebugDraw = true

        Singleton.Instance.game = this

        this.init()
    }

    init() {
        this.scheduleOnce(()=>{
            this.foodContainer.init()
            this.curtain.init(2)
            this.sushiMenu.init()
            this.customerManager.init()
        }, 0.5)
        this.scheduleOnce(()=>{
            console.log('close shop')
        }, 10)
    }

    foodContainerTakeFood(food: Food) {
        // 点击食物，首先帘子需要有空位，且帘子卷的动画已经结束才行。
        // console.log('Singleton.Instance.curtain.foodIndex', Singleton.Instance.curtain.foodsAmount())

        if (this.curtain.isCanAddFood()) {
            //从格子里面拿食物 拿成功了 返回food 放到帘子上
            this.curtain.addFood(food.tackFood())
        }
    }

    curtainBackFood(food: Food) {
            this.foodContainer.backFood(food)
    }

    curtainScrollCompleted(foodInCurtain: string[]) {
        // console.log('sushi complete food Curtain => ', foods)
        let recipe = this.sushiMenu.getRecipe(foodInCurtain)
        let sushi: Sushi = this.sushichef.createSushi(recipe);
        this.conveyor.addSushi(sushi)
    }

    CusmtomerManagerGetRandomRecipe(): Recipe {
        return this.sushiMenu.getRandomRecipe();
    }
    customerFinished(customer: Customer) {
        let x = customer.node.x
        let y = customer.node.y
        this.scheduleOnce(()=>{
            this.customerManager.createCustomer(x, y)
        }, 1)
        // customer.node.destroy()
    }


}
