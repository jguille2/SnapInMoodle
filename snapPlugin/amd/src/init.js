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
 * This module handles the display and events of the Snap! editor.
 *
 * @module     assignsubmission_#snapPluginName#/snap
 * @package   assignsubmission_#snapPluginName#
 * @copyright 2020 Sara Arjona <sara@moodle.com> and Joan Guillén <jguille2@xtec.cat>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import $ from 'jquery';
import * as Str from 'core/str';

export const preInit = (userid, attemptNumber, loaded, editable, xmlProject) => {
    var snapFrame = getSnapFrame(userid, attemptNumber);
    if (snapFrame.contentWindow.onbeforeunload) {
        snapFrame.contentWindow.onbeforeunload = null;
        if (loaded) {
            init(xmlProject, userid, attemptNumber, editable);
        }
    } else {
        preInit(userid, attemptNumber, loaded, editable, xmlProject);
    }
};

export const init = (xmlProject, userid, attemptNumber, editable) => {
    const snapIDE = getIDE(userid, attemptNumber, xmlProject, editable);
    if (!xmlProject) {
        xmlProject = getXMLProject();
    }
    if (snapIDE) {
        if (xmlProject) {
            // Update the XML project.
            snapIDE.rawOpenProjectString(xmlProject);
        }
        if (editable) {
            // Register events (to update the hidden xmlproject field when the form is submitted).
            const form = getXMLInput().closest('form');
            registerListenerEvents(form, snapIDE);
        }
        // Customize #snapPluginApp# and hide Cloud options.
        customizeSnap(snapIDE);
    }
};

const getSnapFrame = (userid, attemptNumber) => {
    return document.getElementById('snap_#snapPluginName#-' + userid + '-' + attemptNumber);
};

const getIDE = (userid, attemptNumber) => {
    const snapFrame = getSnapFrame(userid, attemptNumber);
    if (snapFrame) {
        const snapWorld = snapFrame.contentWindow.world;
        if (snapWorld) {
            return snapWorld.children[0];
        }
    }
    return;
};

const getXMLProject = () => {
    let xmlProject = '';

    const xmlInput = getXMLInput();
    if (xmlInput) {
        xmlProject = getXMLInput().value;
    }

    return xmlProject;
};

const getXMLInput = () => {
    return $('input[name="#snapPluginName#_xmlproject"]')[0];
};

const registerListenerEvents = (form, snapIDE) => {
    form.addEventListener('submit',
        function() {
            updateProject(snapIDE);
        });
};

const customizeSnap = (snapIDE) => {
    // Adding #snapPluginApp# embedded info to #snapPluginApp# menu
    if (snapIDE.snapMenu) {
        snapIDE.sourceSnapMenu = snapIDE.snapMenu;
        Str.get_string('#snapPluginName#_embedded', 'assignsubmission_#snapPluginName#').then(function(str) {
            snapIDE.snapMenu = function () {
                this.sourceSnapMenu();
                var menu = this.world().activeMenu;
                menu.addLine();
                menu.addItem(str);
                menu.popup(this.world(), this.logo.bottomLeft());
            };
        });
    }
    // Erasing cloud button
    if (snapIDE.controlBar.cloudButton) {
        snapIDE.controlBar.cloudButton.destroy();
        if (snapIDE.controlBar.projectButton && snapIDE.controlBar.settingsButton) {
            snapIDE.controlBar.sourceFixLayout = snapIDE.controlBar.fixLayout;
            snapIDE.controlBar.fixLayout = () => {
                snapIDE.controlBar.sourceFixLayout();
                snapIDE.controlBar.projectButton.setRight(snapIDE.controlBar.settingsButton.left() - 5);
            };
            snapIDE.controlBar.fixLayout();
        }
    }
};

const updateProject = (snapIDE) => {
    const xmlProject = getXMLInput();
    xmlProject.value = snapIDE.serializer.serialize(snapIDE.stage);
};
