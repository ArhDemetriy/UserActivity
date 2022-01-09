# Вопросы по тз

## Retention
если вернулся в день когда регнулся, это возврат в 0 день или в 1 ?
буду считать что это 0 день

что считать началом дня? полночь по гринвичу или в часовом поясе клиента?
а может лучше осчитывать интевал от момента регистрации, а не от начала дня регистрации?
буду считать что это полночь по гринвичу

## Histogram


# тз

## Постановка задачи
Сделать простое веб-приложение.
Первые 3 пункта - обязательны. Остальные - по желанию, в зависимости от вашего уровня и желания его продемонстрировать в этой задаче, чтобы претендовать на старте на более сложные нестандартные задачи.

1) Пользователь заполняет сами ячейки внутри таблицы на веб-странице и вводит в них даты для пользователей некоторой абстрактной системы в следующем формате:

UserID; Date Registration; Date Last Activity;
1 ; [dd.mm.yyyy] ; [dd.mm.yyyy] ;
2 ; [dd.mm.yyyy] ; [dd.mm.yyyy] ;

2) По кнопке Save данные сохраняются в БД.
3) По кнопке Calculate для сохранённых данных:
Рассчитывается и выводится одна метрика с названием “Rolling Retention 7 day”. Rolling Retention X day = (количество пользователей, вернувшихся в систему в X-ый день после регистрации или позже) / (количество пользователей, зарегистрировавшихся в системе X дней назад или раньше) * 100%.
Рисуется гистограмма распределения длительностей жизней пользователей (длительность жизни - это количество времени в днях от регистрации до последней активности).
4) Сделать профилирование производительности в свободном формате, чтобы ответить на вопросы: “Сколько времени уходит на ключевые операции в задаче (достать из базы, рассчитать, вывести значения, отрендерить и пр.) и какие узкие места в системе?”.
5) Продвинутые функции работы с гистограммой: включение логарифмической оси, аппроксимирование распределения, расчёт базовых метрик (среднее, медиана, 10 и 90 процентили).

## Требования к реализации
Требуется аккуратно и вдумчиво реализовывать логику расчётов.
Стилизацию отдельных UI-элементов необходимо взять отсюда: Ссылка на figma
Технологический стек:
Для fullstack разработчиков: React, .NET Core, БД - любая реляционная.
Пожелания к реализации back-end:
Использование EF в качестве ORM и EF миграции.
Использование атрибутов для валидации входящих данных.
Использование Dependency Injection. Предпочтительно использовать встроенный в .net core механизм.
Многослойная архитектура: Context, Service, Controller.
Для фронтенд разработчиков: бэк можно написать на NodeJS (предпочтительнее) или реализовать всю логику на фронте и замокать бэк.
Формат результата задания:
Исходный код - ссылка на репозиторий (github, gitlab или др.)
Работающее приложение - деплой приложения на любом удобном хостинге/сервере с открытым URL к нему.
Если у вас проблемы с деплоем приложения, которые вы не в состоянии решить, то можно добавить в репозиторий докер файлы (необходимые DockerFile и docker-compose.yml) и инструкцию поднятия контейнера с приложением локально в docker - такой вариант менее предпочтительный и влияет на итоговую оценку задания.

# Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
