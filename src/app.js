const express = require("express");

const app = express();
// : means dynamic routing 
app.get('/user/:userId/:name/:password/:age', (req, res) => {
    console.log(req.params) // query & params
    res.send({
        firstName: "Praful",
        lastName: "Gahlot"
    });
});



// that rgax work like .* means any thing in starting but in end is fly ex:- dregonfly 
// app.get(/.*fly$/, (req, res) => {
//     res.send({
//         firstName: "Praful",
//         lastName: "Gahlot"
//     });
// });


// /ac /abc
// app.get('/ab?c', (req, res) => {
//     res.send({
//         firstName: "Praful",
//         lastName: "Gahlot"
//     });
// });

//  /abcd /abcbcbcbcd
// app.get('/a(bc)+d', (req, res) => {
//     res.send({
//         firstName: "Praful",
//         lastName: "Gahlot"
//     });
// });


// /abbbbbc  & /abc
// app.get('/ab+c', (req, res) => {
//     res.send({
//         firstName: "Praful",
//         lastName: "Gahlot"
//     });
// });


//  /abcd /abPrafulcd also work
// app.get('/ab*cd', (req, res) => {
//     res.send({
//         firstName: "Praful",
//         lastName: "Gahlot"
//     });
// });



app.listen(7777, () => {
    console.log("Server is listening on the port 7777"); // Fixed here
});
