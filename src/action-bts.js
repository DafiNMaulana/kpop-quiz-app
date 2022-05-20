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
        question: 'BTS dikenal dengan nama lain...',
        answer: ['Bangtan Sonyeondan', 'Bangtan Scene', 'Behind the Scene'],
        correct: 0
    }, {
        question: 'Berapakah jumlah anggota BTS...',
        answer: ['4', '8', '7'],
        correct: 2
    }, {
        question: 'Siapakah leader BTS?',
        answer: ['Wonwoo', 'Cha Eun-woo', 'Rap Monster'],
        correct: 2
    }, {
        question: 'Siapakah anggota pertama BTS?',
        answer: ['Supreme Boi', 'Rap Monster', 'Bang Si Hyuk'],
        correct: 1
    }, {
        question: 'Bulan apa BTS debut?',
        answer: ['Desember', 'Juni', 'Maret'],
        correct: 1
    }, {
        question: 'Siapa Dancer BTS?',
        answer: ['J-Hope', 'Jimin', 'Jungkook'],
        correct: 0
    }, {
        question: 'Apa nama asli Rap Monster?',
        answer: ['Kim Book-jo', 'Kim Jungkook', 'Kim Namjoon'],
        correct: 2
    }, {
        question: 'Apa nama panggung Kim Taehyung?',
        answer: ['Supreme Boi', 'V', 'Nuna V'],
        correct: 1
    }, {
        question: 'Apa nama fandom BTS?',
        answer: ['Once', 'VIP', 'ARMY'],
        correct: 2
    }, {
        question: 'Apa kepanjangan dari A.R.M.Y?',
        answer: ['Adorable Representative M.C For Young', 'Awesome Representative M.C For Your', 'Adorable Representative M.C For Youth'],
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
