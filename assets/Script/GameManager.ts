import Food from "./Food";

const {ccclass, property} = cc._decorator;

import Singleton from './Singleton'
import CustomerManager from "./CustomerManager";
import SushiMenu from "./SushiMenu";
import SushiChef from "./SushiChef";
import FoodContainer from "./FoodContainer";
import Sushi from "./Sushi";
import Customer from "./Customer";
import RecipeData from "./entity/RecipeData";
import FoodData from "./entity/FoodData";
import DeliveryManager from "./DeliveryManager";
import Utils from "./common/Utils";
import DeliveryFood from "./DeliveryFood";
import GameUserData from "./entity/GameUserData";
import GlobalConstant from "./common/GlobalConstant";
import SushiCurtain from "./SushiCurtain";
import SushiConveyor from "./SushiConveyor";


@ccclass
export default class GameManager extends cc.Component {

    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null

    @property(SushiCurtain)
    curtain: SushiCurtain = null

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
    @property(SushiConveyor)
    conveyor: SushiConveyor = null

    @property(FoodContainer)
    foodContainer: FoodContainer = null

    @property(DeliveryManager)
    deliveryManager: DeliveryManager = null

    public restaurantOpen: boolean = true

    private userData: GameUserData = null

    private closedCountSecond = 300 //倒计时300秒
    onLoad() {
        cc.director.getCollisionManager().enabled = true
        // cc.director.getCollisionManager().enabledDebugDraw = true

        Singleton.Instance.game = this

        this.userData = new GameUserData()
        // Utils.loadGameUserData()

        this.init()
    }

    init() {
        let foodDataList: FoodData[] = [


            new FoodData(350, 250, "饭", '1', '1', 10, 10),
            new FoodData(350, 150, "海苔", '2', '2', 10, 10),
            new FoodData(350, 50, "鲑鱼子", '3', '3', 10, 10),

            new FoodData(250, 250, "鲑鱼", '4', '4', 10, 10),
            new FoodData(250, 150, "5", '5', '5', 10, 10),
            new FoodData(250, 50, "黄瓜", '6', '6', 10, 10),

            new FoodData(150, 250, "扁口鱼", '7', '7', 10, 10),
            new FoodData(150, 150, "8", '8', '8', 10, 10),
            new FoodData(150, 50, "章鱼", '9', '9', 10, 10),

            new FoodData(50, 250, "10", '10', '10', 10, 10),
            new FoodData(50, 150, "11", '11', '11', 10, 10),
            new FoodData(50, 50, "12", '12', '12', 10, 10),
            new FoodData(450, 250, "虾", "13", '13', 10, 10),
            new FoodData(450, 150, "蟹棒", "14", '14', 10, 10),
            new FoodData(450, 50, "玉子", "15", '15', 10, 10),
        ]

        this.scheduleOnce(() => {
            this.foodContainer.init(foodDataList)
            this.curtain.init(2)
            this.sushiMenu.init()
            this.customerManager.init()
            this.conveyor.init(2)
            this.deliveryManager.init(this.foodContainer.foodsInContainMap)
            this.restaurantOpening()
        }, 1)

    }

    restaurantOpening() {
        let closedCount = 0
        let progressInterval = 1 / this.closedCountSecond
        let callback = () => {
            console.log('tik tak')
            if (closedCount == this.closedCountSecond) {
                this.unschedule(callback)
                this.restaurantClosed()
            }
            this.progressBar.progress += progressInterval
            closedCount++
        }
        this.schedule(callback, 1)
    }

    //打烊
    restaurantClosed() {
        console.log('restaurantClosed')
        this.restaurantOpen = false
    }

    shutdown() {
        console.log('shutdown')
    }

    foodContainerTakeFood(food: Food) {
        // 点击食物，首先帘子需要有空位，且帘子卷的动画已经结束才行。
        if (this.curtain.isCanAddFood()) {
            //从格子里面拿食物 拿成功了 返回food 放到帘子上
            let foodTaken = food.tackFood();
            this.curtain.addFood(foodTaken)
        }
    }

    curtainBackFood(food: Food) {
        this.foodContainer.backFood(food)
    }

    curtainScrollCompleted(foodInCurtain: string[]) {
        // console.log('sushi complete food Curtain => ', foods)
        let recipeData = this.sushiMenu.getRecipe(foodInCurtain)

        this.conveyor.createSushi(this.sushichef.createSushi(recipeData))
        // this.conveyor.addSushi(sushi)
    }

    customerManagerGetRandomRecipe(): RecipeData {
        return this.sushiMenu.getRandomRecipe();
    }

    customerFinished(customer: Customer) {

        //积分
        this.userData.gold += customer.sushiPrice

        //是否打烊就继续
        if (Singleton.Instance.game.restaurantOpen) {
            let x = customer.node.x
            let y = customer.node.y
            this.scheduleOnce(() => {
                this.customerManager.createCustomer(x, y)
            }, Utils.getRandomInt(1, 4))
        } else {
            //若打烊了，查看用户是否都走了
            if (this.customerManager.customerAmount == 0) {
                //都走了
                Utils.saveGameUserData(this.userData)
                this.shutdown()
            }
        }
        // customer.node.destroy()
    }

    callDelivery() {
        console.log('call')
        this.deliveryManager.showDeliveryWin()
    }

    deliveryFood(deliveryFood: DeliveryFood, type: string) {
        deliveryFood.notify()
        if (type == GlobalConstant.DELIVERY_TYPE_FREE) {
            this.scheduleOnce(() => {
                deliveryFood.delivery()
            }, 5)
        } else if (type == GlobalConstant.DELIVERY_TYPE_EXPRESS) {
            this.scheduleOnce(() => {
                deliveryFood.delivery()
            }, 1)
        }
    }
}
