import FoodContainer from "./FoodContainer";
import FoodData from "./entity/FoodData";
import Utils from "./common/Utils";

const { ccclass, property } = cc._decorator;


@ccclass
export default class Food extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null
    // @property
    // text: string = 'hello';

    private foodContainer: FoodContainer = null
    private amount: number = null

    public foodName: string = null
    public foodId: string = null
    public foodSmallPicPath: string = null
    public foodInContainerPicPath: string = null

    public foodCostPrice: number //食物购买价格

    // LIFE-CYCLE CALLBACKS:
    // private coolDowning = false

    public init(foodContainer: FoodContainer, foodData: FoodData) {

        this.foodContainer = foodContainer
        this.foodId = foodData.foodId
        this.foodName = foodData.foodName
        this.foodSmallPicPath = foodData.foodSmallPicPath
        this.foodInContainerPicPath = foodData.foodInContainerPicPath
        this.amount = foodData.amount
        this.foodCostPrice = foodData.foodCostPrice
        this.updateLabelDisplay()

        Utils.loadResImage(this.foodInContainerPicPath, (err, spriteFrame: cc.SpriteFrame) => {
            this.getComponentInChildren(cc.Sprite).spriteFrame = spriteFrame
        })

        return this
    }image

    updateLabelDisplay() {
        this.label.string = '' + this.amount
    }

    onclick(event, data) {
        console.log(data)
        console.log('this.amount', this.amount)
        if (this.amount > 0) {
            this.foodContainer.clickFood(this)
        }
    }

    addAmonut(amount: number) {
        this.amount += amount
        // console.log('add', this.amount)
        this.updateLabelDisplay()
    }

    subtractAmonut(amount: number) {
        this.amount -= amount
        // console.log('subtract', this.amount)
        this.updateLabelDisplay()
    }

    // 拿食物
    tackFood(): Food {
        this.subtractAmonut(1)
        return this
    }

    // 退回食物
    backFood(): Food {
        this.addAmonut(1)
        return this
    }

    //外卖通知
    deliveryNotify() {
        this.progressBar.node.active = true
        this.progressBar.progress = 1
    }

    // 外卖食物
    deliveryFood(amount: number) {
        this.addAmonut(amount)
        this.progressBar.node.active = false
        return this

    }

    update(dt: number) {
        if (this.progressBar.node.active) {
            this.progressBar.progress -= dt * 0.1
        }
    }


}
