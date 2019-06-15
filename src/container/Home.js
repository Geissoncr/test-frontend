import React, { Component } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";

class Home extends Component {
  state = {
    anualResults: [],
    anualPercentage: [],
    timeData: []
  };
  async componentWillMount() {
    const resultado1 = await axios.get(
      "https://private-afe609-testefront.apiary-mock.com/anual-result"
    );
    const resultado2 = await axios.get(
      "https://private-afe609-testefront.apiary-mock.com/anual-percentage"
    );
    const resultado3 = await axios.get(
      "https://private-afe609-testefront.apiary-mock.com/time-data"
    );
    console.log(" resultado 1: " + JSON.stringify(resultado1.data));
    this.setState({
      anualResults: resultado1.data,
      anualPercentage: resultado2.data,
      timeData: resultado3.data
    });
  }
  200;
  montaTela() {
    const optionsAnual = {
      responsive: true,
      legend: { display: false },
      title: {
        display: true,
        text: "Grafico de Barras",
        position: "top",
        fontFamily: "arial",
        fontSize: 20
      }
    };
    const optionsPercentage = {
      responsive: true,
      legend: { display: false },
      title: {
        display: true,
        text: "BARS CHART",
        position: "top",
        fontFamily: "arial",
        fontSize: 20
      }
    };
    const dataAnual = {
      labels: this.state.anualResults.map(label => label.label.substring(0, 3)),
      datasets: [
        {
          label: "Bars Chart",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: this.state.anualResults.map(valor => valor.value)
        }
      ]
    };
    const dataPie = {
      labels: this.state.anualPercentage.map(label => label.label),
      datasets: [
        {
          data: this.state.anualPercentage.map(valor => valor.value),
          backgroundColor: ["#ABE1FA", "#32B88B", "#2C82BE"]
        }
      ]
    };
    return (
      <div style={{ width: "600px" }}>
        <Bar data={dataAnual} options={optionsAnual} />
        <Pie data={dataPie} options={optionsPercentage} />
      </div>
    );
  }

  render() {
    return this.state.anualResults.length > 0 ? (
      <div> {this.montaTela()}</div>
    ) : (
      <div>Preparando os Dados .............</div>
    );
    //   <div style={{ width: "1000px" }}>
    //     <p>Lista de Retorno: </p>
    //     <Bar data={data} options={options} />
    //   </div>
  }
}

export default Home;
