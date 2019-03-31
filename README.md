# Word Play #

This project dons back to the days of pen and paper "_Hangman_", just without the dangling stick-figure.  Instead, the player has six _hearts_ to represent how many incorrect guesses they have.  For each incorrect guess, a heart is removed.  The game concludes when no hearts remain, or the full word has been uncovered.

Players may also choose, once per puzzle, to attempt to solve the puzzle in one go by making use of the _`Solve Now!`_ button.  This will reveal an `input` box where the player may enter any letters they wish (there is no size limit).  However, the letters will be checked in the order they are entered.  If the player runs out of guesses while processing the input, the game will end and no further processing will occur.
  - > Example:
    >
    > Solution: "ABIDE"
    > 
    > INPUT: "ABODE"
    >
    > The game will check each letter, in sequence, and mark _`O`_ as a missed guess since it is not part of the solution.  This will result in the player loosing one heart.
  - > Example 2:
    > 
    > Solution: "OLEINES"
    >
    > INPUT: "ORLANDO"
    >
    > This will result is a loss of `3` hearts; one for `R`, `A`, and `D`.  Multiple entries of the same missed guess will only count as a single miss.
    
The game is split into two sections, the "Solution" area where the puzzle, number of guesses, and _`Solve Now!`_ button are all displayed, and the "Keyboard" area consisting of tiles for each letter of the alphabet.  Upon selecting a tile, it will deactivate, represented by being greyed out.

-----

# How to Setup

To run this project, clone the project into a fresh directory, and run `npm install` in the new directory to install the dependencies.

```
~$ git clone git@github.com:mdavis93/word-play.git
~$ cd word-play
word-play$ npm install
```

There are no databases to setup, nor are there any server-side components to configure.  This project is client-side only.  Once the dependencies are installed, the project is ready for launch.  Launch the project with `npm start` to begin!

- ### File Structure ###
  - The file structure for this project is as follows:

    ```
    word-play
    |_public
    |_src
      |_api
      |_components
      |_styles
    ```
---

# Project History

### March 31, 2019
- Added formula to calculate difficulty progression
- Added placeholder to demonstrate possible banner ad placement
- Refactored API call full dictionary, instead of limiting to only 10 words, allowing for a larger variety of words
- Added ability for players to try to guess the full word in the puzzle, once per puzzle
    - Letters are processed in the order they appear in the text box when submitted
    - If the letter being checked is not in the puzzle, the remaining guesses counter is reduced and processing continues
    - If the player runs out of remaining guesses, processing halts and the game ends
    - If the player uncovers all remaining letters (even if the word entered is incorrect), the player wins
- Renamed several elements to be more semantic in regards to their purpose
- Removed all comment tags
- More CSS fine-tuning

==========

### March 30, 2019
- Refactored components to streamline flow of data, removed redundant methods, and introduced CSS styling
- Created difficulty logic to dynamically increase as the player progresses in the game
- Implemented FontAwesome for the hearts used to represent number of guesses remaining

==========

### March 28, 2019
- Completed initial buildout of ‘GameBoard’ and ‘Keyboard’

- **KNOWN ISSUES**
    - It is possible to click ‘Start New Game’ prior to new word being selected by the API, and propagated accordingly

==========

### March 27, 2019
- **GameBoard**
    - Container for “PlayArea” and “Keyboard”
    - Tracks Guesses, Secret Word, and Lives
    - Tracks whether the game is active or not
    - “Builds” puzzle by separating the secret word into array of objects, and set ‘state.active’ to TRUE
    - Checks if guessed letter is in solution
    - PLANNED:
        - Difficulty Setting
            - EASY: Selected words will be <= 4 letters in length
            - NORMAL: Selected words will be <= 6 letters in length
            - HARD: Selected words will be of any length
            - PHRASES: Only phrases will be selected
        - State to allow for only phrases in the solution
            - TRUE: Only multi-word phrases will be selected
            - FALSE: Only single-word phrases will be selected
- **Keyboard**
    - ‘state.letters’ => An object array of all 26 English letters
        - ‘.found’ => This letter has been chosen, and is in the solution
        - ‘.disabled’ => This letter has been chosen, and is -not- in the solution
        - ‘.value’ => The letter this object represents, in the Capital Case
    - ‘reset()’ => Function to reset ‘Keyboard’ to initial state
    - ‘state.enabled’ => State to track if ‘Keyboard’ is active
        - TRUE: A game is currently active and letters can be selected from the ‘Keyboard’
        - FALSE: No game is active, or the current game has completed. No letters may be selected
- **SolutionArea**
    - ‘props.solution’ => Secret Word, passed in from ‘GameBoard’
    - Display an underline for each letter in solution
    - Display any non-alphabetical characters automatically
    - ‘props.discovered’ => Prop for whether the letter has been found
        - TRUE: Player discovered this letter, display it
        - FALSE: Player has -not- discovered this letter, display an underscore (“_”).
- **LivesDisplay**
    - Display initial state of six lives
    - Subtract one life per missed guess
    - PLANNED:
        - Traditional “Hangman” artwork at various stages of incorrect guesses

==========

### March 26, 2019
- Designated Play Area and Separate “Keyboard” area
- Keyboard area looks like “tiles”
- Play Area shows letters as “?” until found
- LetterTile Component used for both Play Area and Keyboard
    - LetterTile object properties differentiate “Play Area” letters from “Keyboard” tiles
    - Styling will be based on ‘.isTray’ property of LetterTile object
- GameBoard Component tracks letters in secret word, and processes all guesses
- LetterTray Component (the “Keyboard”) tracks guesses


**Notes:**

- LetterTile component getting cluttered, may need to separate “Keyboard” and “GameArea” letters
- Scope of Responsibility has a large amount of “Code Smell” throughout App
- Reduced Project to skeleton and restructured.
