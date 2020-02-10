const render = recipe => {
    $(`#container`).empty();
    const source = $("#recipe-template").html();
    const template = Handlebars.compile(source);
    const newHTML = template({ recipe });
    $(`#container`).append(newHTML);
  };
  const Search = () => {
    let input = $(`#input`).val();
    $.get(`/recipes/${input}`, function(response) {
      render(response)
    });
  };
  
  $(`#Search`).on(`click`, function() {
    $(`#container`).empty();
    Search();
  });

  