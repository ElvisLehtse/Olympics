This is a simple application designed to store and read sportsman results from the server and display them for the end-user.  

Setup:  
1) Create a PostgreSQL server named 'olympics' to create the server.  
2) Copy the contents of Create server.sql and run it in the olympics server's query tool to create the necessary tables.  
3) Clone the repository and open your terminal window/command prompt inside project's path directory.
4) Change your PostgreSQL credentials in the project directory's src -> main -> resources -> application.properties  
5) Install the necessary maven files from the maven wrapper by typing:  
   For Unix systems: ./mvnw clean install  
   For Windows: mvnw.cmd clean install  
6) Run the application by typing:  
   ./mvnw spring-boot:run  
7) Start the react application by opening the terminal window inside olympics-front folder and typing:
   npm install
   npm start  
9) Your default browser should open automatically with the application running.  
