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

  goToNext = (nextKey) => {
    this.setState((prevState, props) => {
      return {
        currentKey: nextKey,
        currentQuestionLogic: decisionTreeLogic[nextKey],
        currentQuestion: this.getTitle(decisionTreeGermanText[nextKey]),
        keysHistory: prevState.keysHistory + [prevState.currentKey]
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
    if (this.state.currentQuestionLogic != null) {
      return finalOptions
    }

    Object.keys(finalImages).forEach(key => {
      // console.log(this.state.currentKey)
      // console.log(decisionTreeGermanText[this.state.currentKey])
      let hasTextForImage = decisionTreeGermanText[this.state.currentKey][key] != null
      if (hasTextForImage) {
        finalOptions.push(
          <div key={key+'-div'}>
            <img key={key+'-img'} src={finalImages[key]} className="App-logo" alt="logo"/>
            <p key={key+'-text'}>{decisionTreeGermanText[this.state.currentKey][key]}</p>
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
        onPress={this.goToNext}
        next={nextSteps[i]}/>)
    }
    return buttons
  }

  parseHTMLInQuestion = () => {
    const questionSeparatedByNewLines = this.state.currentQuestion.split("\n")

    // const questionSeparatedByBoldMarkup =
    return questionSeparatedByNewLines.map (part => {

      if (part.includes("<strong>")) {
        const partWithoutMarkupFirst = part.replace("<strong>", "")
        const partWithoutMarkupLast = partWithoutMarkupFirst.replace("</strong>", "")
        return <strong key={part+'-question'+Math.random()}><p key={part+'-question'+Math.random()}>{partWithoutMarkupLast}</p></strong>
      } else {
        return <p key={part+'-question'+Math.random()}>{part}</p>
      }
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Button
            title={decisionTreeGermanText[startAgainKey]}
            onPress={this.startOver}/>
          <div>
            {this.parseHTMLInQuestion()}
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
