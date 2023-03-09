import { useState } from "react";
import type { NextPage } from "next";
import { useWallet } from '@meshsdk/react';
import { CardanoWallet } from '@meshsdk/react';
import tw from 'twin.macro';
import { Transaction } from '@meshsdk/core';
import * as React from 'react';
/*const Blockfrost = require("@blockfrost/blockfrost-js");
const API = new Blockfrost.BlockFrostAPI({
  projectId: "mainnetkey", // see: https://blockfrost.io
});*/


const Home: NextPage = () => {
  const { connected, wallet } = useWallet();
  const [assets, setAssets] = useState<null | any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState(1)

  async function getAssets() {
    if (wallet) {
      setLoading(true);
      const _assets = await wallet.getAssets();
      setAssets(_assets);
      setLoading(false);
    }
  }
/*
  async function getMinted(){
    const policyId = "583c9e403f5974a6a3a186972dabaacf2a759fa0913ed9f12b34164d"
    try {
      const collections = await API.getAssets(policyId);
      console.log(collections)
    }
    catch (err) {
      console.log("error", err);
    }

  }

  useEffect(()=>{

    getMinted()
    
    }, [])
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
        'addr1qyl4v9ep3s572lkqv47dlr96frk8epxjmzvh3hkgaurmy0q0radg4vhthkl6udq3rt3cyj82s32xrxcydtfd7gfgl5dsu7hda5',
        amountLovelance
      )
      ;


    try {
      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      const txHash = await wallet.submitTx(signedTx);
    }
    catch (err) {
      //if (err.message.search("Insufficient input in transaction") >= 0) console.log("Insufficient input in transaction")
      //else if ((err.message.search("user declined tx") >= 0)) console.log("User declined tx")
      //else
       console.log(err)

    }


    // {"code":2,"info":"user declined tx"}.
    //Insufficient input in transaction
  }


  return (
    <>

    <img src="https://i.imgur.com/lPzCKwm.png" alt="hh" className="firstHH" />
    <img src="https://i.imgur.com/Pi5fO5y.png" alt="hh2" className="firstHH2" />
      <div className="leftItem" ><CardanoWallet /></div>
      <div className="centered">
        <h1>Hippy Horse Minting Page</h1>
        <br></br>  <br></br>
        {connected && (
          <>

            <div className="mintForm">
            <br></br>
            <div className="blink_me"> <span>LIVE&nbsp;</span> minted 2 / 4000 </div> 
              <br></br>
            
            </div>
            <br></br>
            <div className="mintForm">
              <br></br>
              <p>{count * 10} ADA ({count} NFTs) </p>
              <button onClick={plus}> + </button>  &nbsp;&nbsp;
              <button onClick={minus}> - </button>
              <br></br> <br></br>
              <button onClick={mint}>Mint Now</button>
              <br></br>  <br></br>
              &nbsp;&nbsp;
            </div>

          </>
        )}
      </div>
    </>
  );
};

export default Home;