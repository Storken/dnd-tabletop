# dnd-tabletop-front

## Planned features

- User
  - auth0
  - roles: dm (admin) | player
  - Campaigns: Joined | Created
- Grid map
  - Firebase: store image reference
  - self-hosted minIO: store image
  - Tokens: Monster | PC | NPC
- Scenario
  - Has a grid map
  - Fog of war?
- Campaign
  - A `campaign` is a room
  - Has multiple scenarios
  - PC: Every `player` has a `PC` (Player Character)
- Dice rolls
  - Firebase: store roll result
  - PC: The PC that rolled the dice
  - Dice type: d4 | d6 | d8 | d10 | d12 | d20 | d100
- Discord bot
  - Post event to connected channel
  - Roll dice from channel
  - Post polls to channel
