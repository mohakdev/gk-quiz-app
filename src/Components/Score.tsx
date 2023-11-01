import React, { MouseEventHandler, useRef, useEffect, useState } from "react";
import axios from "axios";

interface ScoreInterface {
  name: string;
  score: number;
}

const Score = (props: ScoreInterface) => {
  const [loading, setLoading]: any = useState(true);
  const [rankings, setRankings]: any = useState(null);

  const scoreHtml = useRef(<h3>Loading...</h3>);

  useEffect(() => {
    const handleApi = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 sec
        await axios.post("http://localhost:8800/api/leaderboard", {
          name: props.name,
          score: props.score,
        }); //Setting new score
        const response = await axios.get(
          "http://localhost:8800/api/leaderboard"
        ); //getting data from DB
        console.log("Fetching data from mysql");
        setRankings(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    handleApi();
  }, []);

  if (loading == false) {
    scoreHtml.current = (
      <>
        <h1 className="textSize-1">Score - {props.score} / 10</h1>
        <h3 className="textSize-2">Leaderboard</h3>
        <table className="w-100">
          <tbody>
            <tr>
              <th className="textSize-3">Name</th>
              <th className="textSize-3">Score</th>
            </tr>
            {rankings.map((ranking: any) => (
              <tr key={ranking.name}>
                <td className="textSize-3">{ranking.name}</td>
                <td className="textSize-3">{ranking.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  return scoreHtml.current;
};

export default Score;
