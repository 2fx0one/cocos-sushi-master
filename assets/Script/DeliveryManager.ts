import DeliveryFood from "./DeliveryFood";
import Food from "./Food";
import Singleton from "./Singleton";
import GlobalConstant from "./common/GlobalConstant";

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

    init(foodsInContainMap: { [key: string]: Food }) {

        let data = Object.keys(foodsInContainMap).map(k => foodsInContainMap[k]).concat()

        this.deliveryFoodList = data.map(v => this.createDeliveryFood(v))
    }

    private createDeliveryFood(food: Food) {
        let deliveryFood: cc.Node = cc.instantiate(this.deliveryFoodPrefab)

        deliveryFood.parent = this.layoutNode
        return deliveryFood.getComponent(DeliveryFood).init(this, food)
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

            this.currentDeliveryFood.notify()

            cc.loader.loadRes('audio/call', cc.AudioClip, (err, clip) => {
                cc.audioEngine.play(clip, false, 0.4)
            })
            console.log('deliveryCost', cost)
            Singleton.Instance.game.deliveryFood(this.currentDeliveryFood, cost, deliveryFoodDelay)

            this.closeConfirmWin()

            this.closeDeliveryWin()

        }

        // console.log(data)
        // switch (data) {
        //     case GlobalConstant.DELIVERY_TYPE_FREE:
        //         Singleton.Instance.game.deliveryFood(this.currentDeliveryFood, data)
        //     case GlobalConstant.DELIVERY_TYPE_EXPRESS:
        //         Singleton.Instance.game.deliveryFood(this.currentDeliveryFood, data)
        //         return this.closeDeliveryWin()
        //     case 'close':
        //         return
        //     default:
        //         return
        // }
    }

    //
    // freeDelivery (){
    //     this.currentDeliveryFood.delivery()
    // }
    //
    // expressDelivery() {
    //     this.currentDeliveryFood.delivery()
    // }

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
        this.confirmWinNode.position = position
        this.confirmWinNode.active = true
    }

    closeConfirmWin() {
        this.confirmWinNode.active = false
    }

}
