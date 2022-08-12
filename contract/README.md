# Contract

```shell
# mak contracts
$ truffle create all Greeter
```

## recent migration

```log
npm run contract:migrate

> nextjs-web3@0.1.0 contract:migrate
> cd contract && truffle migrate --network ropsten


Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.


Starting migrations...
======================
> Network name:    'ropsten'
> Network id:      3
> Block gas limit: 30000000 (0x1c9c380)


1660302537_greeter.js
=====================

   Deploying 'Greeter'
   -------------------
   > transaction hash:    0xe172356a140238caff85ae97829b5baa3c08552318547811d3c1427e5404c281
   > Blocks: 3            Seconds: 29
   > contract address:    0x7AE8555ce0aBE5f930e71874fE99f5dF4Ece8ef9
   > block number:        12772485
   > block timestamp:     1660303572
   > account:             0x5d15079De3c12143859D4874559b5896599BdBb3
   > balance:             4.999334144998135606
   > gas used:            133171 (0x20833)
   > gas price:           2.500000007 gwei
   > value sent:          0 ETH
   > total cost:          0.000332927500932197 ETH

   Pausing for 2 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 12772486)
   > confirmation number: 2 (block: 12772487)
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.000332927500932197 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.000332927500932197 ETH



Process finished with exit code 0

```