import RecipeData from "./entity/RecipeData";
import Utils from "./common/Utils";
import SushiConveyor from "./SushiConveyor";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Sushi extends cc.Component {

    @property([cc.Node])
    sushiList: cc.Node[] = []

    public sushiId: string = null

    public sushiName: string = null

    private amount: number = null

    private isMove = true

    private conveyor: SushiConveyor = null
    // private sushiIndexInConveyor: string

    private speed: number
    private resetX: number
    private resetY: number

    setSpriteFrame(img, index) {
        console.log(this.sushiList)
        this.sushiList[index].active = true
        Utils.loadResImage(img, (err, spriteFrame: cc.SpriteFrame) => {
            this.sushiList[index].getComponent(cc.Sprite).spriteFrame = spriteFrame
        })
    }

    createSushi(conveyor: SushiConveyor, recipeData: RecipeData, speed, resetX, resetY): Sushi {
        this.conveyor = conveyor
        this.speed = speed
        this.resetX = resetX
        this.resetY = resetY
        this.sushiId = recipeData.sushiId
        this.sushiName = recipeData.sushiName
        this.amount = recipeData.outputPicPathList.length

        console.log(recipeData.outputPicPathList)

        recipeData.outputPicPathList.forEach((img, index) => {
            this.setSpriteFrame(img, index)
        })

        this.isMove = true

        return this.resetPosition(-resetX, resetY)
    }

    // init(conveyor: Conveyor, index, x, y) {
    //     this.conveyor = conveyor
    //     this.node.parent = conveyor.node
    //     this.sushiIndexInConveyor = index
    //     return this.resetPosition(x, y)
    // }


    resetPosition(x, y) {
        this.node.setPosition(cc.v2(x, y))
        return this
    }

    takenByCustomer() {
        this.isMove = false
        this.node.y += 50
        return this
    }

    // step(x: number): number {
    //     if (this.isMove) {
    //         this.node.x += x
    //     }
    //     return this.node.x
    // }

    update(dt) {
        if (this.isMove) {
            this.node.x += this.speed
            if (this.node.x > this.resetX) {
                this.node.x = -this.resetX
            }
        }
    }

    takeOne(): boolean {
        if (this.amount == 0) {
            return false
        } else {
            // this.amount--
            let food: cc.Node = this.sushiList[--this.amount]
            food.active = false
            return true
        }
    }

    finished() {
        this.conveyor.removeSushi(this)
        // this.node.destroy()
    }

}
