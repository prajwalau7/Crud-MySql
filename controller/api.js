const express = require("express");
const connection = require("../index");
const router = express.Router();

//post
router.post("/insertData", async (req, res) => {
  const { name, city } = req.body;
  try {
    const insert = "INSERT INTO myne(name,city) values(?,?)";
    connection.query(insert, [name, city], (err, result) => {
      if (err) {
        console.log("Error while inserting");
        return;
      }
      console.log("Inserted successfully");
      return res.status(200).json({ msg: "Inserted", result });
    });
  } catch (error) {
    console.log("Error while post", error);
    return res.status(500).json({ msg: "Error while post" });
  }
});

//get
router.get("/alldata", async (req, res) => {
  try {
    const select = "SELECT * FROM myne";

    connection.query(select, (err, result) => {
      if (err) {
        console.log("unable to fetch data");
        throw err;
      }

      return res.status(200).json({ msg: "Data", result });
    });
  } catch (error) {
    console.log("Error while get", error);
    return res.status(500).json({ msg: "Error while get" });
  }
});

//get by id
router.get("/getbyid/:id", (req, res) => {
  const { id } = req.params;
  try {
    const select = `select * from myne where id=${id}`;

    if (!select) {
      console.log("NO data found in this id");
      return res.status(404).json({ msg: "No data found" });
    }
    connection.query(select, (err, data) => {
      if (err) {
        console.log(err);
      }
      return res.status(200).json({ msg: "Success", data });
    });
  } catch (error) {
    console.log("Error while get", error);
    return res.status(500).json({ msg: "Error while get" });
  }
});

//put
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    let updateFields = [];
    let values = [];
    for (const [key, value] of Object.entries(updates)) {
      updateFields.push(`${key} = ?`);
      values.push(value);
    }

    values.push(id);

    const querys = `UPDATE myne SET ${updateFields.join(", ")} WHERE ID = ?`;

    connection.query(querys, values, (err, result) => {
      if (err) {
        console.log("Unable to update data", err);
        return res.status(500).json({ msg: "Unable to update data" });
      }

      return res.status(200).json({ msg: "Updated successfully", result });
    });
  } catch (error) {
    console.log("Error while put", error);
    return res.status(500).json({ msg: "Error while put" });
  }
});

//delete
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const querys = `DELETE FROM myne where id=${id}`;

    connection.query(querys, (err, result) => {
      if (err) {
        console.log("Unable to delete data", err);
        return res.status(500).json({ msg: "Unable to delete data" });
      }

      return res.status(200).json({ msg: "deleted successfully", result });
    });
  } catch (error) {
    console.log("Error while delete", error);
    return res.status(500).json({ msg: "Error while delete" });
  }
});

module.exports = router;
