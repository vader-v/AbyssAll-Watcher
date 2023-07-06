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
        const floors = [
          { name: '9', levels: [] },
          { name: '10', levels: [] },
          { name: '11', levels: [] },
          { name: '12', levels: [] },
        ]
        for (let i = 0; i < 3; i++) {
          floors[0].levels.push({ name: `${i + 1}`, half1: [], half2: [] })
          floors[1].levels.push({ name: `${i + 1}`, half1: [], half2: [] })
          floors[2].levels.push({ name: `${i + 1}`, half1: [], half2: [] })
        }
        res.render('abysses/new-abyss', {
          abysses,
          enemies,
          floors,
          title: "Abyss Creator",
        })
      })
      .catch(err => {
        console.log(err);
        res.redirect('/abysses/abyss-all')
      });
  } else {
    res.status(403).send("Unauthorized access")
  }
}

function createAbyss(req, res) {
  const { user } = req

  if (user && user.admin) {
    const { title, startDate, endDate, content, enemies, levels, floors } = req.body

    const newAbyss = new Abyss({
      title,
      startDate,
      endDate,
      content,
      enemies: [], // Initialize the enemies array
      floors: [], // Initialize the floors array
    })

    for (const floorData of floors) {
      const { name, levels } = floorData
      const floor = {
        name,
        levels: [],
      }
      for (const levelData of levels) {
        const { half1, half2 } = levelData
        const level = {
          name: levelData.name,
          half1: enemies[half1],
          half2: enemies[half2],
          ratings: [],
        }
        floor.levels.push(level)
      }
      newAbyss.floors.push(floor)
    }

    newAbyss.save()
    .then(() => {
      res.redirect('/abysses/abyss-all')
    })
    .catch((err) => {
      console.log(err)
      res.redirect('/abysses/new-abyss')
    })
  } else {
    res.status(403).send("Unauthorized access")
  }
}

function newEnemy(req, res) {
	const { user } = req

	if (user && user.admin) {

    Promise.all([Enemy.find({}).sort({ createdAt: -1 })])
    .then(([enemies]) => {
			const reversedEnemies = [...enemies].reverse()
        res.render('abysses/new-enemy', {
          enemies: reversedEnemies,
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