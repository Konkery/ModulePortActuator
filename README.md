<div style = "font-family: 'Open Sans', sans-serif; font-size: 16px">

# ModuleActuatorPort

<div style = "color: #555">
    <p align="center">
    <img src="./res/logo.png" width="400" title="hover text">
    </p>
</div>

## Лицензия

<div style = "color: #555">
В разработке
</div>

## Описание
<div style = "color: #555">

Модуль предназначен для работы с цифровыми и аналоговыми портами в рамках фреймворка EcoLite. Обеспечивает запись в порт. Модуль разработан в соответствии с нотацией архитектуры актуаторов и является потомком класса [ClassActuator](https://github.com/Konkery/ModuleActuatorArchitecture/blob/main/README.md). Не применяется в прикладном коде.

### ModuleDigitalActuator и ModuleAnalogActuator
Технически ModuleActuatorPort реализует закладывает логику, относящуюся к актуатору как цифрового порта, так и аналогового. 
А метод взаимодействия с портом (аналог/цифра) определяется конфигом (см. [конструктор](./README.md#конструктор)).

Каждый i-й канал сенсора относится к i-му переданному в конфиге порту. 

</div>

## Конструктор
<div style = "color: #555">

Конструктор принимает данные из конфига. Пример ниже:
```json
"01": {
    "pins": ["A0", "P12"],
    "name": "PortActuator",
    "article": "",
    "type": "actuator",
    "channelNames": ["analog", "digital"],
    "typeInSignals": ["analog", "digital"],   // Внимание: именно это поле определяет как модуль будет взаимодействовать с данными портами 
    "quantityChannel": 2,
    "busTypes": [],
    "manufacturingData": {},
    "modules": ["ModulePortActuator.min.js"]
}
```

### Методы
<div style = "color: #555">

- <mark style="background-color: lightblue">On(_chNum, val, _opts)</mark> - подает сигнал на порт;
- <mark style="background-color: lightblue">Off(_chNum)</mark> - прерывает подачу сигнала на порт;
- <mark style="background-color: lightblue">Configure(_chNum, _opts)</mark> - настраивает режим работы порта;
- <mark style="background-color: lightblue">GetInfo(_chNum)</mark> - выводит информацию о порте.
</div>

### Примеры
#### Использование ModulePortActuator 
<div style = "color: #555">

```js
// Для наглядности "посадим" на порты А0 и Р12 светодиоды 
let a_ports = SensorManager.CreateDevice('21');

// Явное задание режима порта
a_ports[0].Configure(mode: 'af_output');
a_ports[1].Configure(mode: 'output');

// Подадим аналоговый сигнал на А0
a_ports[0].On(0.5, { freq: 50 });  
// Подадим цифровой сигнал на P12
a_ports[1].On(1); 

```

Результат выполнения:
<div align='left'>
    <img src='./example-1.png'>
</div>

</div>

### Зависимости
<div style = "color: #555">

</div>

</div>
