import React from 'react';
import './App.css';
import final1 from './images/final-hygiene.png';
import final2 from './images/final-kontaktaufnahme.png';
import final3 from './images/final-quarantaene.png';
import final4 from './images/final-soziales-verhalten.png';
import decisionTreeLogic from './decisionTree.json'
import decisionTreeGermanText from './decisonTreeGerman.json'
import Button from './components/Button'

let firstQuestionKey = 'three'
let startAgainKey = "start-again"
let backKey = "back"
let finalImages = {
  "contact": final1,
  "quarantine": final2,
  "social": final3,
  "hygiene": final4
}

class Question extends React.Component {
  constructor() {
    super()
    this.state = {
      currentKey: firstQuestionKey,
      currentQuestionLogic: decisionTreeLogic[firstQuestionKey],
      currentQuestion: decisionTreeGermanText[firstQuestionKey],
      keysHistory: []
    }
  }

  getTitle = (question) => {
    if (question["title"] != null) {
      return question["title"]
    }
    return question
  }

  goTo = (nextKey) => {
    this.setState((prevState, props) => {
      let newKeysHistory = prevState.keysHistory.concat([prevState.currentKey])
      return {
        currentKey: nextKey,
        currentQuestionLogic: decisionTreeLogic[nextKey],
        currentQuestion: this.getTitle(decisionTreeGermanText[nextKey]),
        keysHistory: newKeysHistory//[...prevState.keysHistory,prevState.currentKey]
      }
    })
  }

  startOver = () => {
    this.setState((prevState, props) => {
      return {
        currentKey: firstQuestionKey,
        currentQuestionLogic: decisionTreeLogic[firstQuestionKey],
        currentQuestion: decisionTreeGermanText[firstQuestionKey],
        keysHistory: []
      }
    })
  }

  makeFinalOptions = () => {
    var finalOptions = []
    if (this.state.currentQuestionLogic != null || this.state.currentKey == null) {
      return finalOptions
    }

    Object.keys(finalImages).forEach(key => {
      let hasTextForImage = decisionTreeGermanText[this.state.currentKey][key] != null
      if (hasTextForImage) {
        finalOptions.push(
          <div key={key+'-div'}>
            <img key={key+'-img'} src={finalImages[key]} className="App-logo" alt="logo"/>
            {this.parseHTMLIn(decisionTreeGermanText[this.state.currentKey][key])}
          </div>
        )
      }
    })
    return finalOptions
  }


  makeOptions = () => {
    var buttons = []
    if (this.state.currentQuestionLogic == null) {
      return buttons
    }
    let optionKeys = Object.keys(this.state.currentQuestionLogic)
    let optionTitles = optionKeys.map (key => decisionTreeGermanText[key])
    let nextSteps = optionKeys.map (key => this.state.currentQuestionLogic[key])
    var i;

    for (i= 0; i<nextSteps.length; i++) {
      let optionTitle = optionTitles[i]
      buttons.push(<Button
        key={optionTitle}
        title={optionTitle}
        onPress={this.goTo}
        next={nextSteps[i]}/>)
    }
    return buttons
  }

  goBack = () => {
    var keysHistory = this.state.keysHistory
    const lastKey = keysHistory.pop()
    this.setState((prevState, props) => {
      return {
        currentKey: lastKey,
        currentQuestionLogic: decisionTreeLogic[lastKey],
        currentQuestion: decisionTreeGermanText[lastKey],
        keysHistory: keysHistory
      }
    })
  }

  parseHTMLIn = (text) => {
    return <div className="Text" dangerouslySetInnerHTML={{__html: text}} />
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            {this.state.keysHistory.length > 0
              ? <Button
                 title={decisionTreeGermanText[backKey]}
                 onPress={() => this.goBack()}/>
              : null
            }

            <Button
              title={decisionTreeGermanText[startAgainKey]}
              onPress={() => this.startOver()}/>
          </div>
          <div>
            {this.parseHTMLIn(this.state.currentQuestion)}
          </div>
          <div>
            {this.makeOptions()}
          </div>
          <div>
            {this.makeFinalOptions()}
          </div>
        </header>
      </div>
    );
  }
}

function App() {

  return (
    <Question/>
  );
}

export default App;
