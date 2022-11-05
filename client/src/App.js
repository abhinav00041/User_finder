import logo from "./logo.svg";
import "./App.css";
import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      results: null,
      search: "",
      showtable: false,
    };
  }
  handleSearchChange = (event) => {
    if(event.target.value === ""){
      this.setState({results:null })
    }
    this.setState({ search: event.target.value });
    fetch(`http://localhost:3001/searchUser/${this.state.search}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ results: data, showtable: true });
        console.warn(data);
      });
  };

  render() {
    return (
      <div className="App">
        <title>UserFinder</title>
        <h1>User Finder</h1>
        <h4>Helps you to search users in github by there names..</h4>
        <input
          className="input"
          type="search"
          placeholder="Search here.."
          value={this.state.search}
          onChange={this.handleSearchChange}
        />
        <p>
          {!this.state.results
            ? null
            : `Total Results: ${this.state.results.total_count}`}
        </p>
        {!this.state.results ? null : (
          <table>
            <thead>
              <tr>
                <th>Sr.no</th>
                <th>Git Handle</th>
                <th>Profile URL</th>
              </tr>
            </thead>
            <tbody>
              {this.state.showtable
                ? this.state.results.items.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.login}</td>
                        <td href={item.url}>{item.url}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
export default App;
