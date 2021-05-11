"use strict";function _slicedToArray(t,e){return _arrayWithHoles(t)||_iterableToArrayLimit(t,e)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(t,e){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)){var r=[],n=!0,a=!1,o=void 0;try{for(var i,l=t[Symbol.iterator]();!(n=(i=l.next()).done)&&(r.push(i.value),!e||r.length!==e);n=!0);}catch(t){a=!0,o=t}finally{try{n||null==l.return||l.return()}finally{if(a)throw o}}return r}}function _arrayWithHoles(t){if(Array.isArray(t))return t}var Election=artifacts.require("./Election.sol");contract("Election",function(t){var l,r=t[0];it("Registers a candidate",function(){var e,i="Ashish";return Election.deployed().then(function(t){return(e=t).onCandidateRegistered({}).watch(function(t,e){t&&console.log(t),l=e.args.candidateId}),t.registerCandidate(i,"BE",{from:r})}).then(function(t){return e.getCandidate.call(l)}).then(function(t){var e=_slicedToArray(t,4),r=e[0],n=e[1],a=e[2],o=e[3];assert.equal(i,r,"Name wasn't properly added"),assert.equal("BE",o,"Qualification wasn't added properly"),assert.equal(n,0,"Vote Count is wrong"),assert.equal(a,l,"Candidate Id generated was wrong")})}),it("Votes for a candidate",function(){var e;return Election.deployed().then(function(t){return(e=t).onVoteCasted({}).watch(function(t,e){t&&console.log(t)}),t.vote(l,{from:r})}).then(function(t){return e.getCandidate.call(l)}).then(function(t){var e=_slicedToArray(t,4),r=(e[0],e[1]);e[2],e[3];assert.equal(r,1,"Vote count is wrong")})})});