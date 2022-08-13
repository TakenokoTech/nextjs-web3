# Contract

```shell
# make contracts
$ truffle create all Greeter

# test
$ truffle test
```

## recent migration

```log
/usr/local/bin/npm run contract:migrate

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

   Replacing 'Greeter'
   -------------------
   > transaction hash:    0xdd0a7117af380bd851b0d953555a724c8b9d580b319c36f884a8d88d55dea303
   > Blocks: 3            Seconds: 37
   > contract address:    0x69ad6786c3D514c9Db2323daa0FBAb1aA28E460e
   > block number:        12778910
   > block timestamp:     1660383708
   > account:             0x5d15079De3c12143859D4874559b5896599BdBb3
   > balance:             4.998103087494688645
   > gas used:            492423 (0x78387)
   > gas price:           2.500000007 gwei
   > value sent:          0 ETH
   > total cost:          0.001231057503446961 ETH

   Pausing for 2 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 12778911)
   > confirmation number: 2 (block: 12778912)
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.001231057503446961 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.001231057503446961 ETH



Process finished with exit code 0

```
