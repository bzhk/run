import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert, Dimensions} from 'react-native';
import config from '../data/board';
import PlayerControlls from './PlayerControlls';
import Player from './Player';
import Board from './Board';
import BoardItem from './BoardItem';
interface Events {
  id: number;
  x: number;
  y: number;
  rotation: string;
  label: string;
}
interface Controller {
  x: number;
  y: number;
  rotation: string;
  label: string;
}
interface Props {}
interface State {
  level: number;
  board: string[][];
  events: Events[];
  enemyMoves: {[key: string]: boolean};
  controllers: Controller[];
  playerIndexR: number;
  playerIndexC: number;
  screenWidth: number;
  boardWidth: number;
  boardMargin: number;
  cellWidth: number;
  stamina: number;
  controllerParsed: boolean;
  reseting: boolean;
}

export default class GameView extends Component<Props, State, Events> {
  [x: string]: any;
  state: State;
  constructor(props: Props) {
    super(props);
    const width: number = Math.round(Dimensions.get('window').width);
    const boardWidth: number = width * 0.8;
    const boardMargin: number = width * 0.1;
    const cellWidth: number = boardWidth / 9;
    this.state = {
      controllerParsed: false,
      level: 1,
      board: [],
      events: [],
      enemyMoves: {},
      controllers: [],
      playerIndexR: 0,
      playerIndexC: 0,
      screenWidth: width,
      boardWidth: boardWidth,
      cellWidth: cellWidth,
      boardMargin: boardMargin,
      stamina: 10,
      reseting: false,
    };
  }

  componentDidMount(): void {
    const levels: {[key: number]: string[][]} = config.levels;
    const index: number = this.state.level;
    let board = levels[index];
    this.parseBoard(board);
    this.setState({
      board: board,
    });
  }

  newEvent = (
    x: number,
    y: number,
    rotation: string,
    label: string,
    id: number,
  ): Events => {
    return {id, x, y, rotation, label};
  };

  parseBoard = (board: string[][]): Promise<void> => {
    return new Promise(
      async (resolve, reject): Promise<void> => {
        const newEvents: Events[] = [];
        board.forEach((row: string[], r_index: number) => {
          row.forEach(async (cell: string, c_index: number) => {
            const id = newEvents.length + 1;
            if (cell == 'S') {
              await this.setState({
                playerIndexR: r_index,
                playerIndexC: c_index,
              });
              this.setControlers(r_index, c_index, board);
            }
            if (cell === 'Z') {
              newEvents.push(this.newEvent(r_index, c_index, '', 'Z', id));
            }
            if (cell == 'D') {
              newEvents.push(this.newEvent(r_index, c_index, '', 'D', id));
            }
            if (cell == 'X') {
              newEvents.push(this.newEvent(r_index, c_index, '', 'X', id));
            }
          });
        });
        await this.setState({
          events: newEvents,
        });
        return resolve();
      },
    );
  };

  setControlers = (
    r_index: number,
    c_index: number,
    board: string[][],
  ): void => {
    const controllersBucket: Controller[] = [];
    if (r_index > -1 && r_index < 9) {
      if (board[r_index + 1]) {
        const obstacle = this.state.events
          .filter((elem) => elem.label == 'Z' || elem.label == 'X')
          .findIndex((elem) => elem.x == r_index + 1 && elem.y == c_index);
        if (obstacle === -1) {
          controllersBucket.push({
            x: r_index + 1,
            y: c_index,
            rotation: '90deg',
            label: 'C',
          });
        }
      }

      if (board[r_index - 1]) {
        const obstacle = this.state.events
          .filter((elem) => elem.label == 'Z' || elem.label == 'X')
          .findIndex((elem) => elem.x == r_index - 1 && elem.y == c_index);
        if (obstacle === -1) {
          controllersBucket.push({
            x: r_index - 1,
            y: c_index,
            rotation: '270deg',
            label: 'C',
          });
        }
      }
    }

    if (c_index > -1 && c_index < 9) {
      if (board[r_index][c_index + 1]) {
        const obstacle = this.state.events
          .filter((elem) => elem.label == 'Z' || elem.label == 'X')
          .findIndex((elem) => elem.x == r_index && elem.y == c_index + 1);
        if (obstacle === -1) {
          controllersBucket.push({
            x: r_index,
            y: c_index + 1,
            rotation: '0deg',
            label: 'C',
          });
        }
      }
      if (board[r_index][c_index - 1]) {
        const obstacle = this.state.events
          .filter((elem) => elem.label == 'Z' || elem.label == 'X')
          .findIndex((elem) => elem.x == r_index && elem.y == c_index - 1);
        if (obstacle === -1) {
          controllersBucket.push({
            x: r_index,
            y: c_index - 1,
            rotation: '180deg',
            label: 'C',
          });
        }
      }
    }
    this.setState({
      controllers: controllersBucket,
      controllerParsed: true,
    });
  };

  clearItem = (r_index: number, c_index: number): void => {
    const itemIndex = this.state.events.findIndex((elem) => {
      return elem.x == r_index && elem.y === c_index;
    });
    if (itemIndex > -1) {
      const newEvent = [...this.state.events];
      newEvent.splice(itemIndex, 1);
      this.setState({
        events: newEvent,
      });
    }
  };

  parseEvent = (event: string): Promise<{mod_stamina: number}> => {
    return new Promise((resolve, reject) => {
      const objAfterEvent: {mod_stamina: number} = {mod_stamina: 0};
      switch (event) {
        case 'D':
          objAfterEvent.mod_stamina = 8;
          break;
        case 'M':
          Alert.alert('You won!', `Next level => ${this.state.level + 1}`);
          this.resetLevel(1);
          resolve();
          break;
      }
      resolve(objAfterEvent);
    });
  };

  resetLevel = async (level: number): Promise<void> => {
    const levels: {[key: number]: string[][]} = config.levels;
    let board = levels[level];
    await this.parseBoard(board);
    this.setState({
      board: board,
      stamina: 10,
      reseting: false,
    });
  };

  move = async (
    r_index: number,
    c_index: number,
    board: string[][],
    stamina: number,
  ): Promise<any> => {
    const newStamina = stamina - 1;
    const event = board[r_index][c_index];
    const objAfterEvent = await this.parseEvent(event);
    if (!objAfterEvent) {
      return;
    }
    this.clearItem(r_index, c_index);
    const {mod_stamina} = objAfterEvent;
    if (newStamina + mod_stamina <= 0) {
      Alert.alert(
        'You lose!',
        'Try again.',
        [{text: 'Reset', onPress: () => this.resetLevel(this.state.level)}],
        {cancelable: false},
      );
    }
    this.setState({
      playerIndexR: r_index,
      playerIndexC: c_index,
      stamina: newStamina + mod_stamina,
    });

    this.state.events
      .filter((elem) => elem.label == 'Z')
      .forEach(async (elem, index) => {
        const {x, y, id} = elem;

        const newEnemyMoves = Object.assign(this.state.enemyMoves, {
          [`en_${index}`]: true,
        });

        await this.setState({
          enemyMoves: newEnemyMoves,
        });
        console.log('move enemy - ', index);
        await this.enemyMove(x, y, r_index, c_index, [], index, id);
      });
  };

  enemyMove = async (
    e_x: number,
    e_y: number,
    p_x: number,
    p_y: number,
    lastSteps: {x: number; y: number}[],
    index: number,
    e_id: number,
  ): Promise<void> => {
    const check = this.state.enemyMoves[`en_${index}`];
    if (e_x == p_x && e_y == p_y && check) {
      console.log('ruch pidgeona' + index);

      const path = lastSteps;
      const {x, y} = path[0];

      const events = [...this.state.events];
      const enemyIndex = this.state.events.findIndex((elem) => {
        return elem.id == e_id;
      });

      if (x == p_x && y == p_y) {
        Alert.alert(
          'You was eaten by pigeon! :(',
          'Try again.',
          [{text: 'Reset', onPress: () => this.resetLevel(this.state.level)}],
          {cancelable: false},
        );
      }

      events[enemyIndex] = {
        id: events[enemyIndex].id,
        x,
        y,
        rotation: events[enemyIndex].rotation,
        label: events[enemyIndex].label,
      };

      const newEnemyMoves = Object.assign(this.state.enemyMoves, {
        [`en_${index}`]: false,
      });

      await this.setState({
        enemyMoves: newEnemyMoves,
        events,
      });
      this.setControlers(p_x, p_y, this.state.board);
      return;
    }

    if (!check) {
      return;
    }

    const inc_e_x = e_x + 1;
    const inc_e_y = e_y + 1;
    const desc_e_x = e_x - 1;
    const desc_e_y = e_y - 1;
    const moves = [
      {x: inc_e_x, y: e_y},
      {x: desc_e_x, y: e_y},
      {x: e_x, y: inc_e_y},
      {x: e_x, y: desc_e_y},
    ]
      .sort((a, b) => {
        if (a.x < p_x) {
          return b.x - a.x;
        } else {
          return a.x - b.x;
        }
      })
      .sort((a, b) => {
        if (a.y < p_y) {
          return b.y - a.y;
        } else {
          return a.y - b.y;
        }
      })
      .filter((elem) => {
        return -1 < elem.x && elem.x < 9 && -1 < elem.y && elem.y < 9;
      })
      .filter((elem) => {
        return (
          lastSteps.findIndex((item) => item.x == elem.x && item.y == elem.y) ==
          -1
        );
      })
      .filter((elem) => {
        const conflictMove = this.state.events.findIndex((item) => {
          return (
            item.x == elem.x &&
            item.y == elem.y &&
            item.id != e_id &&
            item.label == 'Z'
          );
        });

        return conflictMove === -1;
      });

    return moves.forEach((elem) => {
      const {x, y} = elem;

      return this.enemyMove(x, y, p_x, p_y, [...lastSteps, elem], index, e_id);
    });
  };

  componentDidUpdate = async () => {
    if (
      this.state.controllerParsed &&
      this.state.controllers.length === 0 &&
      !this.state.reseting
    ) {
      await this.setState({reseting: true});
    }
  };

  render() {
    if (
      this.state.controllerParsed &&
      this.state.controllers.length === 0 &&
      !this.state.reseting
    ) {
      Alert.alert(
        'Pigeons caught you!!!',
        'Try again.',
        [
          {
            text: 'Reset',
            onPress: async () => {
              this.resetLevel(this.state.level);
            },
          },
        ],
        {cancelable: false},
      );
    }
    return (
      <View style={styles.container}>
        {this.state.controllers.map((elem: Controller, index: number) => {
          return (
            <PlayerControlls
              key={index}
              rIndex={elem.x}
              cIndex={elem.y}
              cellWidth={this.state.cellWidth}
              boardMargin={this.state.boardMargin}
              move={() =>
                this.move(elem.x, elem.y, this.state.board, this.state.stamina)
              }
            />
          );
        })}

        {this.state.events.map((elem: Events, index: number) => {
          return (
            <BoardItem
              key={index}
              rIndex={elem.x}
              cIndex={elem.y}
              label={elem.label}
              cellWidth={this.state.cellWidth}
              boardMargin={this.state.boardMargin}
            />
          );
        })}

        <Player
          rIndex={this.state.playerIndexR}
          cIndex={this.state.playerIndexC}
          cellWidth={this.state.cellWidth}
          boardMargin={this.state.boardMargin}
        />
        <Board
          boardMargin={this.state.boardMargin}
          cellWidth={this.state.cellWidth}
          board={this.state.board}
        />
        <Text>Stamina: {this.state.stamina}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#F5FCFF',
  },
});
