import Food from "./Food";

const { ccclass, property } = cc._decorator;

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
import Guanka from "./entity/GuankaData";
import GuankaData from "./entity/GuankaData";
import GameData from "./data/GameData";


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

    @property(cc.Label)
    scoreLabel: cc.Label = null

    private score: number = 100

    public restaurantOpen: boolean = true

    private userData: GameUserData = null

    // private closedCountSecond = 300 //倒计时300秒

    private currentBgAudio = null


    onLoad() {

        // console.log(cc.director.getWinSize())
        console.log(cc.winSize)
        // cc.director.getWinSize().height
        cc.director.getCollisionManager().enabled = true
        // cc.director.getCollisionManager().enabledDebugDraw = true

        Singleton.Instance.game = this

        this.userData = new GameUserData()
        // this.userData = Utils.loadGameUserData()

        this.init()
    }

    init() {
        this.updateScoreLabel()

        
        let guankaData: GuankaData = GameData.guankaData[1]

        this.scheduleOnce(() => {
            this.foodContainer.init(guankaData.foodDataList)
            this.sushiMenu.init(guankaData.recipeList)

            this.curtain.init(this.userData.curtainSpeed)
            this.conveyor.init(this.userData.conveyorSpeed)
            this.customerManager.init(this.userData.customerAmount)

            //配送系统中的食物需要持有foodContainer中的食物
            this.deliveryManager.init(guankaData.foodDataList)
            
            this.restaurantOpening(guankaData.closedCountSecond)
        }, 1)

    }

    restaurantOpening(closedCountSecond: number) {
        cc.loader.loadRes('audio/fair', cc.AudioClip, (err, clip) => {
            this.currentBgAudio = cc.audioEngine.play(clip, true, 0.4)
        })
        let closedCount = 0
        let progressInterval = 1 / closedCountSecond
        let callback = () => {
            // console.log('tik tak')
            if (closedCount == closedCountSecond) {
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
        Utils.saveGameUserData(this.userData)
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
        console.log('sushi complete food Curtain => ', foodInCurtain)
        let recipeData = this.sushiMenu.getRecipe(foodInCurtain)

        this.conveyor.createSushi(this.sushichef.createSushi(recipeData))
        // this.conveyor.addSushi(sushi)
    }

    customerManagerGetRandomRecipe(): RecipeData {
        return this.sushiMenu.getRandomRecipe();
    }

    enoughScore(gold: number): boolean {
        return this.score >= gold
    }

    getScore(): number {
        return this.score;
    }

    plusScore(gold: number) {
        this.score += gold
        this.updateScoreLabel()
    }

    updateScoreLabel() {
        this.scoreLabel.string = 'Score: ' + this.score.toString()
    }

    customerFinished(customer: Customer) {

        cc.loader.loadRes('audio/getGold', cc.AudioClip, (err, clip) => {
            cc.audioEngine.play(clip, false, 0.4)
        })
        //积分
        this.plusScore(customer.sushiPrice)
        // this.userData.gold += customer.sushiPrice

        //是否打烊就继续
        if (Singleton.Instance.game.restaurantOpen) {
            let x = customer.node.x
            let y = customer.node.y
            this.scheduleOnce(() => {
                this.customerManager.createCustomer(x, y)
            }, Utils.getRandomInt(1, 5))
        } else {
            //若打烊了，查看用户是否都走了
            if (this.customerManager.customerAmount == 0) {
                //都走了
                this.shutdown()
            }
        }
        // customer.node.destroy()
    }

    callDelivery() {
        console.log('call')
        this.deliveryManager.showDeliveryWin()
    }

    startDeliveryFoodCall(foodData: FoodData, cost: number, deliveryFoodDelay: number) {

        this.plusScore(-cost)
        
        //通知食物开始倒计时
        this.foodContainer.notifyFood(foodData)
        
        this.scheduleOnce(() => {
            console.log('delivery')
            cc.loader.loadRes('audio/deliveryArrival', cc.AudioClip, (err, clip) => {
                cc.audioEngine.play(clip, false, 0.4)
            })
            this.foodContainer.deliveryFood(foodData)

        }, deliveryFoodDelay)
    }
}
