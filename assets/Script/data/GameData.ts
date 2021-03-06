import StageEntity from "../entity/StageEntity";
import FoodData from "../entity/FoodData";
import RecipeData from "../entity/RecipeData";

export default class GameData {
    static ALL_TOPPING_DATA: { [key: string]: FoodData } = {
       1: new FoodData(350, 250, "rice 饭", '1', '1', 10, 10),
       2: new FoodData(350, 150, "nori 海苔", '2', '2', 10, 10),
       3: new FoodData(350, 50, "ikura 鲑鱼子", '3', '3', 10, 10),

       4: new FoodData(250, 250, "鲑鱼", '4', '4', 10, 10),
       5: new FoodData(250, 150, "5", '5', '5', 10, 10),
       6: new FoodData(250, 50, "kappa 黄瓜", '6', '6', 10, 10),

       7: new FoodData(150, 250, "扁口鱼", '7', '7', 10, 10),
       8: new FoodData(150, 150, "saba 鯖鱼", '8', '8', 10, 10),
       9: new FoodData(150, 50, "tako 章鱼", '9', '9', 10, 10),

       10: new FoodData(50, 250, "hamachi 鰤鱼", '10', '10', 10, 10),
       11: new FoodData(50, 150, "tai 鲷鱼", '11', '11', 10, 10),
       12: new FoodData(50, 50, "anago 鳗鱼", '12', '12', 10, 10),
       13: new FoodData(450, 250, "ebi 虾", "13", '13', 10, 10),
       14: new FoodData(450, 150, "蟹棒", "14", '14', 10, 10),
       15: new FoodData(450, 50, "玉子", "15", '15', 10, 10),
       16: new FoodData(450, 50, "玉子", "16", '16', 10, 10),
       17: new FoodData(450, 50, "玉子", "17", '17', 10, 10),
    }

    static ALL_RECIPE_DATA: { [key: number]: RecipeData } = {
        1: new RecipeData('rice 海苔饭团', '2饭+1苔', '01', ['1', '1', '2'], ['01', '01', '01']),
        2: new RecipeData('ikura 鲑鱼子 军舰', '1饭+1鲑鱼子', '02', ['1', '3'], ['02', '02', '02']),
        3: new RecipeData('ikura 鲑鱼子军舰', '1饭+2苔+1鲑鱼子', '03', ['1', '2', '2', '3'], ['03', 'none', '03']),
        4: new RecipeData('寿司', ' 2饭+1苔+1鲑', '04', ['1', '1', '2', '4'], ['04', 'none', '04']),
        5: new RecipeData('kappa 黄瓜寿司', ' 1饭+2苔+1瓜', '05', ['1', '2', '2', '6'], ['05', 'none', '05']),
        6: new RecipeData('寿司', ' 1饭+2苔+1虾', '06', ['1', '2', '2', '13'], ['06', 'none', '06']),
        7: new RecipeData('卷寿司', ' 1饭+1苔+1瓜', '07', ['1', '2', '6'], ['07', '07', '07']),

        8: new RecipeData('anago 鳗鱼寿司', ' 1饭+1苔+2鳗', '08', ['1', '2', '12', '12'], ['08', 'none', '08']),
        9: new RecipeData('tako 章鱼寿司', ' 2饭+2苔+2章', '09', ['1', '1', '2', '2', '9', '9'], ['09', 'none', '09']),
        10: new RecipeData('扁口鱼寿司', ' 2饭+1苔+1扁口', '10', ['1', '1', '2', '7'], ['10', 'none', '10']),
        11: new RecipeData('hamachi 鰤鱼寿司', ' 2饭+1苔+1鰤', '11', ['1', '1', '2', '10'], ['11', 'none', '11']),
        12: new RecipeData('tai 鲷鱼寿司', ' 3饭+1苔+2鲷', '12', ['1', '1', '1', '2', '11', '11'], ['12', 'none', '12']),
        13: new RecipeData('saba 鯖鱼寿司', ' 1饭+2苔+2鯖', '13', ['1', '2', '2', '8', '8'], ['13', 'none', '13']),
        14: new RecipeData('SPECIAL', ' 4饭+3苔+1鲷+1瓜', '14', ['1', '1', '1', '1', '2', '2', '2', '6', '11'], ['01', '07', '12']),
        15: new RecipeData('蟹棒寿司', ' 2饭+2苔+1蟹', '15', ['1', '1', '2', '2', '14'], ['15', 'none', '15']),
        16: new RecipeData('玉子寿司', ' 1饭+2苔+1玉', '16', ['1', '2', '2', '15'], ['16', 'none', '16']),
        17: new RecipeData('玉子卷寿司', ' 1饭+1苔+1玉', '17', ['1', '2', '15'], ['17', '17', '17']),
        18: new RecipeData('手卷寿司', ' 3饭+2苔+1鳗+1瓜', '18', ['1', '1', '1', '2', '2', '12', '6'], ['none', '18', 'none']),
    }


    static toToppingList(ids: number[]): FoodData[] {
        return ids.map((i) => GameData.ALL_TOPPING_DATA[i])
    }

    static toRecipeList(ids: number[]): RecipeData[] {
        return ids.map((i) => GameData.ALL_RECIPE_DATA[i])
    }

    static ALL_STAGE_DATA: { [key: number]: StageEntity } = {
        1: new StageEntity(
            1,
            200,
            300,
            500,
            GameData.toToppingList([1, 2, 3]),
            GameData.toRecipeList([1, 2, 3]),
        ),
        2: new StageEntity(
            2,
            200,
            300,
            500,
            GameData.toToppingList([1, 2, 3]),
            GameData.toRecipeList([1, 2, 3]),
        )

        // 2: new GuankaData(300, [
        //     new FoodData(350, 250, "饭", '1', '1', 10, 10),
        //     new FoodData(350, 150, "海苔", '2', '2', 10, 10),
        //     new FoodData(350, 50, "鲑鱼子", '3', '3', 10, 10),
        //
        //     new FoodData(250, 250, "鲑鱼", '4', '4', 10, 10),
        //     new FoodData(250, 150, "5", '5', '5', 10, 10),
        //     new FoodData(250, 50, "黄瓜", '6', '6', 10, 10),
        //
        //     new FoodData(150, 250, "扁口鱼", '7', '7', 10, 10),
        //     new FoodData(150, 150, "8", '8', '8', 10, 10),
        //     new FoodData(150, 50, "章鱼", '9', '9', 10, 10),
        //
        //     new FoodData(50, 250, "10", '10', '10', 10, 10),
        //     new FoodData(50, 150, "11", '11', '11', 10, 10),
        //     new FoodData(50, 50, "12", '12', '12', 10, 10),
        //     new FoodData(450, 250, "虾", "13", '13', 10, 10),
        //     new FoodData(450, 150, "蟹棒", "14", '14', 10, 10),
        //     new FoodData(450, 50, "玉子", "15", '15', 10, 10),
        //     new FoodData(450, 50, "红鲑鱼", "16", '16', 10, 10),
        //     new FoodData(450, 50, "甜虾", "17", '17', 10, 10),
        // ], [
        //     new RecipeData('饭团', '2饭+1苔', '01', ['1', '1', '2'], ['01', '01', '01']),
        //     new RecipeData('军舰', '1饭+1鲑鱼子', '02', ['1', '3'], ['02', '02', '02']),
        //     new RecipeData('军舰', '1饭+2苔+1鲑鱼子', '03', ['1', '2', '2', '3'], ['03', 'none', '03']),
        //     new RecipeData('寿司', ' 2饭+1苔+1鲑', '04', ['1', '1', '2', '4'], ['04', 'none', '04']),
        //     new RecipeData('寿司', ' 1饭+2苔+1瓜', '05', ['1', '2', '2', '6'], ['05', 'none', '05']),
        //     new RecipeData('寿司', ' 1饭+2苔+1虾', '06', ['1', '2', '2', '13'], ['06', 'none', '06']),
        //     new RecipeData('卷寿司', ' 1饭+1苔+1瓜', '07', ['1', '2', '6'], ['07', '07', '07']),
        //
        //     new RecipeData('anago 鳗鱼寿司', ' 1饭+1苔+2鳗', '08', ['1', '2', '12', '12'], ['08', 'none', '08']),
        //     new RecipeData('章鱼寿司', ' 2饭+2苔+2章', '09', ['1', '1', '2', '2', '9', '9'], ['09', 'none', '09']),
        //     new RecipeData('扁口鱼寿司', ' 2饭+1苔+1扁口', '10', ['1', '1', '2', '7'], ['10', 'none', '10']),
        //     new RecipeData('hamachi 鰤鱼寿司', ' 2饭+1苔+1鰤', '11', ['1', '1', '2', '10'], ['11', 'none', '11']),
        //     new RecipeData('tai鲷鱼寿司', ' 3饭+1苔+2鲷', '12', ['1', '1', '1', '2', '11', '11'], ['12', 'none', '12']),
        //     new RecipeData('鯖鱼寿司', ' 1饭+2苔+2鯖', '13', ['1', '2', '2', '8', '8'], ['13', 'none', '13']),
        //     new RecipeData('SPECIAL', ' 4饭+3苔+1鲷+1瓜', '14', ['1', '1', '1', '1', '2', '2', '2', '6', '11'], ['01', '07', '12']),
        //     new RecipeData('蟹棒寿司', ' 2饭+2苔+1蟹', '15', ['1', '1', '2', '2', '14'], ['15', 'none', '15']),
        //     new RecipeData('玉子寿司', ' 1饭+2苔+1玉', '16', ['1', '2', '2', '15'], ['16', 'none', '16']),
        //     new RecipeData('玉子卷寿司', ' 1饭+1苔+1玉', '17', ['1', '2', '15'], ['17', '17', '17']),
        //     new RecipeData('手卷寿司', ' 3饭+2苔+1鳗+1瓜', '18', ['1', '1', '1', '2', '2', '12', '6'], ['none', '18', 'none']),
        // ])
    }
}
