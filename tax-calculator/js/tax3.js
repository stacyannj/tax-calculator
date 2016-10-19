    function calc() {
       // get it to read value
        var amt = document.getElementById('income').value;
        var taxes = {
            // '"Employee" Social Security': .062 * amt,
            // '"Employer" Social Security': .062 * amt,
            // '"Employee" Medicare': .0145 * amt,
            // '"Employer" Medicare': .0145 * amt,
            'Current Income Tax': 0, // see below
            'Clinton Income Tax': 0, // see below
            'Trump Income Tax': 0 // see below
        };

        var brackets = [
            { max: 8925, pct: .1 },
            { max: 36250, pct: .15 },
            { max: 87850, pct: .25 },
            { max: 183250, pct: .28 },
            { max: 398350, pct: .33 },
            { max: 400000, pct: .35 },
            { max: null, pct: .396 }];
       //  clinton:
       // [{ max: 9275, pct: .1 },
       //      { max: 37650, pct: .15 },
       //      { max: 91150, pct: .25 },
       //      { max: 190150, pct: .28 },
       //      { max: 413350, pct: .33 },
       //      { max: 415050, pct: .35 },
       //      { max: 5000000, pct: .396 },
       //      { max: null, pct: .436 }],
       //  trump:
       //  [{ max: 37500, pct: .12 },
       //      { max: 112500, pct: .25 },
       //      { max: null, pct: .333 }]}
       //      ];
        var bracketsClinton = [
            { max: 9275, pct: .1 },
            { max: 37650, pct: .15 },
            { max: 91150, pct: .25 },
            { max: 190150, pct: .28 },
            { max: 413350, pct: .33 },
            { max: 415050, pct: .35 },
            { max: 5000000, pct: .396 },
            { max: null, pct: .436 }
        ];
        var bracketsTrump = [
            { max: 37500, pct: .12 },
            { max: 112500, pct: .25 },
            { max: null, pct: .333 }
        ];
        var running = amt;
        var runningC = amt;
        var runningT = amt;
        var lastChunk = 0;
        var chunk = 0;
        var chunkC = 0;
        var chunkT = 0
        var tax = 0;
        var taxC = 0;
        var taxT = 0;

        // $.each(brackets, function(i, bracket) {
        //     // get each set of max, pct
        //     const now = bracket["current"];
        //     const clinton = bracket["clinton"];
        //     const trump = bracket["trump"];

        //     // run through each set to calculate tax
        //     for (i in now){
        //         var chunk = now[i].max;
        //     if (running < chunk) {
        //         chunk = running;
        //         running = 0;
        //     } else {
        //         running -= chunk;
        //     }

        //     tax += chunk * now[i].pct;
        //     console.log(running);
        //     // lastChunk = chunk;
        // };


        // //need these to work
        // for (i in clinton){
        //         var chunkC = clinton[i].max;
        //     if (runningC < chunk) {
        //         chunkC = runningC;
        //         runningC = 0;
        //     } else {
        //         runningC -= chunkC;
        //     }

        //     taxC += chunkC * clinton[i].pct;
        //     console.log(runningC);
        //     // lastChunk = chunk;
        // };
        // for (i in trump){
        //         var chunkT = trump[i].max;
        //     if (runningT < chunk) {
        //         chunkT = runningT;
        //         runningT = 0;
        //     } else {
        //         runningT -= chunkT;
        //     }
        //          console.log(runningT);

        //     taxT += chunkT * trump[i].pct;
        //     // lastChunk = chunk;
        // };
         $.each(brackets, function(i, bracket) {
            var chunk = bracket.max;

            if (running < chunk) {
                chunk = running;
                running = 0;
            } else {
                running -= chunk;
            }

            tax += chunk * bracket.pct;
            lastChunk = chunk;
        });

         $.each(bracketsClinton, function(i, bracket) {
            var chunkC = bracket.max;

            if (runningC < chunkC) {
                chunkC = runningC;
                runningC = 0;
            } else {
                runningC -= chunkC;
            }

            taxC += chunkC * bracket.pct;
            lastChunk = chunkC;
        });
         $.each(bracketsTrump, function(i, bracket) {
            var chunkT = bracket.max;

            if (runningT < chunkT) {
                chunkT = runningT;
                runningT = 0;
            } else {
                runningT -= chunkT;
            }

            taxT += chunkT * bracket.pct;
            lastChunk = chunkT;
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
<<<<<<< HEAD

        h.push('<tr><th>Total</th><td>' + num(total) + '</td></tr>');

        var percentTotal = Math.round(total/amt * 1000)/10;


        h.push('<tr><th>Percent</th><td>' + percentTotal + '</td></tr>');

=======
        
        // h.push('<tr><th>Total</th><td>' + num(total) + '</td></tr>');
        
        // var percentTotal = Math.round(total/amt * 1000)/10;

        
        // h.push('<tr><th>Percent</th><td>' + percentTotal + '</td></tr>');
        
>>>>>>> 1ecb87a03165527795187bf9d12a465c156e7fb0
        h = ('<table>' + h.join('') + '</table>');
        // document.getElementById('output').html('h');
        $('#output').html(h);


        var j = $.map(taxes, function(w, q) {
            // total += w;
            // return '<p>' + q + '<p>' + '<span>' + num(w) + '</span>';
        });
<<<<<<< HEAD

        j.push('<p class="explainer">Under current tax law you pay <span style="background-color:#000; color: white; font-weight: bold; font-size: 1.5em">' + '$' + tax + ' ' + '</span>in income taxes. You would pay ' + '<span style="background-color:#1baae1; color: white; font-weight: bold; font-size: 1.5em">' + "$" + taxC +'</span>in income taxes under the plan proposed by Hillary Clinton and' + ' ' + '<span style="background-color:red; color: white; font-weight: bold; font-size: 1.5em">'
         + '$' + taxT + '</span> under the plan proposed by Donald Trump.</p>');
=======
        
        j.push('<p class="explainer">Under current tax law you pay <span>' + tax + ' ' + '</span>  in income taxes. You would pay ' + '<span>' + taxC +'</span>in income taxes under Hillary Clintons plan and' + ' ' + '<span>'
         + ' ' + taxT + '</span> under Donald Trumps</p>');
>>>>>>> 1ecb87a03165527795187bf9d12a465c156e7fb0
        $('#result').html(j);
        document.getElementById('chart').style.visibility='visible';
            //put tax values into dataset
            var efftax = (tax/amt) * 100;
            var efftaxC = (taxC/amt) * 100;
            var efftaxT = (taxT/amt) * 100;

            var data = [
            {label:"Current", value:efftax},
            {label:"Clinton", value:efftaxC},
            {label:"Trump", value:efftaxT}
            ];

           //create chart
            $('[data-bar-chart]').each(function (i, svg) {
            var $svg = $(svg);
            data.map(function (datum) {
             return parseFloat(datum);
            });
            var label = data.map(function(d){
                return d.label;
            });
            var value = data.map(function(d){
                return d.value;
            });
            console.log(value);
            console.log(label);

            var barWidth = parseFloat($svg.data('bar-width')) || 40;
            var barSpace = parseFloat($svg.data('bar-space')) || 4;
            var chartHeight = 200;
            var chartWidth = 300;
            // var chartHeight = $svg.outerHeight();
            console.log(chartHeight);

            var y = d3.scale.linear()
                      .domain([0, d3.max(value)])
                      .range([0, chartHeight]);

            bars = d3.select(svg)
              .selectAll("rect")
                .data(data)
              .enter().append("rect")
                .attr("class", "bar")
                .attr("width", barWidth)
                .attr("x", function (d, i) { return barWidth*i + barSpace*i; })
                .attr("y", chartHeight)
                .attr("height", 0)
                .transition()
                .delay(function (d, i) { return i*150; })
<<<<<<< HEAD
<<<<<<< HEAD
                .attr("y", function (d, i) { return chartHeight-y(d); })
                .attr("height", function (d) { return y(d); });
          });


    };

=======
                .attr("y", function(d){ return chartHeight - d.value;})
                .attr("height", function(d){return d.value;});
    });
=======
                .attr("y", function(d){ return chartHeight - (d.value * 4);})
                .attr("height", function(d){return (d.value * 4);});
                
                // bars.selectAll(".bar")
                // .data(data)
                // .enter()
                // .append("text")
                // .text(function(d){
                //     return d.label;
                // });
                // .attr("x", function(d, i) {
                //     return i * ( chartWidth / data.length);
                // })
                // .attr("y", function(d) {
                //     return chartHeight - (d * 4);
                // });
                });
>>>>>>> 1ecb87a03165527795187bf9d12a465c156e7fb0
    
>>>>>>> master
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

};


    // document.getElementById('addTrans').onClick(ca;
    // $('#addTrans').click(calc);
    // $('#income').val(30000);
    // calc();
