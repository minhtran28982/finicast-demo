import React from 'react'
import {DropTarget} from 'react-dnd'
import {canMoveWidget, moveWidget} from '../observe'
import Overlay from './overlay'

const Square = ({children}) => {
    return (
        <div className="square-style">
            {children}
        </div>
    )
}

const Destination = ({x,y,connectDropTarget,isOver,canDrop,children,connectItem}) => {
    return connectDropTarget(
        <div className="board-square-style">
            <Square>{children}</Square>
            {isOver && !canDrop && <Overlay color="red"/>}
            {isOver && canDrop && <Overlay color="green"/>}
        </div>,
    )
}
export default DropTarget(
    "widget",
    {
        canDrop(props, monitor) {
            const item = monitor.getItem()
            return  canMoveWidget(props.x, props.y,item)
        },
        drop(props, monitor, component) {
            // Obtain the dragged item
            const item = monitor.getItem()
            console.log("idrop tem movedaaa:", item)
            moveWidget(props.x, props.y,item)
        }

    },
    (connect, monitor) => {
        const item = monitor.getItem()

        return {
            connectDropTarget: connect.dropTarget(),
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
            connectItem: item
        }
    },
)(Destination)


