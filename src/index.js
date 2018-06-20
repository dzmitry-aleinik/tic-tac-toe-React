import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

class Square extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        value: 1
    };
  }
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

function RefreshButton(props) {
  return (
    <button className="but" onClick={() => props.onClick()}>
      Refresh
    </button>
  );
}

class Board extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isX: true
    }
  }

  handleClick(i) {
    if (!this.checkGameStatus(this.state.squares)) {
      if (this.state.squares[i] == null) {  
        const squares = this.state.squares.slice();
        squares[i] = this.state.isX ? 'X' : 'O';
        this.setState(
          {
            squares: squares,
            isX: !this.state.isX
          }
        );
    
      }
    }
    alert(this.state);
  }

  refreshGame() {
    this.setState(
      {
        squares: Array(9).fill(null),
        isX: true
      }
    );
  }
  
  checkGameStatus(squares) {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [6,4,2]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a,b,c] = lines[i];
      if (squares[a] === 'X' && squares[b] === 'X' && squares[c] === 'X') {
        return 'X';
      }
      if(squares[a] === 'O' && squares[b] === 'O' && squares[c] === 'O') {
        return 'O';
      }
    }

    if (squares.every((value) => value != null)) {
      return 'N';
    }
    
    return null;
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  } 

  render() {
    const gameStatus = this.checkGameStatus(this.state.squares);
    let status;
    if (gameStatus === 'X' || gameStatus === 'O') {
      status = 'Winner:   ' + gameStatus;
    } else if (gameStatus === 'N') {
      status = 'No winner';
    } else {
      status = 'Next player: ' + (this.state.isX ? 'X' : 'O');
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div> 
        <RefreshButton onClick={() => this.refreshGame()}/>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
