
 function getCurrentTime() {
    let nz_date_string = new Date().toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" });
    let date_nz = new Date(nz_date_string);
  
      // year as (YYYY) format
  let year = date_nz.getFullYear();
  
  // month as (MM) format
  let month = ("0" + (date_nz.getMonth() + 1)).slice(-2);
  
  // date as (DD) format
  let date = ("0" + date_nz.getDate()).slice(-2);
  
  // hours as (HH) format
  let hours = ("0" + date_nz.getHours()).slice(-2);
  
  // minutes as (mm) format
  let minutes = ("0" + date_nz.getMinutes()).slice(-2);
  
  // seconds as (ss) format
  let seconds = ("0" + date_nz.getSeconds()).slice(-2);
  let date_time = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
  return date_time;
  }

  module.exports = {
    getCurrentTime
   
};