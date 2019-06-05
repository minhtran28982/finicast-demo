export const  baseModel = [
    { _id: 'widgetA', name: 'CAC for Jan-19', type: 'row', objectId: 'abcd', width: 1, height: 1, widgetX :-10, widgetY:-20},
    { _id: 'widgetB', name: 'ASP', type: 'section', objectId: 'efgh', width: 2, height: 3, widgetX :-10, widgetY:-20},
    { _id: 'widgetC', name: 'Sales for Week 15', type: 'cell', objectId: 'ijkl', width: 3, height: 2, widgetX :-10, widgetY:-20}]

let widgetPosition = baseModel
let observers = []

function emitChange() {
    observers.forEach(o => o && o(widgetPosition))
}

export function observe(o) {

    observers.push(o)
    emitChange()
    return () => {
        observers = observers.filter(t => t !== o)
    }
}
export function resetItemWIthId(item) {
    let temp2 =[]
    widgetPosition.forEach(function(element) {
        let temp = element
        if(temp._id === item){
            temp.widgetY = -11
            temp.widgetX = -11
        }
        temp2.push(temp)
    });
    widgetPosition= temp2
    emitChange()
}
export function canMoveWidget(toX, toY,item) {
    let itemtMoving = item.connectDragSource
    const [x, y] = [itemtMoving.widgetX,itemtMoving.widgetY]
    const dx = toX - x
    const dy = toY - y
    const stated = (dx !== 0 || dy !== 0)
    const edge = (toX<(13 -itemtMoving.width) && toY< (9-itemtMoving.height))

    let check = true
    widgetPosition.forEach(function(element) {
        if(element._id !== itemtMoving._id) {
            let checkX = (toX +itemtMoving.width <= element.widgetX) || (toX >=(element.widgetX +element.width))
            let checkXY = ((toY + itemtMoving.height) <= element.widgetY) || (toY >= element.widgetY +element.height)
            check = check && (checkX || checkXY )
        }
    });

    return ( edge && stated && check)
}

export function moveWidget(toX, toY,item) {
    let itemtMoving = item.connectDragSource

    let temp2 = [];
    widgetPosition.forEach(function(element) {
        let temp = element
        if(temp._id === itemtMoving._id){
            temp.widgetY = toY
            temp.widgetX = toX
        }
        temp2.push(temp)
    });

    widgetPosition= temp2
    // widgetPosition = [toX, toY]
    emitChange()
}
