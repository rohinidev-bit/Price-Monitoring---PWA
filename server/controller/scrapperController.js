const puppeteer = require('puppeteer');
exports.first_scrape = (req, res) => {
    console.log(req.body);
    let item_id=req.body.item_id;
    scraper(item_id)
      .then(result => {
        if (result) {
          console.log(result);
          res.send(result.items);
        }
      })
      .catch(err => {
        res.send({
          err: err,
          msg: 'Error - something went wrong scraping the item'
        });
      });
  };


  let scraper = async item_id => {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    });
    const page = await browser.newPage();
    if(typeof item_id == 'string'){
       item_id = item_id.split(" ").join("+");
    }

    const url="https://www.amazon.in/s?k="+item_id+"&ref=nb_sb_noss_2";
    console.log("URL",url);
    await page.goto(url);
    await page.waitForTimeout(3000);
    await page.waitForSelector('#search > div.s-desktop-width-max')
    const result = await page.evaluate(() => {
        let price=1;
        let imgSrc="/img/mobile.jpg";
        let link="";
          let items=[];
       document.querySelectorAll('.s-asin').forEach(item=>{
          if(item !==null){
              let title=item.querySelector('.a-text-normal').innerText;
              if(item.querySelector('.a-price-whole')!=null){
              price=item.querySelector('.a-price-whole').innerText;
              }else{
                  price=0;
              }
              if(item.querySelector('.a-price-whole')!=null){
              imgSrc=item.querySelector('.s-image').src;
              }
              if(item.querySelector('.a-link-normal')!=null){
                  link=item.querySelector('.a-link-normal').href;
              }
             
            items.push({"title":title,"price":price,"imgSrc":imgSrc,"link":link});
          }
         
      });
      return {
        items
      };
    });

    browser.close();

    return result;
  };