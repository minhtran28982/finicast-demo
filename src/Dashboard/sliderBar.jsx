import React from 'react'
import BoardSquare from '.'
import WidgetItem from '../Widget/index'
import {Row, Col} from 'reactstrap'

const SliderBar = ({widgetPosition}) => {
    const Task1 = ({isWidget, item, isTopRightCell}) => (isWidget ? <WidgetItem connectDragSource={item}
                                                                name={item.name}
                                                                id={item._id}
                                                                type={item.type}
                                                                width={item.width}
                                                                height={item.height}
                                                                objectId={item.objectId}
                                                                hasCloseButton={isTopRightCell}/> : null)

    function renderSquare(i) {
        const x = i % 12
        const y = Math.floor(i / 12)
        let arr = []
        for (let a = 0 ; a < widgetPosition.length; a ++) {
            let task = widgetPosition[a]
            for (let b = 0; b <task.width; b ++){
                for (let c = 0; c <task.height; c ++){
                    arr.push(<Task1 isWidget={task.widgetX+ b === x && task.widgetY + c === y} 
                        item={task} isTopRightCell={b===task.width-1 && c===0}/>)
                }
            }
        }

        return (
            <Col className="grid-col-item" xl="1" lg="2" md="3" sm="6" xs="12" key={i}>
                <BoardSquare x={x} y={y}>
                    {arr}
                </BoardSquare>
            </Col>
        )
    }

    let squares = [];
    for (let i = 0; i < 96; i += 1) {
        squares.push(renderSquare(i))
    }

    return (
        <div>
            <div className="header"><h1>Logo</h1></div>
            <div className="slide-bar">
                <div className="slider-item-style">
                    {widgetPosition.map(({name, _id, type, objectId, width, height}, index) => (
                        <WidgetItem
                            connectDragSource={widgetPosition[index]}
                            name={name}
                            id={_id}
                            type={type}
                            width={width}
                            height={height}
                            objectId={objectId}
                        />
                    ))}
                </div>
            </div>
            <Row className="board-style">{squares}</Row>
        </div>
    )
}
export default SliderBar
