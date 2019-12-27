const axios = require('axios');
const ejs = require('ejs');
const { promisify } = require('util')
const { writeFile, readFile } = require('fs')
const { join } = require('path')

const fetchData = async (city = 'Chengdu,jinniu') => {
  try {
    const res = await axios({
      url: `http://wttr.in/${city}`,
      method: 'GET',
      params: {
        format: 'j1'
      }
    })
    return res.data
  } catch (error) {
    throw error
  }
}

const output = async () => {
  try {
    // const data = await fetchData()
    const file = await promisify(readFile)(join(__dirname, './result.ejs'), 'utf-8')
    const city ='Chengdu,jinniu'
    const ret = ejs.compile(file)({
      // currentCondition:data.current_condition,
      url:`http://wttr.in/${city}_0tqp_lang=zh.png`
    });
    await promisify(writeFile)('result.html', ret)
  } catch (error) {
    console.log(error);
  }
}

output()