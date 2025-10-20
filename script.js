// Обработка формы голосования
document.getElementById('votingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Получаем данные формы
    const formData = {
        name: document.getElementById('studentName').value,
        id: document.getElementById('studentId').value,
        class: document.getElementById('studentClass').value,
        candidate: document.getElementById('candidateSelect').value
    };
    
    // В реальном приложении здесь будет отправка данных на сервер
    // Для демонстрации просто покажем модальное окно
    document.getElementById('confirmationModal').style.display = 'flex';
    
    // Очистка формы
    document.getElementById('votingForm').reset();
});

// Закрытие модального окна
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('confirmationModal').style.display = 'none';
});

document.getElementById('modalOkButton').addEventListener('click', function() {
    document.getElementById('confirmationModal').style.display = 'none';
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', function(e) {
    const modal = document.getElementById('confirmationModal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Плавная прокрутка к разделам
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Закрытие мобильного меню после клика
            if (window.innerWidth <= 768) {
                document.querySelector('.nav-links').classList.remove('active');
            }
        }
    });
});

// Мобильное меню
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Анимация прогресс-баров при прокрутке
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
}

// Запуск анимации при загрузке страницы
window.addEventListener('load', animateProgressBars);

// Обновление результатов (для демонстрации)
function updateResults() {
    // В реальном приложении здесь будет запрос к серверу
    // Для демонстрации просто обновим числа случайным образом
    const totalVotes = document.getElementById('totalVotes');
    const currentVotes = parseInt(totalVotes.textContent);
    
    // Случайное увеличение количества голосов
    const newVotes = currentVotes + Math.floor(Math.random() * 10);
    totalVotes.textContent = newVotes;
    
    // Обновление процентов (случайным образом для демонстрации)
    const percentages = [42, 35, 23];
    const randomChange = Math.random() * 4 - 2; // от -2 до +2
    
    // Изменяем проценты случайным образом, но сохраняем сумму 100%
    percentages[0] += randomChange;
    percentages[1] -= randomChange / 2;
    percentages[2] -= randomChange / 2;
    
    // Обновление DOM
    document.querySelectorAll('.vote-percent').forEach((element, index) => {
        element.textContent = Math.round(percentages[index]) + '%';
    });
    
    document.querySelectorAll('.progress').forEach((element, index) => {
        element.style.width = Math.round(percentages[index]) + '%';
    });
    
    document.querySelectorAll('.vote-count').forEach((element, index) => {
        const votes = Math.round(newVotes * percentages[index] / 100);
        element.textContent = votes + (votes % 10 === 1 && votes % 100 !== 11 ? ' голос' :(votes % 10 >= 2 && votes % 10 <= 4 && (votes % 100 < 10 || votes % 100 >= 20) ? ' голоса' : ' голосов'));
    });
}

// Обновление результатов каждые 10 секунд (для демонстрации)
setInterval(updateResults, 10000);