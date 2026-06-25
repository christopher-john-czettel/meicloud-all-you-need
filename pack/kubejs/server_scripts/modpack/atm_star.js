
ServerEvents.recipes(allthemods => {

  //Patric Star - Create
      allthemods.custom({
  "type": "create:mechanical_crafting",
  "accept_mirrored": false,
  "category": "misc",
  "key": {
    "A": {
      "item": "minecraft:magenta_concrete"
    },
    "B": {
      "item": "minecraft:pink_concrete"
    },
    "C": {
      "item": "minecraft:pink_concrete_powder"
    },
    "D": {
      "item": "minecraft:green_concrete"
    },
    "E": {
      "item": "minecraft:green_concrete_powder"
    },
    "F": {
      "item": "minecraft:lime_concrete"
    },
    "G": {
      "item": "minecraft:magenta_concrete_powder"
    }
  },
  "pattern": [
    "    B    ",
    "   BCA   ",
    "BBBGCABBB",
    "ACGCGGGCA",
    " AAGGGBA ",
	"  EDDDE  ",
	" EFEDEFE ",
	"BEDD DDEB",
	"AAA   AAA"
  ],
  "result": {
    "count": 1,
    "id": "allthetweaks:patrick_star"
  },
  "show_notification": false
}).id("allthetweaks:allthetweaks/patrick_star")
     
})

