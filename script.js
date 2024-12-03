    // Получение всех необходимых элементов DOM
    const quoteText = document.querySelector(".quote"), // Элемент для отображения текста цитаты
        quoteBtn = document.querySelector("button"), // Кнопка для генерации новой цитаты
        authorName = document.querySelector(".name"), // Элемент для отображения имени автора
        speechBtn = document.querySelector(".speech"), // Кнопка для озвучивания цитаты
        copyBtn = document.querySelector(".copy"), // Кнопка для копирования текста цитаты
        twitterBtn = document.querySelector(".twitter"), // Кнопка для публикации цитаты в Twitter
        synth = speechSynthesis; // API синтеза речи браузера

    // Функция для получения случайной цитаты
    function randomQuote() {
        quoteBtn.classList.add("loading"); // Добавление класса загрузки к кнопке
        quoteBtn.innerText = "Loading Quote..."; // Изменение текста кнопки во время загрузки

        // Выполнение запроса к API Forismatic для получения случайной цитаты
        fetch("https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru")
            .then(response => response.json()) // Преобразование ответа в JSON
            .then(result => {
                // Обновление текста цитаты и имени автора
                quoteText.innerText = result.quoteText;
                authorName.innerText = result.quoteAuthor || "Неизвестный автор"; // Если автор отсутствует, указываем "Неизвестный автор"
                quoteBtn.classList.remove("loading"); // Убираем класс загрузки
                quoteBtn.innerText = "New Quote"; // Восстанавливаем текст кнопки
            });
    }

    // Событие: Нажатие на кнопку озвучивания цитаты
    speechBtn.addEventListener("click", () => {
        if (!quoteBtn.classList.contains("loading")) { // Проверяем, не идет ли загрузка новой цитаты
            // Создаем объект синтеза речи с текстом цитаты и автора
            let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
            synth.speak(utterance); // Проигрываем озвучивание цитаты
            setInterval(() => {
                // Добавляем или удаляем класс активности кнопки во время воспроизведения
                !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
            }, 10);
        }
    });

    // Событие: Копирование текста цитаты в буфер обмена
    copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(quoteText.innerText); // Копируем текст цитаты
    });

    // Событие: Публикация цитаты в Twitter
    twitterBtn.addEventListener("click", () => {
        // Создаем URL для публикации в Twitter с текстом цитаты
        let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
        window.open(tweetUrl, "_blank"); // Открываем новый вкладку с созданным URL
    });

    // Событие: Генерация новой цитаты при нажатии на кнопку
    quoteBtn.addEventListener("click", randomQuote);