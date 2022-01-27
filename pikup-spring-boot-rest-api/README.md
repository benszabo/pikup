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

**4 Create Mysql database activity table**
```
CREATE TABLE `activity` (
`id` bigint NOT NULL AUTO_INCREMENT,
`activity_name` varchar(255) NOT NULL,
`activity_time` varchar(255) NOT NULL,
`create_time` datetime DEFAULT NULL,
`member_count` varchar(255) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

**5. Change mysql username and password as per your installation**

+ open `src/main/resources/application.properties`

+ change `spring.datasource.username` and `spring.datasource.password` as per your mysql installation

**6. Set up Maven if applicable**
`https://www.baeldung.com/install-maven-on-windows-linux-mac`

**7. Start APIs via IntelliJ or other java IDE using Spring Boot configuration**
```
The app will start running at <http://localhost:8080> with basic auth user/password being admin/admin
```



## Some endpoints that can be hit via Insomnia or Postman, see Insomnia.json to import additional requests

    GET /user/v1/users
    
    POST /user/v1/users
        Sample body:
            {
	            "username": "benszabo",
	            "email": "szaboben@rocketmail.com",
	            "password": "password"
            }
    
    GET /user/v1/users/{id}
    
    PUT /user/v1/users/{id}
        Sample body:
            {
	            "username": "bcszabo",
	            "email": "bcszabo@gmail.com",
	            "password": "pswrd"
            }
    
    DELETE /user/v1/users/{id}
