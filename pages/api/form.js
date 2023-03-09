const Blockfrost = require("@blockfrost/blockfrost-js");



export default async function handler(req, res) {

    const addr = req.body.address


    const API = new Blockfrost.BlockFrostAPI({
        projectId: "mainnetGmEw10BUaixrvC82Y53RWl9tJMI5e5Wo", // see: https://blockfrost.io
    });

    try {
        const address = await API.addresses(
           addr
        );
        /*const latestBlock = await API.blocksLatest();
        const networkInfo = await API.network();
        const latestEpoch = await API.epochsLatest();
        const health = await API.health();
        const address = await API.addresses(
            "addr1qxqs59lphg8g6qndelq8xwqn60ag3aeyfcp33c2kdp46a09re5df3pzwwmyq946axfcejy5n4x0y99wqpgtp2gd0k09qsgy6pz"
        );
        const pools = await API.pools({
            page: 1,
            count: 10,
            order: "asc"
        });
        */

        /*console.log("pools", pools);
        console.log("address", address);
        console.log("networkInfo", networkInfo);
        console.log("latestEpoch", latestEpoch);
        console.log("latestBlock", latestBlock);
        console.log("health", health);*/
        res.status(200).json({
            //data: `${body.first} ${body.last}`
            data: `information ` + address['amount'][0]['quantity']
        })

    } catch (err) {
        console.log("error", err);
    }



}