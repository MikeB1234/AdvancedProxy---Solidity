const Dogs = artifacts.require("Dogs");
const Proxy = artifacts.require("Proxy");
const DogsUpdated = artifacts.require("DogsUpdated");

module.exports = async function (deployer, network, accounts) {
  const dogs = await Dogs.new();
  const proxy = await Proxy.new(dogs.address);
  //Create Proxy
  var proxyDog = await Dogs.at(proxy.address);
  await proxyDog.setNumberOfDogs(10);
  
  var numDogs = await proxyDog.getNumberOfDogs();
  console.log(numDogs.toNumber());

  const dogsUpdated = await DogsUpdated.new();
  proxy.upgrade(dogsUpdated.address);

  proxyDog = await DogsUpdated.at(proxy.address);
  proxyDog.initialize(accounts[0]);

  numDogs = await proxyDog.getNumberOfDogs();
  console.log("After Update: " + numDogs.toNumber());

  await proxyDog.setNumberOfDogs(30);
  numDogs = await proxyDog.getNumberOfDogs();
  console.log(numDogs.toNumber());
};
