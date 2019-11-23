// document.getElementById('bool_time_limited').addEventListener('change', (event) => {
//   if (event.target.checked) {
//     document.getElementById('time_limit').parentElement.style.display = null;
//   } else {
//     document.getElementById('time_limit').parentElement.style.display = 'none';
//   }
// })

function startGame() {
    document.getElementById('start_form').style.display = 'none';
    document.getElementById('game').style.display = null;

    //let boolTimeLimited = document.getElementById("bool_time_limited").checked;
    let timeLimit = document.getElementById('time_limit').value;
    let nbOfNames = document.getElementById('nb_of_names').value;


    // Determine which faces will be shown
    people_to_show = []
    for (let i = 0; i < nbOfNames; i++) {
        people_to_show.push(people[Math.floor(Math.random() * people.length)])
    }
        
    document.getElementById('photo').src = people_to_show[0].path
    document.getElementById('name').innerHTML = people_to_show[0].name

    let i = 1;

    function nextFace () {  
        setTimeout(function () { 
            document.getElementById('photo').src = people_to_show[i].path       
            document.getElementById('name').innerHTML = people_to_show[i].name
 
            i++;
            if (i < nbOfNames) {
                nextFace();      
            } else {
                transition()
            }
        }, timeLimit * 1000)
    }

    nextFace();

    function transition() {
        setTimeout(function() {
            document.getElementById('photo').style.display = 'none'
            document.getElementById('name').innerHTML = 'Time to remember their names!'
            shuffleArray(people_to_show)
        }, timeLimit * 1000)

        setTimeout(function () {
            nextAnswer()   
        }, timeLimit * 1000 * 2)
    }

    let currentFaceIndex = -1;

    function nextAnswer() {
        currentFaceIndex++
        if (currentFaceIndex < nbOfNames) {
            document.getElementById('photo').style.display = null
            document.getElementById('photo').src = people_to_show[currentFaceIndex].path
            document.getElementById('name').innerHTML = 'Who is this?' 
            document.getElementById('answer').style.display = null
            document.getElementById('answer').value = ''
            document.getElementById('answer').focus();
            document.getElementById('answer').select();
        } else {
            document.getElementById('play-again').style.display = null
        }
    }

    document.getElementById("answer").addEventListener("keyup", event => {
        if(event.key == "Enter") {
            if (document.getElementById('answer').value == people_to_show[currentFaceIndex].name){
                document.getElementById('name').innerHTML = 'Correct!'
                nextAnswer()
            } else {
                document.getElementById('name').innerHTML = 'Wrong, try again.'
                document.getElementById('show_answer').style.display = null
            }
        }
    });

    
    document.getElementById('show_answer').addEventListener('click', event => {
        document.getElementById('answer').value = people_to_show[currentFaceIndex].name
        document.getElementById('show_answer').style.display = 'none'
    })
    
}


/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}