      /* Score object
      let score = {
        wins: 0,
        losses: 0,
        ties: 0
      }; */
      //parsin JSON back to normal and setting a default
      let score = JSON.parse(localStorage.getItem('score')) || {
        wins: 0,
        losses: 0,
        ties: 0
      };

      updateScoreElement();

      function pickComputerMove() {
        let compMove = '';
        const randomNum = Math.random();
        if (randomNum >= 0 && randomNum < 1/3) {
          compMove = 'Rock';
        } else if (randomNum >= 1/3 && randomNum < 2/3) {
          compMove = 'Paper';
        } else {
          compMove = 'Scissors';
        }
        return compMove;
      } 

      let isAutoPlaying = false;
      let intervalId;
      function autoPlay() {
        if (!isAutoPlaying) {
           intervalId = setInterval(function() {
            const playerMove = pickComputerMove();
              playGame(playerMove);
          }, 1000);
          isAutoPlaying = true;
        }else {
          clearInterval(intervalId);
          isAutoPlaying = false;
        }
      }

      document.querySelector('.js-rock-button').addEventListener('click', () => {
        playGame('Rock');
      });

      document.querySelector('.js-paper-button').addEventListener('click', () => {
        playGame('Paper');
      });

      document.querySelector('.js-scissors-button').addEventListener('click', () => {
        playGame('Scissors');
      });

      document.body.addEventListener('keydown', (event) => {
        if(event.key === 'r') {
          playGame('Rock');
        } else if (event.key === 'p') {
          playGame('Paper')
        } else {
          playGame('Scissors')
        }
      });

      function playGame(playerMove) {
        const compMove = pickComputerMove();
        let result = '';

        if (playerMove === 'Scissors') {
          if (compMove === 'Rock') {
            result = 'You lose';
          } else if (compMove === 'Paper') {
            result = 'You win';
          } else {
            result = `It's a tie!`;
          }
        } else if (playerMove === 'Rock') {
          if (compMove === 'Rock') {
            result = `It's a tie!`;
          } else if (compMove === 'Paper') {
            result = 'You lose';
          } else {
            result = 'You win';
          }
        } else if (playerMove === 'Paper') {
          if (compMove === 'Rock') {
            result = 'You win';
          } else if (compMove === 'Paper') {
            result = `It's a tie!`;
          } else {
            result = 'You lose';
          }
        }
      
        // Update score based on result
        if (result === 'You win') {
          score.wins += 1;
        } else if (result === 'You lose') {
          score.losses += 1;
        } else if (result === `It's a tie!`) {
          score.ties += 1;
        }
          updateScoreElement();

          //localstroge for keeping the score saved
        localStorage.setItem('score', JSON.stringify(score));

        document.querySelector('.js-result').innerHTML = result;

        document.querySelector('.js-moves').innerHTML = `You
        <img src="images/${playerMove}-emoji.png" class="move-icon">
        <img src="images/${compMove}-emoji.png" class="move-icon">
        Computer`;
        }

        function updateScoreElement() {
          document.querySelector('.js-score').innerHTML = `Score: Wins - ${score.wins}, Losses - ${score.losses}, Ties - ${score.ties}`;
      }