// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * This module handles the events of the frame container of the Snap! editor.
 *
 * @module     assignsubmission_#snapPluginName#/snap
 * @package   assignsubmission_#snapPluginName#
 * @copyright 2020 Sara Arjona <sara@moodle.com> and Joan Guillén <jguille2@xtec.cat>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import * as Init from './init';

export const start = (xmlproject, snapmode, userid, attempt) => {
    Init.init(xmlproject, snapmode, userid, attempt);
    var pluginButton = document.getElementById('snapButton_#snapPluginName#-' + snapmode + '-' + userid + '-' + attempt),
        pluginPlay = document.getElementById('play_#snapPluginName#-' + snapmode + '-' + userid + '-' + attempt),
        newOnClick = "require(['assignsubmission_#snapPluginName#/view'], function(View) {View.toogleFullScreen('" +
            snapmode + "', '" +
            userid + "', '" +
            attempt + "');}); return false;";
    pluginButton.setAttribute('onclick', newOnClick);
    pluginPlay.setAttribute('onclick', newOnClick);
    toogleFullScreen(snapmode, userid, attempt);
};
export const toogleFullScreen = (snapmode, userid, attempt) => {
    if (!isFullScreen()) {
        enterFS(snapmode, userid, attempt);
    } else {
        exitFS(snapmode, userid, attempt);
    }
};
const isFullScreen = () => {
    return (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null) ||
        (document.mozFullScreen || document.webkitIsFullScreen);
};

const enterFS = (snapmode, userid, attempt) => {
    var cont = document.getElementById('snapContainer_#snapPluginName#-' + snapmode + '-' + userid + '-' + attempt),
        toggler = document.getElementById('togglingFSicon_#snapPluginName#-' + snapmode + '-' + userid + '-' + attempt),
        iframe = document.getElementById('snap_#snapPluginName#-' + snapmode + '-' + userid + '-' + attempt),
        navBar = document.getElementById('snapNavBar_#snapPluginName#-' + snapmode + '-' + userid + '-' + attempt);
    if (cont.requestFullscreen) {
        cont.requestFullscreen();
    } else if (cont.mozRequestFullScreen) {
        cont.mozRequestFullScreen();
    } else if (cont.msRequestFullscreen) {
        cont.msRequestFullscreen();
    } else if (cont.webkitRequestFullScreen) {
        cont.webkitRequestFullScreen();
    }
    iframe.style.width = '100%';
    iframe.style.height = 'calc(100% - 50px)';
    navBar.style.width = '100%';
    toggler.classList.remove('fa-expand');
    toggler.classList.add('fa-compress');
/*    if (cont.classList.contains('snap-iframe-hidden_#snapPluginName#')) {
       cont.classList.remove('snap-iframe-hidden_#snapPluginName#');
       cont.classList.add('snap-iframe-show_#snapPluginName#');
    }*/
};

const exitFS = (snapmode, userid, attempt) => {
    var //cont = document.getElementById('snapContainer_#snapPluginName#-' + snapmode + '-' + userid + '-' + attempt),
        toggler = document.getElementById('togglingFSicon_#snapPluginName#-' + snapmode + '-' + userid + '-' + attempt),
        iframe = document.getElementById('snap_#snapPluginName#-' + snapmode + '-' + userid + '-' + attempt),
        navBar = document.getElementById('snapNavBar_#snapPluginName#-' + snapmode + '-' + userid + '-' + attempt);
    iframe.style.width = '910px';
    iframe.style.height = '500px';
    navBar.style.width = '910px';
    toggler.classList.remove('fa-compress');
    toggler.classList.add('fa-expand');
/*    if (cont.classList.contains('snap-iframe-show_#snapPluginName#')) {
        cont.classList.remove('snap-iframe-show_#snapPluginName#');
        cont.classList.add('snap-iframe-hidden_#snapPluginName#');
    }*/
    if (document.exitFullScreen) {
        document.exitFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
};
