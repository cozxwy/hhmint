import React, {
    userState
} from 'react'


function Quotes() {


    //{"text":"By working faithfully eight hours a day you may eventually get to be boss and work twelve hours a day.","author":"Robert Frost"}

    const [text, setText] = userState('');

    return ( <
        div > Quotes < /div>
    )
}

export default Quotes