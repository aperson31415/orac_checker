async function check() {
    problem = document.getElementById('problem_id').value
    user = document.getElementById('user').value

    url = "https://orac2.info/problem/"+problem+"/hof"
    result = await fetch("https://raspy-union-b9c5.acoder31415.workers.dev/?url="+encodeURIComponent(url))
    html = await result.text()

    parser = new DOMParser();
    doc = parser.parseFromString(html, "text/html");
    console.log(doc)
    title = doc.getElementsByClassName("mb-0")[0].innerText;
    div = doc.querySelector("p#solversList");
    content = div.innerHTML;

    result_div = document.getElementById('result')
    if(content.includes(user)) {
        result_div.innerText = 'User '+user+' has solved problem '+problem+' ('+title+'). The verification link is '+'https://aperson31415.github.io/orac_checker?problem_id='+problem_id+'&user='+user;
    } else {
        result_div.innerText = 'User '+user+' has not solved problem '+problem+' ('+title+'). The verification link is '+'https://aperson31415.github.io/orac_checker?problem_id='+problem_id+'&user='+user;
    }
}

window.addEventListener('load', (event) => {
    try {
        urlParams = new URLSearchParams(window.location.search)
        problem_id = urlParams.get('problem_id')
        user = urlParams.get('user')
        if(problem_id == null || user == null) {
            //
        } else {
            document.getElementById('problem_id').value = problem_id
            document.getElementById('user').value = user
            check()
        }
    } catch(error) {
        //
    }
});
