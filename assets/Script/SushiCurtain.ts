import Singleton from "./Singleton";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class SushiCurtain extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    private anim: cc.Animation = null
    private animState: cc.AnimationState = null
   

    onLoad() {

        this.anim = this.getComponent(cc.Animation);
        // this.label = this.getComponent(cc.Label);

    }

    onClick(event, data) {
        console.log(data)

        // if (this.animState==null) {
        //     this.animState = this.anim.play('curtain');
        // }

        if (this.animState==null || this.animState.isPlaying==false) {
            this.animState = this.anim.play('curtain');

            Singleton.Instance.game.clickCurtain(this)

        }

        // console.log(this.animState.isPlaying)



    }

    start() {

    }

    // update (dt) {}
}
