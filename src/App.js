import React from 'react';
import './App.css';
import final1 from './images/final-hygiene.png';
import final2 from './images/final-kontaktaufnahme.png';
import final3 from './images/final-quarantaene.png';
import final4 from './images/final-soziales-verhalten.png';
import decisionTreeLogic from './decisionTree.json'
import decisionTreeGermanText from './decisionTreeTexts/decisonTreeGerman.json'
import decisionTreeSpanishText from './decisionTreeTexts/decisionTreeSpanish.json'
import decisionTreeEnglishText from './decisionTreeTexts/decisionTreeEnglish.json'
import decisionTreeFrenchText from './decisionTreeTexts/decisionTreeFrench.json'
import decisionTreePolishText from './decisionTreeTexts/decisionTreePolish.json'
import Button from './components/Button'

let firstQuestionKey = 'one'
let startAgainKey = "start-again"
let pageTitleKey = "page-title"
let backKey = "back"
let sourceKey1 = "source1"
let sourceKey2 = "source2"
let contactKey = "contact"

let finalImages = {
  "contact": final2,
  "quarantine": final3,
  "social": final4,
  "hygiene": final1
}

const languages = {
  ES: 'Español',
  DE: 'Deutsch',
  EN: 'English',
  FR: 'Français',
  PO: 'Polski'
}

const sourceTexts = {
  [languages.DE] : decisionTreeGermanText,
  [languages.EN] : decisionTreeEnglishText,
  [languages.ES] : decisionTreeSpanishText,
  [languages.FR] : decisionTreeFrenchText,
  [languages.PO] : decisionTreePolishText
}

class Question extends React.Component {
  constructor() {
    super()
    const textSource = sourceTexts[languages.DE]
    this.state = {
      currentKey: firstQuestionKey,
      currentQuestionLogic: decisionTreeLogic[firstQuestionKey],
      currentQuestion: textSource[firstQuestionKey],
      keysHistory: [],
      currentLanguage: languages.DE
    }
  }

  textSource = () => {
    return sourceTexts[this.state.currentLanguage]
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
        keysHistory: newKeysHistory,
        currentLanguage: prevState.currentLanguage
      }
    })
  }

  startOver = () => {
    this.setState((prevState, props) => {
      return {
        currentKey: firstQuestionKey,
        currentQuestionLogic: decisionTreeLogic[firstQuestionKey],
        keysHistory: [],
        currentLanguage: prevState.currentLanguage
      }
    })
  }

  makeFinalOptions = () => {
    var finalOptions = []
    if (this.state.currentQuestionLogic != null || this.state.currentKey == null) {
      return finalOptions
    }

    Object.keys(finalImages).forEach(key => {
      let hasTextForImage = this.textSource()[this.state.currentKey][key] != null
      if (hasTextForImage) {
        finalOptions.push(
          <div key={key+'-div'}>
            <img key={key+'-img'} src={finalImages[key]} className="App-logo" alt="logo"/>
            {this.parseHTMLIn(this.textSource()[this.state.currentKey][key])}
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
    let optionTitles = optionKeys.map (key => this.textSource()[key])
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
        keysHistory: keysHistory
      }
    })
  }

  parseHTMLIn = (text) => {
    return <div className="Text" dangerouslySetInnerHTML={{__html: text}} />
  }

  chooseGerman = () => {
    this.chooseLanguage(languages.DE)
  }

  chooseSpanish = () => {
    this.chooseLanguage(languages.ES)
  }

  chooseEnglish = () => {
    this.chooseLanguage(languages.EN)
  }

  chooseFrench = () => {
    this.chooseLanguage(languages.FR)
  }

  choosePolish = () => {
    this.chooseLanguage(languages.PO)
  }

  chooseLanguage = (newLanguge) => {
    this.setState((prevState, props) => {
      return {
        currentLanguage: newLanguge
      }
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <div>
          <Button title="Deutsch" onPress={() => this.chooseGerman()}/>
          <Button title ="English" onPress={() => this.chooseEnglish()}/>
          <Button title="Español" onPress={() => this.chooseSpanish()}/>
          <Button title="Français" onPress={() => this.chooseFrench()}/>
          <Button title="Polski" onPress={() => this.choosePolish()}/>
          <p><strong>{this.textSource()[pageTitleKey]}</strong></p>
          <div className="information">
            <a href="http://www.borhani-harder-hausaerzte.de/hausarztpraxis-am-borsigturm---kontakt.html">
            {this.textSource()[contactKey]}</a>
            &nbsp; • &nbsp;
            <a href="tel: 030 432 20 41">030 432 20 41</a>
            &nbsp;
            <strong>|</strong>
            &nbsp;
            <a href="tel: 030 432 23 29">030 432 23 29</a>
            &nbsp; • &nbsp;
            <a href="mailto: info@hausaerzte-borsigturm.de">
              info@hausaerzte-borsigturm.de
            </a>
          </div>
          <div className="information">
          <p>
          {this.textSource()[sourceKey1]} <a href="https://www.zeit.de/wissen/gesundheit/2020-03/kontakt-erkrankte-covid-19-schutz-tipps">{this.textSource()[sourceKey2]}</a>
          </p>
          <hr></hr>
          </div>
        </div>
        </header>
        <div className="Body">
          <div>
            {this.state.keysHistory.length > 0
              ? <Button
                 title={this.textSource()[backKey]}
                 onPress={() => this.goBack()}/>
              : null
            }
            {this.state.currentKey !== firstQuestionKey &&
              <Button
                title={this.textSource()[startAgainKey]}
                onPress={() => this.startOver()}/>
            }

          </div>
          <div>
            {this.parseHTMLIn(this.getTitle(this.textSource()[this.state.currentKey]))}
          </div>
          <div>
            {this.makeOptions()}
          </div>
          <div>
            {this.makeFinalOptions()}
          </div>
        </div>
        <footer className="information">
        <a href="mailto: praxis-bergmann@web.de">
        {this.textSource()["feedback"]}
        </a>
        </footer>
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
