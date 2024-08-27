import './App.css';

function App() {
  const matrix = [
    ['>', '-', '-', '-', 'A', '-', '@', '-', '+'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['+', '-', 'U', '-', '+', ' ', ' ', ' ', 'C'],
    ['|', ' ', ' ', ' ', '|', ' ', ' ', ' ', '|'],
    ['s', ' ', ' ', ' ', 'C', '-', '-', '-', '+'],
  ];

  const matrixColLength = matrix.length;
  const matrixRowLength = matrix[0].length;

  const findRightPathOfMatrix = (
    matrix,
    currColInd,
    currRowInd,
    currDirection
  ) => {
    const currChar = matrix[currColInd][currRowInd];

    let nextRowInd = currRowInd;
    let nextColInd = currColInd;
    let newDirection = currDirection;

    let possibleTurn = /^[A-Z+]$/.test(currChar);

    let shouldStop = currChar === 's';

    if (possibleTurn) {
      //! direction is right ->
      if (currDirection === 'r') {
        //? if the curr col is the fist one ->
        if (currColInd === 0) {
          //? if we have valid character at position bellow ->
          if (matrix[currColInd + 1][currRowInd] != ' ') {
            nextColInd += 1;
            newDirection = 'd';
          }

          //? if we are at the bottom ->
        } else if (currColInd === matrixColLength - 1) {
          if (matrix[currColInd - 1][currRowInd] != ' ') {
            nextColInd -= 1;
            newDirection = 'd';
          }

          // ? if we are not on top or bottom ->
        } else {
          if (matrix[currColInd - 1][currRowInd] != ' ') {
            nextColInd -= 1;
            newDirection = 'd';
          } else if (matrix[currColInd + 1][currRowInd] != ' ') {
            nextColInd += 1;
            newDirection = 'd';
          }
        }

        //! direction is down ->
      } else if (currDirection === 'd') {
        //? if we are on the right end ->
        if (currRowInd === matrixRowLength - 1) {
          if (matrix[currColInd][currRowInd - 1] != ' ') {
            nextRowInd -= 1;
            newDirection = 'l';
          }

          // ? if we are on the starting left side
        } else if (currRowInd === 0) {
          if (matrix[currColInd][currRowInd + 1] != ' ') {
            nextRowInd += 1;
            newDirection = 'l';
          }
        } else {
          if (matrix[currColInd][currRowInd + 1] != ' ') {
            nextRowInd += 1;
            newDirection = 'l';
          } else if (matrix[currColInd][currRowInd - 1] != ' ') {
            nextRowInd -= 1;
            newDirection = 'l';
          }
        }

        // ! direction left ->
      } else if (currDirection === 'l') {
        // ? if we are on the bottom ->
        if (currColInd === matrixColLength) {
          if (matrix[currColInd + 1][currRowInd] != ' ') {
            nextColInd += 1;
            newDirection = 'd';
          }

          // ? top
        } else if (currColInd === 0) {
          if (matrix[currColInd + 1][currRowInd] != ' ') {
            nextColInd += 1;
            newDirection = 'd';
          }
        } else {
          if (matrix[currColInd - 1][currRowInd] != ' ') {
            nextColInd -= 1;
            newDirection = 'up';
          } else if (matrix[currColInd + 1][currRowInd] != ' ') {
            nextColInd += 1;
            newDirection = 'd';
          }
        }

        // ! Direction up ->
      } else if (currDirection === 'up') {
        // ? if we are on the starting left side ->
        if (currRowInd === 0) {
          if (matrix[currColInd][currRowInd + 1] != ' ') {
            newDirection = 'r';
          }

          // ? if we are on right end of the row ->
        } else if (currRowInd === matrixRowLength - 1) {
          if (matrix[currColInd][currRowInd - 1] != ' ') {
            newDirection = 'l';
          }
        } else {
          if (matrix[currColInd][currRowInd + 1] != ' ') {
            newDirection = 'r';
          }
          if (matrix[currColInd][currRowInd - 1] != ' ') {
            newDirection = 'l';
          }
        }
      }
    }

    if (currChar == '>') {
      nextRowInd += 1;
      newDirection = 'r';
    }

    if (
      currDirection === 'r' &&
      matrix[currColInd][currRowInd + 1] != ' ' &&
      matrix[currColInd][currRowInd] != '+'
    ) {
      nextRowInd += 1;
    }

    if (
      currColInd < matrixColLength - 1 &&
      currDirection === 'd' &&
      matrix[currColInd + 1][currRowInd]
    ) {
      nextColInd += 1;
    }

    if (currDirection === 'up' && matrix[currColInd][currRowInd] === '+') {
      newDirection = 'l';
      nextRowInd -= 1;
    }

    if (
      currDirection === 'l' &&
      currRowInd > 0 &&
      matrix[currColInd][currRowInd - 1] != ' '
    ) {
      nextRowInd -= 1;
    }

    if (
      currRowInd > 0 &&
      currDirection === 'up' &&
      matrix[currColInd - 1][currRowInd] != ' '
    ) {
      nextColInd -= 1;
    }

    return {
      nextRowInd,
      nextColInd,
      shouldStop,
      newDirection,
    };
  };

  let currDirection;
  let currRowInd = 0;
  let currColInd = 0;
  let path = [];
  let letters = [];

  let count = 0;

  while (true) {
      count++;
    
    if (count >= 66) {
        break; 
    }
    const { nextRowInd, nextColInd, shouldStop, newDirection } =
      findRightPathOfMatrix(matrix, currColInd, currRowInd, currDirection);

    const currChar = matrix[currColInd][currRowInd];

    if (currChar != ' ') {
      path.push(currChar);
    }

    if (/^[A-Z]$/.test(currChar)) {
      letters.push(currChar);
    }

    if (shouldStop) {
      break;
    }

    currRowInd = nextRowInd;
    currColInd = nextColInd;
    currDirection = newDirection;
  }

  console.log(path);
  console.log(letters);

  return (
    <>
      <div>
        <p>{path}</p>
      </div>
    </>
  );
}

export default App;
