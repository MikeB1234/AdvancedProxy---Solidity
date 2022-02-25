pragma solidity 0.5.2;
import "./Storage.sol";

contract DogsUpdated is Storage {

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    constructor() public {
        initialize(msg.sender);
    }

      function initialize(address _owner) public {
        require(!_initialized);
        owner = _owner;
        _initialized = true;
    }

    function getNumberOfDogs() public view returns(uint) {
        return _uintStorage["Dogs"];
    }
    function setNumberOfDogs(uint toSet) public onlyOwner {
        _uintStorage["Dogs"] = toSet;
    }

}