<p>
    <b>Percona:</b>
</p>

<p>

|                      | READ UNCOMMITTED | READ COMMITTED | REPEATABLE READ | SERIALIZABLE    |
|----------------------|------------------|----------------|-----------------|-----------------|
| Dirty Read           | Yes              | No             | No              | No              |
| Phantom Reads        | Yes              | Yes            | No              | No              |
| Lost Updates         | No               | No             | No              | Error dead lock |
| Non-repeatable reads | Yes              | Yes            | No              | No              |
</p>


<p>
    <b>Postgres:</b>
</p>

<p>
 
|                      | READ COMMITTED | REPEATABLE READ | SERIALIZABLE | 
|----------------------|----------------|-----------------|--------------|
| Dirty Read           | No             | No              | No           | 
| Phantom Reads        | Yes            | No              | No           | 
| Lost Updates         | No             | No              | Yes          |
| Non-repeatable reads | Yes            | No              | No           |
</p>