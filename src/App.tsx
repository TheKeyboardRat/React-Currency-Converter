import { useState } from "react";
import Currencies from "./Currencies";
import GetRate from "./GetCurrencyConversionRate";
import NumberCheck from "./DecimalValidationHelper";
import ShowModal from "./SaveCalculationModal";
import DisplayLocalStorage from "./ShowCalculationHistory";

const Preview = (props: any) => {
  const data = props.data;
  return (
    <div className="row">
      <div className="col-10 col-md-6">
        {data.fromRate != 0 &&
          <p className="info-label">1 EUR = {data.fromRate} {data.fromCurrency}</p>
        }

      </div>
      <div className="col-10 col-md-6">
        {data.toRate != 0 &&
          <p className="info-label">1 EUR = {data.toRate} {data.toCurrency}</p>
        }
      </div>
      <div className="row">
        <div className="col">
          {data.date != "" &&
            <p className="date-badge">Updated {data.date}</p>
          }
        </div>
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

    var currentInputValue = 0;
    var otherInput = "";
    var conversion = 0;
    var rate = 0;
    var conversion = 0;

    if (state.date != "" && state.fromCurrency != "" && state.toCurrency != "") {

      if (name == "fromAmount" || name == "fromCurrency") {
        rate = Number(state.fromRate) / Number(state.toRate);
        otherInput = "toAmount";
        if(name == "fromAmount") {
          currentInputValue = value;
        }
        else {
          currentInputValue = state.fromAmount;
        }
        
      }
      else {
        rate = Number(state.toRate) / Number(state.fromRate);
        otherInput = "fromAmount";
        if(name == "toAmount") {
          currentInputValue = value;
        }
        else {
          currentInputValue = state.toAmount;
        }
      }
      conversion = Math.round(((Number(currentInputValue) / rate) + Number.EPSILON) * 100) / 100
    }

    if (name == "fromAmount" || name == "toAmount") {

      setState({
        ...state,
        [name]: value,
        [otherInput]: conversion
      })
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

      GetRate(value).then(result => {
        setState({
          ...state,
          [name]: value,
          [rateSelector]: result[0],
          [fetchDate]: result[1],
          [otherInput]: conversion
        })
      });
    }

  }

  return <div className='container'>
    <form>
      <h1>Currency converter</h1>
      <div className='row justify-content-evenly'>
        <div className='col-12 col-md-6'>
          <div className='card mt-3'>
            <div className='card-body'>
              <p className='text-secondary'>From:</p>
              <select name='fromCurrency' className="form-select mb-3" onChange={handleChange}>
                {Object.keys(Currencies).length === 0 ? <option>No items found</option> : <option value={"default"} >Please select</option>}
                {Object.keys(Currencies).map(key =>
                  <option value={key} key={key}>{Currencies[key]} ({key})</option>
                )}
              </select>
              <input value={state.fromAmount} name='fromAmount' onChange={handleChange} type='input' className='form-control form-control-lg txt-input' onKeyDown={NumberCheck}></input>
            </div>
          </div>
        </div>

        <div className='col-12 col-md-6'>
          <div className='card mt-3'>
            <div className='card-body'>
              <p className='text-secondary'>To:</p>
              <select name='toCurrency' className="form-select mb-3" onChange={handleChange}>
                {Object.keys(Currencies).length === 0 ? <option>No items found</option> : <option value={"default"}>Please select</option>}
                {Object.keys(Currencies).map(key =>
                  <option value={key} key={key}>{Currencies[key]} ({key})</option>
                )}
              </select>
              <input value={state.toAmount} name='toAmount' onChange={handleChange} type='input' className='form-control form-control-lg txt-input' placeholder='0.00' onKeyDown={NumberCheck}></input>
            </div>
          </div>
        </div>

      </div>
    </form>
    <Preview data={state} />
    <div className="row">
      <div className="col">
        <ShowModal data={state}/>
      </div>
    </div>
    <hr></hr>
    <DisplayLocalStorage/>
  </div>
}

export default App;