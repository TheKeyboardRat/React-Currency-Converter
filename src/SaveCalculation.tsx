function SaveToLocalStorage  (props: any, message: string) {
    const data = props.data;
    const date = new Date().toLocaleDateString().toString();
  
    let history = localStorage.getItem("history");
    let historyItems = history ? JSON.parse(history) : [];
  
    let newEntry = [data.fromCurrency, data.fromAmount, data.toCurrency, data.toAmount, data.date, date, message];
    historyItems.push(newEntry);
    localStorage.setItem("history", JSON.stringify(historyItems));
  }

  export default SaveToLocalStorage