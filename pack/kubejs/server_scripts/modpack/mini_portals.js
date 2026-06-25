
ServerEvents.recipes(allthemods => {
	
// Mini Nether
	allthemods.shaped('allthetweaks:mini_nether', ['ADA', 'BCB', 'AEA'], {
    A: 'minecraft:obsidian',
    B: 'minecraft:nether_star',
    C: 'apothic_enchanting:sightshelf_t2',
	  D: 'minecraft:wither_skeleton_skull',
	  E: 'minecraft:warped_nylium'

  }).id('allthemods:allthetweaks/mini_nether')

  // Mini End
	allthemods.shaped('allthetweaks:mini_end', ['ABA', 'BCB', 'ABA'], {
    A: 'apothic_enchanting:endshelf',
    B: 'minecraft:ender_eye',
    C: 'apothic_enchanting:draconic_endshelf'

  }).id('allthemods:allthetweaks/mini_end')
  
// Mini Exit
	allthemods.shaped('allthetweaks:mini_exit', ['ABA', 'DCD', 'ADA'], {
    A: 'minecraft:dragon_egg',
    B: 'apothic_enchanting:infused_breath',
    C: 'apothic_enchanting:soul_touched_sculkshelf',
	  D: 'minecraft:end_crystal'

  }).id('allthemods:allthetweaks/mini_exit')
 

})

