/**
 * insomnia-plugin-dirty-json
 * Copyright (C) 2021 czukowksi <https://github.com/czukowski>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

const dJSON = require('dirty-json');

module.exports.requestHooks = [
    context => {
        if (context.request.getHeader('content-type') !== 'application/json') {
            return;
        }

        const body = context.request.getBody();

        try {
            JSON.parse(body.text);

            // All is good
            return;
        } catch (e) {
            // Will try to fix next
        }

        try {
            const requestJSON = dJSON.parse(body.text);

            body.text = JSON.stringify(requestJSON);
        } catch (e) {
            console.warn('Could not fix JSON, request will send as it is', e);
        }
    }
];
