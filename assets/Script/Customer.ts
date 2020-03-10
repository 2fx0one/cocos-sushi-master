import Sushi from "./Sushi";
import CustomerManager from "./CustomerManager";
import Utils from "./common/Utils";
import CustomerSeat from "./entity/CustomerSeat";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Customer extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;


    @property(cc.Sprite)
    sushiSprite: cc.Sprite = null;

    @property(cc.Node)
    customerNode: cc.Node = null;

    @property(cc.Node)
    goldNode: cc.Node = null;

    // private progressBar: cc.ProgressBar = null

    private sushi: Sushi = null;

    private orderSushiId: string;

    sushiPrice: number;

    waitTime: number;

    seat: CustomerSeat = null;


    private eatAnim: cc.Animation = null
    // private eatAnimState: cc.AnimationState = null

    private customerManager: CustomerManager = null


    init(customerManager: CustomerManager) {
        this.customerManager = customerManager
        // seat.take(this)
        // this.seat = seat
        return this.resetData().makeOrder()
    }

    resetData() {
        this.goldNode.active = false
        this.customerNode.active = true
        this.sushi = null
        this.orderSushiId = null
        this.sushiPrice = null
        this.label.string = null
        this.progressBar.progress = 1
        this.waitTime = this.customerManager.customerWaitTime
        this.seat = null
        return this
    }

    makeOrder() {
        let recipe = this.customerManager.customerGetRandomRecipe()
        this.orderSushiId = recipe.sushiId
        this.sushiPrice = recipe.sushiPrice
        this.label.string = recipe.sushiTips

        Utils.loadResImage(recipe.sushiPicPath, (err, spriteFrame: cc.SpriteFrame) => {
            console.log(err, spriteFrame)
            this.sushiSprite.spriteFrame = spriteFrame
        })
        return this;
    }

    onLoad() {
        this.eatAnim = this.getComponent(cc.Animation);
        // console.log('customer on load')
        this.schedule(() => {
            // console.log('customer schedule')
            if (this.progressBar.progress < 0) {
                this.leave(true)
            }
            if (!this.isEatingSushi()) {
                this.progressBar.progress -= 1 / (this.waitTime * 10)
            }
        }, 0.1)
    }

    isEatingSushi() {
        return this.sushi!=null;
    }

    isMySushi(sushi: Sushi) {
        return this.orderSushiId == sushi.sushiId
    }

    //从传送带上碰到食物 表示拿食物
    onCollisionEnter(other: cc.BoxCollider, self: cc.BoxCollider) {
        let sushi: Sushi = other.node.getComponent(Sushi)
        if (this.customerNode.active && !this.isEatingSushi() && this.isMySushi(sushi)) {
            this.sushi = sushi.takenByCustomer(cc.v2(this.node.position.x, other.node.position.y + 50))
            this.scheduleOnce(() => {
                this.eatOne()
            }, 0.5)
        }
    }

    eatOne(): boolean {
        if (this.sushi.takeOne()) {
            this.eatAnim.play('customerEat')
            return true
        } else {
            return false
        }
    }

    // 吃完之后动画
    eatUp() {
        if (!this.eatOne()) {
            //盘子空了
            this.sushi.finished()
            this.sushi = null
            this.payMoney()
        }
    }

    payMoney() {
        this.goldNode.active = true
        this.customerNode.active = false
    }

    clickGold() {
        console.log('click gold')
        cc.loader.loadRes('audio/getGold', cc.AudioClip, (err, clip) => {
            cc.audioEngine.play(clip, false, 0.4)
            this.leave();
        })

    }

    takeSeat(seat: CustomerSeat) {
        this.seat = seat;
        this.seat.customer = this;
        return this;
    }

    leaveSeat() {
        this.seat.customer = null
        this.seat = null
    }

    private leave(customerImpatient: boolean = false) {
        this.customerManager.customerLeave(this, customerImpatient)
    }
}
