import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./component/NewsCards/NewsCards";
import wordsToNumbers from "words-to-numbers";
import useStyles from "./styles.js";

const alanKey =
  "6c0144484a916b25fa27ededabde14572e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticles, setActiveArticles] = useState(-1);
  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticles(-1);
        } else if (command === "highlight") {
          setActiveArticles((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parseNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;

          const article = articles[parseNumber - 1];

          if (parseNumber > 20) {
            alanBtn().playText("Please Try That Again");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText("Opening....");
          } else {
          }
        }
      },
    });
  }, []);
  return (
    <div className="App">
      <div className={classes.logoContainer}>
        <img
          src="https://alan.app/voice/images/previews/preview.jpg"
          className={classes.alanLogo}
          alt="logo"
        />
      </div>
      <NewsCards articles={newsArticles} activeArticles={activeArticles} />
    </div>
  );
};

export default App;
