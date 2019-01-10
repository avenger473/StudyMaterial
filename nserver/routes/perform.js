var express = require("express");
var router = express.Router()

var axios = require('axios');
var request = require('request');
var cheerio = require('cheerio');

// const bodyParser = require('body-parser');
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(cors());
/*
post data must be in the following json format =>

{
    "codeforces":"YourCodeforcesHandle",
    "spoj":"YourSpojHandle",
    "hackerearth":"YourHackerEarthHandle",
    "github":"YourGithubLink"
}

*/
var AllData = {
  codeforces:{

  },
  hackerearth:{

  },
  spoj:{

  }
}
var handles = {};

// var promise=new Promise((res,rej)=>{
router.get('/',(req,res)=>{
  // res.json({ username: 'Flavio' })
  console.log("De Diya");
  res.json(AllData);
})

router.post('/data', (req,res)=>{

    console.log(req.body);

    handles["codeforces"] = req.body.codeforces;
    handles["spoj"] = req.body.spoj;
    handles["hackerearth"] = req.body.hackerearth;
    handles["github"] = req.body.github;
    res.send("Successfully received data")

    // console.log(handles)


    //Get github user data

        var contributionsInAYear;
        var userName = handles.github    //***********************************************8change */
        url = `https://github.com/${userName}/`
        request(url, (error,response,html)=> {
        if (!error && response.statusCode == 200) {
            var $ =cheerio.load(html);
            var text = $('.js-yearly-contributions').children().children('.f4').text();
            var simp = text.replace(/ /g,'')
            var simp2 = simp.replace(/\n/g,'')
            var contributions = simp2.split('c')
            var contributionsInAYear = contributions[0];
            AllData.commits = parseInt(contributionsInAYear);

        }
        });
        // Get Latest User Rating of CF
    var userCF = handles.codeforces
        var urlRating = `http://codeforces.com/api/user.rating?handle=${userCF}`
        var urlStatus = `http://codeforces.com/api/user.status?handle=${userCF}`
        axios.get(urlRating)
        .then((response)=>{
            var len = response.data.result.length;
            var rating = response.data.result[len-1].newRating;
            AllData.codeforces.rating = rating;
        })
        .catch((err)=>{
            console.log(err);
        })

        //Get total submissions of CF
        axios.get(urlStatus)
        .then((response)=>{
            var ac = 0, i=0;                      //*****************************************Change */
            for(i in response.data.result){
            if(response.data.result[i].verdict === "OK") ac+=1;
            }
            var accepted = ac;
            var total = response.data.result.length
            AllData.codeforces.accepted = accepted;
            AllData.codeforces.total = total;


            })
            .catch((err)=>{
            console.log(err);
    })

    //Get spoj user data

    var user = handles.spoj;
    var url = `https://www.spoj.com/users/${user}/`;

    request(url, (error,response,html)=> {
    if (!error && response.statusCode == 200) {
        var $ =cheerio.load(html);
        const str = $('.profile-info-data-stats').html();
        const str1= str.replace(/\t/g,'');
        const str2=str.split('<dd>')
        const solved = str2[1].split('</dd>');
        const total = str2[2].split('</dd>');
        var subs = {
            soled_ques: parseInt(solved),
            submitted_ques: parseInt(total)

        }
        AllData.spoj.accepted = parseInt(solved[0]);
        AllData.spoj.total = parseInt(total[0]);

    }
    });


    //Get Hackerearth data

        var user = handles.hackerearth;
        var url = `https://www.hackerearth.com/users/pagelets/${user}/coding-data/`;
        request(url, (error,response,html)=> {
        if (!error && response.statusCode == 200) {
            var $ =cheerio.load(html);

            const str = $('.line-height-18').children().text();
            const str1 = str.split('Solved');
            const tmp = str1[1].split('Rating');
            const tmp2 = tmp[1].split('Problems');

            var data = {
            value: parseInt(tmp[0]),
            rating: parseInt(tmp2[0])
        };
        AllData.hackerearth.accepted = parseInt(tmp[0]);
        AllData.hackerearth.rating = parseInt(tmp2[0]);
        }
    });

})

// setInterval(()=>{
//   console.log(AllData);
// },4000);

module.exports = router;
