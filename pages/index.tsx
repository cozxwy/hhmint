import { useState } from "react";
import type { NextPage } from "next";
import { useWallet } from '@meshsdk/react';
import { CardanoWallet } from '@meshsdk/react';
import { Transaction } from '@meshsdk/core';


const Home: NextPage = () => {
  const { connected, wallet } = useWallet();
  const [assets, setAssets] = useState<null | any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState(1)
  const [statusMsg, setstatusMsg] = useState(true)

  const [statusTxt, setstatusTxt] = useState(false)
  const [linkCardanoScan, setLinkCardanoScan] = useState('')
  const [tempTextHere, settempTextHere] = useState('')

  const [erroeMsg, setErrorMsg] = useState('');

  const refreshPage = () => {
    window.location.reload();
  }

  async function getAssets() {
    if (wallet) {
      setLoading(true);
      const _assets = await wallet.getAssets();
      setAssets(_assets);
      setLoading(false);
    }
  }

  /*async function getMinted() {

    const Blockfrost = require("@blockfrost/blockfrost-js");
    const API = new Blockfrost.BlockFrostAPI({
      projectId: "mainnetGmEw10BUaixrvC82Y53RWl9tJMI5e5Wo", // see: https://blockfrost.io
    });




    const policyId = "583c9e403f5974a6a3a186972dabaacf2a759fa0913ed9f12b34164d"
    try {
      const collections = await API.getAssets(policyId);
      console.log(collections)
    }
    catch (err) {
      console.log("error", err);
    }

  }
  */

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
        'addr_test1qrcs3ffcsrwxpwanatj56rx37a2nr3gflgz5nqvzwwpkznkrgjs4652esd9m0c4gugafjeeaja8kdzn9zev663q8hvfqf3ht56',
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
  }


  return (
    <>
      {statusTxt ? <>

        <div className="firework" ></div>
        <div className="firework" ></div>
        <div className="firework" ></div>

      </> : ""}


      <img src="https://i.imgur.com/lPzCKwm.png" alt="hh" className="firstHH" />
      <img src="https://i.imgur.com/Pi5fO5y.png" alt="hh2" className="firstHH2" />
      <div className="leftItem" ><CardanoWallet /></div>
      <div className="centered">

        <h1> <span className="rainbow rainbow_text_animated">Hippy Horse</span> Minting Page</h1>
        <br></br>  <br></br>
        {connected && (
          <>


            <div className="mintForm">

              <br></br>
              <div className="blink_me"> <span><b>LIVE NOW</b>&nbsp;</span> remain 4299 / 4444 </div>
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

                {statusMsg ? <b className="completedMsg">{erroeMsg} <a href={linkCardanoScan}>{tempTextHere}</a> </b> : <b className="errorMsg">{erroeMsg}</b>}
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