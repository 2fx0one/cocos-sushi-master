import DeliveryFood from "./DeliveryFood";
import FoodData from "./entity/FoodData";
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
    confirmNode: cc.Node = null

    private currentDeliveryFood: DeliveryFood = null
    private deliveryFoodList: DeliveryFood[] = []

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
        this.closeDeliveryWin(null)
    }

    clickConfirm(event, data) {
        // console.log(data)
        this.closeConfirmWin()
        return this.closeDeliveryWin(data)
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

    showDeliveryWin(score: number) {
        this.node.active = true
        this.deliveryFoodList.forEach(v => v.checkBtnInteractable(score))
        this.reset()
    }

    closeDeliveryWin(data) {
        this.node.active = false
        if (data) {
            Singleton.Instance.game.deliveryFood(this.currentDeliveryFood, data)
        }
    }

    showConfirmWin(position) {
        position.y -= 100
        this.confirmNode.position = position
        this.confirmNode.active = true
    }

    closeConfirmWin() {
        this.confirmNode.active = false
    }

}
