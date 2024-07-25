# Инструкция Benchmark

1. Установите данный пакет, выполнив следующую команду в терминале:


        npm i benchmark-javlonbek

  
2. Запустите тестирования ваших функции:


        mybench p=path/to/test.js i=10000 r=3


_где, **p**(path) - путь к тестируемому файлу, **i**(iterations) - количество итерации для цикла for, **r**(runs) - количество прогонов_

# Требование к формату экспорта тестируемых функции
**path** - должен указать к JavaScript файлу. Файл должен экспортировать функции подлежащие тестированию в следующем формате:

        function iterationFor(){
            for(let i = 0; i<=100;i++){
                const obj = Object.create({name: 'TOm'})
            }
        }

        function createArray(){
            const newArray = new Array(20)
        }

        module.exports = {
            iterationFor,
            createArray
        }

![Scheme](public/image/img.png)
