$(document).ready(function() {
    // uncomment for open console in mobile browser
    // eruda.init()

    window.timer; // global variable timer
    window.timeLeft = 5 // global time left
    window.current = 0 // global current timing
    window.correct = 0 // global total correct answer

    /**
     * Object dataQuiz
     * tempat disimpannya data objek quiz
     */
    var dataQuiz = [{
        question: 'sipakah nama karakter dibawah?',
        answer: ['A. Cak Lontong', 'B. Soekarno', 'C. Taehyung'],
        correct: 0
    }, {
        question: 'Programmer itu?',
        answer: ['A. Lemah', 'B. Tangguh', 'C. Baperan'],
        correct: 1
    }, {
        question: 'Kapan kah idul fitri?',
        answer: ['A. Besok', 'B. Besok lusa', 'C. YNTKTS'],
        correct: 2
    }, ]


    /**
     * Function setupQuestion
     * fungsi yang digunakan untuk menampilkan persoal
     */
    function setupQuestion() {
        $('#soal').html(dataQuiz[window.current]['question']);
        $('#soal-id').html(window.current + 1)
        dataQuiz[window.current]['answer'].map((val, index) => {
            // console.log(index, val)
            $(`#answer-${index}`).html(val)
        })
    }

    // memanggil fungsi untuk pertamakalinya
    setupQuestion()

    /**
     * Function nextQuestion
     * fungsi yang digunakan untuk memanggil soal berikutnya
     */
    function nextQuestion() {
        window.current++
        // saveAnswer();

        if (window.current >= dataQuiz.length - 1) {
            clearInterval(window.timer)
            // stopQuiz();
        }

        // console.log('window.current', window.current)
        // resetState()
        setupQuestion();
    }

    /**
     * Function startTimer
     * fungsi untuk menjalankan timer per soal
     */
    function startTimer() {
        window.timer = setInterval(function() {
            if (window.timeLeft <= 0) {
                clearInterval(window.timer)
                $("#skor").text(window.timeLeft)
                if (window.current >= dataQuiz.length - 1) {
                    clearInterval(window.timer)
                    finish(window.correct)
                    // window.timeLeft = 0
                } else {
                    nextQuestion()
                    setTimeout(() => {
                        window.timeLeft = 5
                        startTimer()
                    }, 500)
                }
            } else {
                $("#skor").text(window.timeLeft)
            }
            window.timeLeft -= 1
        }, 1000)
    }

    // memulai timer soal
    startTimer()

    /**
     * Function finish
     * fungsi untuk menyelesaikan quiz
     */
    function finish(skor) {
        Swal.fire({
            icon: 'success',
            title: 'Selesai',
            text: 'Quiz telah selesai',
        })
        // and other actions in here
    }

    // trigger event ketika jawaban di klik
    $('[name=jawaban]').click(function() {
        var cek = dataQuiz[window.current]['correct']
        var ans = $(this).attr('data-id')

        // bila jawaban dan data quiz benar
        if (cek == ans) {
            window.correct += 1
            $(`#answer-${ans}`).addClass('bg-success')
            setTimeout(() => {
                $(`#answer-${ans}`).removeClass('bg-success')
            }, 500)
        } else { // bila salah
            $(`#answer-${ans}`).addClass('bg-danger')
            setTimeout(() => {
                $(`#answer-${ans}`).removeClass('bg-danger')
            }, 500)
        }

        // console.log('jawaban benar:', cek, '|ans:', ans)
        if (window.current >= dataQuiz.length - 1) {
            // console.log('quiz done!')
            clearInterval(window.timer)
            $("#skor").text("0")
            finish(window.correct)
        } else {
            clearInterval(window.timer)
            nextQuestion()
            // console.log('soal ke-', window.current)
            setTimeout(() => {
                window.timeLeft = 5
                startTimer()
                // nextQuestion()
            }, 500)
            // console.log($(this).attr('data-id'))
        }
    })
})
