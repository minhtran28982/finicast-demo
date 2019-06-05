
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import SliderBar from './Dashboard/sliderBar'
import { observe, baseModel } from './observe'

const DragDropContent = () => {
    const [widgetPos, setWidgetPos] = useState(baseModel)
    useEffect(() => observe(newPos => setWidgetPos(newPos)))
    return (
        <div className="container-style">
            <SliderBar widgetPosition={widgetPos}  />
        </div>
    )
}
function App() {
    return (
        <div className="App">
            <DragDropContextProvider backend={HTML5Backend}>
                <DragDropContent />
            </DragDropContextProvider>
        </div>
    )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
