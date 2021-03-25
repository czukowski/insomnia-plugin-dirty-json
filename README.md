insomnia-plugin-dirty-json
==========================

This plugin for Insomnia will try to fix errors in your request JSONs before sending them.

Why?
----

You should always create valid requests to APIs you're talking to, no question about it. There are times,
however, when you have to bend this rule a little to make your life easier. For example, you might need
to fine tune some requests to Elasticsearch that uses [scripted fields][1]. Normally you'd need to send
these scripts as one-liners because JSON does not allow unescaped line breaks inside strings, but that
would make those scripts unreadable and hard to work with. With this plugin you can format your scripts
inside a JSON string in a sensible way to play with them however you want.


Usage
-----

Just install and enable the plugin when you need it. It's probably safe to keep it enabled, because:

 - If the content type of the request is not `application/json`, the plugin will do nothing.
 - The plugin tries to parse the request body with a built-in JSON parser and if it's successful (eg. the
   request JSON was valid), then the plugin will not modify the request.
 - If the request JSON was not valid, the plugin will try to parse it using a [dirty-json parser][2], which
   it uses as an NPM dependency, that will try and fix errors, and in case of success, the request body is
   replaced by that fixed version.

There's no guarantee it can fix any invalid JSON you can come up with or that if it does, the result will be
exactly what you'd expect it to be, so some caution is still advised.

License
-------

This work is released under the GNU Affero General Public License. See LICENSE file for details.


 [1]: https://www.elastic.co/guide/en/elasticsearch/painless/current/painless-walkthrough.html#_accessing_doc_values_from_painless
 [2]: https://github.com/RyanMarcus/dirty-json
