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
    axios.get('https://node-api-vercel-teal-eta.vercel.app/getAssestByPolicyId').then(response => {
      console.log(response.data.length)
      setremainNft(response.data.length);
    })

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

    let source_addr = ''
    let cardano_scan = ''
    let networkType = 'mainnet'
    //let networkType = 'preview'


    if (networkType == 'preview') {
      source_addr = 'addr_test1qq9llcqvz2ga54s3jaxlaxelcx3g8gj3getxtqct9ewg3v7rgjs4652esd9m0c4gugafjeeaja8kdzn9zev663q8hvfq9mx4hv'
      cardano_scan = 'https://preview.cardanoscan.io/transaction/'
    }
    else {
      source_addr = 'addr1v9tp0ae6t97hcprxfw7s6hqyuqv7mv6vly8km7q20n8ntjqzrz9er'
      cardano_scan = 'https://cardanoscan.io/transaction/'
    }
    const tx = new Transaction({ initiator: wallet })
      .sendLovelace(
        source_addr,
        amountLovelance
      )
      ;


    try {
      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      const txHash = await wallet.submitTx(signedTx);
      settempTextHere('Here')
      setstatusMsg(true);
      setLinkCardanoScan(cardano_scan + txHash)
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

      setstatusTxt(false)
    }



    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {

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
        <img src="https://i.imgur.com/vLZoxkh.png" alt="hh2dark" className="firstHH2" />

      </> : <>


        <img src="https://i.imgur.com/BKdIJ1W.png" alt="hh" className="firstHH" />
        <img src="https://i.imgur.com/vLZoxkh.png" alt="hh2" className="firstHH2" />

      </>}


      <div className="leftItem" ><CardanoWallet /></div>
      <div className="centered">

        <h1> <span className="rainbow rainbow_text_animated">Hippy Horse</span> Minting Page</h1>
        <br></br>  <br></br>
        {connected && (
          <>


            <div className="mintForm">

              <br></br>
              <div className="blink_me"> <span><b>LIVE NOW</b>&nbsp;</span>

                <br></br>

                <progress id="file" value={4444 - parseInt(remainNft)} max="4444"> {4444 - parseInt(remainNft)}% </progress>
                <br></br>

                {4444 - parseInt(remainNft)} / 4444 </div>
              <br></br>

            </div>
            <br></br>
            <div className="mintForm">
              <br></br>
              <p>{count * 10} ADA ({count} NFTs) </p>
              <button onClick={plus}> <span>+</span> </button>  &nbsp;&nbsp;
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