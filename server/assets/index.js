var $loadingPageContainer = $('.loading-page-container')
$.get('/statuses', function(err, status, response){
  console.log(err, status, response)
  drawResponseTimeChartWith(response.responseJSON)
  $loadingPageContainer.removeClass('loading-page-active')
})

function drawResponseTimeChartWith(data) {
  debugger
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
  return data.map((a) => "")
}

function valuesFrom(data) {
  data = data || []
  return data.map((a) => a. loadingTime)
}
