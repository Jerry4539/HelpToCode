import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [startupInput, setStartupInput] = useState("");
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);
  
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
      console.log('Copying to clipboard was successful!');
    }, function(err) {
      console.error('Could not copy text: ', err);
    });
  }

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: startupInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setIsLoading(false);
    setStartupInput("");
  }

  return (
    <div className={styles.body}>
      <Head>
        <title>Help To Code</title>
        <link rel="icon" href="/jerry.jpeg" />
      </Head>

      <main className={styles.main}>
        <img src="/jerry.png" className={styles.icon} />
        <h3 className={styles.h3}>Test the Ai Bot</h3>
        {/* <b><span style={{color: 'darkred'}}>I have stopped this project for development purposes..</span></b> */}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="query"
            placeholder="Enter Your Query"
            value={startupInput}
            onChange={(e) => setStartupInput(e.target.value)}
          />
          <input type="submit" value="Generate Response" />
        </form>
        <div className={styles.result}>
        <div className={isLoading ? styles["spinner-container"] : ""}>
        <div className={styles.spinner}></div>
      </div>
          <button className={styles.button} onClick={() => copyToClipboard(result)}>Copy to clipboard</button>
          {result &&
            <div>
              <h4>Response:</h4>
              <pre>{result}</pre>
            </div>
          }
        </div>
      </main>
      <footer className={styles.footer}>
        Made by <a href="https://github.com/Jerry4539/">Jerry4539</a> && <a href="https://jerry4539.online"> Akcyberscan</a>
  <small><img src="https://profile-counter.glitch.me/HelpToCodeMainPage/count.svg" alt="Visitors"/></small>
      </footer>
    </div>
  );
}
