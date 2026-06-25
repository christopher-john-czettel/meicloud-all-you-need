<!-- markdownlint-disable MD013 MD024 MD032 MD022 -->
# Changelog

All notable changes to **meiCloud — All You Need** are documented here.

## [0.2.0] — 2026-06-25

### Changed — distribution model pivot
- **AutoModpack now drives in-game mod sync.** Added `automodpack-mc1.21.1-neoforge-4.0.5` (`side = "both"`). Once you import this mrpack once and connect to the meiCloud server, every subsequent mod update flows from the server to your client automatically when you rejoin. No more "delete instance + re-import 1.3 GB" for a single bug fix.
- The `.mrpack` is still the first-install artifact. AutoModpack rides on top of it, not in place of it. v0.1.x's manual update flow is retired.

### How AutoModpack works for us
- The server runs an AutoModpack listener multiplexed onto the existing Minecraft port (`25565`) via packet detection. No firewall changes, no extra DNS, no separate edge-router config.
- Client auth is gated by the Minecraft whitelist — AutoModpack only mints sync tokens for whitelisted players. Tokens rotate every 14 days.
- First connect prompts a one-time TLS fingerprint accept in the AutoModpack client UI. After that it's silent.
- The server's `syncedFiles` glob covers `/mods/*.jar`, `/kubejs/**` (excluding `server_scripts/`), the FTB Quests chapter files, the Patchouli welcome book, and `/shaderpacks/`+`/resourcepacks/` if you put any there.

### What you actually do as a player
- **First time:** import this `.mrpack` in Prism Launcher. Connect to `atm10.meicloud.net`. Accept the AutoModpack TLS fingerprint once. Play.
- **Every time after:** launch the instance, connect, AutoModpack pulls any deltas in the background. No manual steps.

## [0.1.2] — 2026-06-25

### Fixed
- **Boot crash from `mek_x_star` mixin.** Removed Mekanism × Create: Northstar (`mek_x_star-1.21.1-1.0.2`). The mod is a compatibility bridge between Mekanism and **Create: Northstar** — a space mod that has no 1.21.1 release. Without Northstar, the mod's `ItemStackMixin` fails to load `NorthstarTags$NorthstarItemTags`, killing bootstrap. I had read its name as a generic Mek↔Create integration; it isn't.

## [0.1.1] — 2026-06-25

### Fixed
- **Boot crash on first launch.** Three compatibility issues from `packwiz update --all`:
  - Pinned **Advanced Peripherals** back from `0.7.62b` to `0.7.61b` — `0.7.62b` requires CC: Tweaked `1.119.0+`, only available as alpha. ATM10 ships CC: Tweaked `1.117.1`.
  - Removed duplicate **CC: Tweaked** entry. ATM10's manifest listed both the original (CF project 282001, version 1.113.1) and the "Remastered" fork (CF project 1527866, version 1.117.1). Kept only the Remastered one.
  - Fixed **Lithostitched** `side = "server"` → `side = "both"`. Required client-side by Tectonic, Terralith, Regions Unexplored, and CTOV. Prism was correctly excluding it from the client install because of the side flag.
- Re-export produces a smaller / correct `.mrpack`.

## [0.1.0] — 2026-06-25

### Base
- Built on **All The Mods 10 v7.0** (CurseForge file 8091114)
- Minecraft 1.21.1, NeoForge 21.1.234 (bumped from ATM10's 21.1.228)
- 137 mods bumped to their latest releases via `packwiz update --all`

### Added — Create suite (13)
- Create: Aeronautics 1.3.0 — airships you can pilot
- Create: Big Cannons 5.11.7 — mounted artillery for the airships
- Create: Compatible Storage 2.11.0 — modded chests work in contraptions
- Create: Steam'n'Rails 0.2.1 — trains, signals, freight cars
- Create: Beyond Limits 1.5.0 — late-game progression
- Create: Structures Arise — Create-themed worldgen
- Create: Sky Village 0.0.38 — floating villages
- Create: More Features 0.1.2 — extra devices + automation
- Create: Misc & Things 4.1.1 — QoL grab-bag
- Create: Rock & Stone — ore scanning + mining gadgets
- Create: Diesel Generators 1.3.14 — oil/diesel power chain
- Create: New Age 1.2.0 — electrical late-game

### Added — Space (2)
- Creating Space 1.7.18 — rockets + Moon + Mars
- Space War — Aeronautics 0.1.4 — space combat for airships

### Added — Integrations (3)
- Mekanism × Create: Northstar — first-class Mek↔Create cross-recipes
- Create: Mekanism Crafting — Mek recipes via Create contraptions
- Create Ore Excavation × Mekanism — Mek crushers in Create chains

### Added — Worldgen (2)
- Terralith 2.6.2 — 95+ biomes
- Tectonic 3.0.22 — terrain shaping (mountains, valleys, ridges)

### Added — Client mods (4)
- Distant Horizons 3.1.2-b — LOD chunks far beyond view distance
- Iris 1.8.14-beta.1 — shader support (Sodium bumped to 0.8.12-beta.2 for compat)
- LambDynamicLights 4.8.10 — torch-in-hand lighting
- Better Zoom 2.7.0 — press to zoom

### Added — Polish (5)
- Lithium 0.15.3 — server-side perf
- Naturalist 1.0.2 — passive wildlife
- WorldEdit 7.3.8 — creative tools
- FancyMenu 3.9.1 — custom main menu (for branding)
- Neat — mob healthbars

### Added — Combat polish (2)
- Better Combat 2.3.2 — animations + weapon-specific movesets
- First Person Model 2.7.2 — real arms in first-person

### Added — Custom KubeJS scripts (4)
- `meicloud-diesel-fluid-unify.js` — bridges IE ↔ Create: Diesel Generators fluids
- `meicloud-cannon-ingredients-unify.js` — unifies Big Cannons + IE saltpeter
- `meicloud-space-fuel-unify.js` — Creating Space fuel ↔ Mekanism hydrogen
- `meicloud-aeronautics-rotor-unify.js` — steel ingot tag bridge

### Added — Quest content
- `meicloud_airborne.snbt` — 3-quest starter chapter for Aeronautics → Big Cannons → Creating Space

### Added — Welcome
- Patchouli "meiCloud — Welcome" book (auto-given on first login via the OpenBook mod's hook)

### Config notes
- View distance recommended: 14 chunks
- Simulation distance recommended: 12 chunks
- Max players: 8
- `pvp=false`, `mobGriefing=false`
- Difficulty: Hard
