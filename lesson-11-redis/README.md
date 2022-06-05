### Instalation
```bash
npm install
node eviction-strategy-test/app.js 
```

### Results Part 1 - testing eviction strategy

<p>
    Не совсем понял как протестить разницу между разными стратегиями.
    Если локально тестить даже с очень небольшим лимитом по памяти для редиса разница между стратегиями не большая. На всякий случай сделал подсчет
    хитов данных в кеше чтобы посмотреть как стратегии будут влиять на очищение кеша.
    Тестил на локальном редисе, сентинел из докера почему то работает примерно в 20 раз медленее.
</p>  

<p>
    В тесте запускается скрипт который перебором находит штат рандомного города.
</p>

<h3>maxmemory 2mb</h3>

<p>

| maxmemory-policy | Script execution time     | Cache hits count | 
|------------------|---------------------------|------------------|
| volatile-lru     | 75.141ms                  | 341              |
| allkeys-lru      | 87.395ms                  | 333              | 
| volatile-lfu     | 82.661ms                  | 330              | 
| allkeys-lfu      | 82.672ms                  | 324              |
| volatile-random  | 78.279ms                  | 321              | 
| allkeys-random   | 80.356ms                  | 315              | 
| volatile-ttl     | 83.572ms                  | 327              |
</p>


### Results Part 2 - cache stampede wrapper

