// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import GameData from "../data/GameData";
import StageButton from "./StageButton";
import Utils from "../common/Utils";
import GameUserSaveData from "../entity/GameUserSaveData";
import Game = cc.Game;

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainGame extends cc.Component {

    //第一次登陆 输入名字 创建账号
    @property(cc.Node)
    firstLoginNode: cc.Node = null

    @property(cc.EditBox)
    yourNameEditBox: cc.EditBox = null

    //第二次登陆 加载用户数据啦。
    @property(cc.Node)
    secondLoginNode: cc.Node = null

    @property(cc.Label)
    welcomeLabel: cc.Label = null

    @property(cc.Node)
    stagePageView: cc.Node = null

    @property(cc.Node)
    stagePage1: cc.Node = null

    @property(cc.Node)
    stagePage2: cc.Node = null

    @property(cc.Prefab)
    stageButtonPrefab: cc.Prefab = null

    // LIFE-CYCLE CALLBACKS:
    private userData: GameUserSaveData = null

    onLoad() {
        this.stagePageView.active = false
        this.firstLoginNode.active = false
        this.secondLoginNode.active = false

        this.userData = Utils.loadGameUserData()
        // console.log('userData', this.userData)

        if (!this.userData) {
            // 第一次登陆
            this.firstLoginNode.active = true
        } else {
            this.loadingUserData()
        }

        // Object.keys(GameData.ALL_STAGE_DATA).forEach((no)=>{
        //     console.log(no)
        //     let node: cc.Node = cc.instantiate(this.stageButtonPrefab);
        //     node.parent = this.stagePage1;
        //     node.getComponent(StageButton).init(this, no)
        // })
    }

    loadingUserData() {
        this.secondLoginNode.active = true
        console.log(this.userData)
        this.welcomeLabel.string = 'Konichiwa ' + this.userData.name
    }

    clickInputNameConfirm() {
        // console.log('11 input = ', this.yourNameEditBox.string)
        if (this.yourNameEditBox.string.trim()) {
            // console.log('22 input = ', this.yourNameEditBox.string)
            this.userData = Utils.saveGameUserData(new GameUserSaveData(this.yourNameEditBox.string))
            // this.yourNameEditBox.string = 'done'
            this.firstLoginNode.active = false
            this.secondLoginNode.active = true
            this.loadingUserData()
        }
    }

    clickStart() {
        cc.director.loadScene('restaurant')
    }

    clickSelect() {
        this.stagePageView.active = true
        this.firstLoginNode.active = false
        this.secondLoginNode.active = false

        Object.keys(GameData.ALL_STAGE_DATA).forEach((no) => {
            // console.log(no)
            let node: cc.Node = cc.instantiate(this.stageButtonPrefab);
            node.parent = this.stagePage1;
            node.getComponent(StageButton).init(this, no)
        })
    }

    clickStage(selectLevel: string) {
        console.log(selectLevel)
        // this.userData.selectLevel = selectLevel;
        // Utils.saveGameUserData(this.userData)
    }
}
