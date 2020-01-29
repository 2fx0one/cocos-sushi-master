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

        
        let guankaData: GuankaData = new GuankaData()
        guankaData.foodDataList = [

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
            new FoodData(450, 50, "玉子", "16", '16', 10, 10),
            new FoodData(450, 50, "玉子", "17", '17', 10, 10),
        ]

        guankaData.recipeList = [
            new RecipeData('饭团', '2饭+1苔', '01', ['1', '1', '2'], ['01', '01', '01']),
            new RecipeData('军舰', '1饭+1鲑鱼子', '02', ['1', '3'], ['02', '02', '02']),
            new RecipeData('军舰', '1饭+2苔+1鲑鱼子', '03', ['1', '2', '2', '3'], ['03', 'none', '03']),
            new RecipeData('寿司', ' 2饭+1苔+1鲑', '04', ['1', '1', '2', '4'], ['04', 'none', '04']),
            new RecipeData('寿司', ' 1饭+2苔+1瓜', '05', ['1', '2', '2', '6'], ['05', 'none', '05']),
            new RecipeData('寿司', ' 1饭+2苔+1虾', '06', ['1', '2', '2', '13'], ['06', 'none', '06']),
            new RecipeData('卷寿司', ' 1饭+1苔+1瓜', '07', ['1', '2', '6'], ['07', '07', '07']),

            new RecipeData('anago 鳗鱼寿司', ' 1饭+1苔+2鳗', '08', ['1', '2', '12', '12'], ['08', 'none', '08']),
            new RecipeData('章鱼寿司', ' 2饭+2苔+2章', '09', ['1', '1', '2', '2', '9', '9'], ['09', 'none', '09']),
            new RecipeData('扁口鱼寿司', ' 2饭+1苔+1扁口', '10', ['1', '1', '2', '7'], ['10', 'none', '10']),
            new RecipeData('hamachi 鰤鱼寿司', ' 2饭+1苔+1鰤', '11', ['1', '1', '2', '10'], ['11', 'none', '11']),
            new RecipeData('tai鲷鱼寿司', ' 3饭+1苔+2鲷', '12', ['1', '1', '1', '2', '11', '11'], ['12', 'none', '12']),
            new RecipeData('鯖鱼寿司', ' 1饭+2苔+2鯖', '13', ['1', '2', '2', '8', '8'], ['13', 'none', '13']),
            new RecipeData('SPECIAL', ' 4饭+3苔+1鲷+1瓜', '14', ['1', '1', '1', '1', '2', '2', '2', '6', '11'], ['01', '07', '12']),
            new RecipeData('蟹棒寿司', ' 2饭+2苔+1蟹', '15', ['1', '1', '2', '2', '14'], ['15', 'none', '15']),
            new RecipeData('玉子寿司', ' 1饭+2苔+1玉', '16', ['1', '2', '2', '15'], ['16', 'none', '16']),
            new RecipeData('玉子卷寿司', ' 1饭+1苔+1玉', '17', ['1', '2', '15'], ['17', '17', '17']),
            new RecipeData('手卷寿司', ' 3饭+2苔+1鳗+1瓜', '18', ['1', '1', '1', '2', '2', '12', '6'], ['none', '18', 'none']),
        ]

        this.scheduleOnce(() => {
            this.foodContainer.init(guankaData.foodDataList)
            this.sushiMenu.init(guankaData.recipeList)

            this.curtain.init(this.userData.curtainSpeed)
            this.conveyor.init(this.userData.conveyorSpeed)
            this.customerManager.init(this.userData.customerAmount)

            //配送系统中的食物需要持有foodContainer中的食物
            this.deliveryManager.init(guankaData.foodDataList)
            
            this.restaurantOpening(this.userData.closedCountSecond)
        }, 1)

    }

    restaurantOpening(closedCountSecond: number) {
        cc.loader.loadRes('audio/fair', cc.AudioClip, (err, clip) => {
            // this.currentBgAudio = cc.audioEngine.play(clip, true, 0.4)
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
