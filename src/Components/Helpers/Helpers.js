import {staticTimes} from './Times';

export function filterStaticTimesWithTakenTimes(employees, doctor, date) {
  let docTakenRegistrations = employees.find(function(el){
    return el.surname === doctor;
  }).registrations;

  let chosenDateTakenTimes = docTakenRegistrations.map((item) => item.dateTime).filter(function(el){
    return el.includes(date);            
  })

  let chosenDateTakenTimesOnly = chosenDateTakenTimes.map(item => item.split("T")[1].substring(0,5))
  
  return staticTimes.filter((item) => !chosenDateTakenTimesOnly.includes(item))
}

export function onlyUnique(value, index, self) {
    return self.indexOf(value) === index && value !== 'Administrator';
}

export function getDoctorId (employees, doctor) {
    return employees.find(function(el){      
        return el.surname === doctor;
      }).id
}

export const getTodaysDate = () => {
  var today = new Date();
  var dd = String(new Date().getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear(); 
  today = yyyy + '-' + mm + '-' + dd;

  return today;
}

export function filterForFreeTimes(dates) {
  let allDates = dates.map((item) => item.dateTime)
  let allStaticDates = [];
  let result = [];
  let fiveUpcomingDays = [];

  var today = new Date();
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear(); 

  for (let index = 1; index < 5; index++) {
    var dd = String(new Date().getDate()+index).padStart(2, '0');
    today = yyyy + '-' + mm + '-' + dd;
    fiveUpcomingDays.push(today)
  }

  fiveUpcomingDays.forEach(date => {
    let oneDayDates = []; 
      staticTimes.forEach(time => {
        oneDayDates.push(date + " " + time)
      });
    allStaticDates.push(oneDayDates)
  });

  allDates.forEach(date => {
    date=date.replace("T"," ").substring(0,16)
    
    allStaticDates.forEach(staticDate => {
      staticDate.forEach(function(item, index, object) {
        if (item === date) 
          object.splice(index, 1);        
      });
    });
  });

  allStaticDates.forEach(dates => {
    result = result.concat(dates);
  });

  return result;
}