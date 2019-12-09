import RecipeData from "./entity/RecipeData";
import Utils from "./common/Utils";
import Conveyor from "./Conveyor";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Sushi extends cc.Component {

    @property([cc.Node])
    sushiList: cc.Node[] = []

    public sushiId: string = null

    public sushiName: string = null

    private amount: number = null

    private isMove = true
    private conveyor: Conveyor = null
    private sushiIndexInConveyor: string

    setSpriteFrame(img, index) {
        Utils.loadResImage(img, (err, spriteFrame: cc.SpriteFrame) => {
            this.sushiList[index].getComponent(cc.Sprite).spriteFrame = spriteFrame
        })
    }

    create(recipeData: RecipeData): Sushi {
        console.log(recipeData.outputPicPathList)
        this.sushiId = recipeData.sushiId
        this.sushiName = recipeData.sushiName
        this.amount = recipeData.outputPicPathList.length

        recipeData.outputPicPathList.forEach((img, index) => {
            this.setSpriteFrame(img, index)
        })

        return this
    }

    init(conveyor: Conveyor, index, x, y) {
        this.conveyor = conveyor
        this.node.parent = conveyor.node
        this.sushiIndexInConveyor = index
        return this.resetPosition(x, y)
    }

    takenByCustomer() {
        this.isMove = false
        this.node.y += 50
        return this
    }

    resetPosition(x, y) {
        this.node.setPosition(cc.v2(x, y))
        return this
    }

    step(x: number): number {
        if (this.isMove) {
            this.node.x += x
        }
        return this.node.x
    }

    // update(dt) {
    //     if (this.isMove) {
    //         this.node.x += 2
    //     }
    // }

    takeOne(): boolean {
        if (this.amount == 0) {
            return false
        } else {
            this.amount--
            let food: cc.Node = this.sushiList.pop()
            food.destroy()
            return true
        }
    }

    finished() {
        this.conveyor.removeSushi(this.sushiIndexInConveyor)
        this.node.destroy()
    }

}
