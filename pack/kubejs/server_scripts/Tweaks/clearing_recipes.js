
ServerEvents.recipes(allthemods => {
	// Draconic Evolution Clearing
	const draconicclearing = [
		"awakened_crafting_injector",
		"basic_crafting_injector",
		"basic_io_crystal",
		"basic_wireless_crystal",
		"celestial_manipulator",
		"chaotic_crafting_injector",
		"crafting_core",
		"disenchanter",
		"dislocator_pedestal",
		"dislocator_receptacle",
		"draconic_io_crystal",
		"draconic_wireless_crystal",
		"draconium_chest",
		"energy_transfuser",
		"entity_detector",
		"entity_detector_advanced",
		"fluid_gate",
		"flux_gate",
		"generator",
		"grinder",
		"reactor_core",
		"wyvern_crafting_injector",
		"wyvern_io_crystal",
		"wyvern_wireless_crystal"
	]
	draconicclearing.forEach((name) => {
		let material = Item.of(`draconicevolution:${name}`)
		
		allthemods.shapeless(material, [material]).id(`allthemods:clear_draconicevolution/${name}`)
	})
	
	// Powah Energizing Rod Clearing
	const powahclearing = [
		"starter",
		"basic",
		"hardened",
		"blazing",
		"niotic",
		"spirited",
		"nitro"
	]
	powahclearing.forEach((name) => {
		let material = Item.of(`powah:energizing_rod_${name}`)
		
		allthemods.shapeless(material, [material]).id(`allthemods:clear_powah/energizing_rod_${name}`)
	})
})

