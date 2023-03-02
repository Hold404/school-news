## SchoolNews

ICT school project. Jelgava, 5-ths secondary school.  
Author: ``Jegor Dorofejev``  
Teacher: ``Diana Bobriševa-Gončaruk``

# Setting up
```shell
cd frontend
npm install
cd ../backend
npm install
```
Создать файл ``.env`` по пути ``/backend/src``, Тело файла:
```dotenv
DATABASE_URL=mysql://db_username:db_password@db_ip:db_port/db_name'
```
Удалить папку ``/backend/src/prisma/migrations`` (если есть)  
Мигрировать базу данных.
```shell
npx prisma generate
npx prisma migrate dev --name migration
```

### Project Startup
```shell
cd frontend
npm run dev
cd ../backend
npm run start
```