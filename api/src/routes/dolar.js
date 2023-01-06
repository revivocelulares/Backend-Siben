const axios = require('axios');
const route = require("express").Router();

route.get('/', async (req, res) => {
    const dolar = await axios.get('https://api.estadisticasbcra.com/usd_of_minorista',
    {
        headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDQ1MDg4ODIsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJyb21pbmFib2NvbkBob3RtYWlsLmNvbSJ9.G_b-fkqHKiL2gU2ncPwOfNI_BTJ46eidbueziqCrCtNMiXSvZskqM0btOqHSSKPyVuVHLcu4220H71YQS1geZg`,
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'GET',
        },
    });
    return res.send(dolar.data[dolar.data.length - 1]);
});

module.exports = route;

