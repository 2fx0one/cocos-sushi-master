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

    @property(cc.Node)
    customerNode: cc.Node = null

    @property(cc.Node)
    goldNode: cc.Node = null

    // private progressBar: cc.ProgressBar = null

    private sushi: Sushi = null

    private orderSushi: string

    sushiPrice: number

    waitTime: number = 15


    private eatAnim: cc.Animation = null
    // private eatAnimState: cc.AnimationState = null

    private customerManager: CustomerManager = null


    init(customerManager: CustomerManager) {
        this.customerManager = customerManager
        this.eatAnim = this.getComponent(cc.Animation);

        return this.resetState().makeOrder()
    }

    resetState() {
        this.goldNode.active = false
        this.customerNode.active = true
        this.orderSushi = null
        this.sushiPrice = null
        this.label.string = null
        this.progressBar.progress = 1
        this.waitTime = 15
        return this
    }

    makeOrder() {
        let recipe = this.customerManager.customerGetRandomRecipe()
        this.orderSushi = recipe.sushiId
        this.sushiPrice = recipe.sushiPrice
        this.label.string = recipe.sushiTips

        Utils.loadResImage(recipe.sushiPicPath, (err, spriteFrame: cc.SpriteFrame) => {
            console.log(err, spriteFrame)
            this.sushiSprite.spriteFrame = spriteFrame
        })
        return this;
    }

    onLoad() {
        console.log('customer on load')
    }

    start() {
    }

    update(dt) {
        // console.log(dt)
        // console.log(this.progressBar.progress)
        if (this.progressBar.progress < 0) {
            this.progressBar.progress = 1
        }
        this.progressBar.progress -= dt / 20
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
            this.payGold()
        }
    }

    payGold() {
        this.goldNode.active = true
        this.customerNode.active = false

    }

    clickGold() {
        // console.log('clickGold')
        this.customerManager.customerFinished(this)
    }

    eatOneSushi(): boolean {
        if (this.sushi.takeOne()) {
            this.eatAnim.play('customerEat')
            return true
        } else {
            return false
        }
    }

    //从传送带上碰到食物 表示拿食物
    onCollisionEnter(other: cc.BoxCollider, self: cc.BoxCollider) {
        // console.log('Customer on collision enter', this.sushi);
        let sushi: Sushi = other.node.getComponent(Sushi)
        if (this.customerNode.active && !this.sushi && this.isMySushi(sushi)) {

            let pos = cc.v2(this.node.position.x, this.node.position.y - 70)

            this.sushi = sushi.takenByCustomer(pos)

            this.scheduleOnce(() => {
                this.eatOneSushi()
            }, 0.5)
            // setTimeout(()=>{
            // }, 500)
        }
    }
}
