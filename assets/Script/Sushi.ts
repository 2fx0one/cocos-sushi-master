import Game from "./Game";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Sushi extends cc.Component {

    @property([cc.Node])
    foods: cc.Node[] = []
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    private game: Game = null

    private sushiName: string = null

    // onLoad () {
    //     // this.node.x = -800
    // }

    // start () {

    // }

    private isMove = true

    init(game: Game, sushiName: string): Sushi {
        console.log(sushiName)
        this.sushiName = sushiName

        this.game = game
        sushiName.split('_').forEach((img, i)=> {
            cc.loader.loadRes('sushi/' + img, cc.SpriteFrame, (err, spriteFrame) => {
                console.log(spriteFrame)
                this.foods[i].getComponent(cc.Sprite).spriteFrame = spriteFrame
            })
        })
        return this
    }
    
    // onCollisionEnter(other: cc.BoxCollider, self: cc.BoxCollider) {
    //     // console.log(' Sushi on collision enter');
    //     // console.log(other)

    //     this.isMove = false
    // }
    getName() {
        return this.sushiName
    }
    stopMove() {
        this.isMove = false
    }

    update(dt) {
        if (this.isMove) {
            this.node.x += 1
        }
    }
}
