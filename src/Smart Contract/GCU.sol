//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract GCU {
    using SafeMath for uint256;
    mapping(address => uint256) public unitBalance;
    mapping(address => uint256) public usdtBalance;
    mapping(address => address) public referral;
    mapping(address => uint8) public active;
    mapping(address => uint256) public unitCount;
    mapping(address => rf) public myRefferals;
    mapping(address=>uint256) public referenceProfit;
    IERC20 token = IERC20(0x493e6ad3b3e782DB7E056d39253bAe2F92Bb96B6);
    uint256 public reservoir;
    uint256  public unitLimit;
    uint256 public totalSupply;
    address[2] public Lot;
    address public owner;
    event LotResult(address winner, address looser, uint256 amount);

    address reserve1 = 0x8922548D7da283C3E14037610bB44aF80a6f605a;
    address reserve2 = 0x23B4bd364cf0a84D7A0a6ed8A593a1473C6F1f1C;
    address reserve3 = 0x221e620C073A59236BCd8F9fE9BED7fFf39208BA;
    address developerWallet = 0xF4fC364851D03A7Fc567362967D555a4d843647d;
    struct rf{
        uint256 lvl1;
        uint256 lvl2;
        uint256 lvl3;
        uint256 lvl4;
        uint256 lvl5;
        uint256 lvl6;
        uint256 lvl7;
        uint256 lvl8;
        uint256 lvl9;
    }
    constructor(){
        owner = msg.sender;
        unitLimit = 2700;
    }

    modifier loggedIn(){
        require(active[msg.sender]!=0,"Sign In first");
        _;
    }
    function getMyRefferals(address _account) public view returns(rf memory){
      return myRefferals[_account];
    }
    function changeOwner(address _newOwner) public {
        require(msg.sender==owner, "only owner can nominate new Owner");
        owner = _newOwner;
    }
    function changeLimit(uint256 _limit) public{
         require(msg.sender==owner, "only owner can change");
         unitLimit = _limit;
    }
    function checkUserLimit(bool _active, uint256 _amount) public view returns (bool) {
        if (_active== true) {
            if ((unitCount[msg.sender]+_amount) <= 90) return true;
            else return false;
        } else {
            if ((unitCount[msg.sender]+_amount) <1) return true;
            else return false;
        }
    }

    function signIn(address _friend,bool _active) public returns (bool) {
        require(msg.sender != _friend);
        referral[msg.sender] = _friend;
        uint8 act  = 1;
        if(_active) act=2;
        active[msg.sender]= act;

        // Referal Part
        for(uint i=0; i<9; i++){
            if(_friend==0x0000000000000000000000000000000000000000) break;
            if(i==0) myRefferals[_friend].lvl1++;
            if(i==1) myRefferals[_friend].lvl2++;
            if(i==2) myRefferals[_friend].lvl3++;
            if(i==3) myRefferals[_friend].lvl4++;
            if(i==4) myRefferals[_friend].lvl5++;
            if(i==5) myRefferals[_friend].lvl6++;
            if(i==6) myRefferals[_friend].lvl7++;
            if(i==7) myRefferals[_friend].lvl8++;
            if(i==8) myRefferals[_friend].lvl9++;
            _friend = referral[_friend];
        }
        return true;
    }

    function handleReferal() private {
        require(usdtBalance[msg.sender] >= 1800000, "not enough balance");
        address _friend;
        uint256 _amount = 1800000;
        //level 1
        if (
            referral[msg.sender] != 0x0000000000000000000000000000000000000000
        ) {
            _friend = referral[msg.sender];
            usdtBalance[msg.sender] = usdtBalance[msg.sender].sub(900000);
            token.transfer(_friend, 900000);
            _amount -= 900000;
            referenceProfit[_friend] = referenceProfit[_friend].add(900000);
            //level 2
            if (
                referral[_friend] != 0x0000000000000000000000000000000000000000
            ) {
                _friend = referral[_friend];
                usdtBalance[msg.sender] = usdtBalance[msg.sender].sub(200000);
                token.transfer(_friend, 200000);
                _amount -= 200000;
                referenceProfit[_friend] = referenceProfit[_friend].add(200000);
                //level 3
                if (
                    referral[_friend] !=
                    0x0000000000000000000000000000000000000000
                ) {
                    _friend = referral[_friend];
                    usdtBalance[msg.sender] = usdtBalance[msg.sender].sub(
                        100000
                    );
                    token.transfer(_friend, 100000);
                    _amount -= 100000;
                    referenceProfit[_friend] = referenceProfit[_friend].add(100000);

                    //level 4
                    if (
                        referral[_friend] !=
                        0x0000000000000000000000000000000000000000
                    ) {
                        _friend = referral[_friend];
                        usdtBalance[msg.sender] = usdtBalance[msg.sender].sub(
                            100000
                        );
                        token.transfer(_friend, 100000);
                        _amount -= 100000;
                        referenceProfit[_friend] = referenceProfit[_friend].add(100000);
                        //level 5
                        if (
                            referral[_friend] !=
                            0x0000000000000000000000000000000000000000
                        ) {
                            _friend = referral[_friend];
                            usdtBalance[msg.sender] = usdtBalance[msg.sender]
                                .sub(100000);
                            token.transfer(_friend, 100000);
                            _amount -= 100000;
                            referenceProfit[_friend] = referenceProfit[_friend].add(100000);
                            ////level 6
                            if (
                                referral[_friend] !=
                                0x0000000000000000000000000000000000000000 &&
                                myRefferals[_friend].lvl1 > 3
                            ) {
                                _friend = referral[_friend];
                                usdtBalance[msg.sender] = usdtBalance[
                                    msg.sender
                                ].sub(100000);
                                token.transfer(_friend, 100000);
                                _amount -= 100000;
                                referenceProfit[_friend] = referenceProfit[_friend].add(100000);
                                //level 7
                                if (
                                    referral[_friend] !=
                                    0x0000000000000000000000000000000000000000 &&
                                    myRefferals[_friend].lvl1 > 4
                                ) {
                                    _friend = referral[_friend];
                                    usdtBalance[msg.sender] = usdtBalance[
                                        msg.sender
                                    ].sub(100000);
                                    token.transfer(_friend, 100000);
                                    _amount -= 100000;
                                    referenceProfit[_friend] = referenceProfit[_friend].add(100000);
                                    //level 8
                                    if (
                                        referral[_friend] !=
                                        0x0000000000000000000000000000000000000000 &&
                                        myRefferals[_friend].lvl1 > 5
                                    ) {
                                        _friend = referral[_friend];
                                        usdtBalance[msg.sender] = usdtBalance[
                                            msg.sender
                                        ].sub(100000);
                                        token.transfer(_friend, 100000);
                                        _amount -= 100000;
                                        referenceProfit[_friend] = referenceProfit[_friend].add(100000);
                                        //level 9
                                        if (
                                            referral[_friend] !=
                                            0x0000000000000000000000000000000000000000 &&
                                            myRefferals[_friend].lvl1 > 6
                                        ) {
                                            _friend = referral[_friend];
                                            usdtBalance[
                                                msg.sender
                                            ] = usdtBalance[msg.sender].sub(
                                                100000
                                            );
                                            token.transfer(_friend, 100000);
                                            _amount -= 100000;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (_amount != 0) token.transfer(reserve1, _amount);
        usdtBalance[msg.sender] = usdtBalance[msg.sender].sub(_amount);
    }

function handleLot(uint256 x, bool _active) private {
    usdtBalance[msg.sender] = usdtBalance[msg.sender].sub(6000000);
    reservoir = reservoir.add(6000000);
    if(Lot[0]==0x0000000000000000000000000000000000000000){
      Lot[0]= msg.sender;
      return;
    }
    else if(
        Lot[1]==0x0000000000000000000000000000000000000000){
          Lot[1] = msg.sender;
          require(reservoir>=12000000, "Not enough balance");
          reservoir = reservoir.sub(12000000);
          if(x%2==1){
              if(_active==true){
                   unitBalance[msg.sender]=unitBalance[msg.sender].add(100);
                   token.transfer(Lot[0],2000000 );}
              else token.transfer(Lot[0],12000000 );
              emit LotResult(Lot[0], Lot[1],12000000);
          }else{
              if(_active==true){unitBalance[Lot[1]]=unitBalance[Lot[1]].add(100);
                  token.transfer(Lot[1],2000000);}
              else token.transfer(Lot[1],12000000 );
              emit LotResult(Lot[1], Lot[1],12000000);
          }
       Lot[0]= 0x0000000000000000000000000000000000000000;
       Lot[1]= 0x0000000000000000000000000000000000000000;
    }
}


function withDrawUsdt(uint256 _amount) public {
    require(msg.sender==owner, "only owner can withdraw");
    token.transfer(reserve1,_amount);
}
function handleReserves() private {
   require(usdtBalance[msg.sender]>=2200000, "Not enough UNIT left");
   usdtBalance[msg.sender]= usdtBalance[msg.sender].sub(2200000);
   token.transfer(reserve1, 1000000);
   token.transfer(reserve2, 500000);
   token.transfer(reserve3, 200000);
   token.transfer(developerWallet,500000);
}
   
 function enterGame(uint256 x) public loggedIn returns (bool) {
        require(unitBalance[msg.sender]>=100, "Not enough UNIT left");
        bool _active = true;
        if(active[msg.sender]==1) _active = false;
        unitBalance[msg.sender]=unitBalance[msg.sender].sub(100);
        handleLot(x, _active);
        handleReserves();
        if(_active) handleReferal();
        return true;
    }

    function buyUnitToken(uint256 _amount) public loggedIn {
             bool _active = true;
            if(active[msg.sender]==1) _active = false;
            require ( checkUserLimit(_active, _amount), "Maximum user limit reached") ;
            require(totalSupply<=unitLimit , "Maximum supply limit reached");
            unitBalance[msg.sender] = unitBalance[msg.sender].add(100);
            usdtBalance[msg.sender] = usdtBalance[msg.sender].add(10000000);
            unitCount[msg.sender] = unitCount[msg.sender].add(1);
            totalSupply = totalSupply.add(1);
            
    }

    function getUsdtBalance() public view returns(uint256){
        return token.balanceOf(address(this));
    }

    function withdrawBalanceUsdt() public  {
        require(msg.sender==owner, "only owner can withdraw");
        uint256 _balance = getUsdtBalance();
        token.transfer(reserve1,_balance);
    }

}


pragma solidity ^0.8.0;

library SafeMath {
    function tryAdd(uint256 a, uint256 b)
        internal
        pure
        returns (bool, uint256)
    {
        unchecked {
            uint256 c = a + b;
            if (c < a) return (false, 0);
            return (true, c);
        }
    }

    function trySub(uint256 a, uint256 b)
        internal
        pure
        returns (bool, uint256)
    {
        unchecked {
            if (b > a) return (false, 0);
            return (true, a - b);
        }
    }

    function tryMul(uint256 a, uint256 b)
        internal
        pure
        returns (bool, uint256)
    {
        unchecked {
            if (a == 0) return (true, 0);
            uint256 c = a * b;
            if (c / a != b) return (false, 0);
            return (true, c);
        }
    }

    function tryDiv(uint256 a, uint256 b)
        internal
        pure
        returns (bool, uint256)
    {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a / b);
        }
    }

    function tryMod(uint256 a, uint256 b)
        internal
        pure
        returns (bool, uint256)
    {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a % b);
        }
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return a - b;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }

    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return a % b;
    }

    function sub(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b <= a, errorMessage);
            return a - b;
        }
    }

    function div(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a / b;
        }
    }

    function mod(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a % b;
        }
    }
}

pragma solidity ^0.8.0;

interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address to, uint256 amount) external returns (bool);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

