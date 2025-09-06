import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCrown ,faBars, faTimes, faChevronDown,
    faGear,
  faUser,
  faEnvelope,
  faUserPlus,
  faFileLines,
  faQuestionCircle,
  faRightFromBracket,
  faPlus,
  faMagnifyingGlass,
  faFileCirclePlus, 
  faHeadphones,
  faEllipsisV,
  faHeart,
  faChevronLeft,
  faEllipsisH,
  faCircleInfo, faPenToSquare, faPrint, faDownload,
  faChartLine,faGaugeHigh,
   faVolumeHigh, faCoins, faCheck, 
   faPlayCircle,
   faUndoAlt, faRedoAlt, faSyncAlt, faCaretUp, faCommentAlt,
   faPauseCircle, faArrowsRotate
} from '@fortawesome/free-solid-svg-icons'


// Add all used icons to the library
library.add(faCrown, faBars, faTimes, faChevronDown
  
)
library.add(
  faGear,
  faUser,
  faEnvelope,
  faUserPlus,
  faFileLines,
  faQuestionCircle,
  faRightFromBracket,
  faPlus,
  faHeart,

)

library.add(faMagnifyingGlass, faFileCirclePlus)

library.add( faHeadphones, faEllipsisV)

library.add(faChevronLeft, faEllipsisH)

library.add(
  faCircleInfo, faPenToSquare, faPrint, faDownload,
  faChartLine, faFileLines, faGear, faGaugeHigh,   
     faVolumeHigh, faCoins, faCheck,
  faPlayCircle, faUndoAlt, faRedoAlt, faSyncAlt, faCaretUp, faCommentAlt, faPauseCircle, faArrowsRotate
)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})



// npm install --save @fortawesome/fontawesome-svg-core
// npm install --save @fortawesome/free-solid-svg-icons
// npm install --save @fortawesome/vue-fontawesome@latest