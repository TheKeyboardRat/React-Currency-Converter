import { useState } from "react";
import Currencies from "./Currencies";
import getRate from "./GetCurrencyConversionRate";
import numberCheck from "./DecimalValidationHelper";

const Preview = (props: any) => {
  const data = props.data;
  return (
    <div className="row">
      <div className="col blockquote">
        {data.fromRate != 0 &&
          <p>1 EUR = {data.fromRate} {data.fromCurrency}</p>
        }
        {data.date != "" &&
          <p>Updated {data.date}</p>
        }
      </div>
      <div className="col blockquote">
        {data.toRate != 0 &&
          <p>1 EUR = {data.toRate} {data.toCurrency}</p>
        }
      </div>
    </div>
  )
}

function App() {

  const defaultVals = {
    fromCurrency: "",
    fromAmount: 0.0,
    toCurrency: "",
    toAmount: 0.0,

    fromRate: 0.0,
    toRate: 0.0,
    date: ""
  };

  const [state, setState] = useState(defaultVals);


  const handleChange = (evt: any) => {
    const name = evt.target.name;
    const value = evt.target.value;

    if (name == "fromAmount" || name == "toAmount") {
        
      console.log(state.toAmount);

      if(state.date != "" && state.fromCurrency != "" && state.toCurrency != "") {
        var otherInput = "";
        var rate = 0;
        if(name == "fromAmount") {
          rate = Number(state.fromRate) / Number(state.toRate);
          otherInput = "toAmount";

        } else {
          rate = Number(state.toRate) / Number(state.fromRate);
          otherInput = "fromAmount"
        }

        var conversion = Math.round(((Number(value) / rate) + Number.EPSILON) * 100) / 100

        setState({
          ...state,
          [name]: value,
          [otherInput]: conversion
        })
      }
    }
    else {
      let rateSelector = "";
      let fetchDate = "date"; 

      switch (name) {
        case "fromCurrency":
          rateSelector = "fromRate";
          break;
        case "toCurrency":
          rateSelector = "toRate";
          break;
      }

      getRate(value).then(result => {
        setState({
          ...state,
          [name]: value,
          [rateSelector]: result[0],
          [fetchDate]: result[1]
        })
      });
    }

  }

  return <div className='container'>
    <form>
      <h1 className='display-5'><u>Currency converter</u></h1>
      <div className='row'>

        <div className='col'>
          <div className='card'>
            <div className='card-body'>
              <p className='text-secondary'>From:</p>
              <select name='fromCurrency' className="form-select" onChange={handleChange}>
                {Object.keys(Currencies).length === 0 ? <option>No items found</option> : null}
                {Object.keys(Currencies).map(key =>
                  <option value={key} key={key}>{Currencies[key]} ({key})</option>
                )}
              </select>
              <input value={state.fromAmount} name='fromAmount' onChange={handleChange} type='input' className='form-control'  onKeyDown={numberCheck}></input>
            </div>
          </div>
        </div>

        <div className='col'>
          <div className='card'>
            <div className='card-body'>
              <p className='text-secondary'>To:</p>
              <select name='toCurrency' className="form-select" onChange={handleChange}>
                {Object.keys(Currencies).length === 0 ? <option>No items found</option> : null}
                {Object.keys(Currencies).map(key =>
                  <option value={key} key={key}>{Currencies[key]} ({key})</option>
                )}
              </select>
              <input value={state.toAmount} name='toAmount' onChange={handleChange} type='input' className='form-control' placeholder='0.00' onKeyDown={numberCheck}></input>
            </div>
          </div>
        </div>

      </div>
    </form>

    <Preview data={state} />
  </div>
}

export default App;