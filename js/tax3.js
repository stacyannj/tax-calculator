    function calc() {
       // get it to read value
        var amt = document.getElementById('income').value;
        var taxes = {
            '"Employee" Social Security': .062 * amt,
            '"Employer" Social Security': .062 * amt,
            '"Employee" Medicare': .0145 * amt,
            '"Employer" Medicare': .0145 * amt,
            'Current Income Tax': 0, // see below
            'Clinton Income Tax': 0, // see below
            'Trump Income Tax': 0 // see below
        };
        
        var brackets = [
        {current:
            [{ max: 8925, pct: .1 },
            { max: 36250, pct: .15 },
            { max: 87850, pct: .25 },
            { max: 183250, pct: .28 },
            { max: 398350, pct: .33 },
            { max: 400000, pct: .35 },
            { max: null, pct: .396 }], 
        clinton: 
       [{ max: 9275, pct: .1 },
            { max: 37650, pct: .15 },
            { max: 91150, pct: .25 },
            { max: 190150, pct: .28 },
            { max: 413350, pct: .33 },
            { max: 415050, pct: .35 },
            { max: 5000000, pct: .396 },
            { max: null, pct: .436 }],
        trump: 
        [{ max: 37500, pct: .12 },
            { max: 112500, pct: .25 },
            { max: null, pct: .333 }]}
            ];
        // var bracketsClinton = [
        //     { max: 9275, pct: .1 },
        //     { max: 37650, pct: .15 },
        //     { max: 91150, pct: .25 },
        //     { max: 190150, pct: .28 },
        //     { max: 413350, pct: .33 },
        //     { max: 415050, pct: .35 },
        //     { max: 5000000, pct: .396 },
        //     { max: null, pct: .436 }
        // ];
        // var bracketsTrump = [
        //     { max: 37500, pct: .12 },
        //     { max: 112500, pct: .25 },
        //     { max: null, pct: .333 }
        // ];
        var running = amt;
        var lastChunk = 0;
        var chunk = 0;
        var tax = 0;
        var taxC = 0;
        var taxT = 0;
        
        $.each(brackets, function(i, bracket) {
            // this works
            const now = bracket["current"];
            //TODO: need to make this work
            nowmax = now.max;
            nowpct = now["pct"];
            const clinton = bracket["clinton"];
            console.log(now.max);
            clintonmax = clinton["max"];
            clintonpct = clinton["pct"];
            const trump = bracket["trump"];
            trumpmax = trump["max"];
            trumppct = clinton["pct"];
            var chunk = bracket[nowmax, clintonmax, trumpmax];
            if (running < chunk) {
                chunk = running;
                running = 0;
            } else {
                running -= chunk;
            }
            
            tax += chunk * nowpct;
            taxC += chunk * clintonpct;
            taxT += chunk * trumppct;
            lastChunk = chunk;
        }); 
        taxes['Current Income Tax'] = tax;
        taxes['Clinton Income Tax'] = taxC;
        taxes['Trump Income Tax'] = taxT;
        // TODO: use these to calculate changes
        var total = 0;
        
        var h = $.map(taxes, function(v, p) {
            total += v;
            return '<tr><th>' + p + '</th><td>' + num(v) + '</td></tr>';
        });
        
        h.push('<tr><th>Total</th><td>' + num(total) + '</td></tr>');
        
        var percentTotal = Math.round(total/amt * 1000)/10;

        
        h.push('<tr><th>Percent</th><td>' + percentTotal + '</td></tr>');
        
        h = ('<table>' + h.join('') + '</table>');
        // document.getElementById('output').html('h');
        $('#output').html(h);
        console.log(h);
    };
    
    function num(n) {
        n = n.toString();
        var i = n.indexOf('.');
        if (i == -1) {
            return n + '.00';
        }
        i = n.length - i;
        if (i == 3)
            return n;
        
        return n + '0';
    };
    // document.getElementById('addTrans').onClick(ca;
    // $('#addTrans').click(calc);
    // $('#income').val(30000);
    // calc();