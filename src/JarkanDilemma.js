import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  button: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    marginBottom: '0.5em',
  },
  thinking: {
    backgroundColor: 'black',
    color: 'white',
    padding: '1em',
    display: 'inline-block',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
  loader: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
};

const newState = {
  hasDecided: false,
  isThinking: false,
  decision: '',
};

class JarkanDilemma extends Component {
  constructor() {
    super();
    this.state = newState;
    this.think = this.think.bind(this);
    this.thinkingScreen = this.thinkingScreen.bind(this);
    this.startScreen = this.startScreen.bind(this);
    this.endScreen = this.endScreen.bind(this);
    this.reset = this.reset.bind(this);
  }

  think() {
    this.setState({ isThinking: true });
  }

  thinkingScreen() {
    return (
      <div>
        <p style={styles.thinking}>Arvotaan päätöstä...</p>
        <CircularProgress size={50} style={styles.loader} />

        <p>Mihin toivot, että arpa lankeaa?</p>

        <Button
          variant="contained"
          color="primary"
          onClick={() => this.endScreen('Mene yliopistolle syömään ja sieltä Valohuoneelle')}
          style={styles.button}
        >
          Yliopistolle syömään ja sieltä Valohuoneelle
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.endScreen('Mene suoraan Valohuoneelle')}
          style={styles.button}
        >
          Suoraan Valohuoneelle
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.endScreen('Jää kotiin')}
          style={styles.button}
        >
          Jään kotiin
        </Button>
      </div>
    );
  }

  startScreen() {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={this.think}
        style={styles.button}
      >
        Aloita
      </Button>
    );
  }

  endScreen(text) {
    this.setState({ isThinking: false, hasDecided: true, decision: text })

    return (
      <div>
        <h2>Päätös on tehty!</h2>
        <p>Tee seuraavasti:</p>
        <p>{text}</p>
      </div>
    );
  }

  reset() {
    this.setState(newState);
  }

  render() {
    const final = (
      <div>
        <h2>Päätös on tehty!</h2>
        <p>Tee seuraavasti:</p>
        <p>{this.state.decision}</p>


        <Button
          variant="contained"
          color="default"
          onClick={this.reset}
          style={styles.button}
        >
          Uudestaan?
        </Button>
      </div>
    );

    let content = this.startScreen();
    if (this.state.isThinking && !this.state.hasDecided) {
      content = this.thinkingScreen();
    } else if (this.state.hasDecided) {
      content = final;
    }

    return (
      <div>
        <h1>Jarkan dilemma</h1>
        {content}
      </div>
    );
  }
}

export default JarkanDilemma;
