
ServerEvents.recipes(allthemods => {
    allthemods.remove({ id: 'quarryplus:quarry' })
    allthemods.shaped('quarryplus:quarry', ['ABA', 'DED', 'ACA'], {
      A: 'allthemodium:allthemodium_ingot',
      B: 'justdirethings:eclipsealloy_pickaxe',
      C: 'allthemodium:unobtainium_pickaxe',
      D: 'productivelib:upgrade_productivity_4',
      E: 'justdirethings:blockbreakert2'
    })
  })
  

