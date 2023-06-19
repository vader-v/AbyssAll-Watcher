import { Abyss } from "../models/abyss.js";

function index(req, res) {
	Abyss.find({})
		.then((abysses) => {
			res.render('abysses/abyss-all', {
				abysses,
				title: "Abyss-All!",
			})
		})
		.catch(err => {
			console.log(err)
			res.redirect('/')
		})
}

function rateAbyss(req, res) {
  const { abyssId } = req.params;
  const { rating } = req.body;

  Abyss.findById(abyssId)
    .then((abyss) => {
      if (!abyss) {
        return res.status(404).send('Abyss not found');
      }

      // Save the rating to the abyss
      abyss.ratings.push(rating);
      return abyss.save();
    })
    .then(() => {
      res.redirect('/abyss-all');
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/abyss-all');
    });
}

export {
  index,
	rateAbyss,
}