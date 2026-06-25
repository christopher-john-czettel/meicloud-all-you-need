
ServerEvents.tags('item',allthemods => {

    let sulfurData = {
        stellarite_sulfur: { derivativeTier: "precious", sulfurType: "metals" },
        arcane_sulfur: { derivativeTier: "rare", sulfurType: "gems" },
        runic_sulfur: { derivativeTier: "common", sulfurType: "metals" },
        salt_sulfur: { derivativeTier: "abundant", sulfurType: "earthen_matters" },
        sulfur_sulfur: { derivativeTier: "common", sulfurType: "misc" },
        prosperity_sulfur: { derivativeTier: "common", sulfurType: "misc" },
        iesnium_sulfur: { derivativeTier: "precious", sulfurType: "metals" },
        mithril_sulfur: { derivativeTier: "precious", sulfurType: "metals" },
        bort_sulfur: { derivativeTier: "rare", sulfurType: "earthen_matters" }
    };

    for (let sulfurName in sulfurData) {
        if (sulfurData.hasOwnProperty(sulfurName)) {
            allthemods.add('theurgy:alchemical_sulfurs', `kubejs:${sulfurName}`);
            allthemods.add('theurgy:alchemical_sulfurs_and_niters', `kubejs:${sulfurName}`);
            allthemods.add(`theurgy:alchemical_sulfurs/${sulfurData[sulfurName].sulfurType}`, `kubejs:${sulfurName}`);
            allthemods.add(`theurgy:alchemical_sulfurs/${sulfurData[sulfurName].sulfurType}/${sulfurData[sulfurName].derivativeTier}`, `kubejs:${sulfurName}`);
        }
    }
})

