contract bond{
	function bond(){
		balances[msg.sender][0] = 10000;
		total = 10000;
		couponAmount = (total/10000) * 499 * 10**15;
		owner = msg.sender;
	}

	function sendBond(address recipient, uint amount, uint state) returns (bool successful){
		if (balances[msg.sender][state] < amount) return false;
		balances[msg.sender][state] -= amount;
		balances[recipient][state] += amount;
		lastFunction = 1;
		return true;
	}

	function payInterest(uint coupon) returns (bool s){
		if (msg.value != couponAmount || currentInterestPeriod != coupon || msg.sender != owner) {
			msg.sender.send(msg.value);
			return;}
		//uint value = msg.value;
		interestPayments[coupon] = uint(msg.value/total);
		currentInterestPeriod++;
		lastFunction = 2;
		return true;
	}

	function claimInterest(uint state, uint amount){
		if (balances[msg.sender][state] < amount) return;
		if (state >= currentInterestPeriod) return;
		balances[msg.sender][state] -= amount;
		balances[msg.sender][state+1] += amount;
		msg.sender.send(interestPayments[state]*amount);
		lastFunction = 3;
	}

	function redeem(){
		if (balances[msg.sender][currentInterestPeriod] == 0 || redeemed != true) return;
		msg.sender.send(balances[msg.sender][currentInterestPeriod]*10**15);
		balances[msg.sender][currentInterestPeriod] = 0;
		lastFunction = 4;
	}

	function payRedemption(){
		if ((msg.value) != total*10**15) {
			msg.sender.send(msg.value);
			return;}
		redeemed = true;
		lastFunction = 5;
	}

address public owner;
uint public total;
uint public couponAmount;
uint public currentInterestPeriod;
bool public redeemed;
uint public lastFunction;

mapping(address =>mapping(uint=>uint)) public balances;

mapping(uint=>uint) public interestPayments;


}