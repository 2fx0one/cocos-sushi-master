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

    // private foodAmount: number = 0

    private isMove = true

    private conveyor: SushiConveyor = null
    // private sushiIndexInConveyor: string

    private speed: number = 1
    private begin: cc.Vec2
    private end: cc.Vec2

    createOnePieceSushi(img, index) {
        if (img) {
            // this.foodAmount++
            this.sushiList[index].active = true
            Utils.loadResImage(img, (err, spriteFrame: cc.SpriteFrame) => {
                this.sushiList[index].getComponent(cc.Sprite).spriteFrame = spriteFrame
            })
        } else {
            this.sushiList[index].active = false
        }
    }

    createSushi(conveyor: SushiConveyor, recipeData: RecipeData, speed, begin: cc.Vec2, end: cc.Vec2): Sushi {
        this.conveyor = conveyor
        this.speed = speed
        this.begin = begin
        this.end = end
        this.sushiId = recipeData.sushiId
        this.sushiName = recipeData.sushiName

        // this.foodAmount = 0

        // let outputPicPathList = recipeData.outputPicPathList.filter(v => v);
        console.log(recipeData.outputPicPathList)

        recipeData.outputPicPathList.forEach((img, index) => {
            this.createOnePieceSushi(img, index)
        })

        this.isMove = true
        this.node.setPosition(begin)

        return this
    }

    // init(conveyor: Conveyor, index, x, y) {
    //     this.conveyor = conveyor
    //     this.node.parent = conveyor.node
    //     this.sushiIndexInConveyor = index
    //     return this.resetPosition(x, y)
    // }


    // resetPosition(x, y) {
    //     this.node.setPosition(cc.v2(x, y))
    //     return this
    // }

    takenByCustomer(position: cc.Vec2) {
        this.isMove = false
        this.node.position = position
        return this
    }

    // step(x: number): number {
    //     if (this.isMove) {
    //         this.node.x += x
    //     }
    //     return this.node.x
    // }

    update(dt) {
        // console.log(this.isMove)
        if (this.isMove) {
            this.node.x += this.speed
            if (this.node.x > this.end.x) {
                this.node.x = this.begin.x
            }
        }
    }

    takeOne(): boolean {

        for (let i = 0; i < this.sushiList.length; i++) {
            let food: cc.Node = this.sushiList[i]
            if (food.active == true) {
                food.active = false
                return true
            }
        }

        return false

        // if (this.foodAmount == 0) {
        //     return false
        // } else {
        //     // this.foodAmount--
        //     let food: cc.Node = this.sushiList[--this.foodAmount]
        //     food.active = false
        //     return true
        // }
    }

    finished() {
        this.conveyor.removeSushi(this)
        // this.node.destroy()
    }

}
