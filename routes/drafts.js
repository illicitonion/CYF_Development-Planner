const router = require("express").Router();
const pool = require("../db");

//all user's drafts

router.get("/", async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT users.username, drafts.draft_id, drafts.draft_title, drafts.draft_text FROM users LEFT JOIN drafts ON users.user_id = drafts.user_id WHERE users.user_id = $1",
      [req.user.id]
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// insert new draft

router.post("/", async (req, res) => {
  try {
    const { draftTitle, draftText } = req.body;
    const newDraft = await pool.query(
      "INSERT INTO drafts (user_id, draft_title, draft_text) VALUES ($1, $2, $3) RETURNING *",
      [req.user.id, draftTitle, draftText]
    );
    res.json(newDraft.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

// get one feedback

router.get("/:id", async (req, res) => {
  const { draftId } = req.params;

  const selectedDraft = await pool.query(
    "SELECT * FROM drafts WHERE draft_id = $1",
    [draftId]
  );
  res.json(selectedDraft.rows);
  try {
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

//edit draft

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { draftTitle, draftText } = req.body;
    const updateTodo = await pool.query(
      "UPDATE drafts SET draft_title = $1, draft_text = $2 WHERE draft_id = $3 AND user_id = $4 RETURNING *",
      [draftTitle, draftText, id, req.user.id]
    );

    if (updateTodo.rows.length === 0) {
      return res.json("This draft is not yours");
    }

    res.json("Draft was updated");
  } catch (err) {
    console.error(err.message);
  }
});

// delete draft

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDraft = await pool.query(
      "DELETE FROM drafts WHERE draft_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (deleteDraft.rows.length === 0) {
      return res.json("This draft is not yours");
    }

    res.json("Draft was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
