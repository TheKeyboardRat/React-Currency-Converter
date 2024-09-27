function DisplayLocalStorage() {

    var local = localStorage.getItem("history");

    if (local == null) return;

    var jsonObjects = JSON.parse(local);

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Source</th>
                    <th scope="col">Conversion</th>
                    <th scope="col">Rates from</th>
                    <th scope="col">Saved</th>
                    <th scope="col">Notes</th>
                </tr>
            </thead>
            <tbody>
                {
                    jsonObjects.map((object:any) => {
                        return (
                            <tr>
                                <td>{object[1]} {object[0]}</td>
                                <td>{object[3]} {object[2]}</td>
                                <td>{object[4]}</td>
                                <td>{object[5]}</td>
                                <td><p></p>{object[6]}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}
export default DisplayLocalStorage