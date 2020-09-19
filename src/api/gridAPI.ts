export function getGridRowStart(index : number) {
    let gridRowStart : number = 0;
    for (let i = 0; i <= index; i++) {
        if (i % 3 !== 2) {
            ++gridRowStart
        }
    }
    return gridRowStart
}

export function getGridColumnStart(index : number) {
    let gridColumnStart : number = 0;
    switch(index % 3) {
        case 0:
            gridColumnStart = 2;
            break;
        case 1:
            gridColumnStart = 1;
            break;
        case 2:
            gridColumnStart = 3;
            break;
        default:
            gridColumnStart = 2;
            break;
    }
    return gridColumnStart;
}