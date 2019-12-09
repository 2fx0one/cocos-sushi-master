import Sushi from "./Sushi";
import CustomerManager from "./CustomerManager";
import Utils from "./common/Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Customer extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null


    @property(cc.Sprite)
    sushiSprite: cc.Sprite = null

    // private progressBar: cc.ProgressBar = null

    private sushi: Sushi = null

    private orderSushi: string

    sushiPrice: number

    private anim: cc.Animation = null

    private customerManager: CustomerManager = null

    // private sushiMenu: SushiMenu = null
    // onLoad() {
    //     this.init()
    // }

    init(customerManager: CustomerManager) {
        this.customerManager = customerManager
        // this.progressBar = this.progressNode.getComponent(cc.ProgressBar)
        this.anim = this.getComponent(cc.Animation);
        this.makeOrder()
        return this
    }

    makeOrder() {
        let recipe = this.customerManager.getRandomRecipe()
        this.orderSushi = recipe.sushiId
        this.sushiPrice = recipe.sushiPrice
        this.label.string = recipe.sushiTips

        Utils.loadResImage(recipe.sushiPicPath, (err, spriteFrame: cc.SpriteFrame) => {
            console.log(err, spriteFrame)
             this.sushiSprite.spriteFrame = spriteFrame
        })
    }

    start() {
    }

    update(dt) {
        // console.log(dt)
        // console.log(this.progressBar.progress)
        if (this.progressBar.progress > 1) {
            this.progressBar.progress = 0
        }
        this.progressBar.progress += dt
    }

    isMySushi(sushi: Sushi) {
        return this.orderSushi == sushi.sushiId
    }

    // 吃完之后动画
    eatUp() {
        if (!this.eatOneSushi()) {
            //盘子空了
            this.sushi.finished()
            this.sushi = null
            this.customerManager.customerFinished(this)
        }
    }

    eatOneSushi(): boolean {
        if (this.sushi.takeOne()) {
            this.anim.play('customerEat')
            return true
        } else {
            return false
        }
    }

    //从传送带上拿去食物
    onCollisionEnter(other: cc.BoxCollider, self: cc.BoxCollider) {
        console.log('Customer on collision enter', this.sushi);
        let sushi: Sushi = other.node.getComponent(Sushi)
        if (!this.sushi && this.isMySushi(sushi)) {

            this.sushi = sushi.takenByCustomer()

            this.scheduleOnce(()=> {
                this.eatOneSushi()
            }, 1)
            // setTimeout(()=>{
            // }, 500)
        }
    }
}
