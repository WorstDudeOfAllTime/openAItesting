import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import { useEffect, useState, useRef } from 'react';
const { Configuration, OpenAIApi } = require('openai');
import {ChatGPTUnofficialProxyAPI} from 'chatgpt'
const configuration = new Configuration({
  apiKey: ''
})
const inter = Inter({ subsets: ['latin'] });
const openai = new OpenAIApi(configuration);


export default function Home() {
  const [messages, setMessages] = useState([]);
  const messageRef = useRef();
  const addMessage = (message) => {
    setMessages([...messages, message]);
  };
  const fireMessageGPT = async (message) => {
    const api = new ChatGPTUnofficialProxyAPI({
      accessToken: ""
    })
    const res = await api.sendMessage(message)
    console.log(res.text)
  }
  const fireMessage = async (message) => {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: message,
      "max_tokens": 2048,
      temperature: .5
    });
    const data = response.data.choices[0].text;
    console.log(response.data.choices[0])
    addMessage(data);
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          {messages.map((message, index) => {
            return <div key={index}>{message}</div>;
          })}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fireMessage(messageRef.current.value);
            fireMessageGPT(messageRef.current.value);
          }}
        >
          <input
            type="text"
            placeholder="Enter your message"
            name="messages"
            ref={messageRef}
          />
          <button type="submit">Send Message</button>
        </form>
      </main>
    </>
  );
}
