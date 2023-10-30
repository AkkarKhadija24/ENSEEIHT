/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package projectmanagment;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Scanner;

import projectmanagment.DataBase;

/**
 *
 * @author khadija
 */
public class DataBase {
    
    private String email, fName, country, pass;
    private Date date;
    final String USERDB = "user.txt"; 
    private File userDB;
    
    public DataBase(){
        
    }
   
    /**
     * User database
     * @param email
     * @param fName
     * @param country
     * @param pass 
     */
    public DataBase(String email, String fName, String country, String pass){
            super();
            this.email = email;
            this.fName = fName;
            this.country = country;
            this.pass = pass;
            
    }
    
    
    private ArrayList<DataBase> db = new ArrayList();
    
    public void addUser(DataBase user){
        this.db.add(user);
    }
    
    public ArrayList<DataBase> getListOfUser(){
        return this.db;
    }
    
    
    public File createUserDB()throws IOException{
        try{
            this.userDB = new File(this.USERDB);
            if(userDB.createNewFile()){
                System.out.println("successfully created.");
            }else{
                System.out.println("deosn't created.");
            }
        }catch (IOException e){
            System.out.println("error : "+ e);
        }
        return this.userDB;
    }
    
    
    
    public File getUserDb() throws IOException{
        return this.createUserDB();
    }
    
    
    public void fillList(File f) throws IOException{
        Scanner myReader = new Scanner(f);
        while (myReader.hasNextLine()) {
            String data = myReader.nextLine();
            String[] user = data.split(";");
            DataBase userData = new DataBase(user[0], user[1], user[2], user[3]);
            addUser(userData);
        }
        myReader.close();
    }
    
    public void addUserToFile(String email, String fName, String country, String pass) throws IOException{
        DataBase data = new DataBase(email, fName, country, pass);
        addUser(data);
        FileWriter myWriter = new FileWriter(this.USERDB, true);
        BufferedWriter bw = new BufferedWriter(myWriter);
        bw.write(email + ";" + fName + ";" + country +  ";" + pass);
        bw.close();
    }
    
    public void newLine() throws IOException{
        FileWriter myWriter = new FileWriter(this.USERDB, true);
        BufferedWriter bw = new BufferedWriter(myWriter);
        bw.newLine();
        bw.close();
    }
    
    ArrayList<String> listOfUsers = new ArrayList<String>();
    
    public String[] getUserData() throws IOException{
        BufferedReader reader = new BufferedReader(new FileReader(this.USERDB));
        String line = reader.readLine();
        String[] data = line.split(";");
        reader.close();
        return data;
    }

    /**
     * @return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email the email to set
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @return the fName
     */
    public String getfName() {
        return fName;
    }

    /**
     * @param fName the fName to set
     */
    public void setfName(String fName) {
        this.fName = fName;
    }
    
    /**
     * @return the country
     */
    public String getCountry() {
        return country;
    }

    /**
     * @param country the country to set
     */
    public void setCountry(String country) {
        this.country = country;
    }

    /**
     * @return the pass
     */
    public String getPass() {
        return pass;
    }

    /**
     * @param pass the pass to set
     */
    public void setPass(String pass) {
        this.pass = pass;
    }
    

    
}