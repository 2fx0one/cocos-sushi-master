
export default class RecipeData {

    sushiId: string = null
    sushiName: string = null
    sushiPrice: number = 10
    sushiPicPath: string = null
    sushiTips: string = null

    //foodId List 
    inputFoodId: string[] = null 
    
    //sushiId List
    outputPicPathList: string[] = null

    constructor(sushiName: string, sushiTips:string, picPath: string, inputFoodId: string[], outputPicPathList: string[]) {
        this.sushiName = sushiName
        this.sushiTips = sushiTips
        this.sushiPicPath = `image/sushi/${picPath}`
        this.inputFoodId = inputFoodId
        this.outputPicPathList = outputPicPathList.map(v=> `image/sushi/${v}`)
        
        this.sushiId = inputFoodId.concat().sort().join('_') //保证原始数组顺序
        return this
    }
}