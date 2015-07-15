contract test{
	uint public a;
	function test(){
		a =100;
	}

	function deposit(uint multi){
		a = multi * msg.value;
	}
}