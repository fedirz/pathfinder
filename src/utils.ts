export const GRID_HEIGHT = 25
export const GRID_WIDTH = 45

export const START_NODE_ROW = Math.floor(GRID_HEIGHT / 2)
export const START_NODE_COLUMN = 5
export const FINISH_NODE_ROW = Math.floor(GRID_HEIGHT / 2)
export const FINISH_NODE_COLUMN = GRID_WIDTH - 5

export class Node {
    y: number
    x: number
    isStart: boolean
    isFinish: boolean
    isWall: boolean
    isVisited: boolean
    distance: number
    prevNode: Node | null
    isPartOfShortestPath: false
    constructor(y: number, x: number) {
        this.y  = y
        this.x = x
        this.isStart = this.y === START_NODE_ROW && this.x === START_NODE_COLUMN
        this.isFinish = this.y === FINISH_NODE_ROW && this.x === FINISH_NODE_COLUMN
        this.isWall = false
        this.isVisited = false
        this.distance = this.isStart ? 0 : Infinity
        this.prevNode = null
        this.isPartOfShortestPath = false
    }
}

export function createGrid(): Node[][] {
    const grid = []
    for (let y = 0; y < GRID_HEIGHT; y++) {
        const row = []
        for (let x = 0; x < GRID_WIDTH; x++) {
            row.push(new Node(y, x))
        }
        grid.push(row)
    }
    return grid
}

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}