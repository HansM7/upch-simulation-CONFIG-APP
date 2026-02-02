Initialization all databases

cisa_reservation
cisa_auth
cisa_engineering

# Create database reservation

```
CREATE DATABASE cisa_reservation
WITH ENCODING = 'UTF8'
LC_COLLATE = 'es_PE.UTF-8'
LC_CTYPE = 'es_PE.UTF-8'
TEMPLATE template0;
```

```
CREATE DATABASE cisa_auth
```

```
CREATE DATABASE cisa_engineering
```