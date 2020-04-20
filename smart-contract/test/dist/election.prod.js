"use strict";function _slicedToArray(t,e){return _arrayWithHoles(t)||_iterableToArrayLimit(t,e)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(t,e){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)){var r=[],n=!0,a=!1,i=void 0;try{for(var o,l=t[Symbol.iterator]();!(n=(o=l.next()).done)&&(r.push(o.value),!e||r.length!==e);n=!0);}catch(t){a=!0,i=t}finally{try{n||null==l.return||l.return()}finally{if(a)throw i}}return r}}function _arrayWithHoles(t){if(Array.isArray(t))return t}var Election=artifacts.require("./Election.sol");contract("Election",function(t){it("Registers a candidate",function(){var e,o,r=t[0],l="Ashish";return Election.deployed().then(function(t){return(e=t).onCandidateRegistered({}).watch(function(t,e){t&&console.log(t),o=e.args.candidateId}),t.registerCandidate(l,"BE",{from:r})}).then(function(t){return e.getCandidate.call(o)}).then(function(t){var e=_slicedToArray(t,4),r=e[0],n=e[1],a=e[2],i=e[3];assert.equal(l,r,"Name wasn't properly added"),assert.equal("BE",i,"Qualification wasn't added properly"),assert.equal(n,0,"Vote Count is wrong"),assert.equal(a,o,"Candidate Id generated was wrong")})})});