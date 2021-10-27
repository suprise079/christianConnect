// this file can contain any custom function that can be used to many files.


var Months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
]

// returns current date and time in the format
// month/day/year - hr:min:sec
const getCurTimeDate = () => {
  var obj = new Date();
  var t = obj.getHours() + ":"+ obj.getMinutes() + ":" + obj.getSeconds();
  var d = Months[obj.getMonth()] + " " + obj.getDate() + ", " + obj.getFullYear();
  return d + " -- " + t;
}





export default getCurTimeDate;