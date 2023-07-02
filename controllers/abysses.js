import { Abyss, Enemy } from "../models/abyss.js"

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
  const { abyssId } = req.params
  const { rating } = req.body

  Abyss.findById(abyssId)
    .then((abyss) => {
      if (!abyss) {
        return res.status(404).send('Abyss not found')
      }

      // Save the rating to the abyss
      abyss.ratings.push(rating)
      return abyss.save()
    })
    .then(() => {
      res.redirect('abysses/abyss-all')
    })
    .catch((err) => {
      console.log(err)
      res.redirect('abysses/abyss-all')
    })
}

function newAbyss(req, res) {
  const { user } = req;

  if (user && user.admin) {
    Promise.all([Abyss.find({}), Enemy.find({})])
      .then(([abysses, enemies]) => {
        res.render('abysses/new-abyss', {
          abysses,
          enemies,
          title: "Abyss Creator",
        });
      })
      .catch(err => {
        console.log(err);
        res.redirect('/abysses/abyss-all');
      });
  } else {
    res.status(403).send("Unauthorized access");
  }
}

function createAbyss(req, res) {
  const { user } = req

  if (user && user.admin) {
    const { title, startDate, endDate, content, enemies, levels } = req.body

    const newAbyss = new Abyss({
      title,
      startDate,
      endDate,
      content,
      enemies: [] // Initialize the enemies array
    })

    // Loop through the enemies and levels arrays to create an enemy object with its corresponding level
    for (let i = 0; i < enemies.length; i++) {
    const enemy = {
      enemyId: enemies[i],
      level: levels[i]
    }
    newAbyss.enemies.push(enemy)
    }
    console.log(newAbyss)
    console.log(req.body)
    newAbyss.save()
    .then(() => {
      res.redirect('/abysses/abyss-all')
    })
    .catch((err) => {
      console.log(err)
      res.redirect('/abysses/new-abyss')
    })
  }
}

function newEnemy(req, res) {
	const { user } = req

	if (user && user.admin) {

		Enemy.find({})
		.then(enemies => {
			res.render('abysses/new-enemy', {
				enemies,
				title: "Enemy Creator",
			})
		})
		.catch(err => {
			console.log(err)
			res.redirect('abysses/new-enemy')
		})
	} else {
		res.status(403).send("Unauthorized access")
	}
}

function createEnemy(req, res) {
  const { user } = req

  if (user && user.admin) {
    const { name, image, type } = req.body

    const newEnemy = new Enemy({
      name,
      image,
      type,
    })

    newEnemy.save()
      .then(() => {
        res.redirect('/abysses/new-enemy')
      })
      .catch((err) => {
        console.log(err)
        res.redirect('/abysses/new-enemy')
      })
  } else {
    res.status(403).send("Unauthorized access")
  }
}

export {
  index,
	rateAbyss,
	newAbyss,
	createAbyss,
  newEnemy,
  createEnemy,
}