var income; 
	function getIncome()
	{
		var amount = document.getElementById("Earned").value;
		console.log(amount);
		var tax = 0;
	    if(amount >186350){
	    tax = (amount - 186350) * .33 + 907.5;
	    }
	    else if(amount > 89350){
	        tax = (amount - 89350) * .28 + 907.5+(36900-9072)*.15+(89350-36900)*.25;
	    }
	    else if( amount > 36900){
	    tax = (amount - 36900) * .25 + 907.5+(36900-9072)*.15;    
	    }
	    else if(amount > 9075){
	    tax = (amount - 9075) * .15 + 907.5;
	    }
	    else{
	       tax = amount * .10;
	        }
	    tax += amount * .153;
	    return tax;
		}