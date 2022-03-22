var url = "https://docs.python-requests.org/pt_BR/latest/user/quickstart.html";

var xhttp = new XMLHttpRequest();
xhttp.open("GET", url, false);
xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor

console.log(xhttp.responseText);