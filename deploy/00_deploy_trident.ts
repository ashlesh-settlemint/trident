import { run } from 'hardhat';
import { DeployFunction } from 'hardhat-deploy/types';

const migrate: DeployFunction = async ({ getNamedAccounts, deployments: { diamond }, config, network }) => {
  const { deployer, diamondAdmin } = await getNamedAccounts();
  if (!deployer) {
    console.error(
      '\n\nERROR!\n\nThe node you are deploying to does not have access to a private key to sign this transaction. Add a Private Key in this application to solve this.\n\n'
    );
    process.exit(1);
  }

  const res = await diamond.deploy("Diamond", {
    from: deployer,
    owner: diamondAdmin,
    facets: ["TridentFacet1","Facet1"],
  });
  console.log("res", res);


  let hasEtherScanInstance = false;
  try {
    await run('verify:get-etherscan-endpoint');
    hasEtherScanInstance = true;
  } catch (e) {
    // ignore
  }
  if (hasEtherScanInstance) {
    await run('sourcify');
    if (!config.verify?.etherscan?.apiKey) {
      console.error(
        `\n\nERROR!\n\nYou have not set your Etherscan API key in your hardhat.config.ts file. Set it and run\n\nyarn hardhat --network '${network.name}' etherscan-verify\n\n`
      );
    } else {
      await new Promise((resolve) => {
        setTimeout(resolve, 10 * 1000);
      }); // allow etherscan to catch up
      await run('etherscan-verify');
    }
  }

  return true;
};

export default migrate;

migrate.id = '00_deploy_trident';
migrate.tags = ['Trident'];
