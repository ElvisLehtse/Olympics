This is a simple application designed to store and read sportsman results from the server and display them for the end-user.  

Setup:  
1) Create a PostgreSQL server named 'olympics' to create the server.  
2) Copy the contents of Create server.sql and run it in the olympics server's query tool to create the necessary tables.  
3) Clone the repository and open your terminal window/command prompt inside project's path directory.  
4) Install the necessary maven files from the maven wrapper by typing:  
   For Unix systems: ./mvnw clean install  
   For Windows: mvnw.cmd clean install  
5) Run the application by typing:  
   mvn spring-boot:run  
6) Start the react application by opening the terminal window inside olympics-front folder and typing:  
   npm start  
7) Your default browser should open automatically with the application running.  
