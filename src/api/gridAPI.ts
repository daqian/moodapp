/**
 * 获取网格行初始值1,2,2,3,4,4,5,6,6,7,8,8...
 */
export function getGridRowStart(index : number) {
    let baseNum = 2 * (index / 3) + 1
    let ceilNum = Math.ceil(baseNum)
    let floorNum = Math.floor(baseNum)
    return [baseNum, ceilNum, floorNum][index % 3];
}

/**
 * 获取网格列初始值2,1,3,2,1,3,2,1,3...
 */
export function getGridColumnStart(index : number) {
    return [2, 1, 3][index % 3];
}