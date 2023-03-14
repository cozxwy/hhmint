import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useWallet } from '@meshsdk/react';
import { CardanoWallet } from '@meshsdk/react';
import { Transaction } from '@meshsdk/core';
import axios from 'axios';


const Home: NextPage = () => {
  const { connected, wallet } = useWallet();
  const [count, setCount] = useState(1)
  const [statusMsg, setstatusMsg] = useState(true)
  const [statusTxt, setstatusTxt] = useState(false)
  const [linkCardanoScan, setLinkCardanoScan] = useState('')
  const [tempTextHere, settempTextHere] = useState('')
  const [erroeMsg, setErrorMsg] = useState('');
  const [remainNft, setremainNft] = useState('0');
  const [darkMode, setdarkMode] = useState(false);




  const refreshPage = () => {
    window.location.reload();
  }


  useEffect(() => {
    /*axios.get('https://admirable-basbousa-f20380.netlify.app').then(response => {
      console.log(response.data['count'])
      setremainNft(response.data['count']);
    })*/

    console.log('i fire once');
  }, []);





  function plus() {

    if (count < 5) setCount(count + 1);
  }

  function minus() {

    if (count > 1) setCount(count - 1);

  }


  async function mint() {
    const amountLovelance = (count * 10000000).toString();
    const tx = new Transaction({ initiator: wallet })
      .sendLovelace(
        'addr1v9tp0ae6t97hcprxfw7s6hqyuqv7mv6vly8km7q20n8ntjqzrz9er',
        amountLovelance
      )
      ;


    try {
      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      const txHash = await wallet.submitTx(signedTx);
      settempTextHere('Here')
      setstatusMsg(true);
      setLinkCardanoScan('https://preview.cardanoscan.io/transaction/' + txHash)
      setErrorMsg('Mint complete transaction ' + linkCardanoScan)
      setstatusTxt(true)



    }
    catch (e) {
      let errorMessage = "Failed to do something exceptional";
      setstatusMsg(false);
      if (e instanceof Error) {
        errorMessage = e.message;
      }
      if (errorMessage.search("Insufficient input in transaction") >= 0) setErrorMsg('Insufficient balance')
      else if ((errorMessage.search("user declined to sign tx") >= 0)) setErrorMsg('User declined tx')
      //console.log(errorMessage)
      setstatusTxt(false)
    }


    // {"code":2,"info":"user declined tx"}.
    //Insufficient input in transaction


    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // dark mode
      setdarkMode(true)
    }

    else {
      setdarkMode(false)
    }


    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      const newColorScheme = event.matches ? setdarkMode(true) : setdarkMode(false);
    });


    // Check to see if Media-Queries are supported
    if (window.matchMedia) {
      // Check if the dark-mode Media-Query matches
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Dark
        setdarkMode(true)
      } else {
        // Light
        setdarkMode(false)
      }
    } else {
      // Default (when Media-Queries are not supported)
    }


  }




  return (

    <>
      <title>Hippy Horse Mint</title>
      <link rel="icon" type="image/x-icon" href="/images/favicon.ico"></link>

      {statusTxt ? <>

        <div className="firework" ></div>
        <div className="firework" ></div>
        <div className="firework" ></div>

      </> : ""}


      {darkMode ? <>


        <img src="https://i.imgur.com/BKdIJ1W.png" alt="hhdark" className="firstHH" />
        <img src="https://i.imgur.com/YbOz95Q.png" alt="hh2dark" className="firstHH2" />

      </> : <>


        <img src="https://i.imgur.com/BKdIJ1W.png" alt="hh" className="firstHH" />
        <img src="https://i.imgur.com/YbOz95Q.png" alt="hh2" className="firstHH2" />

      </>}


      <div className="leftItem" ><CardanoWallet /></div>
      <div className="centered">

        <h1> <span className="rainbow rainbow_text_animated">Hippy Horse</span> Minting Page</h1>
        <br></br>  <br></br>
        {connected && (
          <>


            <div className="mintForm">

              <br></br>
              <div className="blink_me"> <span><b>LIVE NOW</b>&nbsp;</span> remain {4444 - parseInt(remainNft)} / 4444 </div>
              <br></br>

            </div>
            <br></br>
            <div className="mintForm">
              <br></br>
              <p>{count * 10} ADA ({count} NFTs) </p>
              <button onClick={plus}> + </button>  &nbsp;&nbsp;
              <button onClick={minus}> - </button>
              <br></br> <br></br>



              {statusTxt ? <>


                &nbsp;<button onClick={refreshPage} className="button glow-on-hover"><span>Mint Again </span></button>

              </> : <button onClick={mint} className="button glow-on-hover"><span>Mint Now </span></button>}



              <br></br>
              &nbsp;&nbsp;
              <div>

                {statusMsg ? <b className="completedMsg">{erroeMsg} <a target="_blank" href={linkCardanoScan}>{tempTextHere}  </a> </b> : <b className="errorMsg">{erroeMsg}</b>}
              </div>
              <br></br>
              &nbsp;&nbsp;
            </div>

          </>
        )}

      </div>
    </>
  );
};

export default Home;