
ServerEvents.recipes(allthemods =>{

    const dyenamicdyes = [
		"honey",
		"mint",
		"lavender",
		"navy",
		"bubblegum",
		"amber",
		"conifer",
		"icy_blue",
		"ultramarine",
		"maroon",
		"wine",
		"rose",
		"fluorescent",
		"spring_green",
		"peach",
		"cherenkov",
		"aquamarine",
		"persimmon"
	]
	dyenamicdyes.forEach((name) => {
		let material = `dyenamics:${name}_dye`
		
		allthemods.shapeless(Item.of(material, 3), [`occultism:otherflower`, material]).id(`allthemods:crafting/otherflower_to_${name}_dye`)
		allthemods.recipes.modern_industrialization.mixer(2, 200)
		.itemIn(material, 0)
		.fluidIn(`25x modern_industrialization:benzene`)
		.itemOut(material)
		.id(`allthemods:modern_industrialization/dyes/${name}/mixer/benzene`)
		allthemods.recipes.modern_industrialization.mixer(2, 200)
		.itemIn(material, 0)
		.fluidIn(`100x modern_industrialization:synthetic_oil`)
		.itemOut(material)
		.id(`allthemods:modern_industrialization/dyes/${name}/mixer/synthetic_oil`)
	})
})

