import React from 'react'
import {DragSource}  from 'react-dnd'
import { resetItemWIthId }  from './../observe'

const WidgetItem = ({connectDragSource, connectDragPreview, isDragging, id, name, type, objectId, width, height, hasCloseButton}) => {
    const handleClick = () => {
        resetItemWIthId(id)
    }
    return (
        <div className='widget-item' ref={connectDragSource} style={{opacity: isDragging ? 0.4 : 1 }} >
            <div>
                <div> {id}</div>
                <div> {name}</div>
                <div> {width} x {height}</div>
            </div>
            {hasCloseButton ? 
                <div className="x-button"><button onClick={(connectDragSource) => handleClick(connectDragSource) }>X</button></div> : null}
        </div>
    )
}

export default DragSource(

    "widget",
    {
        beginDrag: props => ({ connectDragSource: props.connectDragSource}),
        endDrag(props, monitor) {
            const item = monitor.getItem()
            const dropResult = monitor.getDropResult()
            if(item.connectDragSource !== undefined){
                if (dropResult) {
                    console.log("item moved id:",item.connectDragSource)
                }
            }

        },
    },
    (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    })

)(WidgetItem)


