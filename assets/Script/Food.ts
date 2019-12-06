import FoodContainer from "./FoodContainer";
import FoodEntity from "./entity/FoodEntity";

const { ccclass, property } = cc._decorator;


@ccclass
export default class Food extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;


    // @property
    // text: string = 'hello';

    private foodContainer: FoodContainer = null
    private amount: number = null

    public foodName: string = null
    public foodId: string = null
    public picPath: string = null

    public foodCostPrice: number //食物购买价格

    // LIFE-CYCLE CALLBACKS:

    public init(foodContainer: FoodContainer, foodEntity: FoodEntity) {

        this.foodContainer = foodContainer
        this.foodId = foodEntity.foodId
        this.foodName = foodEntity.foodName
        this.picPath = foodEntity.picPath
        this.amount = foodEntity.amount
        this.foodCostPrice = foodEntity.foodCostPrice
        this.updateLabelDisplay()

        cc.loader.loadRes('foods-in-container/' + this.picPath, cc.SpriteFrame, (err, spriteFrame) => {
            this.getComponentInChildren(cc.Sprite).spriteFrame = spriteFrame
        })
        return this
    }

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
}
