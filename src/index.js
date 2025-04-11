console.log('Hello, World!');

const numbers = [2, 3, 5];

// Стрелочная функция. Не запнётся ли на ней Internet Explorer?
const doubledNumbers = numbers.map(number => number * 2);

console.log(doubledNumbers); // 4, 6, 10 

const jordanImage = new URL('./images/jordan.jpg', import.meta.url);
const jamesImage = new URL('./images/james.jpg', import.meta.url);
const bryantImage = new URL('./images/bryant.jpg', import.meta.url)

const whoIsTheGoat = [
    // меняем исходные пути на переменные
    {name: 'Michael Jordan', link: jordanImage},
    {name: 'Lebron James', link: jamesImage},
    {name: 'Kobe Bryant', link: bryantImage},
];

<img src="<%=require('./images/logo.png')%>" alt="Логотип">

    // Научим «Вебпак» динамически заменять пути в HTML-файле. С этим поможет HtmlWebpackPlugin: он умеет корректно
    подставлять правильные пути файлов. Для этого потребуется изменить привычный путь до изображения на такой

    import './styles/index.css';