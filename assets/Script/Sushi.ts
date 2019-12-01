import Game from "./Game";

const { ccclass, property } = cc._decorator;

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

    setSpriteFrame(img, index) {
        console.log(img, index)
        cc.loader.loadRes('sushi/' + img, cc.SpriteFrame, (err, spriteFrame) => {
            // console.log(spriteFrame)
            this.foods[index].getComponent(cc.Sprite).spriteFrame = spriteFrame
        })
    }

    init(game: Game, sushiName: string[]): Sushi {
        // console.log(sushiName)
        this.sushiName = sushiName.join("_")
        this.game = game

        let sushiList = sushiName
        console.log(sushiList)

        sushiList.forEach((img, index) => {
            this.setSpriteFrame(img, index)
        })

        // if (sushiList.length == 1) {
        //     sushiList.forEach((img, index) => {
        //         this.setSpriteFrame(img, 1)
        //     })
        // // } else if (sushiList.length == 2) {
        // //     sushiList.forEach((img, index) => {
        // //         this.setSpriteFrame(img, index)
        // //     })
        // } else {
        //     sushiList.forEach((img, index) => {
        //         this.setSpriteFrame(img, index)
        //     })
        // }
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
