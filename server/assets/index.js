const $loadingPageContainer = $('.loading-page-container')
const $loadPastHourButton = $('.load-time-period #1hago')
const $loadPastDatButton = $('.load-time-period #1dago')
const $loadPastWeekButton = $('.load-time-period #1wago')
let currentChart = null
let currentData = null

$('.load-time-period').each(function() {
  const $this = $(this)
  $this.on('click', (event) => {
    $loadingPageContainer.addClass('loading-page-active')
    requestDataFrom($this.attr('id'))
  })
})

requestDataFrom('1hago')
function requestDataFrom(from) {
  $.get('/statuses?from='+from, function(err, status, response){
    currentData = response.responseJSON.sort((a,b)=>a.id>b.id)
    drawResponseTimeChartWith(currentData)
    setCounter('datasets', currentData)
    setCounter('from', currentData)
    setCounter('to', currentData)
    setCounter('exception-rate', currentData)
    setCounter('avg-loading-time', currentData)
    $loadingPageContainer.removeClass('loading-page-active')
  })
}

function setCounter(type, data) {
  const counter = $('#'+type)
  if('datasets'==type) {
    counter.empty()
    counter.append($('<div><h1># datasets</h1><br><h1 class="giant">'+data.length+'</h1></div>'))
  }
  if('from'==type) {
    if(data.length===0){
      counter.hide()
    } else {
      counter.show()
    }
    const date = data.reduce((acc, val)=>acc<val.id?acc:new Date(val.id), new Date(data[0].id))
    console.log('-- date', date)
    counter.empty()
    counter.append($('<div><h1>from</h1><br><h2>'+ formatDate(date)+'</h2></div>'))
  }
  if('to'==type) {
    if(data.length===0){
      counter.hide()
    } else {
      counter.show()
    }
    const date = data.reduce((acc, val)=>acc>val.id?acc:new Date(val.id), null)
    counter.empty()
    counter.append($('<div><h1>to</h1><br><h2>'+ formatDate(date)+'</h2></div>'))
  }
  if('exception-rate'==type) {
    const exceptionCount = data.reduce((acc, val)=>val.statusCode>=400 ? acc+1 : acc, 0)
    const exceptionRate = (exceptionCount/data.length).toFixed(5)
    counter.empty()
    counter.append($('<div><h1>exception-rate</h1><br><h2>'+ exceptionRate+'%</h2></div>'))
  }
  if('avg-loading-time'==type) {
    let avg = data.reduce((acc, val)=>acc+val.loadingTime, 0)/data.length
    avg = avg.toFixed(1)
    counter.empty()
    counter.append($('<div><h1>avg loading time</h1><br><h2>'+ avg+'ms</h2></div>'))
  }
}

function drawResponseTimeChartWith(data) {
  $("#loading-time-chart").empty()
  if(currentChart) {
    debugger
    currentChart.destroy()
  }
  const context = document.getElementById("loading-time-chart").getContext('2d');
  currentChart = new Chart(context, {
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
  if(!date) {
    return ''
  }
  return date.toTimeString().substring(0,8)
}

function formatDate(date) {
  if(!date) {
    return ''
  }
  return date.toISOString()
}
