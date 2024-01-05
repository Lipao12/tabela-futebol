import bodyParser from "body-parser";
import 'dotenv/config';
import express from "express";
import { ordenarTimes } from './utils.js';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

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
    "golsFeitos": 10,
    "golsTomados": 20,
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
  {
    "name": "Volta Redonda",
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
      { timeCasa: "Vasco", timeVisitante: "Flamengo", data: "2024-03-01" },
      { timeCasa: "Fluminense", timeVisitante: "Botafogo", data: "2024-03-02" },
      { timeCasa: "Madureira RJ", timeVisitante: "Boavista RJ", data: "2024-03-03" },
      { timeCasa: "Bangu", timeVisitante: "Volta Redonda", data: "2024-03-04" },
    ],
  },
  {
    numero: 2,
    jogos: [
      { timeCasa: "Vasco", timeVisitante: "Fluminense", data: "2024-03-05" },
      { timeCasa: "Flamengo", timeVisitante: "Botafogo", data: "2024-03-06" },
      { timeCasa: "Madureira RJ", timeVisitante: "Bangu", data: "2024-03-07" },
      { timeCasa: "Boavista RJ", timeVisitante: "Volta Redonda", data: "2024-03-08" },
    ],
  },
  {
    numero: 3,
    jogos: [
      { timeCasa: "Vasco", timeVisitante: "Botafogo", data: "2024-03-09" },
      { timeCasa: "Flamengo", timeVisitante: "Fluminense", data: "2024-03-10" },
      { timeCasa: "Madureira RJ", timeVisitante: "Volta Redonda", data: "2024-03-11" },
      { timeCasa: "Boavista RJ", timeVisitante: "Bangu", data: "2024-03-12" },
    ],
  },
  {
    numero: 4,
    jogos: [
      { timeCasa: "Vasco", timeVisitante: "Madureira RJ", data: "2024-03-13" },
      { timeCasa: "Flamengo", timeVisitante: "Bangu", data: "2024-03-14" },
      { timeCasa: "Fluminense", timeVisitante: "Volta Redonda", data: "2024-03-15" },
      { timeCasa: "Botafogo", timeVisitante: "Boavista RJ", data: "2024-03-16" },
    ],
  },
  {
    numero: 5,
    jogos: [
      { timeCasa: "Vasco", timeVisitante: "Boavista RJ", data: "2024-03-17" },
      { timeCasa: "Flamengo", timeVisitante: "Volta Redonda", data: "2024-03-18" },
      { timeCasa: "Fluminense", timeVisitante: "Bangu", data: "2024-03-19" },
      { timeCasa: "Botafogo", timeVisitante: "Madureira RJ", data: "2024-03-20" },
    ],
  },
  {
    numero: 6,
    jogos: [
      { timeCasa: "Vasco", timeVisitante: "Bangu", data: "2024-03-21" },
      { timeCasa: "Flamengo", timeVisitante: "Volta Redonda", data: "2024-03-22" },
      { timeCasa: "Fluminense", timeVisitante: "Madureira RJ", data: "2024-03-23" },
      { timeCasa: "Botafogo", timeVisitante: "Boavista RJ", data: "2024-03-24" },
    ],
  },
  {
    numero: 7,
    jogos: [
      { timeCasa: "Vasco", timeVisitante: "Volta Redonda", data: "2024-03-25" },
      { timeCasa: "Flamengo", timeVisitante: "Boavista RJ", data: "2024-03-26" },
      { timeCasa: "Fluminense", timeVisitante: "Bangu", data: "2024-03-27" },
      { timeCasa: "Botafogo", timeVisitante: "Madureira RJ", data: "2024-03-28" },
    ],
  },
  {
    numero: 8,
    jogos: [
      { timeCasa: "Vasco", timeVisitante: "Fluminense", data: "2024-03-29" },
      { timeCasa: "Flamengo", timeVisitante: "Madureira RJ", data: "2024-03-30" },
      { timeCasa: "Botafogo", timeVisitante: "Volta Redonda", data: "2024-03-31" },
      { timeCasa: "Boavista RJ", timeVisitante: "Bangu", data: "2024-04-01" },
    ],
  },
  {
    numero: 9,
    jogos: [
      { timeCasa: "Vasco", timeVisitante: "Botafogo", data: "2024-04-02" },
      { timeCasa: "Flamengo", timeVisitante: "Bangu", data: "2024-04-03" },
      { timeCasa: "Fluminense", timeVisitante: "Boavista RJ", data: "2024-04-04" },
      { timeCasa: "Madureira RJ", timeVisitante: "Volta Redonda", data: "2024-04-05" },
    ],
  },
  {
    numero: 10,
    jogos: [
      { timeCasa: "Vasco", timeVisitante: "Madureira RJ", data: "2024-04-06" },
      { timeCasa: "Flamengo", timeVisitante: "Volta Redonda", data: "2024-04-07" },
      { timeCasa: "Fluminense", timeVisitante: "Boavista RJ", data: "2024-04-08" },
      { timeCasa: "Botafogo", timeVisitante: "Bangu", data: "2024-04-09" },
    ],
  },
  {
    numero: 11,
    jogos: [
      { timeCasa: "Vasco", timeVisitante: "Bangu", data: "2024-04-10" },
      { timeCasa: "Flamengo", timeVisitante: "Fluminense", data: "2024-04-11" },
      { timeCasa: "Botafogo", timeVisitante: "Volta Redonda", data: "2024-04-12" },
      { timeCasa: "Boavista RJ", timeVisitante: "Madureira RJ", data: "2024-04-13" },
    ],
  },
  {
    numero: 12,
    jogos: [
      { timeCasa: "Vasco", timeVisitante: "Volta Redonda", data: "2024-04-14" },
      { timeCasa: "Flamengo", timeVisitante: "Madureira RJ", data: "2024-04-15" },
      { timeCasa: "Fluminense", timeVisitante: "Bangu", data: "2024-04-16" },
      { timeCasa: "Botafogo", timeVisitante: "Boavista RJ", data: "2024-04-17" },
    ],
  },
  {
    numero: 13,
    jogos: [
      { timeCasa: "Vasco", timeVisitante: "Flamengo", data: "2024-04-18" },
      { timeCasa: "Fluminense", timeVisitante: "Botafogo", data: "2024-04-19" },
      { timeCasa: "Madureira RJ", timeVisitante: "Boavista RJ", data: "2024-04-20" },
      { timeCasa: "Bangu", timeVisitante: "Volta Redonda", data: "2024-04-21" },
    ],
  },
  {
    numero: 14,
    jogos: [
      { timeCasa: "Vasco", timeVisitante: "Fluminense", data: "2024-04-22" },
      { timeCasa: "Flamengo", timeVisitante: "Botafogo", data: "2024-04-23" },
      { timeCasa: "Madureira RJ", timeVisitante: "Bangu", data: "2024-04-24" },
      { timeCasa: "Boavista RJ", timeVisitante: "Volta Redonda", data: "2024-04-25" },
    ],
  },
];
