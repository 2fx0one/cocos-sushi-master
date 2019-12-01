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

    // onLoad () {}

    start () {

    }

    init(game: Game, sushiImageNameList: string[]): Sushi {
        console.log(sushiImageNameList)

        this.game = game
        sushiImageNameList.forEach((img, i)=> {
            cc.loader.loadRes('sushi/' + img, cc.SpriteFrame, (err, spriteFrame) => {
                console.log(spriteFrame)
                this.foods[i].getComponent(cc.Sprite).spriteFrame = spriteFrame
            })
        })
        return this
    }
}
