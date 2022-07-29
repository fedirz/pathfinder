import { memo } from 'react'
import { Node } from '../utils'

interface CellProps {
    node: Node
    toggleWall: (targetNode: Node) => void
}
function Cell({node, toggleWall}: CellProps) {
    let className = "inline-block md:h-6 md:w-6 xl:h-6 xl:w-6 2xl:h-7 2xl:w-7 border border-violet-600"
    if (node.isStart) { className += " bg-emerald-600" }
    else if (node.isFinish) { className += " bg-rose-700" }
    else if (node.isWall) { className += " bg-stone-200" }
    else if (node.isPartOfShortestPath) { className += " bg-yellow-500" }
    else if (node.isVisited) { className += " bg-red-500" }
    else (className += " bg-stone-800")

    //console.count('Cell rendered')
    return (
        <div className={className} onMouseEnter={() => toggleWall(node)}>

        </div>
    )
}

export default memo(Cell)
