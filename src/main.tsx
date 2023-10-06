import React, { useState } from 'react';

type ResultType = {
  [key: string]: number; // Add index signature
};

const Main = () => {
  const [inputText, setInputText] = useState<string>('');
  const [result, setResult] = useState<ResultType>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputText) {
      alert('Please input texts!');
      return;
    }
    
    const url = 'http://localhost:4000/dev/test';

    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: inputText
      }).then(response => response.json())
      .then(result => {
        setResult(result);
      })
      .catch(error => {
        console.error(error);
      });
    } catch (error: any) {
      throw new Error(error);
    }
   
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor="inputtext" className='control-label'>Input Text</label>
          <textarea 
            className='bg-gray'
            name='input_text'
            value={inputText} 
            onChange={(e) => setInputText(e.target.value)} 
            cols={50}
            rows={10}
          ></textarea>
        </div>
        <div className='form-group'>
          <label htmlFor="results" className='control-label'>Results</label>
          <div className='results bg-gray'>
            Noun: {result.noun || 0}<br />
            Verb: {result.verb || 0}<br />
            Adjective: {result.adjective || 0}<br />
            Adverb: {result.adverb || 0}<br />
            Preposition: {result.preposition || 0}<br />
            Conjunction: {result.conjunction || 0}<br />
            Pronoun: {result.pronoun || 0}<br />
            Interjection: {result.interjection || 0}<br />
            Determiner: {result.determiner || 0}<br />
            Numeral: {result.numeral || 0}<br />
          </div>
        </div>
        <div className='form-group'>
          <button type="submit" className='bg-gray'>Submit</button>
        </div>
      </form>
    </div>
  );
};


export default Main;