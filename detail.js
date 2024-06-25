const supplement = require("../models/supplements");

router.get('/detail', async (req, res) => {
    try {
      const supplement = await Supplement.findById(req.params.id);
      res.render('detail', { supplements });
    } catch (err) {
      res.status(500).send('Server Error');
    }
  });