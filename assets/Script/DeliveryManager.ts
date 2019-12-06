import DeliveryFood from "./DeliveryFood";
import FoodEntity from "./entity/FoodEntity";
import Food from "./Food";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DeliveryManager extends cc.Component {

    @property(cc.Node)
    layoutNode: cc.Node = null;

    @property(cc.Prefab)
    deliveryFood: cc.Prefab = null;

    @property(cc.Node)
    confirmNode: cc.Node = null

    onLoad() {
        // [0,1].forEach(()=>{
        //     this.createDeliveryFood()
        // })
    }

    init(foodsInContainMap: { [key: string]: Food }) {

        let data = Object.keys(foodsInContainMap).map(k => foodsInContainMap[k]).concat()

        data.forEach((v, i) => this.createDeliveryFood(v))
    }

    private createDeliveryFood(food: Food) {
        let deliveryFood: cc.Node = cc.instantiate(this.deliveryFood)

        deliveryFood.parent = this.layoutNode
        return deliveryFood.getComponent(DeliveryFood).init(this, food)
    }

    clickDeliveryFood(deliveryFood: DeliveryFood) {
        this.showConfirmWin(deliveryFood.node.position)
    }

    clickClose() {
        this.closeDeliveryWin()
    }

    private clickConfrim(event, data) {
        console.log(data)
        switch (data) {
            case 'free':
                return this.closeConfirmWin()
            case 'express':
                return this.closeConfirmWin()
            case 'close':
                return this.closeConfirmWin()
            default:
                return
        }
    }

    showDeliveryWin() {
        this.node.active = true
        this.closeConfirmWin()
    }

    closeDeliveryWin() {
        this.node.active = false
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
