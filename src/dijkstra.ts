import { Node, START_NODE_ROW, START_NODE_COLUMN } from './utils'

function updateNeighbours(grid: Node[][], node: Node) {
    const topNeighbour = node.y > 0 ? grid[node.y - 1][node.x] : undefined
    const rightNeighbour = node.x < grid[0].length - 1 ? grid[node.y][node.x + 1] : undefined
    const bottomNeighbour = node.y < grid.length - 1 ? grid[node.y + 1][node.x] : undefined
    const leftNeighbour = node.x > 0 ? grid[node.y][node.x - 1] : undefined

    let neighbours = [topNeighbour, bottomNeighbour, rightNeighbour, leftNeighbour]

    for (const neighbour of neighbours) {
        if (neighbour === undefined) {}
        else if (neighbour.distance === Infinity && !neighbour.isWall) {
            neighbour.distance = node.distance + 1
            neighbour.prevNode = node
        }
    }
}

function getUnivisitedNodeWithSmallestDistance(grid: Node[][]) {
    let flatGrid = grid.flat()
    flatGrid = flatGrid.filter(node => !node.isStart && !node.isVisited && !node.isWall && node.distance !== Infinity)
    flatGrid.sort((a,b) => a.distance - b.distance)
    return flatGrid.length > 0 ? flatGrid[0] : null
}

function getPathToStartNode(node: any) {
    const shortestPath = []
    if (node) {
        while (!node.prevNode.isStart) {
            node = {...node.prevNode}
            node.isPartOfShortestPath = true
            shortestPath.push(node)
        }
    }
    return shortestPath
}

function dijkstraAlgorithm(grid: Node[][]) {
    const visitedNodes = []
    let currentNode: Node | null = grid[START_NODE_ROW][START_NODE_COLUMN]
    updateNeighbours(grid, grid[START_NODE_ROW][START_NODE_COLUMN])
    while (true) {
        currentNode = getUnivisitedNodeWithSmallestDistance(grid)
        if (currentNode === null || currentNode.isFinish) {break}
        currentNode.isVisited = true
        visitedNodes.push(currentNode)
        updateNeighbours(grid, currentNode)
    }
    console.log()
    const shortestPath = getPathToStartNode(currentNode as Node)
    return [visitedNodes, shortestPath]
}


export default dijkstraAlgorithm