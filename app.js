//* creating express app
const express = require("express");
const app = express();
const port = 3000;

//*importing database modules

const db = require("./config/database.js");

//*importing port module

const PostModel = require("./module/post.js");

//*express app testing

//*creating a record

app.post("/create-post", (req, res) => {
  PostModel.bulkCreate([
    {
      name: "Sam",
      email_id: "sam123@gmail.com",
    },
    {
      name: "Adam",
      email_id: "adamsmith@gmail.com",
    },
    {
      name: "Vector",
      email_id: "vector@gmail.com",
    },
    {
      name: "Jonas",
      email_id: "jonas@gmail.com",
    },
    {
      name: "flash",
      email_id: "flash@gmail.com",
    },
  ])
    .then((result) => {
      return res.json({ message: `Record created successfully` });
    })
    .catch((error) => {
      console.log(error);
      return res.json({ message: `Error creating record` });
    });
});

//*finding a record with id

app.get("/get-latest-post", (req, res) => {
  PostModel.findOne({
    attributes: ["user_id", "name", "email_id"],
    where: {
      user_id: 4,
    },
  })
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => {
      console.log(error);
      return res.json({ message: `Error record while adding data` });
    });
});

//*Reading all the records from the db

app.get("/get-all-post", (req, res) => {
  PostModel.findAll({
    attributes: ["user_id", "name", "email_id"],
  })
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => {
      console.log(error);
      return res.json({ message: `Error retiving data` });
    });
});

//*Updating the record

app.post("/update-post", (req, res) => {
  PostModel.update(
    {
      name: "Jackson",
    },
    {
      where: {
        user_id: 4,
      },
    }
  )
    .then((resutl) => {
      return res.json(resutl);
    })
    .catch((error) => {
      console.log(error);
      return res.json({ message: `Error updating the record` });
    });
});

//*Deleting the record from db

app.delete("/delete", (req, res) => {
  PostModel.destroy({
    where: {
      user_id: 3,
    },
  })
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => {
      console.log(error);
      return res.json({
        message: `Record not deleted`,
      });
    });
});
//*deleting all data from the table

app.delete("/delete-all", (req, res) => {
  PostModel.destroy({
    where: {},
    truncate: true,
  })
    .then((result) => {
      console.log(`Records deleted from table`);
      return res.json({ message: `Database records deleted` });
    })
    .catch((error) => {
      console.log(error);
      return res.json({ message: `Error while deleting records` });
    });
});

//* Testing the connection

const intApp = async () => {
  console.log(`Testing the database connection`);

  try {
    await db.authenticate();
    console.log(`Connection successfull`);

    //* sync the table
    PostModel.sync({
      alter: true,
    });

    app.listen(port, () => {
      console.log(`Server running at ${port}`);
    });
  } catch (error) {
    throw error.original;
  }
};

intApp();

// db.close();
