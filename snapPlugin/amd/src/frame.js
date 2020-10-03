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
        iframe = document.getElementById('snap_#snapPluginName#-' + snapmode + '-' + userid + '-' + attempt);
    if (cont.requestFullscreen) {
        cont.requestFullscreen();
    } else if (cont.mozRequestFullScreen) {
        cont.mozRequestFullScreen();
    } else if (cont.msRequestFullscreen) {
        cont.msRequestFullscreen();
    } else if (cont.webkitRequestFullScreen) {
        cont.webkitRequestFullScreen();
    }
    toggler.classList.remove('fa-expand');
    toggler.classList.add('fa-compress');
    if (iframe.classList.contains('snap-iframe-hidden_#snapPluginName#')) {
       iframe.classList.remove('snap-iframe-hidden_#snapPluginName#');
       iframe.classList.add('snap-iframe-show_#snapPluginName#');
    }
};

const exitFS = (snapmode, userid, attempt) => {
    var toggler = document.getElementById('togglingFSicon_#snapPluginName#-' + snapmode + '-' + userid + '-' + attempt),
        iframe = document.getElementById('snap_#snapPluginName#-' + snapmode + '-' + userid + '-' + attempt);
    toggler.classList.remove('fa-compress');
    toggler.classList.add('fa-expand');
    if (iframe.classList.contains('snap-iframe-show_#snapPluginName#')) {
        iframe.classList.remove('snap-iframe-show_#snapPluginName#');
        iframe.classList.add('snap-iframe-hidden_#snapPluginName#');
    }
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
