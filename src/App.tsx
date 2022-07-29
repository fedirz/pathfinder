import { useState, useRef, useCallback } from 'react';
import { createGrid, sleep, Node } from './utils'
import Cell from './components/Cell';
import Button from './components/Button'
import dijkstraAlgorithm from './dijkstra'
import _ from 'lodash';

function App() {
  const [grid, setGrid] = useState(createGrid)
  //const [isAlgorithmRunning, setIsAlgorithmRunning] = useState(false)
  const isAlgorithmRunning = useRef(false)
  const isMouseDown = useRef(false)

  const memoizedRunDijkstras = useCallback(async function runDijkstras() {
    if (isAlgorithmRunning.current) return
    isAlgorithmRunning.current = true
    const [visitedNodes, shortestPath] = dijkstraAlgorithm(_.cloneDeep(grid))
    for (const visitedNode of visitedNodes) {
      await sleep(1)
      setGrid(prevState => {
        return prevState.map(row => row.map(node => {
          if (node.y === visitedNode.y && node.x === visitedNode.x) {
            return { ...visitedNode }
          }
          return node
        }))
      })
    }
    for (const shortestPathNode of shortestPath) {
      await sleep(20)
      setGrid(prevState => {
        return prevState.map(row => row.map(node => {
          if (node.y === shortestPathNode.y && node.x === shortestPathNode.x) {
            return { ...shortestPathNode }
          }
          return node
        }))
      })
    }
    isAlgorithmRunning.current = false
  }, [grid])

  const memoizedClearPath = useCallback(function clearPath() {
    setGrid(prevState => {
      return prevState.map(row => row.map(node => {
        if (!node.isStart && !node.isFinish && !node.isWall) {
          return new Node(node.y, node.x)
        }
        return node
      }))
    })
  }, [])

  const memoizedClearWalls = useCallback(function clearWalls() {
    setGrid(prevState => {
      return prevState.map(row => row.map(node => {
        if (node.isWall) {
          return new Node(node.y, node.x)
        }
        return node
      }))
    })
  }, [])

  const memoizedToggleWall = useCallback(function toggleWall(targetNode: any) {
    if (isMouseDown.current && !isAlgorithmRunning.current && !targetNode.isStart && !targetNode.isFinish) {
      setGrid(prevState => {
        return prevState.map(row => row.map(node => {
          if (node.y === targetNode.y && node.x === targetNode.x) {
            const newNode = { ...node }
            newNode.isWall = !newNode.isWall
            return newNode
          }
          return node
        }))
      })
    }
  }, [])

  return (
    <div className="h-screen bg-stone-900 overflow-hidden">
      <div className="flex justify-center items-center">
        <Button disabled={isAlgorithmRunning.current} onClick={memoizedRunDijkstras}>Run Dijkstra's</Button>
        <Button disabled={isAlgorithmRunning.current} onClick={memoizedClearPath}>Clear Path</Button>
        <Button disabled={isAlgorithmRunning.current} onClick={memoizedClearWalls}>Clear Walls</Button>
      </div>
      <div className="flex justify-center">
        <div onMouseDown={() => isMouseDown.current = true} onMouseUp={() => isMouseDown.current = false}>
          {grid.map(row => <div key={row[0].y} className="md:h-5 xl:h-6 2xl:h-7">{row.map(node => <Cell key={node.x} node={node} toggleWall={memoizedToggleWall}/>)}</div>)}
        </div>
      </div>
    </div>
  );
}

export default App;
