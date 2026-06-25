
ServerEvents.generateData("after_mods", allthemods => {
  let woodTypes = [
	"jungle",
	"mangrove",
	"warped",
	"birch",
	"bamboo",
	"crimson",
	"dark_oak",
	"oak",
	"cherry",
	"spruce",
	"acacia"	
  ]
  
  woodTypes.forEach(wood => {
	if (!Item.exists(`bibliocraft:${wood}_fancy_sign`)){
	    allthemods.json(`bibliocraft:recipe/wood/${wood}/fancy_sign`, {"neoforge:condition": [{"type": "neoforge:false"}]})
	}
  })
})

