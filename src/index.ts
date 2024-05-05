import { AppDataSource } from "./data-source";
import { Account } from "./entity/Account";
import * as express from "express";
const bcrypt = require("bcrypt");

const { getRepository } = require("typeorm");
const app = express();
const bodyParser = require("body-parser");
/*
AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you c/*an setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
*/
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Trim the email and password values
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Find the account based on the trimmed email
    const account = await AppDataSource.manager.findOne(Account, {
      where: { email: trimmedEmail },
    });
    if (!account) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the trimmed password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(
      trimmedPassword,
      account.password
    );
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Invalid credentials - Password mismatch" });
    }

    // At this point, the email and password are valid
    // You can implement additional logic here, such as creating and returning a JWT token

    // Prepare the response object
    const response = {
      message: "Login successful",
      userId: account.id,
      type: account.type,
      groupeId: null,
    };
    /*
    // If the account type is student, fetch the groupeId
    if (account.type === "student") {
      const studentInfo = await AppDataSource.manager.findOne(Student, {
        where: { account: { id: account.id } },
        relations: ["groupe"], // Include the 'groupe' relation
      });

      // Assuming studentInfo contains a property named 'groupe'
      if (studentInfo) {
        response.groupeId = studentInfo.groupe?.id; // Adjust the property name based on your entity
      }
    }
*/
    res.status(200).json(response);
  } catch (error) {
    console.error("Error during login:", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});



app.post("/professeur", async (req, res) => {
  try {
    const { nom, prenom, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingAccount = await AppDataSource.manager.findOne(Account, {
      where: { email },
    });

    if (existingAccount) {
      // Email already exists, return an error response
      return res.status(400).json({ error: "Email already exists" });
    }
    // Create a new Account
    const newAccount = new Account();
    newAccount.email = email;
    newAccount.password = hashedPassword;
    newAccount.type = "Professeur";
    // Save the Account to the database
    const accountRepository = AppDataSource.getRepository(Account);
    const savedAccount = await accountRepository.save(newAccount);

    // Create a new Professeur and associate it with the saved Account
    const newProfesseur = new Professeur();
    newProfesseur.nom = nom;
    newProfesseur.prenom = prenom;
    newProfesseur.account = savedAccount;

    // Save the Professeur to the database
    const professeurRepository = AppDataSource.getRepository(Professeur);
    await professeurRepository.save(newProfesseur);

    res.status(201).json({ message: "Professeur created successfully" });
  } catch (error) {
    console.error("Error creating Professeur:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.put("/professeur/:id", async (req, res) => {
  try {
    const professeurId: number = parseInt(req.params.id, 10);

    // Fetch the existing Professeur from the database
    const existingProfesseur = await AppDataSource.manager.findOne(Professeur, {
      where: { id: professeurId },
      relations: ["account"],
    });

    if (!existingProfesseur) {
      return res.status(404).json({ error: "Professeur not found" });
    }

    const { nom, prenom, email, password } = req.body;

    // Update the properties based on the request body
    existingProfesseur.nom = nom;
    existingProfesseur.prenom = prenom;

    const existingAccount = await AppDataSource.manager.findOne(Account, {
      where: { id: existingProfesseur.account.id },
    });
    // Update the email if provided
    if (email) {
      existingAccount.email = email;
    }

    // Update the password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      existingAccount.password = hashedPassword;
    }

    // Save the updated Professeur to the database
    await AppDataSource.manager.save(existingProfesseur);
    await AppDataSource.manager.save(existingAccount);
    res.status(200).json({ message: "Professeur updated successfully" });
  } catch (error) {
    console.error("Error updating Professeur:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/professeur/:id", async (req, res) => {
  try {
    const professeurId: number = parseInt(req.params.id, 10);

    // Fetch the existing Professeur from the database
    const existingProfesseur = await AppDataSource.manager.findOne(Professeur, {
      where: { id: professeurId },
      relations: ["account"],
    });

    if (!existingProfesseur) {
      return res.status(404).json({ message: "Professeur not found" });
    }

    const existingAccount = await AppDataSource.manager.findOne(Account, {
      where: { id: existingProfesseur.account.id },
    });

    // Delete the Professeur and associated Account
    await AppDataSource.manager.remove([
      existingProfesseur,
      existingProfesseur.account,
    ]);

    await AppDataSource.manager.remove([existingAccount]);

    res.status(200).json({ message: "Professeur deleted successfully" });
  } catch (error) {
    console.error("Error deleting Professeur:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});