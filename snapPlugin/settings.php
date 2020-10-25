<?php
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
 * This file defines the admin settings for this plugin.
 *
 * @package   assignsubmission_#snapPluginName#
 * @copyright 2020 Sara Arjona <sara@moodle.com> and Joan Guillén <jguille2@xtec.cat>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die;

$settings->add(new admin_setting_configcheckbox('assignsubmission_#snapPluginName#/default',
                   new lang_string('default', 'assignsubmission_#snapPluginName#'),
                   new lang_string('default_help', 'assignsubmission_#snapPluginName#'), 0));
$settings->add(new admin_setting_heading('assignsubmission_#snapPluginName#/info',
                   get_string('#snapPluginName#_urlInfo', 'assignsubmission_#snapPluginName#'),
                   get_string('#snapPluginName#_urlInfoDetails', 'assignsubmission_#snapPluginName#').
                       " <a href='$CFG->wwwroot/mod/assign/submission/#snapPluginName#/run/index.html'>$CFG->wwwroot/mod/assign/submission/#snapPluginName#/run/index.html</a>")) ;
