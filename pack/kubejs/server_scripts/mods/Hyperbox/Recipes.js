
if (Platform.isLoaded("hyperbox")) {
  ServerEvents.recipes(allthemods => {
    allthemods.remove({ id: "hyperbox:hyperbox" })
  })
}

