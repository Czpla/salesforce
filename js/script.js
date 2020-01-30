//cria os cartões
function creatCard(title, photo, link, forks, stars, body) {
  $('#cardrow').append(
    `<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 d-flex justify-content-sm-center">
        <div class="card mb-4" style="max-width: 580px;">
          <div class="row no-gutters">
            <div class="col-md-5">
              <img src="${photo}" class="card-img" style="min-height: 224.16px; min-width: 224.16px; background-color: #e9e9e9;">
            </div>
            <div class="col-md-7" style="max-height: 224.16px;">
              <div class="card-body" style="max-height: 224.16px; min-height: 224.16px">
                <div class="container mb-3 pl-0">
                    <h5 style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;" class="card-title">${title}</h5>
                </div>
                <p style="min-width: 273.83px; max-height: 70px; min-height: 70px; text-overflow: ellipsis; overflow: hidden; font-size: 0.7rem;" class="card-text">${body}</p>
                <div class="card-footer pr-0">
                  <div class="container">
                    <div class="row">
                      <div class="btn btn-outline-dark mr-2 p-1">
                        <a href="${link}" style="font-size: 0.8rem; text-decoration: none; color: grey;">See Github</a>
                      </div>
                      <div class="btn btn-outline-info mr-2 p-1">
                        <img src="imgs/fork.png" width="20" height="20" alt="forks"> 
                        <span style="font-size: 0.8rem;">${forks}</span>
                      </div>
                      <div class="btn btn-outline-warning p-1">
                        <img class="pb-1" src="imgs/star.png" width="20" height="20" alt="stars"> 
                        <span style="font-size: 0.8rem;">${stars}</span>
                      </div>
                    </div>  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
  )
}

//requisição ajax para obter os dados do JSON
$.ajax({
  url: 'https://api.github.com/search/repositories?q=language:Java&sort=stars&page=1',
  type: 'GET',
  dataType: 'text',
  success: function(data) {
    $('#loading').css('display', 'none')
    const dados = JSON.parse(data)
    showCards(dados)
  },
  error: function() {
    $('#loading').html("Erro arquivo não encontado.").css('font-size', '1.5rem')
  }
})

//Exibe os cartões
function showCards(jsonObj) {
  const items = jsonObj['items']

  for (let i = 0; i < items.length; i++) {
    const owner = items[i].owner
    creatCard(items[i].name, owner.avatar_url, items[i].html_url, items[i].forks, items[i].stargazers_count, items[i].description)
  }
}