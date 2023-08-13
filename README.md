# 🛒 Safe Station 

Secure plugin marketplace to extend the Safe account functionalities with audit attestations

SafeStation implements the `SafeProtocolManager` `SafeProtocolRegistry` from [Safe{Core} Protocol](https://github.com/5afe/safe-core-protocol). The Marketplace app is built with the template from [Safe{Core} Protocol Demo](https://github.com/5afe/safe-core-protocol-demo).

SafeStation also leverages the onchain attestation to both create and verify audit attestations using [https://attest.sh](https://attest.sh/).


The entire flow is deployed on Optimism as it is the common denominator for EAS and Safe Wallet but the contracts are deployed on Optimism, Base.

## Links:

- [Safe Station App](https://safestation.xyz)

- [Try on Safe Wallet as Safe App](https://app.safe.global/share/safe-app?appUrl=https://safe-station.vercel.app&chain=oeth)

- [EAS Schema on Optimism](https://optimism.easscan.org/schema/view/0xf79919ba6a03ab2adce36fcf31344023d006fd3418dd33499d3f8b8aa54fabda)

- Modified [SafeProtocolManager](https://optimistic.etherscan.io/address/0xc1a0C896e6cd89990B9BcF12E958Eb405aaD7948) on Optimism Mainnet

- Modified [SafeProtocolRegistry](https://optimistic.etherscan.io/address/0xb2a8e2Ae543bF7b385c35e21427E759e78b8E14B) on Optimism Mainnet

- [Forked implementation](https://github.com/koshikraj/safe-core-protocol) of `SafeProtocolRegistry` to add plugin attestations.

## Structure

- [Contracts](./contracts/) contains samaple plugin contracts
- [Web App](./web/) contains plugin market place app



## References/ Credits:

- This repository uses the template from [Safe{Core} Protocol Demo](https://github.com/5afe/safe-core-protocol-demo) leveraging the Safe{Core} Protocol.

- [Rhistone](https://www.rhinestone.wtf) has been working on architecting and documenting a standard for plugin attestations: [https://docs.rhinestone.wtf/registry/attestations](https://docs.rhinestone.wtf/registry/attestations)