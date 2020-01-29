import DeliveryFood from "./DeliveryFood";
import Food from "./Food";
import Singleton from "./Singleton";
import GlobalConstant from "./common/GlobalConstant";
import FoodData from "./entity/FoodData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DeliveryManager extends cc.Component {

    @property(cc.Node)
    layoutNode: cc.Node = null;

    @property(cc.Prefab)
    deliveryFoodPrefab: cc.Prefab = null;

    @property(cc.Node)
    confirmWinNode: cc.Node = null

    //需要快递按钮
    // @property(cc.Button)
    // confirmExpressButton: cc.Button = null

    private currentDeliveryFood: DeliveryFood = null
    private deliveryFoodList: DeliveryFood[] = []

    private deliveryTypeMap: { [key: string]: { cost: number, delay: number } } = {
        free: {
            cost: 0,
            delay: 5
        },
        express: {
            cost: 5,
            delay: 1
        }
    }

    onLoad() {
        // [0,1].forEach(()=>{
        //     this.createDeliveryFood()
        // })
    }

    init( foodDataList: FoodData[]) {

        // let data = Object.keys(foodsInContainMap).map(k => foodsInContainMap[k]).concat()

        this.deliveryFoodList = foodDataList.map(foodData => this.createDeliveryFood(foodData))
    }

    private createDeliveryFood(foodData: FoodData) {
        let deliveryFood: cc.Node = cc.instantiate(this.deliveryFoodPrefab)

        deliveryFood.parent = this.layoutNode
        return deliveryFood.getComponent(DeliveryFood).init(this, foodData)
    }

    clickDeliveryFood(deliveryFood: DeliveryFood) {
        this.currentDeliveryFood = deliveryFood
        this.showConfirmWin(deliveryFood.node.position)
    }

    clickClose() {
        this.closeDeliveryWin()
    }

    costPrice(deliveryType): number {
        return this.deliveryTypeMap[deliveryType].cost + this.currentDeliveryFood.foodCostPrice
    }

    deliveryDelay(deliveryType): number {
        return this.deliveryTypeMap[deliveryType].delay
    }

    //点击确认购买按钮
    clickConfirm(event, deliveryType) {

        let cost = this.costPrice(deliveryType);
        let deliveryFoodDelay = this.deliveryDelay(deliveryType);

        if (Singleton.Instance.game.enoughScore(cost)) {

            
            cc.loader.loadRes('audio/call', cc.AudioClip, (err, clip) => {
                cc.audioEngine.play(clip, false, 0.4)
                Singleton.Instance.game.startDeliveryFoodCall(this.currentDeliveryFood.foodData, cost, deliveryFoodDelay)
            })
            // console.log('deliveryCost', cost)

            this.closeConfirmWin()

            this.closeDeliveryWin()
        }
    }


    reset() {
        this.closeConfirmWin()
        this.currentDeliveryFood = null
    }

    showDeliveryWin() {
        this.node.active = true
        this.deliveryFoodList.forEach(v => v.checkBtnInteractable(Singleton.Instance.game.getScore()))
        this.reset()
    }


    closeDeliveryWin() {
        this.node.active = false
    }

    showConfirmWin(position) {
        position.y -= 100
        position.x += 100
        this.confirmWinNode.position = position
        this.confirmWinNode.active = true
    }

    closeConfirmWin() {
        this.confirmWinNode.active = false
    }

}
