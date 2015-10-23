
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!

    var street = $('#street').val();
    var city = $('#city').val();

    $greeting.text("So you want to live at "+street+' '+city+"?");

    var img = "http://maps.googleapis.com/maps/api/streetview?size=1600x900&location="+street+" "+city;
    // var img = '<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size=600x400&location=washington">'
    // console.log(street);
    // console.log(city);
    $body.append('<img class="bgimg" src="'+img+'">');


    $.getJSON("http://api.nytimes.com/svc/search/v2/articlesearch.json?callback=svc_search_v2_articlesearch&q="+city+"&sort=newest&api-key=e9cd881a33f85e3c14e8f872eeccdcca%3A2%3A73285152",function(data){
        for(var i in data.response.docs){
            // console.log(data.response.docs[i].headline.print_headline);
            $nytHeaderElem.text("New York Times Articles About " + city);
            $nytElem.append('<li><a href="'+data.response.docs[i].web_url+'">'+data.response.docs[i].headline.main+'</a>');
            // console.log(data.response.docs[i].lead_paragraph);
            $nytElem.append('<p>'+data.response.docs[i].lead_paragraph+'</p></li>');
        }
    }).error(function(){
        $nytHeaderElem.text("New York Times Articles Could Not Be Loaded");
    });

    var t = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);

    $.ajax({
        url : "https://en.wikipedia.org/w/api.php?action=opensearch&search="+city+"&format=json&callback=wikiCallback",
        dataType : "jsonp",
        success : function(response){
            console.log(response);
            for(i in response[1]){
                console.log(response[1][i]);
                $wikiElem.append("<li><a href='"+response[3][i]+"'>"+response[1][i]+"</a></li>" );
            }

            clearTimeout(t);
        }
    }
    );

    return false;
};

$('#form-container').submit(loadData);

// loadData();
