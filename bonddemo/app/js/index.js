$(document).ready(function() {
  $(".balance").html(web3.eth.getBalance(web3.eth.coinbase).toString());
  $(".currentInterestPeriod").html(bond.currentInterestPeriod().toString());
  $(".couponAmount").html(bond.couponAmount().toString());
  $(".redeemed").html(bond.redeemed().toString());
  $(".bondBalance").html(web3.eth.getBalance(bond.address.toString()).toString());
  $(".value").html(bond.balances(web3.eth.coinbase,0).toNumber());


  $("button.send").click(function() {
    var recip = parseInt($("input.recip").val(), 10);
    var amount = parseInt($("input.amount").val(), 10);
    var coupon = parseInt($("input.coupon").val(), 10);
    bond.sendBond(recip,amount,coupon);
    console.log("sent");
  });

    $("button.payInterest").click(function() {
    var couponPI = parseInt($("input.couponPI").val(), 10);
    bond.payInterest(couponPI,{value: (499000000000000000)});

    console.log("sent");
  });

    $("button.claimInterest").click(function() {
    var state = parseInt($("input.stateCI").val(), 10);
    var amount = parseInt($("input.amountCI").val(), 10);
    bond.claimInterest(state, amount);

    console.log(state + amount);
  });
        $("button.payRedemption").click(function() {
    bond.payRedemption({value:10000000000000000000});
  });
        $("button.redeem").click(function() {
    bond.redeem();
  });

  document.getElementsByClassName("get")[0].addEventListener('click', function() {
    var value = bond.balances(web3.eth.coinbase,0).toNumber();
    $(".value").html(value);
    $(".balance").html(web3.eth.getBalance(web3.eth.coinbase).toString());
  $(".currentInterestPeriod").html(bond.currentInterestPeriod().toString());
  $(".couponAmount").html(bond.couponAmount().toString());
  $(".redeemed").html(bond.redeemed().toString());
  $(".bondBalance").html(web3.eth.getBalance(bond.address.toString()).toString());
  
  });



  var addToLog = function(txt) {
    $(".logs").append("<br>" + txt);
  }

});
