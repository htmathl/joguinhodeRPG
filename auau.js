var url = "https://docs.python-requests.org/pt_BR/latest/user/quickstart.html";//Sua URL

var xhttp = new XMLHttpRequest();
xhttp.open("GET", url, false);
xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor

console.log(xhttp.responseText);