import RecipeData from "./entity/RecipeData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Sushi extends cc.Component {

    @property([cc.Node])
    sushiList: cc.Node[] = []

    public sushiId: string = null
    public sushiName: string = null

    private amount: number = null

    private isMove = true

    setSpriteFrame(img, index) {
        // console.log(img, index)
        cc.loader.loadRes('sushi/' + img, cc.SpriteFrame, (err, spriteFrame) => {
            this.sushiList[index].getComponent(cc.Sprite).spriteFrame = spriteFrame
        })
    }

    init(recipeData: RecipeData): Sushi {
        this.sushiId = recipeData.sushiId
        this.sushiName = recipeData.sushiName
        this.amount = recipeData.outputPicPathList.length

        recipeData.outputPicPathList.forEach((img, index) => {
            this.setSpriteFrame(img, index)
        })

        return this
    }

    stopMove() {
        this.isMove = false
        this.node.y += 50
    }

    update(dt) {
        if (this.isMove) {
            this.node.x += 1
        }
    }

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

}
