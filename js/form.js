var currency = document.getElementById("currency");
var baseAmount = document.getElementById("base_amount");
var interese = document.getElementById("annual_interest");
var period = document.getElementById("period");
var choice = document.getElementById("period_choice");
var deposit = document.getElementById("regular_deposit");
var btn = document.getElementById("calculate");
var table = document.getElementById("table");
var interval = document.getElementById("interval");
var clear = document.getElementById("clear");


btn.addEventListener("click", () => {
    table.style = "";
    var valueCurrency = currency.options[currency.selectedIndex].value;
    var valueAmount = parseInt(baseAmount.value);
    var valueInterest = (parseInt(interese.value))/100;
    var valuePeriod = parseInt(period.value);
    var valueChoice = choice.options[choice.selectedIndex].value;
    var valueDeposit = parseInt(deposit.value);
    var valueInterval = parseInt(interval.options[interval.selectedIndex].value);
    var rowCode =  "";
    var yearDeposit = (valueDeposit * 12);
    var totalDeposit = valueAmount;
    var totalBalance, valuePrinciple, valueAdditional,valueTotalInterest, valueBase, valueExp;
    if(valueAmount && valueInterest && valuePeriod && valueDeposit) {
        for(var i = 0; i < valuePeriod; i++){
            valueBase = 1+ (valueInterest/valueInterval);
            valueExp = valueInterval*(i+1);
            valuePrinciple = (valueAmount * Math.pow(valueBase, valueExp)) - valueAmount;
            valueAdditional = ((valueDeposit * (Math.pow(valueBase,valueExp)-1))/(valueInterest/valueInterval)) - (yearDeposit*(i+1));
            valueTotalInterest = Math.round(valueAdditional + valuePrinciple);
            totalDeposit += yearDeposit;
            totalInterest = 0;
            totalBalance = totalDeposit + valueTotalInterest;
            rowCode += `
            <tr>
                <td>${i + 1}</td>
                <td>${valueCurrency}${yearDeposit.toLocaleString()}</td>
                <td>${valueCurrency}${totalDeposit.toLocaleString()}</td>
                <td>${valueCurrency}${valueTotalInterest.toLocaleString()}</td>
                <td>${valueCurrency}${totalBalance.toLocaleString()}</td>
            </tr>`;
        };
    
        var tableCode = `
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-md-offset-3 col-xs-offset-3 col-sm-offset-3 col-lg-offset-3">
                <table class="table table-hover table-striped table-dark">
                    <thead>
                        <tr>
                            <th>${valueChoice}</th>
                            <th>Year Deposit</th>
                            <th>Total Deposits</th>
                            <th>Total Interest</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowCode}
                    </tbody>
                </table>
            </div>`;
        table.innerHTML = tableCode;
    } else {
        table.innerText = "Please insert enough information!";
        table.style.color = "red";
        table.style.textAlign = "center";
        table.style.fontSize = "50px";
        table.style.textTransform = "uppercase";
    }
    
});

clear.addEventListener("click", () => {
    currency.selectedIndex = 0;
    baseAmount.value = "";
    interese.value = "";
    period.value = "";
    choice.selectedIndex = 0;
    deposit.value = "";
    interval.selectedIndex = 0;

    table.removeChild(table.children[0]);

})