import axios from 'axios';

export async function fetchRanks() {
  return await axios.get('http://54.180.120.249:8000/rank').then((res) => res.data.rank);
}

export async function fetchSeriaRanks() {
  return await axios.get('http://54.180.120.249:8000/rank').then((res) => res.data.rank[2]);
}

export async function fetchLaRanks() {
  return await axios.get('http://54.180.120.249:8000/rank').then((res) => res.data.rank[3]);
}

export async function fetchL1Ranks() {
  return await axios.get('http://54.180.120.249:8000/rank').then((res) => res.data.rank[4]);
}
