import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [numWidth, setNumWidth] = useState(30)
    const [numHeight, setNumHeight] = useState(30)
    console.log(`=> numHeight`, numHeight)
    console.log(`=> numWidth`, numWidth)
    const [arr, setArr] = useState([])
    console.log(`=> arr`, arr)
    const [loading, setLoading] = useState(true)
    const [refesh, setRefesh] = useState(0)
    const [player1Step, setPlayer1Step] = useState(0)
    const [player2Step, setPlayer2Step] = useState(0)
    const [playerName1, setPlayerName1] = useState('Player 1')
    const [playerName2, setPlayerName2] = useState('Player 2')
    const [nextPlayer, setNextPlayer] = useState('P1')
    const [anti, setAnti] = useState(false)
    const [show, setShow] = useState(false)
    const [winner, setWinner] = useState('')

    const [minute, setMinute] = useState(20)
    const [second, setSecond] = useState(0)
    const [stop, setStop] = useState(false)

    useEffect(() => {
        let coundDown
        if (stop) {
            coundDown = setInterval(() => {
                if (second !== 0) {
                    setSecond((second) => second - 1)
                } else {
                    setMinute((minute) => minute - 1)
                    setSecond(59)
                }
                if (minute === 0 && second === 0) {
                    setShow(true)
                    setStop(false)
                    setMinute(0)
                    setSecond(0)
                    setAnti(false)
                }
            }, 1000);
        }
        return () => clearInterval(coundDown);
    }, [second, minute, stop])

    const RenderTable = () => {
        let arr = []
        for (let i = 0; i < numHeight; i++) {
            let row = []
            for (let r = 0; r < numWidth; r++) {
                row.push("")
            }
            arr.push(row)
        }
        setArr(arr)
        setRefesh(refesh + 1)
    }
    const RandomPlayer = () => {
        const random = Math.floor(Math.random() * 100)
        if (random % 2 === 1) {
            setNextPlayer('P1')
        } else {
            setNextPlayer('P2')
        }
        return
    }
    const startGame = () => {
        setPlayer1Step(0)
        setPlayer2Step(0)
        RandomPlayer()
        RenderTable()
        setMinute(20)
        setSecond(0)
        setAnti(true)
        setStop(true)
    }
    // Player 1 : X
    // Player 2 : O
    const handleBox = (Row, col) => {
        let O_X = ''
        if (arr[Row][col] === 'X' || arr[Row][col] === 'O') {
            console.log('Trùng vị trí')
            return
        } else {
            if (nextPlayer === 'P2') {
                O_X = 'O'
                setNextPlayer('P1')
                setPlayer2Step(player2Step + 1)
            } else {
                O_X = 'X'
                setNextPlayer('P2')
                setPlayer1Step(player1Step + 1)
            }

            console.log('Check', Row, col)
            let NewRow = arr[Row]
            NewRow.splice(col, 1)
            NewRow.splice(col, 0, O_X)
            let NewArr = arr
            NewArr.splice(Row, 1)
            NewArr.splice(Row, 0, NewRow)
            setArr(NewArr)
            setRefesh(refesh + 1)
            checkPlayerWin()
        }
    }
    const checkPlayerWin = () => {
        for (let h = 0; h < numHeight; h++) {
            for (let w = 0; w < numWidth; w++) {
                if (arr[h][w - 1] !== 'O' && arr[h][w] === 'X' && arr[h][w + 1] === 'X' && arr[h][w + 2] === 'X' && arr[h][w + 3] === 'X' && arr[h][w + 4] === 'X' && arr[h][w + 5] !== 'O') {
                    console.log('X win ngang')
                    // window.alert('X win')
                    setWinner(playerName1)
                    setStop(false)
                    setShow(true)
                    setAnti(false)
                    // X ngang
                }
                if (arr[h][w] === 'X' && arr[h + 1][w] === 'X' && arr[h + 2][w] === 'X' && arr[h + 3][w] === 'X' && arr[h + 4][w] === 'X') {
                    console.log('X win dọc')
                    // window.alert('X win')
                    setWinner(playerName1)
                    setStop(false)
                    setShow(true)
                    setAnti(false)
                }
                if (arr[h][w] === 'X' && arr[h + 1][w + 1] === 'X' && arr[h + 2][w + 2] === 'X' && arr[h + 3][w + 3] === 'X' && arr[h + 4][w + 4] === 'X') {
                    console.log('X win chéo')
                    // window.alert('X win')
                    setWinner(playerName1)
                    setStop(false)
                    setShow(true)
                    setAnti(false)
                    // Check X chéo \
                }
                if (arr[h][w + 4] === 'X' && arr[h + 1][w + 3] === 'X' && arr[h + 2][w + 2] === 'X' && arr[h + 3][w + 1] === 'X' && arr[h + 4][w] === 'X') {
                    console.log('X win chéo')
                    // window.alert('X win')
                    setWinner(playerName1)
                    setStop(false)
                    setShow(true)
                    setAnti(false)
                    // Check X chéo /
                }
                if (arr[h][w - 1] !== 'X' && arr[h][w] === 'O' && arr[h][w + 1] === 'O' && arr[h][w + 2] === 'O' && arr[h][w + 3] === 'O' && arr[h][w + 4] === 'O' && arr[h][w + 5] !== 'X') {
                    console.log('O win')
                    // window.alert('O win')
                    setWinner(playerName2)
                    setStop(false)
                    setShow(true)
                    setAnti(false)
                    // O ngang
                }
                if (arr[h][w] === 'O' && arr[h + 1][w] === 'O' && arr[h + 2][w] === 'O' && arr[h + 3][w] === 'O' && arr[h + 4][w] === 'O') {
                    console.log('O win dọc')
                    // window.alert('O win')
                    setWinner(playerName2)
                    setStop(false)
                    setShow(true)
                    setAnti(false)
                }
                if (arr[h][w] === 'O' && arr[h + 1][w + 1] === 'O' && arr[h + 2][w + 2] === 'O' && arr[h + 3][w + 3] === 'O' && arr[h + 4][w + 4] === 'O') {
                    console.log('O win chéo')
                    // window.alert('O win')
                    setWinner(playerName2)
                    setStop(false)
                    setShow(true)
                    setAnti(false)
                    // Check O chéo \
                }
                if (arr[h][w + 4] === 'O' && arr[h + 1][w + 3] === 'O' && arr[h + 2][w + 2] === 'O' && arr[h + 3][w + 1] === 'O' && arr[h + 4][w] === 'O') {
                    console.log('O win chéo')
                    // window.alert('O win')
                    setWinner(playerName2)
                    setStop(false)
                    setShow(true)
                    setAnti(false)
                    // Check O chéo /
                }
            }
        }
    }
    // useEffect(() => {
    //     checkPlayerWin()
    // }, [player1Step, player2Step])
    useEffect(() => {
        RenderTable()
        setLoading(false)
    }, [numWidth, numHeight])

    if (loading) {
        return <div>Loading</div>
    }
    return (
        <div className="App">
            <div className='container'>
                <div className='play__zone'>
                    {
                        arr.map((items, indexRow) =>
                            <div key={`row__${indexRow}`} className='row'>
                                {items.map((item, indexCol) =>
                                    <div key={`col__${indexCol}`} className='box'
                                        style={{ backgroundColor: item === 'X' ? '#dc3545' : item === 'O' ? '#007bff' : 'white', color: 'white' }}
                                        onClick={() => handleBox(indexRow, indexCol)}>
                                        <span>{item}</span>
                                    </div>
                                )}
                            </div>
                        )
                    }
                    <div className='anti' style={{ display: anti ? 'none' : 'block' }}>

                    </div>
                    <div className="modal" style={{ display: show ? 'flex' : 'none' }}>
                        {
                            winner.length !== 0 ?
                                <>
                                    <span>Người chiến thắng là {winner}</span>
                                    <span>Thời gian của ván đấu là: {minute}:{second === 0 ? '00' : second}</span>
                                </>
                                : <span>Hoà</span>
                        }
                        <button style={{
                            width: '100px', height: 30, backgroundColor: '#007bff',
                            borderRadius: 10, border: 'none', color: 'white', alignSelf: 'end', marginTop: 'auto'
                        }} onClick={() => setShow(false)}>Ok</button>
                    </div>

                </div>
                <div className='info'>
                    <div className="info__title">
                        <h1>Caro</h1>
                    </div>
                    <div className='info__input'>
                        <div className='player__input'>
                            <label htmlFor="">Player 1</label>
                            <input type="text" defaultValue={playerName1} onChange={(e) => setPlayerName1(e.target.value)} disabled={anti} />
                        </div>
                        <div className='player__input'>
                            <label htmlFor="">Player 2</label>
                            <input type="text" defaultValue={playerName2} onChange={(e) => setPlayerName2(e.target.value)} disabled={anti} />
                        </div>

                    </div>
                    <div className='stepRow'>
                        <div className='step__title'>
                            <span>Độ rộng của bàn cờ</span>
                        </div>
                        <div className="stepRow-box">
                            <span >Hàng ngang: </span>
                            <input style={{ width: '100px' }} type="number" name='numWidth' defaultValue={numWidth} onBlur={(e) => setNumWidth(e.target.value)} disabled={anti} />

                        </div>
                        <div className="stepRow-box">
                            <span>Hàng dọc: </span>
                            <input style={{ width: '100px' }} type="number" name='numHeight' defaultValue={numHeight} onBlur={(e) => setNumHeight(e.target.value)} disabled={anti} />
                        </div>
                    </div>
                    <div className='time'>
                        <div>
                            <h2>Time</h2>
                        </div>
                        <span>{minute}:{second === 0 ? '00' : second}</span>
                    </div>
                    <div className='step'>
                        <div>
                            <span>Lượt đi của: <span style={{ textTransform: 'capitalize' }}>{nextPlayer === 'P1' ? playerName1 : playerName2}</span> </span>
                        </div>
                        <div className='stepRow'>
                            <div className='step__title'>
                                <span>Số lượt đi của 2 người chơi</span>
                            </div>
                            <div className="stepRow-box">
                                <span>{playerName1}: </span>
                                <span>{player1Step}</span>
                                <div style={{ backgroundColor: '#dc3545' }}>
                                    <span>X</span>
                                </div>
                            </div>
                            <div className="stepRow-box">
                                <span>{playerName2}: </span>
                                <span>{player2Step}</span>
                                <div style={{ backgroundColor: '#007bff' }}>
                                    <span>O</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='start'>
                        <button onClick={startGame}>Start Game</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
