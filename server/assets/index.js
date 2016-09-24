var $loadingPageContainer = $('.loading-page-container')
$.get('/statuses', function(err, status, response){
  console.log(err, status, response)
  const data = response.responseJSON.sort((a,b)=>a.id>b.id)
  drawResponseTimeChartWith(data)
  setCounter('datasets',data)
  setCounter('from',data)
  setCounter('to',data)
  setCounter('exception-rate',data)
  $loadingPageContainer.removeClass('loading-page-active')
})

function setCounter(type, data) {
  var counter = $('#'+type)
  if('datasets'==type) {
    counter.append($('<div><h1># datasets</h1><br><h1 class="giant">'+data.length+'</h1></div>'))
  }
  if('from'==type) {
    const date = data.reduce((acc, val)=>acc<val.id?acc:new Date(val.id))
    counter.append($('<div><h1>from</h1><br><h2>'+ formatDate(date)+'</h2></div>'))
  }
  if('to'==type) {
    const date = data.reduce((acc, val)=>acc>val.id?acc:new Date(val.id))
    counter.append($('<div><h1>to</h1><br><h2>'+ formatDate(date)+'</h2></div>'))
  }
  if('exception-rate'==type) {
    const exceptionCount = data.reduce((acc, val)=>val.statusCode>=400 ? acc+1 : acc, 0)
    const exceptionRate = (exceptionCount/data.length).toFixed(5)
    counter.append($('<div><h1>exception-rate</h1><br><h2>'+ exceptionRate+'%</h2></div>'))
  }
}

function drawResponseTimeChartWith(data) {
  var context = document.getElementById(" loadingTimeChart").getContext('2d');
  var myLineChart = new Chart(context, {
    type: 'line',
    data: {
      labels: labelsFrom(data),
      datasets: [{
        label: "Response time (ms)",
        fill: false,
        lineTension: 0.05,
        borderColor: "rgba(33,33,33,0.66)",
        borderWidth: 1,
        data: valuesFrom(data),
      }]
    }
  });
}


function labelsFrom(data) {
  data = data || []
  return data.map((a, index) => {
    if([0, parseInt(data.length/4), parseInt(data.length/2), parseInt(data.length*3/4), data.length-1].indexOf(index) >= 0) {
      return formatTime(new Date(a.id))
    }
    return ""
  })
}

function valuesFrom(data) {
  data = data || []
  return data.map(a => a.loadingTime)
}

function formatTime(date){
  return date.toTimeString().substring(0,8)
}

function formatDate(date) {
  return date.toISOString()
}
