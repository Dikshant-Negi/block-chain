const HotelRecord = artifacts.require('HotelContract');

// module.exports = function(deployer) {
//   deployer.deploy(HotelRecord);
// };

module.exports = async function(deployer) {
  // deploy a contract
  await deployer.deploy(HotelRecord);
  //access information about your deployed contract instance
  const instance = await HotelRecord.deployed()
};
