# Snap! Moodle plugins ![Snap! plugin picture](assets/snapMoodle.png)
## Add to your Moodle activities the ability to include Snap! projects
- You can include **Snap!**, **Snap4Arduino**, **Beetleblocks**, **TurtleStitch** or your own Snap! customization
- **Everything runs in your Moodle server** (users, projects...and even your Snap! distro)
- It is **a Moodle assignment submission plugin**, adding this feature to any of your assignment activities.

## Download a play!
- ![Snap! plugin picture](assets/snapMoodle.png)  **[Snap! submissions 1.0](#)**  _(Snap! 6.2.4)_
- ![Snap4Arduino plugin picture](assets/snap4arduinoMoodle.png)  **[Snap4Arduino submissions 1.0](#)**  _(SnapArduino 6.2)_
- ![BeetleBlocks plugin picture](assets/beetleblocksMoodle.png)  **[BeetleBlcoks submissions 1.0](#)**  _(BeetleBlocks 5.3.2)_
- ![TurtleStitch plugin picture](assets/turtlestitchMoodle.png)  **[TurtleStitch submissions 1.0](#)**  _(TurtleStitch 2.6)_

## Documentation

[Students](#students) - [Teachers](#teachers) - [MoodleAdmins](#admins) - [Developers](#developers)

## Students

## Teachers

## Admins

## Developers

Do you want to build your own Snap! plugin? It's easy!
- Add your `/source/pluginName/` folder with your Snap! editor (your distro) inside.
- Go to `/assets/` and add your "png file" (use `pluginNameMoodle.png` as name) for your plugin icon picture.
- Check `/build` script and add your "case". You only have to write 4 strings: **pluginName** (is your "source folder" - use lowercase without spaces), **pluginApp** (the real name), **pluginVersion** and **pluginTableName** (the table name in Moodle). The four initial examples (Snap!, Snap4Arduino...) show you clearly.
- That's all! **Build script** will build your plugin.

