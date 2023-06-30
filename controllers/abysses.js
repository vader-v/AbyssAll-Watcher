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

function newAbyss(req, res) {
	const { user } = req

	if (user && user.admin) {

		Abyss.find({})
		.then(abysses => {
			res.render('abysses/new-abyss', {
				abysses,
				title: "Abyss Creator",
			})
		})
		.catch(err => {
			console.log(err)
			res.redirect('/abyss-all')
		})
	} else {
		res.status(403).send("Unauthorized access")
	}
}

function createAbyss(req, res) {
  const { user } = req;

  if (user && user.admin) {
    const { title, startDate, endDate, content } = req.body;

    const newAbyss = new Abyss({
      title,
      startDate,
      endDate,
      content,
    });

    newAbyss.save()
      .then(() => {
        res.redirect('/abyss-all');
      })
      .catch((err) => {
        console.log(err);
        res.redirect('/new-abyss');
      });
  } else {
    res.status(403).send("Unauthorized access");
  }
}

export {
  index,
	rateAbyss,
	newAbyss,
	createAbyss
}