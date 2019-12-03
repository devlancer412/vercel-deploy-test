/* eslint no-extend-native: 0 */
// core-js comes with Next.js. So, you can import it like below
import includes from 'core-js/features/string/virtual/includes'
import repeat from 'core-js/features/string/virtual/repeat'
import assign from 'core-js/features/object/assign'
import fill from 'core-js/features/array/fill'
import 'intersection-observer'

// Add your polyfills
// This files runs at the very beginning (even before React and Next.js core)
console.log('Polyfills initialising 🚀')

String.prototype.includes = includes
String.prototype.repeat = repeat
Object.assign = assign
Array.fill = fill
