document.addEventListener('DOMContentLoaded', function (event) {
  let protocol = 'http://'
  let endpoint = '138.68.249.21'
  let query = '/zips/city/' // + argument

  let getZips = function (city) {
    let target = protocol + endpoint + query + city
    fetch(target, {
      method: 'get'
    }).then(function (response) {
      return response.json()
    }).then(function (data) {
      console.log(data)
    }).catch(function (err) {
      console.error(err)
    })
  }

  document.getElementById('city-form').addEventListener('submit', function (e) {
    e.preventDefault()
    let val
    val = document.getElementById('city-input').value
    val && getZips(val)
  })
})
