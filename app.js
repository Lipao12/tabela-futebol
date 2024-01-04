import bodyParser from "body-parser";
import 'dotenv/config';
import express from "express";
import { ordenarTimes } from './utils.js';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const times = [
  {
    "name": "Vasco",
    "vitorias": 7,
    "empates": 0,
    "derrotas": 2,
    "golsFeitos": 12,
    "golsTomados": 8,
  },
  {
    "name": "Flamengo",
    "vitorias": 0,
    "empates": 2,
    "derrotas": 7,
    "golsFeitos": 18,
    "golsTomados": 10,
  },
  {
    "name": "Fluminense",
    "vitorias": 3,
    "empates": 1,
    "derrotas": 5,
    "golsFeitos": 10,
    "golsTomados": 15,
  },
  {
    "name": "Botafogo",
    "vitorias": 2,
    "empates": 2,
    "derrotas": 5,
    "golsFeitos": 7,
    "golsTomados": 12,
  },
  {
    "name": "Madureira RJ",
    "vitorias": 2,
    "empates": 2,
    "derrotas": 5,
    "golsFeitos": 7,
    "golsTomados": 12,
  },
  {
    "name": "Boavista RJ",
    "vitorias": 2,
    "empates": 4,
    "derrotas": 3,
    "golsFeitos": 9,
    "golsTomados": 12,
  },
  {
    "name": "Bangu",
    "vitorias": 3,
    "empates": 2,
    "derrotas": 4,
    "golsFeitos": 7,
    "golsTomados": 12,
  },
];

const rodadas = [
  {
    numero: 1,
    jogos: [
      { timeCasa: "TimeA", timeVisitante: "TimeB", data: "2024-01-10" },
      { timeCasa: "TimeC", timeVisitante: "TimeD", data: "2024-01-11" },
      { timeCasa: "TimeC", timeVisitante: "TimeD", data: "2024-01-11" },
      // Adicione mais jogos conforme necessário
    ],
  },
  {
    numero: 2,
    jogos: [
      { timeCasa: "TimeC", timeVisitante: "TimeD", data: "2024-01-11" },
      // Adicione mais jogos conforme necessário
    ],
  },
  // Adicione mais rodadas conforme necessário
];

const config = {
  headers: {
    'X-Auth-Token': process.env.API_TOKEN,
  },
};

let currentRodadaIndex = 0; 

app.get("/", async (req, res) => {
  const requestedRodadaIndex = parseInt(req.query.ant) || parseInt(req.query.prox) || currentRodadaIndex;
  const validRodadaIndex = Math.max(0, Math.min(requestedRodadaIndex, rodadas.length - 1));

  console.log(req.query, req.body)

  try {
    /*const result = await axios.get("https://api.football-data.org/v4/competitions/PL",
    config);
    console.log(result.data.seasons[1])*/
    const timesOrdenados = ordenarTimes(times);
    res.render("home.ejs", { times: timesOrdenados, currentRodadaIndex: validRodadaIndex, rodadaAtual: rodadas[validRodadaIndex] });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    /*res.render("home.ejs", {
      error: error.message,
    });*/
  }
});


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
