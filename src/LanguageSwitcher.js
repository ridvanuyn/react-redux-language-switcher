import React from 'react';
import {createStore} from 'redux';

import {deepFreeze} from 'deep-freeze'


const translations = {
    'en': {
      'text1': 'Choose your language:',
      'text2': 'Language'
    },
    'tr': {
      'text1': 'Dil Seçiniz:',
      'text2': 'Türkçe'
    }
  }
  
//get transition from

  const getTranslation = (lang, text) => {
    return translations[lang][text];
  }

  //Combined reducer 

  const allLanguages = [
    { code: 'en',name: 'English'},
    { code: 'tr', name: 'Türkçe'}
  ]
  
  //actions 

const languages = (state = 'en', action) => {
    switch (action.type) {
      case 'CHANGE_LANGUAGE':
        return action.language;
      default:
        return state;
    }
  };
  
 
  const store = createStore(languages);
  

  const LanguageSelector = () => {
    const options = allLanguages.map(language => {
      return <option value={language.code}>{language.name}</option>
    });
  
    return (
      <select 
        onChange={(e) => {
          store.dispatch({
            type: 'CHANGE_LANGUAGE',
            language: e.target.value
          })
        }}
      >
        {options}
      </select>
    );
  }
  
  export default class LanguageSwitcher extends React.Component {
    componentDidMount() {
      store.subscribe(() => this.forceUpdate());
    }
    
    render () {
      return (
        <div>
          <p>
            {getTranslation(
              store.getState(), 
              'text1'
            )}
          </p>
          <LanguageSelector />
        </div>
      );
    }
  };
  