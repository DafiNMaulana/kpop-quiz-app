// -------------data-------------
const dataQuiz = 
[
    {
        question : 'sipakah nama karakter dibawah?',
        answer : ['A. Cak Lontong', 'B. Soekarno', 'C. Taehyung'],
    },
    {
        question : 'Programmer itu?',
        answer : ['A. Lemah', 'B. Tangguh', 'C. Baperan'],
    },
    {
        question : 'Kapan kah idul fitri?',
        answer : ['A. Besok', 'B. Besok lusa', 'C. YNTKTS'],
    },
];

let currentQ = 0;
let total_score = 0;
let saved_answer = [];
const correct_answer = [0, 1, 2];
// -------------data END-------------



// -------------Setup Question-------------
$(document).ready(function() {
    setupQuestion()
});


function setupQuestion() {
    $('#soal').html( dataQuiz[currentQ]['question']);
    $('#answer-0').html( dataQuiz[currentQ]['answer'][0]);
    $('#answer-1').html( dataQuiz[currentQ]['answer'][1]);
    $('#answer-2').html( dataQuiz[currentQ]['answer'][2]);
}
// -------------Setup Question END-------------



// -------------handle next Question-------------
function nextQuestion() {
    currentQ++

    saveAnswer();

    if(currentQ > dataQuiz.length -1 ) {
        stopQuiz();
    }
    
    resetState()
    setupQuestion();

}

function stopQuiz() {
    checkScore()
    $('#skor').html(total_score)
    Swal.fire({
        icon: 'success',
        title: 'Selesai',
        text: 'Quiz telah selesai',
    });
}
// -------------handle next Question END-------------



// -------------handle Answer-------------
function saveAnswer() {
    const selectAnswer = $('input[name=jawaban]:checked');
    if(selectAnswer != null )
        saved_answer.push((selectAnswer.attr('data-id')));
        console.log(saved_answer)
    
}
// -------------handle Answer END-------------

// -------------check score-------------
function checkScore() {
    for( i = 0; i < saved_answer.length; i++ ) {
        if( saved_answer[i] == correct_answer[i] ) 
        total_score += 1
    }
}
// -------------check score END-------------


// -------------reset state-------------
function resetState() {
    $('input[name=jawaban]:checked').prop('checked', false);
}
// -------------reset state END-------------
