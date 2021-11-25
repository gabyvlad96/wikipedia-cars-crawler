const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 3000;
const BASE_URL = 'https://en.wikipedia.org';
const SOURCE_URL = BASE_URL + '/wiki/List_of_automobile_sales_by_model';

const loadHTMLFromURL = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log('HTML load error: ' + err);
  }
};

const extractBodyClass = (url) => {
  return new Promise(async (resolve, reject) => {
    let noOfTries = 2;
    let htmlResult = null;
    while (!htmlResult && noOfTries > 0) {
      htmlResult = await loadHTMLFromURL(url);
      noOfTries -=1;
    }
    if (!htmlResult) {
      reject([]);
      return;
    }
    const $ = cheerio.load(htmlResult);
    const aChilds = $('.infobox tr > th').find('[title]');
    const classObject = aChilds.filter((i, elem) => $(elem).attr('title') === 'Car classification');
    const aObjects = classObject.parents().eq(1).children('td').children('a');
    const bodyClassNames = aObjects.map(function() {
      return $(this).text();
    }).get();
    resolve(bodyClassNames);
  });
};

const extractModels = async (html) => {
  const modelArray = [];
  const $ = cheerio.load(html);
  $('.wikitable tr').map(async function() {
    const name = $(this).children('th').children('i, a').text();
    // get production period
    const productionPeriodHTML = $(this).children('td').eq(1).html();
    const productionPeriod = productionPeriodHTML ? productionPeriodHTML.slice(0, -1).split('<br>') : null;
    // get model url
    const modelUrl = $(this).children('th').find('a').attr('href');
    const modelUrlFull = modelUrl ? BASE_URL + modelUrl : null;
    // get image url
    const rawImageUrl = $(this).children('td').eq(0).find('img').attr('src');
    let imageUrl = null;
    if (rawImageUrl) {
      const splitString = rawImageUrl.split('.');
      const imageFormat = splitString[splitString.length - 1];
      imageUrl = 'https:' + rawImageUrl.split(imageFormat)[0].replace('/thumb', '') + imageFormat;
    }
    if (name && modelUrlFull) {
      modelArray.push({name, productionPeriod, modelUrlFull, imageUrl});
    }
  });

  return modelArray;
};

app.get('/getAllCars', async (req, res) => {
  const html = await loadHTMLFromURL(SOURCE_URL);
  const modelArray = await extractModels(html);
  res.status(200);
  res.send(modelArray);
});

app.get('/getCarDetails', async (req, res) => {
  try {
    const response = await extractBodyClass(req.query.url);
    res.status(200);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send('Error: ' + error);
  }
});

app.listen(PORT);
