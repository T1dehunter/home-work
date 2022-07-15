### Part 1 - Master - Slave Replication

### install
```bash
docker-compose up --build

# Slave_1 setup SQL
CHANGE MASTER TO MASTER_HOST={IF OF YOUR MASTER}, MASTER_USER='slave_2', MASTER_PASSWORD='password', MASTER_LOG_FILE = 'mysql-bin.000003', MASTER_LOG_POS = 157;
FLUSH PRIVILEGES;
START SLAVE;

# Slave_2 setup SQL
CHANGE MASTER TO MASTER_HOST={IF OF YOUR MASTER}, MASTER_USER='slave_2', MASTER_PASSWORD='password', MASTER_LOG_FILE = 'mysql-bin.000003', MASTER_LOG_POS = 157;
FLUSH PRIVILEGES;
START SLAVE;

cd app && npm install;
node create-users.js
```

### Results


<p><img src="results/1.png"></p>
<p><img src="results/2.png"></p>
<p><img src="results/3.png"></p>
<p><img src="results/4.png"></p>
<p><img src="results/5.png"></p>
<p><img src="results/6.png"></p>
<p><img src="results/7.png"></p>
<p><img src="results/8.png"></p>
<p><img src="results/9.png"></p>
<p><img src="results/10.png"></p>
<p><img src="results/11.png"></p>
