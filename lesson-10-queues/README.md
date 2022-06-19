### Instalation
```bash
npm install
cd beanstalktd-test
#or
cd redis-test

node consumer.js
node producer.js
```

### Results

<p> 100 000 requests per each test</p>

<p>

| Queue           | Execution time | RPS     | 
|-----------------|----------------|---------|
| REDIS RDB       | 70.315s        | 1422.17 |
| REDIS AOF       | 75.189s        | 1329.98 | 
| BEANSTALKD      | 140.349s       | 712.51  | 
</p>

