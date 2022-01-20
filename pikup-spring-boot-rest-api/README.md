# API with Spring Boot, MySQL, JPA and Hibernate 

## Steps to set up 

**1. Install MySQL database and Workbench**
```
https://dev.mysql.com/downloads/mysql/
https://dev.mysql.com/downloads/workbench/
```

**2. Start MySQL server locally**


**2. Create Mysql database**
```
create database pikup_database
```

**3. Create Mysql database user table**
```
CREATE TABLE `user` (
  `username` varchar(16) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(32) NOT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

```

**4. Change mysql username and password as per your installation**

+ open `src/main/resources/application.properties`

+ change `spring.datasource.username` and `spring.datasource.password` as per your mysql installation

**5. Set up Maven if applicable**
`https://www.baeldung.com/install-maven-on-windows-linux-mac`

**6. Start APIs via IntelliJ or other java IDE using Spring Boot configuration**
```
The app will start running at <http://localhost:8080>.
```



## Endpoints that can be hit via Insomnia or Postman

    GET /api/v1/users
    
    POST /api/v1/users
        Sample body:
            {
	            "username": "benszabo",
	            "email": "szaboben@rocketmail.com",
	            "password": "password"
            }
    
    GET /api/v1/users/{id}
    
    PUT /api/v1/users/{id}
        Sample body:
            {
	            "username": "bcszabo",
	            "email": "bcszabo@gmail.com",
	            "password": "pswrd"
            }
    
    DELETE /api/v1/users/{id}
